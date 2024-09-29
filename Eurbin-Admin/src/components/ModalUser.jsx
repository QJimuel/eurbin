import React from 'react';
import axios from 'axios';

function ModalUser({ isOpen, onClose, user , button}) {
    if (!isOpen || !user) return null;

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

    return (
        <div style={modalOverlayStyle}>
            <div style={modalContentStyle}>
                <h2 style={modalHeaderStyle}>User Details</h2>
             
                <div style={formGroupStyle}>
                    <strong>User ID:</strong> {user.userId}
                </div>
                <div style={formGroupStyle}>
                    <strong>User Name:</strong> {user.userName}
                </div>  
                <div style={formGroupStyle}>
                    <strong>Email:</strong> {user.email}
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
                    <strong>Smart Points:</strong> {user.smartPoints}
                </div>
                <div style={formGroupStyle}>
                    <strong>Plastic Bottles:</strong> {user.plasticBottle}
                </div>
                <div style={formGroupStyle}>
                    <strong>CO2:</strong> {user.co2}
                </div>
                <div style={formGroupStyle}>
                    <strong>Accumulated SP:</strong> {user.accumulatedSP}
                </div>
                <div style={formGroupStyle}>
                    <strong>Rank:</strong> {user.rank}
                </div>
                <div style={formGroupStyle}>
                    <strong>Creation Date:</strong> {formatDate(user.creationDate)}
                </div>

                <div style={modalButtonsStyle}>
                    <button onClick={onClose} style={closeButtonStyle}>Close</button>
                    <button onClick={handleDeactivate} style={closeButtonStyle}>{ button }</button>
                </div>
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
    padding: '25px 35px',
    borderRadius: '10px',
    width: '450px',
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    flexDirection: 'column',
};

const modalHeaderStyle = {
    marginBottom: '20px',
    color: '#333',
    fontWeight: 'bold',
    borderBottom: '2px solid #800000',
    paddingBottom: '10px',
};

const formGroupStyle = {
    marginBottom: '15px',
    fontSize: '16px',
    lineHeight: '1.5',
};

const modalButtonsStyle = {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'flex-end',
};

const closeButtonStyle = {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    backgroundColor: '#800000',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '14px',
    transition: 'background-color 0.3s ease',
};

closeButtonStyle[':hover'] = {
    backgroundColor: '#660000',
};

export default ModalUser;