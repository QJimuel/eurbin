import React, { useEffect, useState, useRef } from 'react';

const Modal = ({ isOpen, onClose, onSubmit, formData, onChange, onImageChange, modalTitle }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleImageChange = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
        const file = files[0];
        console.log('Image selected:', file.name);
        setSelectedImage(URL.createObjectURL(file)); // Preview the selected image
        onImageChange(file); // Pass the file to the parent
    }
  };

  const handlePhotoboxClick = () => {
      if (fileInputRef.current) {
          fileInputRef.current.click();
      }
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Submitting form with data:', formData);
      onSubmit(); // Call the parent's onSubmit function
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
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleImageChange}
              />

              <form onSubmit={handleSubmit}>
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
                      <option value="School Supplies">School Supplies</option>
                      <option value="Accesories">Accesories</option>
                      <option value="Consumable">Consumable</option>
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
