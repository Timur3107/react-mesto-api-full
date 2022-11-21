import React from "react";

function ImagePopup({card, onClose}) {
    return (
        <div className={`popup popup_picture ${card.link && "popup_opened"}`}>
            <div className="popup__container-picture">
                <button type="button" className="popup__close-button" onClick={onClose} />
                <img src={card?.link} alt={card?.name} className="popup__image" />
                <h2 className="popup__title-picture">{card?.name}</h2>
            </div>
        </div>
    )
}

export default ImagePopup