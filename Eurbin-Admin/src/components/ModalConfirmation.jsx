import React, { useState } from 'react';

const ModalConfirmation = ({ isOpen, message, onConfirm, onCancel }) => {
    const [hoverConfirm, setHoverConfirm] = useState(false);
    const [hoverCancel, setHoverCancel] = useState(false);

    if (!isOpen) return null;

    return (
        <div style={modalStyles.overlay}>
            <div style={modalStyles.modal}>
                <p style={modalStyles.message}>{message}</p>
                <div style={modalStyles.buttonContainer}>
                    <button
                        onClick={onCancel}
                        style={hoverCancel ? { ...modalStyles.cancelButton, ...modalStyles.cancelButtonHover } : modalStyles.cancelButton}
                        onMouseEnter={() => setHoverCancel(true)}
                        onMouseLeave={() => setHoverCancel(false)}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        style={hoverConfirm ? { ...modalStyles.confirmButton, ...modalStyles.confirmButtonHover } : modalStyles.confirmButton}
                        onMouseEnter={() => setHoverConfirm(true)}
                        onMouseLeave={() => setHoverConfirm(false)}
                    >
                        Confirm
                    </button>
                </div>
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
    message: {
        fontSize: '16px',
        color: '#333',
        marginBottom: '20px',
        fontWeight: '500',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '20px',
    },
    confirmButton: {
        display: 'block',
        backgroundColor: '#800000',  
        color: '#fff',
        fontWeight: 'bold',
        border: 'none',
        paddingTop: '12.5px',
        paddingBottom: '9px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '14px',
        transition: 'background-color 0.3s ease',
        width: '48%',
    },
    cancelButton: {
        display: 'block',
        backgroundColor: '#d3d3d3',
        color: 'black',
        fontWeight: 'bold',
        border: 'none',
        paddingTop: '12.5px',
        paddingBottom: '9px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '14px',
        transition: 'background-color 0.3s ease',
        width: '48%',
    },
    confirmButtonHover: {
        backgroundColor: '#A00000', 
    },
    cancelButtonHover: {
        backgroundColor: '#b3b3b3', 
    },
};
export default ModalConfirmation;