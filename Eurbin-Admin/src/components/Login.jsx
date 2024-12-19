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
    const collected_API_URL = 'https://eurbin.vercel.app/collected'; 

    

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
                                <i className={`fa ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`} />
                            </button>
                        </div>
                    </div>
                    <Link to="/forgot-password" style={styles.forgotPass}>Forgot password?</Link>
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
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        padding: '0 10px', // Add padding for smaller screens
    },
    loginBox: {
        padding: '20px',
        borderRadius: '18px',
        boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)',
        backgroundColor: 'white',
        width: '90%', // Default width for smaller screens
        maxWidth: '400px', // Maximum width for larger screens
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxSizing: 'border-box',
    },
    header: {
        color: '#800000',
        fontFamily: 'Poppins, sans-serif',
        fontSize: '20px', // Smaller default font size
        marginBottom: '10px',
        marginTop: '-10px',
        fontWeight: '700',
        textAlign: 'center', // Ensure proper alignment
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
        width: '100%', // Full width for better scaling
        padding: '12px',
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
        top: '50%',
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
        width: '100%', // Adjust to full width
        borderRadius: '8px',
        fontWeight: '600',
        fontFamily: 'Poppins, sans-serif',
        fontSize: '14px',
        cursor: 'pointer',
        border: 'none',
        margin: '10px 0',
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

// Add responsive media queries
const responsiveStyles = `
    @media (min-width: 768px) {
        .loginBox {
            width: 60%;
        }
        .header {
            font-size: 24px;
        }
    }
    @media (min-width: 1024px) {
        .loginBox {
            width: 30%;
        }
    }
`;

// Inject media query styles dynamically
const styleSheet = document.createElement("style");

styleSheet.innerText = responsiveStyles;
document.head.appendChild(styleSheet);

export default Login;