import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {

    const avatarRef = React.useRef('');

    function handleSubmit(e) {
        e.preventDefault()

        props.onUpdateAvatar({
            avatar: avatarRef.current.value
        })
    }

    React.useEffect(() => {
        avatarRef.current.value = '';
    }, [props.isOpen]);

    return (
        <PopupWithForm name='avatar' title='Обновить аватар'
            nameForm='form-avatar' buttonText="Сохранить"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}>
            <input name="avatar" id="avatar-input" className="popup__input popup__input_type_avatar"
                type="url" placeholder="Ссылка на аватар" ref={avatarRef} required />
            <span id="url-avatar-error" className="popup__input-error avatar-input-error" />
        </PopupWithForm>
    )
}

export default EditAvatarPopup