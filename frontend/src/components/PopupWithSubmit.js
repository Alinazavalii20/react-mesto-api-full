import React from "react";
//import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function PopupWithSubmit(props) {

    //const currentUser = React.useContext(CurrentUserContext);

    function handleSubmit(e) {
        e.preventDefault();
        props.handleDeleteClick()
        // eslint-disable-next-line array-callback-return
        //props.data.map((data) => {
          //  if (data.owner === currentUser._id) {
            //    props.handleDeleteClick(data)
           // }
        //})
    }
    return (
        <PopupWithForm
            name='delete' title='Вы уверены?'
            buttonText="Да"
            nameForm='form-delete'
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}>
        </PopupWithForm>
    )

}

export default PopupWithSubmit