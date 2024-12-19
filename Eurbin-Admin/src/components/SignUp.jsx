import { useState } from 'react';
import axios from 'axios';
import { Outlet, Link, Navigate } from "react-router-dom";
import logo from '../Images/eurbinLoginIcon.png';

import Modal from './ModalSignUp'; 


function SignUp() {
    const API_URL = 'https://eurbin.vercel.app/admin/register';

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isAgreed, setIsAgreed] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [hover, setHover] = useState(false);
    const [redirect, setRedirect] = useState(false);

 
    const [modalMessage, setModalMessage] = useState('');
    const [modalType, setModalType] = useState(''); // State to track the alert type
    const [isModalVisible, setIsModalVisible] = useState(false);


    const registerAdmin = async (event) => {
        event.preventDefault();

  
        if (!username || username.length < 4) {
            showAlert('Username must be at least 4 characters long');
            return;
        }

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showAlert('Please enter a valid email address');
            return;
        }


        if (!password || password.length < 6) {
            showAlert('Password must be at least 6 characters long');
            return;
        }

        if (password !== confirmPassword) {
            showAlert('Passwords do not match');
            return;
        }

        if (!isAgreed) {
            showAlert('You must agree to the Terms and Conditions');
            return;
        }

        const rawInput = { username, email, password };

        console.log('Register Admin Payload:', rawInput);

        try {
            const response = await axios.post(API_URL, rawInput);

            if (response.status === 201) {
                clearInput();
                showAlert(
                    'Admin registered successfully! Please check your email to verify your account.',
                    () => setRedirect(true) // Redirect to login after closing modal
                );
            } else {
                showAlert('Failed to register admin');
            }
        } catch (err) {
            console.error('Error registering admin:', err.response ? err.response.data : err.message);
            showAlert(`Error: ${err.response ? err.response.data.message : 'An error occurred while registering the admin'}`);
        }
    };

    const clearInput = () => {
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    };

    const showAlert = (message, callback) => {
        const type = message.toLowerCase().includes("success") ? 'success' : 'error'; // Set type based on message
    
        setModalMessage(message);
        setModalType(type); // Save the type in the state
        setIsModalVisible(true);
    
        if (type === 'success') {
            setTimeout(() => {
                setIsModalVisible(false);
                callback && callback(); // Only call callback after success
            }, 3000);
        } else {
            setTimeout(() => {
                setIsModalVisible(false); // Hide modal for non-success messages after a delay
            }, 3000);
        }
    };
    
    

    if (redirect) {
        return <Navigate to="/Login" />;
    }


    return (
        <>
            <Modal 
    show={isModalVisible} 
    message={modalMessage} 
    type={modalType} 
    onClose={() => setIsModalVisible(false)} 
/>

<style>{responsiveStyles}</style>
            <div style={styles.container}>
                <div style={styles.formBox}>
                    <img src={logo} alt="Logo" style={{ width: '100px', height: '130px', marginTop: '-20px' }} />
                    <h1 style={styles.header}>Admin Sign Up</h1>
                    <form onSubmit={registerAdmin}>
                        <div style={styles.inputContainer}>
                            <label
                                htmlFor="username"
                                style={{ ...styles.label, color: username ? '#800000' : '#2B0100' }}
                            >
                                Username
                            </label>
                            <input
                                id="username"
                                style={username ? { ...styles.input, ...styles.inputActiveStyle } : styles.input}
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div style={styles.inputContainer}>
                            <label
                                htmlFor="email"
                                style={{ ...styles.label, color: email ? '#800000' : '#2B0100' }}
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                style={email ? { ...styles.input, ...styles.inputActiveStyle } : styles.input}
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div style={styles.inputContainer}>
                            <label
                                htmlFor="password"
                                style={{ ...styles.label, color: password ? '#800000' : '#2B0100' }}
                            >
                                Password
                            </label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    id="password"
                                    style={password ? { ...styles.input, ...styles.inputActiveStyle } : styles.input}
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={styles.showPasswordButton}
                                >
                                    <i className={`fa ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`} />
                                </button>
                            </div>
                        </div>
                        <div style={styles.inputContainer}>
                            <label
                                htmlFor="confirmPassword"
                                style={{ ...styles.label, color: confirmPassword ? '#800000' : '#2B0100' }}
                            >
                                Confirm Password
                            </label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    id="confirmPassword"
                                    style={confirmPassword ? { ...styles.input, ...styles.inputActiveStyle } : styles.input}
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    style={styles.showConfirmPasswordButton}
                                >
                                    <i className={`fa ${showConfirmPassword ? 'fa-eye' : 'fa-eye-slash'}`} />
                                </button>
                            </div>
                        </div>
                        <div style={styles.checkboxContainer}>
                            <label style={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    check={isAgreed}
                                    onChange={(e) => setIsAgreed(e.target.checked)}
                                    style={styles.checkbox}
                                />
                                I agree to 
                                <Link to="/Login" style={{ color: '#800000', marginLeft: '2%', marginRight: '2%', textDecoration: 'none' }}>
                                    Terms and Conditions.
                                </Link>
                            </label>
                        </div>
                        <button
                            type="submit"
                            style={hover ? { ...styles.signUpBtn, ...styles.signUpBtnHover } : styles.signUpBtn}
                            onMouseEnter={() => setHover(true)}
                            onMouseLeave={() => setHover(false)}
                            disabled={!isAgreed}
                        >
                            Sign Up
                        </button>
                        <p style={styles.signUp}>
                            Already have an account?  
                            <Link to="/Login" style={{ color: '#800000', paddingLeft: '1%', textDecoration: 'none' }}>
                                Log in
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
        padding: '10px', // Add padding for smaller screens
    },
    formBox: {
        padding: '20px',
        borderRadius: '18px',
        boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)',
        backgroundColor: 'white',
        width: '90%', // Default to a smaller percentage for mobile
        maxWidth: '400px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    header: {
        color: '#800000',
        fontFamily: 'Poppins, sans-serif',
        fontSize: '24px',
        marginBottom: '10px',
        marginTop: '-10px',
        fontWeight: '700',
        textAlign: 'center',
    },
    inputContainer: {
        width: '100%',
        marginBottom: '15px',
    },
    label: {
        fontSize: '14px',
        fontWeight: '600',
        fontFamily: 'Poppins, sans-serif',
        marginBottom: '5px',
        display: 'block',
    },
    input: {
        width: '100%', // Adjust width to fit container
        padding: '12px',
        borderRadius: '8px',
        border: '1px solid #ddd',
        outline: 'none',
        fontSize: '14px',
        fontFamily: 'Poppins, sans-serif',
        boxSizing: 'border-box',
    },
    inputActiveStyle: {
        border: '1px solid #800000',
        boxShadow: '0 0 5px rgba(128, 0, 0, 0.5)',
    },
    showPasswordButton: {
        position: 'absolute',
        right: '10px',
        top: '50%',
        transform: 'translateY(-50%)',
        background: 'none',
        border: 'none',
        color: '#800000',
        cursor: 'pointer',
        fontSize: '15px',
    },
    showConfirmPasswordButton: {
        position: 'absolute',
        right: '10px',
        top: '50%',
        transform: 'translateY(-50%)',
        background: 'none',
        border: 'none',
        color: '#800000',
        cursor: 'pointer',
        fontSize: '15px',
    },
    signUpBtn: {
        display: 'block',
        backgroundColor: '#800000',
        color: 'white',
        padding: '12px',
        width: '100%',
        borderRadius: '8px',
        fontWeight: '600',
        fontFamily: 'Poppins, sans-serif',
        fontSize: '14px',
        cursor: 'pointer',
        border: 'none',
        marginTop: '10px',
        transition: 'background-color 0.3s ease',
    },
    checkboxContainer: {
        marginBottom: '20px',
    },
    checkboxLabel: {
        fontSize: '14px',
        fontFamily: 'Poppins, sans-serif',
        textAlign: 'left',
        display: 'flex',
    },
    checkbox: {
        marginRight: '5px',
    },
    signUpBtnHover: {
        backgroundColor: '#A00000',
    },
    signUp: {
        fontSize: '14px',
        fontFamily: 'Poppins, sans-serif',
        marginTop: '15px',
        textAlign: 'center',
    },
};

// Add media queries
const responsiveStyles = `
    @media (min-width: 768px) {
        .formBox {
            width: 50%; /* Wider form on tablets */
        }
    }
    @media (min-width: 1024px) {
        .formBox {
            width: 30%; /* Compact form on desktops */
        }
    }
`;

export default SignUp;