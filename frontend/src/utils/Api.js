function onResponce(res){
    return res.ok ? res.json() : Promise.reject( `Ошибка: ${res}`)
}

export default class Api {
    constructor({url, headers}){
        this._url = url;
        this._headers = headers;
    }

    // Установка токена в заголовки
    setTokenHeaders(token) {
      this._headers = {
        ...this._headers,
        'Authorization': `Bearer ${token}`,
      };
    }

    //получение карточек
    getAllCards(){
        return fetch(`${this._url}/cards`,{
           method: 'GET',
           headers: this._headers,
        })
          .then(onResponce)
    }

    //получение информации о пользователе
    getUserInfo() {
        return fetch(`${this._url}/users/me`,{
            method: 'GET',
            headers: this._headers,
         })
           .then(onResponce)
    }

    //поставить лайк
    setLike(cardId) {
        return fetch(`${this._url}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: this._headers,
         })
           .then(onResponce)
      }

    // Удаление лайка
    deleteLike(cardId) {
        return fetch(`${this._url}/cards/likes/${cardId}`, {
          method: 'DELETE',
          headers: this._headers,
        })
        .then(onResponce);
      }


    //Редактирование профиля
    editUser(data){
        return fetch(`${this._url}/users/me`,{
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify(data),
        })
           .then(onResponce)
    }

    //Обновление аватара пользователя
    updateAvatar({avatar}){
      return fetch(`${this._url}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({avatar})
      })
         .then(onResponce)
  }

    //Добавление новой карточки
    postCard(data){
        return fetch(`${this._url}/cards`, {
          method: 'POST',
          headers: this._headers,
          body: JSON.stringify(data)
        })
           .then(onResponce)
    }

    deleteCard(cardId){
        return fetch(`${this._url}/cards/${cardId}`,{
            method: 'DELETE',
            headers: this._headers,
         })
           .then(onResponce)
    }
}

const api = new Api({
  url: 'http://localhost:4000',
  headers: {
    'Content-Type' : 'application/json',
  }
})

export {api}