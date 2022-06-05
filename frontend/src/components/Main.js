import React from 'react';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main(props) {

    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-container">
                    <img src={currentUser.avatar} alt="Аватар" className="profile__avatar" />
                    <div className="profile__avatar-overlay" onClick={props.handleEditAvatarClick}></div>
                </div>
                <div className="profile__intro">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <p className="profile__subtitle">{currentUser.about}</p>
                    <button type="button" className="button profile__button-edit" onClick={props.handleEditProfileClick}></button>
                </div>
                <button className="button profile__button-plus" onClick={props.handleAddPlaceClick} type="button"></button>
            </section>

            <section className="elements">
                {props.cards.map((data, _id) => (
                    <Card
                        key={_id}
                        data={data}
                        handlePopupImage={props.handlePopupImage}
                        onCardLike={props.onCardLike}
                        onCardDelete={props.onCardDelete}
                        handlePopupWithSubmit={props.handlePopupWithSubmit}
                        onAddPlace={props.onAddPlace}></Card>
                ))}
            </section>
        </main>
    );
}

export default Main;