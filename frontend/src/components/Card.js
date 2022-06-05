import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card(props) {

    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = props.data.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (
        `element__button-delet ${!isOwn ?  'element__button-delet_visible' : 'element__button-delet_hidden'}`
    );

    const isLiked = props.data.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (
        `element__button-like ${isLiked ? 'element__button-like_active' : ''}`
    );

    function handleClick() {
        props.handlePopupImage(props.data);
    }

    function handleLikeClick() {
        props.onCardLike(props.data);
    }

    function handleSubmitPopup() {
        props.handlePopupWithSubmit(props.data);
    }

    return (
        <div className="element">
            <img className="element__image" src={props.data.link} alt={props.data.name} onClick={handleClick} />
            <button type="button" className={cardDeleteButtonClassName} onClick={handleSubmitPopup}></button>
            <h2 className="element__title">{props.data.name}</h2>
            <div>
                <button type="button" className="button element__button-like" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                <div className="element__like-number">{props.data.likes.length}</div>
            </div>
        </div>
    )
}
export default Card