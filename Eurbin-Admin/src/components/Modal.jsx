import { display, padding, width } from '@mui/system';
import React, { useState, useRef,useEffect } from 'react';

const Modal = ({ isOpen, onClose, onSubmit, formData, onChange, onImageChange, modalTitle }) => {
    const [hoverClose, setHoverClose] = useState(false);
    const [hoverSubmit, setHoverSubmit] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef(null);

    // Initialize the selectedImage when the modal opens
    useEffect(() => {
        if (isOpen && formData.selectedImage) {
            setSelectedImage(formData.selectedImage);
        }
    }, [isOpen, formData.selectedImage]);

    if (!isOpen) return null;

    const handleImageChange = (event) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl); // Update preview
            onImageChange(file); // Pass the file to the parent
        }
    };

    const handlePhotoboxClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleSubmit = (e) => {
        
        onSubmit(); // Call the parent's onSubmit function
    };

    const validateForm = () => {
        const errors = [];
        if (modalTitle !== "Edit Reward") {
            if (!selectedImage) errors.push("Image is required.");
            if (!formData.name) errors.push("Reward name is required.");
            if (!formData.category) errors.push("Category is required.");
        }
        if (!formData.quantity || formData.quantity <= 0) {
            errors.push("Quantity must be greater than zero.");
        }
        if (!formData.price || formData.price <= 0) {
            errors.push("Price must be greater than zero.");
        }
    
        if (errors.length) {
            alert(errors.join("\n")); // Replace with a better UI for errors if needed.
            return false;
        }
        return true;
    };
    

    

    return (
        <div style={modalOverlayStyle}>
    <div style={modalContentStyle}>
        <div style={headerStyle}>
            <h2 style={headerTitleStyle}>{modalTitle}</h2>
        </div>

        {modalTitle !== "Edit Reward" && (
            <>
                <div style={formGroupStyle}>
                    <strong>Image:</strong>
                    <div style={photoboxStyle} onClick={handlePhotoboxClick}>
                        {selectedImage ? (
                            <img src={selectedImage} alt="Selected" style={selectedImageStyle} />
                        ) : (
                            <p style={photoTextStyle}>Add Image</p>
                        )}
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleImageChange}
                    />
                    {!selectedImage && modalTitle !== "Edit Reward" && (
                        <p style={errorTextStyle}>Image is required.</p>
                    )}
                </div>

                <div style={formGroupStyle}>
                    <strong>Reward Name:</strong>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={onChange}
                        placeholder="Enter Reward Name"
                        style={inputStyle}
                    />
                    {!formData.name && modalTitle !== "Edit Reward" && (
                        <p style={errorTextStyle}>Reward name is required.</p>
                    )}
                </div>

                <div style={formGroupStyle}>
                    <strong>Category:</strong>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={onChange}
                        style={inputStyle}
                    >
                        <option value="" disabled>Select a category</option>
                        <option value="School Supplies">School Supplies</option>
                        <option value="Accessories">Accessories</option>
                        <option value="Consumable">Consumable</option>
                    </select>
                    {!formData.category && modalTitle !== "Edit Reward" && (
                        <p style={errorTextStyle}>Category is required.</p>
                    )}
                </div>
            </>
        )}

        <div style={formGroupStyle}>
            <strong>Quantity:</strong>
            <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={onChange}
                placeholder="Enter Quantity"
                style={inputStyle}
            />
            {(!formData.quantity || formData.quantity <= 0) && (
                <p style={errorTextStyle}>Quantity must be greater than zero.</p>
            )}
        </div>

        <div style={formGroupStyle}>
            <strong>Price:</strong>
            <input
                type="number"
                step="0.01"
                name="price"
                value={formData.price}
                onChange={onChange}
                placeholder="Enter Price"
                style={inputStyle}
            />
            {(!formData.price || formData.price <= 0) && (
                <p style={errorTextStyle}>Price must be greater than zero.</p>
            )}
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
                onClick={() => {
                    if (validateForm()) {
                        console.log("Form is valid, submitting...");
                        handleSubmit()
                    } else {
                        console.log("Form is invalid, not submitting.");
                    }
                }}
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
};

const errorTextStyle = {
    color: 'red',
    fontSize: '12px',
    marginTop: '5px',
};


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
    padding: '25px',
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
};

const formGroupStyle = {
    marginBottom: '10px',
    
};

const inputStyle = {
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    width: '100%',
    boxSizing: 'border-box',
};

const photoboxStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '38%',
    height: '100px',
    width: '100px',
    border: '2px dashed #ddd',
    borderRadius: '10px',
    cursor: 'pointer',
    marginBottom: '15px',
};

const selectedImageStyle = {
    maxWidth: '100%',
    maxHeight: '100%',
    borderRadius: '10px',
};

const photoTextStyle = {
    color: '#888',
    fontSize: '14px',
};

const lineStyle = {
    borderBottom: '1px solid #ddd',
    marginTop: '10px',
    margin: '20px 0',
};

const modalButtonsStyle = {
    display: 'flex',
    justifyContent: 'space-between',
};

const closeButtonStyle = {
    display: 'block',
    paddingTop: '12.5px',
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
    paddingTop: '12.5px',
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

const closeButtonHoverStyle = {
    backgroundColor: '#b3b3b3',
};

const submitButtonHoverStyle = {
    backgroundColor: '#A00000',
};

export default Modal;