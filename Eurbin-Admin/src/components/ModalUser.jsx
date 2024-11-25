import React, { useState } from 'react';
import axios from 'axios';
import ModalConfirmation from './ModalConfirmation';

function ModalUser({ isOpen, onClose, user , button}) {
    if (!isOpen || !user) return null;
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const openConfirmationModal = () => {
        setIsConfirmationModalOpen(true); // Open confirmation modal
    };

    const [hoverClose, setHoverClose] = useState(false);
    const [hoverAction, setHoverAction] = useState(false);

    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
        return date.toLocaleString('en-US', options);
    };

    const handleDeactivate = async () => {
        try {
            // Make the API request to deactivate the user
            const response = await axios.delete(`https://eurbin.vercel.app/user/${user._id}`);

            if (response.status === 200) {
                alert('User deactivated successfully');
                onClose();
  // Refresh the user list after deactivation
            } else {
                console.error('Error deactivating user:', response);
                alert('Error deactivating user');
            }
        } catch (err) {
            console.error('Error during deactivation:', err);
            alert('An error occurred during deactivation');
        }
    };

    
    const handleActivate = async () => {
        try {
            // Make the API request to deactivate the user
            const response = await axios.delete(`https://eurbin.vercel.app/user/${user._id}`);

            if (response.status === 200) {
                alert('User deactivated successfully');
                onClose();
  // Refresh the user list after deactivation
            } else {
                console.error('Error deactivating user:', response);
                alert('Error deactivating user');
            }
        } catch (err) {
            console.error('Error during deactivation:', err);
            alert('An error occurred during deactivation');
        }
    };

    return (
        <div style={modalOverlayStyle}>
            <div style={modalContentStyle}>
                <div style={headerStyle}>
                    {/* Profile Section with Maroon Background */}
                    <div style={profileContainerStyle}>
                        <div style={profilePictureStyle}></div>
                        <div style={userInfoStyle}>
                            <h2 style={userNameStyle}>{user.userName}</h2>
                            <p style={userEmailStyle}>{user.email}</p>
                        </div>
                    </div>
                </div>
                
                <div style={infoHeaderStyle}>Student Information</div>

                <div style={infoContainerStyle}>
                    <div style={infoColumnStyle}>
                        <div style={formGroupStyle}>
                            <strong>User ID:</strong> {user.userId}
                        </div>
                        <div style={formGroupStyle}>
                            <strong>Department:</strong> {user.department}
                        </div>
                        <div style={formGroupStyle}>
                            <strong>Program:</strong> {user.program}
                        </div>
                        <div style={formGroupStyle}>
                            <strong>Year Level:</strong> {user.yearLevel}
                        </div>
                        <div style={formGroupStyle}>
                            <strong>Creation Date:</strong> {formatDate(user.creationDate)}
                        </div>
                    </div>

                    <div style={infoColumnStyle}>
                        <div style={formGroupStyle}>
                            <strong>Smart Points:</strong> {user.smartPoints} SP
                        </div>
                        <div style={formGroupStyle}>
                            <strong>Plastic Bottles:</strong> {user.plasticBottle}
                        </div>
                        <div style={formGroupStyle}>
                            <strong>CO2:</strong> {user.co2}
                        </div>
                        <div style={formGroupStyle}>
                            <strong>Accumulated Smart Points:</strong> {user.accumulatedSP} SP
                        </div>
                        <div style={formGroupStyle}>
                            <strong>Rank:</strong> {user.rank === '0' ? "Unranked" : user.rank}
                        </div>
                    </div>
                </div>

                {/* Line separating info and buttons */}
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
                        onClick={openConfirmationModal}
                        style={hoverAction ? { ...deactivateButtonStyle, ...deactivateButtonHoverStyle } : deactivateButtonStyle}
                        onMouseEnter={() => setHoverAction(true)}
                        onMouseLeave={() => setHoverAction(false)}
                    >
                        {button}
                    </button>
                </div>

                {/* ModalConfirmation for Activation/Deactivation */}
                <ModalConfirmation
                    isOpen={isConfirmationModalOpen}
                    message={`Are you sure you want to ${button.toLowerCase()} this account?`}
                    onConfirm={button === 'Activate' ? handleActivate : handleDeactivate}
                    onCancel={() => setIsConfirmationModalOpen(false)}
                />
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
    width: '600px',
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    flexDirection: 'column',
};

const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
    backgroundColor: '#800000', // Maroon background
    borderRadius: '10px',
};

const profileContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '15px',
    color: 'white',
};

const profilePictureStyle = {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    backgroundColor: '#ccc',
    marginRight: '20px',
};

const userInfoStyle = {
    display: 'flex',
    flexDirection: 'column',
};

const userNameStyle = {
    fontSize: '20px',
    fontWeight: 'bold', // Bolder username
    color: 'white',
};

const userEmailStyle = {
    fontSize: '14px',
    color: '#f1f1f1',
};

const formGroupStyle = {
    marginBottom: '15px',
    fontSize: '16px',
    lineHeight: '1.5',
};

const infoContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between', 
    gap: '30px', 
    paddingLeft: '5px',
};

const infoColumnStyle = {
    flex: 1,
    paddingRight: '15px',
};

const infoHeaderStyle = {
    fontWeight: 'bold',
    fontSize: '20px',
    marginBottom: '15px',
    color: '#333',
    display: 'flex',
    justifyContent: 'center',
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
    width: '48%', // Adjusted width to align with the info columns
};

const deactivateButtonStyle = {
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
    width: '48%', // Adjusted width to align with the info columns
};

// Hover effects for the buttons
const closeButtonHoverStyle = {
    backgroundColor: '#b3b3b3',
};

const deactivateButtonHoverStyle = {
    backgroundColor: '#A00000',
};

export default ModalUser;