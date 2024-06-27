import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RegisterForm() {
    const [username, setUsername] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [birthDate, setBirthDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:8000/api/auth/registration/', {
            username,
            password1,
            password2,
            first_name: firstName,
            last_name: lastName,
            gender,
            age,
            birth_date: birthDate,
        })
        .then(response => {
            console.log(response.data);
            toast.success('Registration successful!', {
                position: "top-right", // Changed this line
                autoClose: 3000,
            });
            // Store the token
            localStorage.setItem('token', response.data.key);
            // Clear input fields
            setUsername('');
            setPassword1('');
            setPassword2('');
            setFirstName('');
            setLastName('');
            setGender('');
            setAge('');
            setBirthDate('');
        })
        .catch(error => {
            const errorMsg = error.response && error.response.data ? error.response.data : 'Registration failed. Please try again.';
            console.error('There was an error registering!', errorMsg);
            toast.error(errorMsg, {
                position: "top-right", // Changed this line
                autoClose: 3000,
            });
        });
    };

    return (
        <>
            <ToastContainer />
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
                    value={password1}
                    onChange={(e) => setPassword1(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <select value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option value="">Select Gender</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                </select>
                <input
                    type="number"
                    placeholder="Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />
                <input
                    type="date"
                    placeholder="Birth Date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                />
                <button type="submit">Register</button>
            </form>
        </>
    );
}

export default RegisterForm;
