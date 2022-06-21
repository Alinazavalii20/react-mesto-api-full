/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card(props) {

    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = props.card.owner === currentUser._id;
    const cardDeleteButtonClassName = (
        `element__button-delet ${!isOwn ?  'element__button-delet_visible' : 'element__button-delet_hidden'}`
    );

    const isLiked = props.card.likes.some(i => i === currentUser._id);
    const cardLikeButtonClassName = (
        `element__button-like ${isLiked ? 'element__button-like_active' : ''}`
    );

    function handleClick() {
        props.handlePopupImage(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleSubmitPopup() {
        props.handlePopupWithSubmit(props.card);
    }

    return (
        <div className="element">
            <img className="element__image" src={props.card.link} alt={props.card.name} onClick={handleClick} />
            <button type="button" className={cardDeleteButtonClassName} onClick={handleSubmitPopup}></button>
            <h2 className="element__title">{props.card.name}</h2>
            <div>
                <button type="button" className="button element__button-like" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                <div className="element__like-number">{props.card.likes.length}</div>
            </div>
        </div>
    )
}
export default Card