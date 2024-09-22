import React, { useEffect } from 'react';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';

function VerifyEmail() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Token:", token); // Log the token to check its value

        const verify = async () => {
            try {
                const response = await axios.get(`https://eurbin.vercel.app/admin/verify-email?token=${token}`);
                alert(response.data.message);
                navigate('/Login')
            } catch (error) {
                alert('Verification failed: ' + (error.response?.data?.message || error.message));
            }
        };

        if (token) {
            verify();
        } else {
            alert("No token found in the URL");
        }
    }, [token]);

    return <div>Verifying your email...</div>
    ;
}

export default VerifyEmail;
