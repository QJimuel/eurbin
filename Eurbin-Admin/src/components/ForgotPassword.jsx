import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = 'https://eurbin.vercel.app/admin/forgot-password';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const response = await axios.post(API_URL, { email });
            setMessage(response.data.message);
            setShowModal(true); // Show the modal after success
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred. Please try again.');
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
        navigate('/Login'); // Navigate to login after closing the modal
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Forgot Password</h1>
            <form onSubmit={handleSubmit} style={styles.form}>
                <label htmlFor="email" style={styles.label}>Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                    placeholder="Enter your email"
                    required
                />
                <button type="submit" style={styles.button}>Reset Password</button>
            </form>
            {message && <p style={styles.success}>{message}</p>}
            {error && <p style={styles.error}>{error}</p>}

            {/* Modal */}
            {showModal && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalContent}>
                        <h2 style={styles.modalHeader}>Success</h2>
                        <p style={styles.modalMessage}>{message}</p>
                        <button onClick={handleModalClose} style={styles.modalButton}>Go to Login</button>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '400px',
        margin: '50px auto',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif',
    },
    header: {
        textAlign: 'center',
        marginBottom: '20px',
        color: '#333',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        marginBottom: '8px',
        fontWeight: 'bold',
    },
    input: {
        padding: '10px',
        marginBottom: '20px',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    button: {
        padding: '10px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
    },
    success: {
        marginTop: '20px',
        color: 'green',
        textAlign: 'center',
    },
    error: {
        marginTop: '20px',
        color: 'red',
        textAlign: 'center',
    },
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    modalContent: {
        background: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        maxWidth: '300px',
        width: '100%',
    },
    modalHeader: {
        marginBottom: '10px',
        fontSize: '20px',
        fontWeight: 'bold',
    },
    modalMessage: {
        marginBottom: '20px',
    },
    modalButton: {
        padding: '10px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
    },
};

export default ForgotPassword;
