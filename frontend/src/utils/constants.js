//карточки
export const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];


export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    invalidInputClass: 'popup__input_state_invalid',
    errorClass: 'popup__input-error_activ',
    submitButtonClass: 'popup__save_inactive',
};

// контейнер для добавления новых карточек
export const cardsContainerSelector = '.elements';
 
// шаблон карточки
export const cardTemplateSelector = '.element-temple';

// попап для создания карточки
export const cardPopupSelector = '.popup_type_card';

//  попап профиля
export const profilePopupSelector = '.popup_type_profile';

//  попапа аватарки
export const avatarPopupSelector = '.popup_type_avatar';

// просмотр фото
export const photoPopupSelector = '.popup_type_image';

//  попапа подтверждения удаления
export const popupCardDelete = '.popup_type_delete';

export const popupName = document.querySelector('.popup__input_type_username');
export const popupAbout = document.querySelector('.popup__input_type_userjob');
export const popupAvatar = document.querySelector('.popup__input_type_avatar');
// профиль
export const userNameSelector = '.profile__name';
export const userDescriptionSelector = '.profile__subtitle';
export const userAvatarSelector = '.profile__avatar';