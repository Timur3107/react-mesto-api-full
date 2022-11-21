import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login({handleAuthorize}) {
    const [data, setData] = useState({ email: "", password: "" })

    function handleChange(e) {
        const { name, value } = e.target
        setData({
            ...data,
            [name]: value
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        handleAuthorize(data)
    }

    return (
        <section className="authorization">
            <div className="authorization__container">
                <h2 className="authorization__title">Вход</h2>
                <form className="authorization__form" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        className="authorization__input authorization__input-email"
                        placeholder="Email"
                        required
                        name="email"
                        onChange={handleChange}
                    />
                    <span className="authorization__input-span" />
                    <input
                        type="password"
                        className="authorization__input authorization__input-name"
                        placeholder="Пароль"
                        required
                        minLength={3}
                        maxLength={30}
                        name="password"
                        onChange={handleChange}
                    />
                    <span className="authorization__input-span" />
                    <button className="authorization__save-button" type="submit">Войти</button>
                    <div className="authorization__text-container">
                        <p className="authorization__paragraph">Ещё не зарегистрированы?&nbsp;</p>
                        <Link className="authorization__link" to="/sign-up">Зарегистрироваться</Link>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Login