import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import ModalSignUp from './ModalSignUp'; 
import logo from '../Images/eurbinLoginIcon.png';

const API_URL = 'https://eurbin.vercel.app/admin/forgot-password';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false); 
    const [hover, setHover] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const response = await axios.post(API_URL, { email });
            setMessage(response.data.message);
            setShowModal(true);
        } catch (err) {
           
            if (err.response?.data?.message === 'Admin not found') {
                setError('No admin found with this email address.');
            } else {
                setError(err.response?.data?.message || 'An error occurred. Please try again.');
            }
            setShowErrorModal(true); 
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
        navigate('/Login'); 
    };

    const handleErrorModalClose = () => {
        setShowErrorModal(false); 
    };

    return (
        <>
            {/* Success Modal */}
            <ModalSignUp
                show={showModal}
                message={message}
                type="success"
                onClose={handleModalClose}
            />

            {/* Error Modal */}
            <ModalSignUp
                show={showErrorModal}
                message={error}
                type="error"
                onClose={handleErrorModalClose}
            />

            <div style={styles.container}>
                <div style={styles.loginBox}>
                <img src={logo} alt="Logo" style={{ width: '100px', height: '130px', marginTop: '-20px' }} />
                    <h1 style={styles.header}>Forgot Password</h1>
                    <form>
                        <div style={styles.inputContainer}>
                            <label
                                htmlFor="email"
                                style={{
                                    ...styles.label,
                                    color: email ? '#800000' : '#2B0100',
                                }}
                            >
                                Email Address
                            </label>
                            <input
                                id="email"
                                style={email ? { ...styles.input, ...styles.inputActiveStyle } : styles.input}
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                            />
                        </div>
                        {message && <p style={{ color: 'green', fontSize: '14px' }}>{message}</p>}
                        {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
                        <button
                            type="button"
                            style={hover ? { ...styles.loginBtn, ...styles.loginBtnHover } : styles.loginBtn}
                            onMouseEnter={() => setHover(true)}
                            onMouseLeave={() => setHover(false)}
                            onClick={handleSubmit}
                        >
                            Reset Password
                        </button>
                        <p style={styles.signUp}>
                            Back to{' '}
                            <Link
                                to="/Login"
                                style={{
                                    color: '#800000',
                                    paddingLeft: '1%',
                                    textDecoration: 'none',
                                }}
                            >
                                Login
                            </Link>
                        </p>
                    </form>
                </div>

                            <div style={{ width: '100%', height: '70%', position: 'absolute', bottom: '0', zIndex: -1 }}>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{ stopColor: 'rgba(239, 64, 64, 1)', stopOpacity: 1 }} />
        <stop offset="200%" style={{ stopColor: 'rgba(255, 255, 255, 255)', stopOpacity: .5 }} />
      </linearGradient>
    </defs>
    <path fill="url(#grad1)" d="M0,288L48,272C96,256,192,224,288,192C384,160,480,128,576,133.3C672,139,768,181,864,181.3C960,181,1056,139,1152,112C1248,85,1344,75,1392,69.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
  </svg>
</div>
            </div>
        </>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        //background: 'linear-gradient(to bottom right, #800000, #f0f0f0)',
    },
    loginBox: {
        padding: '30px',
        borderRadius: '18px',
        boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)',
        backgroundColor: 'white',
        width: '20%',
        maxWidth: '400px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    header: {
        color: '#800000',
        fontFamily: 'Poppins, sans-serif',
        fontSize: '25px',
        marginBottom: '10px',
        marginTop: '-10px',
        fontWeight: '700',
    },
    inputContainer: {
        width: '100%',
        marginBottom: '15px',
    },
    label: {
        fontSize: '12px',
        fontWeight: '600',
        fontFamily: 'Poppins, sans-serif',
        marginBottom: '5px',
        display: 'block',
    },
    input: {
        width: '18vw',
        padding: '12px',
        paddingLeft: '12px',
        borderRadius: '8px',
        border: '1px solid #ddd',
        outline: 'none',
        fontSize: '12px',
        fontFamily: 'Poppins, sans-serif',
        boxSizing: 'border-box',
    },
    inputActiveStyle: {
        border: '1px solid #800000',
        boxShadow: '0 0 5px rgba(128, 0, 0, 0.5)',
    },
    loginBtnHover: {
        backgroundColor: '#A00000',
    },
    loginBtn: {
        display: 'block',
        backgroundColor: '#800000',
        color: 'white',
        padding: '12px',
        width: '99%',
        borderRadius: '8px',
        fontWeight: '600',
        fontFamily: 'Poppins, sans-serif',
        fontSize: '14px',
        cursor: 'pointer',
        border: 'none',
        marginLeft: '0.5%',
    },
    signUp: {
        marginTop: '10px',
        fontSize: '12px',
        fontFamily: 'Poppins, sans-serif',
        textAlign: 'center',
        width: '100%',
    },
};

export default ForgotPassword;