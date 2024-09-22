import { useState } from 'react';
import axios from 'axios';
import { Outlet, Link , Navigate} from "react-router-dom";

function SignUp() {
    const API_URL = 'https://eurbin.vercel.app/admin/register'; // Adjust this to match your backend route if needed

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isAgreed, setIsAgreed] = useState(false);

    const registerAdmin = async () => {
        if (!username || !email || !password || !confirmPassword) {
            alert('All fields are required');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        const rawInput = {
            username: username,
            email: email,
            password: password,
        };

        console.log('Register Admin Payload:', rawInput);

        try {
            const response = await axios.post(API_URL, rawInput);

            if (response.status === 201) {
                clearInput();
                alert('Admin registered successfully');
            } else {
                alert('Failed to register admin');
            }
        } catch (err) {
            console.error('Error registering admin:', err.response ? err.response.data : err.message);
            alert(`Error: ${err.response ? err.response.data.message : 'An error occurred while registering the admin'}`);
        }
    };

    const clearInput = () => {
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    };

    return (
        <>
        <style>
            {`
            input::placeholder {
                color: #b3b3b3;
                font-family: 'Manjari';
                font-size: 80%;
            }
            `}
        </style>
        <div style={styles.container}>
            <div style={styles.redBox}>
                <div style={styles.loginBox}>
                    <h1 style={styles.header}>Admin Sign Up</h1>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <input
                                        style={styles.input}
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="Username"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input
                                        style={styles.input}
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input
                                        style={styles.input}
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Password"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input
                                        style={styles.input}
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Confirm Password"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td >
                                    <label style={styles.checkboxLabel}>
                                        <input 
                                            type="checkbox" 
                                            checked={isAgreed} 
                                            onChange={(e) => setIsAgreed(e.target.checked)} 
                                        />
                                        I agree to 
                                        <Link to="/Login" style={{ color: '#800000', marginLeft: '2%', marginRight: '2%' }}>
                                            Terms
                                        </Link>
                                        and 
                                        <Link to="/Login" style={{ color: '#800000', marginLeft: '2%' }}>
                                            Privacy Policies
                                        </Link>
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <button 
                                        style={styles.loginBtn} 
                                        onClick={registerAdmin} 
                                        disabled={!isAgreed} // Disable the button if not agreed
                                    >
                                        Sign Up
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p style={styles.signUp}>
                                        Already have an account?  
                                        <Link to="/Login" style={{ color: '#800000', paddingLeft: '1%'}}>
                                            Log in
                                        </Link>
                                    </p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
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
        backgroundColor: '#f0f0f0',
    },
    redBox: {
        backgroundColor: '#800000',
        width: '65vw',
        display: 'flex',
        justifyContent: 'end',
        borderRadius: '20px',
    },
    loginBox: {
        padding: '20px',
        borderRadius: '18px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        backgroundColor: 'white',
        width: '40vw',
        height: '60vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    header: {
        color: '#2B0100',
        fontFamily: 'Poppins',
        fontSize: '30px',
        marginBottom: '20px',
        fontWeight: '700',
    },
    input: {
        width: '100%',
        padding: '10px 5px 10px 10px',
        marginBottom: '10px',
        borderRadius: '5px',
        border: '1px solid #2B0100',
        boxSizing: 'border-box',
        outline: 'none',
    },
    signUp: {
        padding: '5%',
        fontSize: '60%',
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center',
    },
    loginBtn: {
        display: 'block',
        backgroundColor: '#800000',
        color: 'white', 
        width: '99%', 
        borderRadius: '5px', 
        border: 'none', 
        cursor: 'pointer', 
        fontSize: '13px', 
        boxSizing: 'border-box',
        justifyContent: 'center', 
        alignItems: 'center',
        marginLeft: '0.5%',
    },
    checkboxLabel: {
        fontSize: '60%',
    },
};

export default SignUp;
