import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginForm({ onLoginSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:8000/api/auth/login/', {
            username,
            password
        })
        .then(response => {
            console.log(response.data);
            // Store the token
            localStorage.setItem('token', response.data.key);
            // Display success message
            toast.success('Login successful!', {
                position: "top-right",
                autoClose: 3000,
            });
            // Clear input fields
            setUsername('');
            setPassword('');
            // Trigger login success handler
            if (onLoginSuccess) {
                onLoginSuccess();
            }        })
        .catch(error => {
            if (error.response) {
                // Request was made and server responded
                console.error('There was an error logging in!', error.response.data);
                toast.error('Login failed. Please try again.', {
                    position: "top-right",
                    autoClose: 3000,
                });
            } else if (error.request) {
                // Request was made but no response
                console.error('No response received!', error.request);
                toast.error('No response received from server', {
                    position: "top-right",
                    autoClose: 3000,
                });
            } else {
                // Something else happened
                console.error('Error', error.message);
                toast.error('Error: ' + error.message, {
                    position: "top-right",
                    autoClose: 3000,
                });
            }
        });
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
        </>
    );
}

export default LoginForm;
