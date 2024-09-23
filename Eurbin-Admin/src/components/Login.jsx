
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const loginAdmin = async () => {
    if (!email || !password) {
        alert('Email and password are required');
        return;
    }

    try {
        const response = await axios.post('https://eurbin.vercel.app/admin/login', { email, password });

        if (response.status === 200) { 
            if (response.data.email === "admin"){
       
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userEmail', response.data.email); // Assuming the backend sends the email
                localStorage.setItem('userId', response.data.userId); // Save the token in local storage
                alert('Login successful');
                navigate('/Dashboard2'); // Redirect to the root page

            } else {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userEmail', response.data.email); // Assuming the backend sends the email
                localStorage.setItem('userId', response.data.userId); // Save the token in local storage
                alert('Login successful');
                navigate('/BinStatus'); // Redirect to the root page
            }
        } else {
            alert('Login failed');
        }
    } catch (err) {
        if (err.response && err.response.status === 401) {
            alert('Invalid credentials');
        } else {
            console.error('Error logging in:', err);
            alert('An error occurred during login or your account is not veified');
        }
    }
};
    return (
        <>
        {/* Adding <style> tag for the ::placeholder pseudo-element */}
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
                <table>
                <tbody>
                <h1 style={styles.header}>Login Account</h1>
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
                        <p style={styles.forgotPass}>Forgot Password</p>
                    </td>
                    </tr>
                    <button style={styles.loginBtn} onClick={loginAdmin}>Login</button>
                    <tr>
                    <td>
                        <p style={styles.signUp}>
                            Don't have an account?  
                            <Link to="/Signup" style={{ color: '#800000', paddingLeft: '1%'}}>
                                Sign up
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
  
  }
  
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
        width: '50vw',
        display: 'flex',
        justifyContent: 'end',
        borderRadius: '20px',
    },
    loginBox: {
        padding: '20px',
        borderRadius: '18px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        backgroundColor: 'white',
        width: '30vw',
        height: '45vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    header: {
        color: '#2B0100',
        fontFamily: 'Poppins',
        fontSize: '30px',
        marginBottom: '2px',
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
    forgotPass: {
        color: '#800000',
        fontSize: '60%',
        textDecoration: 'underline',
        paddingBottom: '5px',
        paddingLeft: '3%',
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
    }
  };
  
  


export default Login;