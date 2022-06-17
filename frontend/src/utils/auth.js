//import api from '../utils/Api';
export const BASE_URL = 'http://localhost:4000';

function getResponse(res) {
    return res.status === '200' || '400' || '401'
        ? res.json()
        : Promise.reject(new Error(`Ошибка api: ${res.status}`));
}

export const register = ( email, password ) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, email })
    })
        .then(getResponse)
};

export const authorize = ( email, password ) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, email })
    })
        .then(getResponse)
        .then((data) => {
            localStorage.setItem('jwt', data.token);
            return data;
        })
};

export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            ...this._headers,
            Authorization: `Bearer ${token}`,
          },
    })
        .then(getResponse)
}