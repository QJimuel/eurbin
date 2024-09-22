import React, { useState } from 'react';
import camera from '../Images/camera.png';
import phone from '../Images/phone.png';
import name from '../Images/name.png';
import emailIcon from '../Images/email.png';
import axios from 'axios';

const EditProfileModal = ({ isOpen, onClose }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const token = localStorage.getItem('token');
        console.log('Token:', token); // Add this line for debugging
        console.log('Data:', { username: fullName, email }); // Add this line for debugging

        const response = await axios.patch(
            'https://eurbin.vercel.app/admin/update-profile',
            { username: fullName, email },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessage(response.data.message);

    } catch (error) {
        console.error('Error updating profile:', error); // Add this line for debugging
        setMessage('Error updating profile');
    }
};
  return (
    <div className="epModal">
      <div className="epModalContent">
        <button onClick={onClose} className="epCloseBtn">&times;</button>

        <div className="epImageContainer">
          <div className="epImage">
            <div className="epImageInner">
              <div className="epCameraContainer">
                <span role="img" aria-label="camera" className="cameraIcon">
                  <img src={camera} alt="Camera" />
                </span>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="epForm">
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
          <button type="submit" className='epUpdateBtn'>Update</button>
        </form>
        
        {message && <p className="epMessage">{message}</p>}
      </div>
    </div>
  );
};

export default EditProfileModal;
