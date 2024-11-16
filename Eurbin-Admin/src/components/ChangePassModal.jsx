import React, { useState } from 'react';
import padlock from '../Images/padlock.png';
import axios from 'axios';

const ChangePassModal = ({ isOpen, onClose }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    try {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage

        // Check if token exists
        if (!token) {
            setMessage('No token found. Please log in again.');
            return;
        }

        // Send PATCH request to change password
        const response = await axios.patch(
            'https://eurbin.vercel.app/admin/change-password',
            { oldPassword, newPassword },
            { headers: { Authorization: `Bearer ${token}` } }
        );

        setMessage(response.data.message); // Set the success message from response
    
    } catch (error) {
        console.error('Error changing password:', error);
        setMessage('Error changing password. Please try again.');
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
