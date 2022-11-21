import React, {useContext } from "react";
import Card from "./Card.js"
import { currentUserContext } from "../contexts/CurrentUserContext";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete }) {
  const currentUser = useContext(currentUserContext)

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__info">
          <button className="profile__edit-avatar-button" onClick={onEditAvatar} />
          <img className="profile__avatar" src={currentUser.avatar} alt="Аватар" />
          <div>
            <div className="profile__container">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button className="profile__edit-button" onClick={onEditProfile} />
            </div>
            <p className="profile__about">{currentUser.about}</p>
          </div>
        </div>
        <button className="profile__add-button" onClick={onAddPlace} />
      </section>

      <section>
        <ul className="elements">
          {
            cards.map(element => (
              <Card card={element} key={element._id} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />
            ))
          }
        </ul>
      </section>
    </main>
  )
}

export default Main