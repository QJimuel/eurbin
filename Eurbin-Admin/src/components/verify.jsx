import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';

function VerifyEmail() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        console.log("Token:", token); // Log the token to check its value

        const verify = async () => {
            try {
                const response = await axios.get(`https://eurbin.vercel.app/admin/verify-email?token=${token}`);
                setMessage(response.data.message);
                setTimeout(() => {
                    navigate('/Login');
                }, 3000); // Redirect after 3 seconds
            } catch (error) {
                setMessage('Verification failed: ' + (error.response?.data?.message || error.message));
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            verify();
        } else {
            setMessage('No token found in the URL');
            setLoading(false);
        }
    }, [token, navigate]);

    return (
        <div style={styles.verifyContainer}>
            <div style={styles.verifyCard}>
                <h1 style={styles.title}>Email Verification</h1>
                {loading ? (
                    <>
                        <p style={styles.message}>Please wait while we verify your email...</p>
                        <div style={styles.loader}></div> {/* Loader animation */}
                    </>
                ) : (
                    <p style={styles.message}>{message}</p>
                )}
            </div>
        </div>
    );
}

const styles = {
    verifyContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f4f7fa',
        fontFamily: 'Arial, sans-serif',
    },
    verifyCard: {
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '40px',
        textAlign: 'center',
        width: '400px',
    },
    title: {
        fontSize: '24px',
        color: '#2B0100',
        marginBottom: '20px',
    },
    message: {
        fontSize: '16px',
        color: '#555',
    },
    loader: {
        border: '8px solid #f3f3f3',
        borderTop: '8px solid #800000',
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        animation: 'spin 1s linear infinite',
        margin: '20px auto',
    },
};

// Injecting keyframe animations directly into the inline style
const style = document.createElement('style');
style.innerHTML = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);

export default VerifyEmail;
