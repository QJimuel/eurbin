import React from 'react';
import { useState } from 'react';
import errorIcon from '../Images/error.png';
import successIcon from '../Images/success.png';

const ModalSignUp = ({ show, message, type, onClose }) => {
    if (!show) return null;

    const icon = type === 'error' ? errorIcon : successIcon;
    const [hover, setHover] = useState(false);

    return (
        <div style={modalStyles.overlay}>
            <div style={modalStyles.modal}>
                <img src={icon} alt={`${type} icon`} style={modalStyles.icon} />
                <p style={modalStyles.message}>{message}</p>
                <button 
                    onClick={onClose} 
                    style={hover ? { ...modalStyles.closeButton, ...modalStyles.closeButtonHover } : modalStyles.closeButton}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

const modalStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    modal: {
        backgroundColor: '#fff',
        padding: '30px 20px',
        borderRadius: '10px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
        textAlign: 'center',
        maxWidth: '400px',
        width: '90%',
    },
    icon: {
        width: '50px',
        height: '50px',
        marginBottom: '15px',
    },
    message: {
        fontSize: '16px',
        color: '#333',
        marginBottom: '20px',
        fontWeight: '500',
    },
    closeButtonHover: {
        backgroundColor: '#A00000',
    },
    closeButton: {
        backgroundColor: '#800000',
        color: '#fff',
        border: 'none',
        padding: '10px 20px', 
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '14px',
        transition: 'background-color 0.3s ease',
        margin: '0 auto',  
        display: 'block',  
        width: '100%',
    },    
};

export default ModalSignUp;