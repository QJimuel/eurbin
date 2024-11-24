import React, { useState } from 'react';
import padlock from '../Images/padlock.png';
import padlockIcon from '../Images/padlockIcon.png';
import axios from 'axios';
import ModalConfirmation from './ModalConfirmation';

const ChangePassModal = ({ isOpen, onClose }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [hoverButton, setHoverModalButton] = useState(false);

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(
        'https://eurbin.vercel.app/admin/change-password',
        { oldPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Show success alert
      alert(response.data.message);

      // Clear inputs after successful change
      setOldPassword('');
      setNewPassword('');

      setIsConfirmationModalOpen(false); // Close the confirmation modal
    } catch (error) {
      console.error('Error changing password:', error);
      alert('Error changing password');
    }
  };

  const handleConfirmChangePassword = (e) => {
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
        <div className="epForm">
          <img src={padlock} alt="Padlock" className='modalIcon'/>
          <h2 className="epTitle">Change Password</h2>
          
          <div className="inputContainer">
            <span role="img" aria-label="user" className="inputIcon">
              <img src={padlockIcon} alt="lock" />
            </span>
            <input 
              type={showOldPassword ? "text" : "password"} 
              placeholder="Enter Old Password" 
              value={oldPassword} 
              onChange={(e) => setOldPassword(e.target.value)} 
              className="epInput"
            />
            <button
              type="button"
              onClick={() => setShowOldPassword(!showOldPassword)}
              className="showPasswordBtn"
            >
              <i className={`fa ${showOldPassword ? 'fa-eye-slash' : 'fa-eye'}`} />
            </button>
          </div>

          <div className="inputContainer">
            <span role="img" aria-label="user" className="inputIcon">
              <img src={padlockIcon} alt="lock" />
            </span>
            <input 
              type={showNewPassword ? "text" : "password"} 
              placeholder="Enter New Password" 
              value={newPassword} 
              onChange={(e) => setNewPassword(e.target.value)} 
              className="epInput"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="showPasswordBtnN"
            >
              <i className={`fa ${showNewPassword ? 'fa-eye-slash' : 'fa-eye'}`} />
            </button>
          </div>

          <button
            type="submit"
            onClick={handleConfirmChangePassword}
            className={hoverButton ? "modalButton modalButtonHover" : "modalButton"}
            onMouseEnter={() => setHoverModalButton(true)}
            onMouseLeave={() => setHoverModalButton(false)}
          >
            Change Password
          </button>
        </div>
      </div>

      {/* Use ModalConfirmation */}
      <ModalConfirmation
        isOpen={isConfirmationModalOpen}
        message="Are you sure you want to change your password?"
        onConfirm={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default ChangePassModal;