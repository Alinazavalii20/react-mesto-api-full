import React from 'react';

function PopupWithForm(props) {
    return (
        <section className={`popup popup_type_${props.name} ${props.isOpen ? "popup_opened" : ""}`}>
            <div className="popup__container">
                <button className="popup__close" onClick={props.onClose}></button>
                <form className={`popup__form popup__form_${props.name}`} name={props.nameFrom} onSubmit={props.onSubmit}>
                    <div className="popup__content">
                        <h2 className="popup__edit">{props.title}</h2>  
                        {props.children}
                        <button className="popup__save" type="submit" name="submit">{props.buttonText}</button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default PopupWithForm;