import React, { useState } from 'react';
import axios from 'axios';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

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
            // Set success state to true
            setSuccess(true);
            // Clear any previous errors
            setError('');
        })
        .catch(error => {
            if (error.response) {
                // Request was made and server responded
                console.error('There was an error logging in!', error.response.data);
                setError(JSON.stringify(error.response.data)); // Set the exact error message
                setSuccess(false); // Ensure success is false in case of error
            } else if (error.request) {
                // Request was made but no response
                console.error('No response received!', error.request);
                setError('No response received from server');
                setSuccess(false);
            } else {
                // Something else happened
                console.error('Error', error.message);
                setError(error.message);
                setSuccess(false);
            }
        });
    };

    return (
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
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {success && <div style={{ color: 'green' }}>Login successful!</div>}
        </form>
    );
}

export default LoginForm;
