import React, { useEffect, useState, useRef } from 'react';

const Modal = ({ isOpen, onClose, onSubmit, formData, onChange, modalTitle }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef(null); 

    if (!isOpen) return null;

    const handleImageChange = (event) => {
      const files = event.target.files; // Capture the files directly
      console.log("Files selected:", files); // Debugging log
  
      if (files && files.length > 0) { // Check if files are available
          const file = files[0];
          setSelectedImage(URL.createObjectURL(file));
          console.log("Selected file:", file); // Log the selected file
          onChange({ target: { name: 'image', value: file } }); // Send file to parent
      } else {
          console.warn("No file selected"); // Debugging log
      }
  };
  
    const handlePhotoboxClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); // Trigger the click on the hidden input
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{modalTitle}</h2>

                <div className="photobox" onClick={handlePhotoboxClick}>
                    {selectedImage ? (
                        <img src={selectedImage} alt="Selected" className="selected-image" />
                    ) : (
                        <p className="phototxt">Add Image</p>
                    )}
                </div>
                <input
                    type="file"
                    accept="image/*" // Ensure only images can be selected
                    ref={fileInputRef} // Hidden input element
                    style={{ display: 'none' }} // Hides the input from view
                    onChange={handleImageChange} // Handles image selection
                />

                <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
                    <input
                        placeholder='Reward Name'
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={onChange}
                    />
                    <select
                        name="category"
                        value={formData.category}
                        onChange={onChange}
                        className="custom-select"
                    >
                        <option value="" disabled>Select a category</option>
                        <option value="Category1">Category 1</option>
                        <option value="Category2">Category 2</option>
                        <option value="Category3">Category 3</option>
                        {/* Add more options as needed */}
                    </select>
                    <input
                        placeholder='Quantity'
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={onChange}
                    />
                    <input
                        placeholder='Price'
                        type="number"
                        step="0.01"
                        name="price"
                        value={formData.price}
                        onChange={onChange}
                    />
                    <div className="form-actions">
                        <button type="submit">Create</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;
