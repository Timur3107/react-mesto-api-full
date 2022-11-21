import React, { useContext } from "react";
import { currentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(currentUserContext)
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardDeleteButtonClassName = (
    `element__delete-button ${isOwn ? "" : 'element__delete-button_hidden'}`
  );
  const cardLikeButtonClassName = (
    `element__like-button ${isLiked && "element__like-button_active"}`
  )

  const handleClick = () => {
    onCardClick(card);
  }

  const handleLikeClick = () => {
    onCardLike(card)
  }

  const handleDeleteClick = () => {
    onCardDelete(card)
  }

  return (
    <li className="element">
      <button className={cardDeleteButtonClassName} type="button" onClick={handleDeleteClick} />
      <img src={card.link} alt={card.name} className="element__image" onClick={handleClick} />
      <div className="element__mask-group">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__container-likes">
          <button className={cardLikeButtonClassName} onClick={handleLikeClick} />
          <p className="element__counter-likes">{card.likes.length}</p>
        </div>
      </div>
    </li>
  )
}

export default Card