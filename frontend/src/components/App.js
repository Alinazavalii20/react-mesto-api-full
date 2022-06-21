import React, { useState, useEffect, useCallback } from 'react';
import {
  Route,
  Routes,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import ImagePopup from './ImagePopup';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import PopupWithSubmit from './PopupWithSubmit';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';

import { api } from '../utils/Api';
import * as auth from '../utils/auth'


function App() {

  const [userEmail, setUserEmail] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({});

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeleteCard, setDeleteCard] = useState(false);
  const [selectedCard, setSelectCard] = useState({ open: false, dataCard: {} });

  const [cards, setCards] = useState([]);

  const [infoTooltipStatus, setInfoTooltipStatus] = useState(false);
  const [isInfoTooltipOpen, setisInfoTooltipOpen] = useState(false);

  const onRegister = (email, password) => {
    auth.register(email, password)
      .then(() => {
        setisInfoTooltipOpen(true)
        navigate("/singin")
      })
      .catch((err) => {
        setInfoTooltipStatus(true);
        console.log(`${err}`)
      })
  }

  const onLogin = (email, password) => {
    auth.authorize(email, password)
      .then(() => {
        if (!email || !password) {
          return;
        }
        setLoggedIn(true);
        auth
          .checkToken(
            localStorage.getItem("jwt"))
            .then((data) => {
            if (data) {
              setUserEmail(data.email);
            }
            navigate("/");
          });
      })
      .catch((err) => {
        setisInfoTooltipOpen(true)
        setInfoTooltipStatus(false);
        console.log(`${err}`)
      })
  }

  function onSignOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setUserEmail("");
    navigate("/signin");
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleTokenCheck = () => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .checkToken(token)
        .then((data) => {
          if (data) {
            setUserEmail(data.email);
            setLoggedIn(true);
            navigate('/');
          }
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem("jwt");
        });
    }
  };

  useEffect(() => {
    if(loggedIn) {
      Promise.all([api.getUserInfo(), api.getAllCards()])
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
        console.log(user);
        console.log(cards);
      })
      .catch((err) => console.log("ошибка получения данных: " + err));
    }
  }, [loggedIn]);

  useCallback(() => {
    handleTokenCheck()
  }, [handleTokenCheck]);

  useEffect(() => {
    function closePopupEsp(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups()
      }
    }
    window.addEventListener('keydown', closePopupEsp)
    return () => {
      window.removeEventListener('keydown', closePopupEsp)
    }
  }, [])

  function handleProfilePopup() {
    setIsEditProfilePopupOpen(true)
  }

  function handlePlacePopup() {
    setIsAddPlacePopupOpen(true)
  }

  function handleAvatarPopup() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleDeletePopup() {
    setDeleteCard(true);
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setDeleteCard(false)
    setisInfoTooltipOpen(false);
    setSelectCard({ open: false, dataCard: {} });
  }

  function handleImagePopup(data) {
    setSelectCard({ open: true, dataCard: data });
  }

  function handleUpdateUser({name, about}) {
    api.editUser(name, about)
      .then(() => {
        setCurrentUser({ ...currentUser, name, about })
        closeAllPopups()
      })
      .catch((err) => console.log(err))
  }

  function handleUpdateAvatar({avatar}) {
    api.updateAvatar(avatar)
      .then(() => {
        setCurrentUser({ ...currentUser, avatar })
        closeAllPopups()
      })
      .catch((err) => console.log("ошибка аватара: " + err))
  }

  function handleAddCard(data) {
    api.postCard(data)
      .then((newData) => {
        setCards([newData, ...cards]);
        closeAllPopups()
      })
      .catch((err) => console.log(err))
  }

  function handleCardDelete(id) {
    api.deleteCard(id)
    .then (() => {
      setCards((cards) => cards.filter((card) => id !== card._id ))
      closeAllPopups()
    })
      //.then(setCards((cards) => cards.filter((card) => cardId !== card._id ),//))
      .catch((err) => console.log(err))
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);

    api.setLike(card._id, !isLiked)
      .then((newCard) => {
        setCards((cards) => cards.map((c) => c._id === card._id ? newCard.data : c));
      })
      .catch(err => console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header loggedIn={loggedIn} onSignOut={onSignOut} email={userEmail} />

        <Routes>
          <Route
            exact path='/'
            element={
              <ProtectedRoute
                loggedIn={loggedIn}>
                <Main
                  cards={cards}
                  handleEditProfileClick={handleProfilePopup}
                  handleEditAvatarClick={handleAvatarPopup}
                  handleAddPlaceClick={handlePlacePopup}
                  handlePopupImage={handleImagePopup}
                  onCardLike={handleCardLike}
                  handleDeleteClick={handleCardDelete}
                  handlePopupWithSubmit={handleDeletePopup}
                />
              </ProtectedRoute>
            }
          />
          <Route exact path="/signup"
            element={
              <Register
                onRegister={onRegister} />
            }
          />

          <Route exact path="/signin"
            element={
              <Login onLogin={onLogin} />
            }
          />

          <Route exact path="*"
            element={
              <Navigate to="/" />
            }
          />

        </Routes>
        <Footer />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}></EditAvatarPopup>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}></EditProfilePopup>

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          handleAddCard={handleAddCard}></AddPlacePopup>

        <PopupWithSubmit
          isOpen={isDeleteCard}
          onClose={closeAllPopups}
          handleDeleteClick={handleCardDelete}
          data={cards}></PopupWithSubmit>

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          infoTooltipStatus={infoTooltipStatus}></InfoTooltip>

        <ImagePopup data={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider >
  );
}

export default App;
