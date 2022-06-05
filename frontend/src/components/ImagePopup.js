import React from 'react';

function ImagePopup(props) {
    return (
        <div className={`popup popup_type_image ${ props.data.open ? "popup_opened" : "" }`}>
         <div className="popup__container popup__container_type_img">
             <button onClick={props.onClose} type="button" className="popup__close"></button>
             <div className="popup__content">
              <img src={props.data.dataCard.link} className="popup__image" alt={props.data.dataCard.name} />
              <h3 className="popup__title">{props.data.dataCard.name}</h3>
            </div>
         </div>
        </div>
    )
  }
  export default ImagePopup