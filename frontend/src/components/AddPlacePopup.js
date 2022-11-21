import React, { useState, useEffect } from "react";
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, isClose, onAddPlace }) {
    const [name, setName] = useState("")
    const [link, setLink] = useState("")

    function handleChangeName(e) {
        setName(e.target.value)
    }

    function handleChangeLink(e) {
        setLink(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        onAddPlace({ name, link })
    }

    useEffect(() => {
        setName('')
        setLink('')
    }, [isOpen])

    return (
        <PopupWithForm title="Новое место" name="add-card" isOpen={isOpen} onClose={isClose} buttonText="Создать" onSubmit={handleSubmit} >
            <input
                type="text"
                className="popup__input popup__input-name"
                placeholder="Название"
                required
                id="place-input"
                minLength={2}
                maxLength={40}
                name="name"
                onChange={handleChangeName}
                value={name}
            />
            <span className="popup__input-error place-input-error" />
            <input
                type="url"
                className="popup__input popup__input-link"
                placeholder="Ссылка на картинку"
                required
                id="link-input"
                name="link"
                onChange={handleChangeLink}
                value={link}
            />
            <span className="popup__input-error link-input-error" />
        </PopupWithForm>
    )
}

export default AddPlacePopup