import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import logoHeader from "../images/Mesto-logo.png"

function Header({email, signOut}) {
  return (
    <header className="header">
      <img src={logoHeader} alt="Место" className="header__logo" />
      <Switch>
        <Route path="/sign-up">
          <Link to="/sign-in" className="header__switch" >Войти</Link>
        </Route>

        <Route path="/sign-in">
          <Link to="/sign-up" className="header__switch" >Регистрация</Link>
        </Route>
        
        <Route path="/">
          <div className="header__user-info">
          <p className="header__email">{email}</p>
          <a className="header__switch" onClick={signOut} >Выйти</a>
          </div>
        </Route>
      </Switch>
    </header>
  )
}
export default Header