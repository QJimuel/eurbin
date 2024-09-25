import React from 'react';

function ModalAddContent({ isOpen, onClose, onSubmit, subject, setSubject, description, setDescription }) {
    if (!isOpen) return null; 

    return (
        <div style={modalOverlayStyle}>
            <div style={modalContentStyle}>
                <h2>Add Content</h2>
                <div style={formGroupStyle}>
                    <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Subject"
                        style={inputStyle}
                    />
                </div>
                <div style={formGroupStyle}>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description"
                        style={{ ...inputStyle, height: '100px', resize: 'none' }} 
                    />
                </div>
                <div style={modalButtonsStyle}>
                    <button onClick={onSubmit} style={submitButtonStyle}>Submit</button>
                    <button onClick={onClose} style={cancelButtonStyle}>Close</button>
                </div>
            </div>
        </div>
    );
}

const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
};

const modalContentStyle = {
    background: 'white',
    padding: '20px 30px', 
    borderRadius: '8px',
    width: '300px', 
    maxHeight: '90vh',
    overflowY: 'auto', 
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
};

const formGroupStyle = {
    marginBottom: '15px',
};

const inputStyle = {
    marginBottom: '10px',
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    width: '100%', 
    boxSizing: 'border-box', 
};

const modalButtonsStyle = {
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'flex-end', 
};

const submitButtonStyle = {
    padding: '10px 15px', 
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: 'white',
    marginRight: '10px', 
};

const cancelButtonStyle = {
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    backgroundColor: '#ccc',
};

export default ModalAddContent;