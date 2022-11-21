import React, { useState, useEffect, useContext } from 'react';
import { currentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")

    function handleChangeName(e) {
        setName(e.target.value)
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    }

    const currentUser = useContext(currentUserContext);

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    return (
        <PopupWithForm title="Редактировать профиль" name="edit-profile" isOpen={isOpen} onClose={onClose} buttonText="Сохранить" onSubmit={handleSubmit} >
            <input
                type="text"
                className="popup__input popup__input-name"
                required
                id="name-input"
                minLength={2}
                maxLength={40}
                name="name"
                onChange={handleChangeName}
                value={name || ""}
            />
            <span className="popup__input-error name-input-error" />
            <input
                type="text"
                className="popup__input popup__input-job"
                required
                id="job-input"
                minLength={2}
                maxLength={200}
                name="about"
                onChange={handleChangeDescription}
                value={description || ""}
            />
            <span className="popup__input-error job-input-error" />
        </PopupWithForm>
    )
}
export default EditProfilePopup