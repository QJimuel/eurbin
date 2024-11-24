import React, { useState } from 'react';

function ModalAddContent({ isOpen, onClose, onSubmit, subject, setSubject, description, setDescription }) {
    const [hoverClose, setHoverClose] = useState(false);
    const [hoverSubmit, setHoverSubmit] = useState(false);

    if (!isOpen) return null;

    return (
        <div style={modalOverlayStyle}>
            <div style={modalContentStyle}>
                <div style={headerStyle}>
                    <h2 style={headerTitleStyle}>Add Content</h2>
                </div>

                <div style={infoContainerStyle}>
                    <div style={infoColumnStyle}>
                        <div style={formGroupStyle}>
                            <strong>Subject:</strong>
                            <input
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                placeholder="Enter Subject"
                                style={inputStyle}
                            />
                        </div>
                        <div style={formGroupStyle}>
                            <strong>Description:</strong>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Enter Description"
                                style={{ ...inputStyle, height: '100px', resize: 'none' }}
                            />
                        </div>
                    </div>
                </div>

                <div style={lineStyle}></div>

                <div style={modalButtonsStyle}>
                    <button
                        onClick={onClose}
                        style={hoverClose ? { ...closeButtonStyle, ...closeButtonHoverStyle } : closeButtonStyle}
                        onMouseEnter={() => setHoverClose(true)}
                        onMouseLeave={() => setHoverClose(false)}
                    >
                        Close
                    </button>
                    <button
                        onClick={onSubmit}
                        style={hoverSubmit ? { ...submitButtonStyle, ...submitButtonHoverStyle } : submitButtonStyle}
                        onMouseEnter={() => setHoverSubmit(true)}
                        onMouseLeave={() => setHoverSubmit(false)}
                    >
                        Submit
                    </button>
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
    padding: '25px 25px',
    borderRadius: '15px',
    width: '400px',
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    flexDirection: 'column',
};

const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center', 
    marginBottom: '20px',
    backgroundColor: '#800000', 
    borderRadius: '10px',
    paddingTop: '9px',
};


const headerTitleStyle = {
    fontSize: '24px',
    color: 'white',
    fontWeight: 'bold',
    margin: 0,
};


const infoContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '30px',
    paddingLeft: '5px',
    marginBottom: '-20px',
};

const infoColumnStyle = {
    flex: 1,
    paddingRight: '15px',
};

const formGroupStyle = {
    marginBottom: '10px',
    fontSize: '16px',
    lineHeight: '1.5',
};

const inputStyle = {
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    width: '100%',
    boxSizing: 'border-box',
};

const lineStyle = {
    borderBottom: '1px solid #ddd',
    margin: '20px 0',
};

const modalButtonsStyle = {
    display: 'flex',
    justifyContent: 'space-between',
};

const closeButtonStyle = {
    display: 'block',
    paddingTop: '12.8px',
    paddingBottom: '9px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    backgroundColor: '#d3d3d3',
    color: 'black',
    fontWeight: 'bold',
    fontSize: '14px',
    transition: 'background-color 0.3s ease',
    width: '48%',
};

const submitButtonStyle = {
    display: 'block',
    paddingTop: '12.8px',
    paddingBottom: '9px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    backgroundColor: '#800000',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '14px',
    width: '48%',
};

// Hover effects for the buttons
const closeButtonHoverStyle = {
    backgroundColor: '#b3b3b3',
};

const submitButtonHoverStyle = {
    backgroundColor: '#A00000',
};

export default ModalAddContent;