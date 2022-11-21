import React from "react";
import imageSuccess from "../images/imageSuccess.png"
import imageError from "../images/imageError.png"

function InfoTooltip({isOpen, onClose, isSuccess}){
    const tooltips ={
        success: "Вы успешно зарегистрировались!",
        error: "Что-то пошло не так! Попробуйте ещё раз."
    }

    return(
        <div className={`popup ${isOpen && "popup_opened"}`}>
            <div className="popup__container popup__tooltip-container">
            <button className="popup__close-button" onClick={onClose} />
            <img className="popup__tooltip-image" src={isSuccess? imageSuccess : imageError} />
            <p className="popup__tooltip-info">{isSuccess ? tooltips.success : tooltips.error}</p>
            </div>
        </div>
    )
}

export default InfoTooltip