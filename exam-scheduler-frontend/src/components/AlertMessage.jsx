import React, { useEffect, useState } from 'react';
import successIcon from '../assets/alertMessage/success.png'; // Replace with your success icon path
import errorIcon from '../assets/alertMessage/error.png'; // Replace with your error icon path
import closeIcon from '../assets/alertMessage/close.png'; // Replace with your close icon path

import "./AlertMessage.css";

const AlertMessage = ({ type, message, subMessage, onClose }) => {
    const [fadeOut, setFadeOut] = useState(false);
    const icon = type === 'success' ? successIcon : errorIcon;
    const messageColor = type === 'success' ? '#269b24' : '#d9534f'; // Green for success, red for error

    useEffect(() => {
        const timer = setTimeout(() => {
          setFadeOut(true);
          const fadeOutTimer = setTimeout(() => {
            onClose(); // Call onClose after fade out animation
          }, 500); // Match the duration of the fade out animation
          return () => clearTimeout(fadeOutTimer);
        }, 3000); // Show alert for 3 seconds
        return () => clearTimeout(timer);
      }, [onClose]);

    return (
        <div className="alert-message-card">
            <div className="icon-container">
                <img src={icon} alt="Alert Icon" className="alert-icon" />
            </div>
            <div className="alert-message-text-container">
                <p className="alert-message-text" style={{ color: messageColor }}>{message}</p>
                <p className="alert-sub-text">{subMessage}</p>
            </div>
            {/* <img
                src={closeIcon}
                alt="Close Icon"
                className="cross-icon"
                onClick={onClose}
            /> */}
        </div>
    );
};

export default AlertMessage;