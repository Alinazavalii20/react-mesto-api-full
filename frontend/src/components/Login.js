import React, { useState } from "react";
import './styles/Register.css'

function Login(props) {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const email = values.email;
    const password = values.password;
    props.onLogin(email, password);
  }

  return (
    <div className="content">
      <h2 className="register__welcome register">Вход</h2>
      <form className="register__form" onSubmit={handleSubmit} >
        <input
          type="email"
          className="register__input"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          className="register__input"
          name="password"
          placeholder="Пароль"
          value={values.password}
          onChange={handleChange}
          required
        />

        <button
          className="register__button"
          type="submit"
          onSubmit={handleSubmit}
        >
          Войти
        </button>

      </form>
    </div>
  );
}

export default Login