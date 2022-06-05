import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
    const [nameCard, setName] = React.useState(" ");
    const [linkCard, setLink] = React.useState(" ");

    function handleAddPlaceName(e) {
        setName(e.target.value);
    }
    function handleAddPlaceLink(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.handleAddCard({
            name: nameCard,
            link: linkCard
        })
    }

    React.useEffect(() => {
        setName('');
        setLink('');
    }, [props.isOpen]);

    return (
        <PopupWithForm
            name='card'
            title='Новое место'
            nameForm='form-card'
            buttonText="Создать"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}>

            <input
                id="name-card"
                name="name"
                value={nameCard}
                className="popup__input popup__input_type_place"
                type="text"
                placeholder="Название"
                minLength={2} maxLength={30}
                onChange={handleAddPlaceName} required />
            <span id="name-card-error" className="popup__input-error place-input-error" />

            <input
                id="url-card"
                name="link"
                value={linkCard}
                className="popup__input popup__input_type_link"
                type="url"
                placeholder="Ссылка на картинку"
                onChange={handleAddPlaceLink} required />
            <span id="url-card-error" className="popup__input-error link-input-error" />
        </PopupWithForm>
    )
}

export default AddPlacePopup