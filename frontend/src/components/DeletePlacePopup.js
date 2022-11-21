import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeletePlacePopup({ isOpen, isClose, card, onDeletePlace }) {

    function handleSubmit(e) {
        e.preventDefault()
        onDeletePlace(card)
    }

    return (
        <PopupWithForm title="Вы уверены?" name="delete-card" isOpen={isOpen} onClose={isClose} buttonText="Да" onSubmit={handleSubmit} />
    )
}

export default DeletePlacePopup