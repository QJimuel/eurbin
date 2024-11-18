import React, { useState } from 'react';
import padlock from '../Images/padlock.png';
import padlockIcon from '../Images/padlockIcon.png';
import axios from 'axios';

const ChangePassModal = ({ isOpen, onClose }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const token = localStorage.getItem('token');
        const response = await axios.patch(
            'https://eurbin.vercel.app/admin/change-password',
            { oldPassword, newPassword },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessage(response.data.message);
    
    } catch (error) {
        console.error('Error changing password:', error);
        setMessage('Error changing password');
    }
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
                    type="password" 
                    placeholder="Enter Old Password" 
                    value={oldPassword} 
                    onChange={(e) => setOldPassword(e.target.value)} 
                    className="epInput"
                />
            </div>
            <div className="inputContainer">
            <span role="img" aria-label="user" className="inputIcon">
                <img src={padlockIcon} alt="lock" />
              </span>
                <input 
                    type="password" 
                    placeholder="Enter New Password" 
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)} 
                    className="epInput"
                />
            </div>
            <button className='epUpdateBtn' onClick={handleSubmit}>Change Password</button>
        </div>
        {message && <p className="cpMessage">{message}</p>}
      </div>
    </div>
  );
};

export default ChangePassModal;