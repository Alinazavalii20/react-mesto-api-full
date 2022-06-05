import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpened]);

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault()

        props.onUpdateUser({
            name,
            about: description,
        });
    }


    return (
        <PopupWithForm
            name='profile' title='Редактировать профиль' nameForm='form-profile'
            buttonText="Сохранить" 
            onSubmit={handleSubmit} 
            isOpen={props.isOpen}
            onClose={props.onClose}>

            <input id="username-input" className="popup__input 
            popup__input_type_username" type="text" name="name"
                minLength={2} maxLength={40} placeholder="Ваше имя" required 
                onChange={handleNameChange} value={name ? name : ''} />
            <span id="name-error" className="popup__input-error username-input-error" />

            <input id="userjob-input" className="popup__input popup__input_type_userjob"
                type="text" name="about" minLength={2} maxLength={200}
                placeholder="Ваша пофессия" required
                onChange={handleDescriptionChange} value={description ? description : ''} />
            <span id="about-error" className="popup__input-error userjob-input-error" />

        </PopupWithForm>
    )
}

export default EditProfilePopup