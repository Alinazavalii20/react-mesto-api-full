import React from "react";
import success from '../image/success.svg'
import error from '../image/error.svg'


function InfoTooltip(props) {

  return (
    <div className={`popup popup_type_registration ${props.isOpen ? "popup_opened" : ""}`}>
      <div className={`popup__container popup__container_type_registration`}>
        <button className="popup__close" type="button" onClick={props.onClose}></button>
        <form className={`popup__form popup__form_${props.name}`} name={props.registerForm}>
          {props.infoTooltipStatus
            ? (
              <div className="popup__registration-container">
                <img src={success} alt="Регистрация прошла успешно" className="popup__icon" />
                <p className="popup__text">Вы успешно зарегистрировались!</p>
              </div>)
            :
            (<div className="popup__registration-container">
              <img src={error} alt="ошибка" className="popup__icon" />
              <p className="popup__text"> Что-то пошло не так! Попробуйте ещё раз.</p>
            </div>
            )}
        </form>
      </div>
    </div>
  )
}

export default InfoTooltip;