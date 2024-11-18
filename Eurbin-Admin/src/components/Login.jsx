import { Link } from 'react-router-dom';
import logo from '../Images/eurbinLoginIcon.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './AxiosInstance';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); 
    const navigate = useNavigate();
    const [hover, setHover] = useState(false);

    const loginAdmin = async () => {
        if (!email || !password) {
            alert('Username and Password are required');
            return;
        }

        try {
            const response = await axiosInstance.post('/admin/login', { email, password });
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userEmail', response.data.email);
                localStorage.setItem('userId', response.data.userId);
                localStorage.setItem('username', response.data.username);
                alert('Login successful');

                if (response.data.email === "admin") {
                    navigate('/Dashboard2');
                } else {
                    navigate('/BinStatus');
                }
            } else {
                alert('Login failed');
            }
        } catch (err) {
            if (err.response && err.response.status === 401) {
                alert('Invalid credentials');
            } else {
                console.error('Error logging in:', err);
                alert('An error occurred during login');
            }
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.loginBox}>
                <img src={logo} alt="Logo" style={{ width: '100px', height: '130px', marginTop: '-20px' }} />
                <h1 style={styles.header}>Admin Login</h1>
                <form>
                    <div style={styles.inputContainer}>
                        <label
                            htmlFor="username"
                            style={{...styles.label,color: email ? '#800000' : '#2B0100', }}>
                            Username
                        </label>
                        <input
                            id="username"
                            style={email ? { ...styles.input, ...styles.inputActiveStyle } : styles.input}
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Username"
                        />
                    </div>
                    <div style={styles.inputContainer}>
                        <label
                            htmlFor="password"
                            style={{...styles.label,color: password ? '#800000' : '#2B0100',}}>
                            Password
                        </label>
                        <div style={{ position: 'relative' }}>
                            <input
                                id="password"
                                style={password ? { ...styles.input, ...styles.inputActiveStyle } : styles.input}
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={styles.showPasswordButton}
                            >
                                <i className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} />
                            </button>
                        </div>
                    </div>
                    <p style={styles.forgotPass}>Forgot password?</p>
                    <button
                        type="button"
                        style={hover ? { ...styles.loginBtn, ...styles.loginBtnHover } : styles.loginBtn}
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                        onClick={loginAdmin}
                    >
                        Login
                    </button>
                    <p style={styles.signUp}>
                        Don't have an account?
                        <Link to="/Signup" style={{ color: '#800000', paddingLeft: '1%', textDecoration: 'none', }}>
                            Sign up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}



const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(to bottom right, #800000, #f0f0f0)',
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
    showPasswordButton: {
        position: 'absolute',
        right: '3px',
        top: '44%',
        transform: 'translateY(-50%)',
        background: 'none',
        border: 'none',
        color: '#800000',
        cursor: 'pointer',
        fontSize: '15px',
    },
    forgotPass: {
        color: '#800000',
        fontSize: '12px',
        textDecoration: 'none',
        cursor: 'pointer',
        marginBottom: '20px',
        marginTop: '-5px',
        textAlign: 'right',
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
        transition: 'background-color 0.3s ease',
    },
    loginBtnHover: {
        backgroundColor: '#A00000',
    },
    signUp: {
        marginTop: '10px',
        fontSize: '12px',
        fontFamily: 'Poppins, sans-serif',
        textAlign: 'center',
        width: '100%',
    },
};

export default Login;