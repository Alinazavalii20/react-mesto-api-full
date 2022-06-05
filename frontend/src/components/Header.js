import React from 'react';
import headerLogo from '../image/logo.svg';
import { Routes, Route, Link } from 'react-router-dom';

function Header({ email, onSignOut }) {
  return (
    <header className="header">
      <img className="logo header__logo" src={headerLogo} alt="Город.Россия" />

      <Routes>
        <Route exact path='/signup' element={
          <Link to='/signin' className="header__title">Войти</Link>} />

        <Route exact path='/signin' element={
          <Link to='/signup' className="header__title">Регистрация</Link>} />


        <Route exact path='/' element={
          <div className="header__email-container">
            <h2 className="header__email">{email}</h2>
            <button
              className="header__signout"
              onClick={onSignOut}>
              Выйти
            </button>
          </div>}>
        </Route>

      </Routes>
    </header>
  );
}

export default Header;