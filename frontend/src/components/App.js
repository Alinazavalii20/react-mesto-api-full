import React, { useState, useEffect } from 'react';
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
    auth
      .register(email, password)
      .then(() => {
        setisInfoTooltipOpen(true)
      })
      .catch((err) => {
        setInfoTooltipStatus(true);
        console.log(`${err}`)
      })
  }

  const onLogin = (email, password) => {
    auth
      .authorize(email, password)
      .then((data) => {
        if (!email || !password) {
          return;
        }
        localStorage.setItem("token", data.token);
        setLoggedIn(true);
        auth
          .checkToken(localStorage.getItem("token")).then((res) => {
            if (res) {
              setUserEmail(res.data.email);
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
    localStorage.removeItem("token");
    setLoggedIn(false);
    setUserEmail("");
    navigate("/signin");
  }

  const handleTokenCheck = () => {
    const token = localStorage.getItem('token');
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          if (res) {
            setUserEmail(res.data.email);
            setLoggedIn(true);
            navigate('/');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getAllCards()])
      .then(([userData, cards]) => {
        setCurrentUser(userData);
        setCards(cards);
      })
      .catch((err) => console.log("ошибка получения данных: " + err));

  }, []);

  useEffect(() => {
    handleTokenCheck()
  }, []);

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

  function handleUpdateUser(data) {
    api.editUser(data)
      .then((newData) => {
        setCurrentUser(newData)
        closeAllPopups()
      })
      .catch((err) => console.log(err))
  }

  function handleUpdateAvatar(data) {
    api.updateAvatar(data)
      .then((newData) => {
        setCurrentUser(newData)
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

  function handleCardDelete(data) {
    api.deleteCard(data._id)
      .then(setCards((cards) => cards.filter((c) => c._id !== data._id ),
        closeAllPopups()))
      .catch((err) => console.log(err))
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.setLike(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
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
