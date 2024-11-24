import React, { useState } from 'react';
import editIcon from '../Images/edit.png';
import name from '../Images/name.png';
import emailIcon from '../Images/email.png';
import axios from 'axios';
import ModalConfirmation from './ModalConfirmation';

const EditProfileModal = ({ isOpen, onClose }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [hoverButton, setHoverModalButton] = useState(false);

  if (!isOpen) return null;

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(
        'https://eurbin.vercel.app/admin/update-profile',
        { username: fullName, email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(response.data.message); 
      setFullName(''); 
      setEmail(''); 
      setIsConfirmationModalOpen(false); 
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile'); 
    }
  };

  const handleConfirmUpdate = (e) => {
    e.preventDefault();
    setIsConfirmationModalOpen(true); // Open the confirmation modal when the button is clicked
  };

  const handleCancel = () => {
    setIsConfirmationModalOpen(false); // Close the confirmation modal when cancel is clicked
  };

  return (
    <div className="epModal">
      <div className="epModalContent">
        <button onClick={onClose} className="epCloseBtn">&times;</button>
        <form onSubmit={handleConfirmUpdate} className="epForm">
          <img src={editIcon} alt="Padlock" className="modalIcon" />
          <h2 className="cpTitle">Edit Profile</h2>
          <div className="inputContainer">
            <span role="img" aria-label="user" className="inputIcon">
              <img src={name} alt="Name" />
            </span>
            <input 
              type="text" 
              placeholder="Full Name" 
              value={fullName} 
              onChange={(e) => setFullName(e.target.value)} 
              className="epInput" 
            />
          </div>
          <div className="inputContainer">
            <span role="img" aria-label="email" className="inputIcon">
              <img src={emailIcon} alt="Email" />
            </span>
            <input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="epInput" 
            />
          </div>
          <button
            type='submit'
            onClick={handleConfirmUpdate}
            className={hoverButton ? "modalButton modalButtonHover" : "modalButton"}
            onMouseEnter={() => setHoverModalButton(true)}
            onMouseLeave={() => setHoverModalButton(false)}
          >
            Update
          </button>
        </form>

        {/* Use ModalConfirmation */}
        <ModalConfirmation
          isOpen={isConfirmationModalOpen}
          message="Are you sure you want to update your profile?"
          onConfirm={handleUpdate}
          onCancel={handleCancel} 
        />
      </div>
    </div>
  );
};

export default EditProfileModal;