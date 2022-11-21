import React, { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, isClose, onUpdateAvatar }) {
  const avatar = useRef(null)

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatar.current.value,
    });
  }

  useEffect(() => {
    avatar.current.value = ""
  }, [isOpen])

  return (
    <PopupWithForm title="Обновить аватар" name="edit-avatar" isOpen={isOpen} onClose={isClose} buttonText="Обновить" onSubmit={handleSubmit} >
      <input
        type="url"
        className="popup__input popup__input-avatar"
        placeholder="Ссылка на аватар"
        required
        id="avatar-input"
        name="avatar"
        ref={avatar}
      />
      <span className="popup__input-error avatar-input-error" />
    </PopupWithForm>
  )
}

export default EditAvatarPopup