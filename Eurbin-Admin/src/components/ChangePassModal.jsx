import React, { useState } from 'react';
import padlock from '../Images/padlock.png';
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
    <div className="cpModal">
      <div className="cpModalContent">
        <button onClick={onClose} className="cpCloseBtn">&times;</button>
        <div className="cpForm">
            <img src={padlock} alt="Padlock" />
            <h2 className="cpTitle">Change Password</h2>
            <div className="cpInputContainer">
                <input 
                    type="password" 
                    placeholder="Enter Old Password" 
                    value={oldPassword} 
                    onChange={(e) => setOldPassword(e.target.value)} 
                    className="cpInput"
                />
            </div>
            <div className="cpInputContainer">
                <input 
                    type="password" 
                    placeholder="Enter New Password" 
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)} 
                    className="cpInput"
                />
            </div>
            <button className='cpBtn' onClick={handleSubmit}>Change Password</button>
        </div>
        {message && <p className="cpMessage">{message}</p>}
      </div>
    </div>
  );
};

export default ChangePassModal;
