import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Profile() {
    const [profileData, setProfileData] = useState({
        first_name: '',
        last_name: '',
        gender: '',
        age: '',
        birth_date: ''
    });

    useEffect(() => {
        console.log('Profile component loaded'); // Diese Zeile hinzufügen
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('http://127.0.0.1:8000/api/profile/', {
                headers: {
                    'Authorization': `Token ${token}`
                }
            })
            .then(response => {
                setProfileData(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the profile data!', error);
                toast.error('Failed to fetch profile data.');
            });
        }
    }, []);

    const handleChange = (e) => {
        setProfileData({
            ...profileData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (token) {
            axios.put('http://127.0.0.1:8000/api/profile/', profileData, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            })
            .then(response => {
                setProfileData(response.data);
                toast.success('Profile updated successfully!');
            })
            .catch(error => {
                console.error('There was an error updating the profile!', error);
                toast.error('Failed to update profile.');
            });
        }
    };

    return (
        <div>
            <h1>Profile</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    value={profileData.first_name || ''}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    value={profileData.last_name || ''}
                    onChange={handleChange}
                />
                <select
                    name="gender"
                    value={profileData.gender || ''}
                    onChange={handleChange}
                >
                    <option value="">Select Gender</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                </select>
                <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    value={profileData.age || ''}
                    onChange={handleChange}
                />
                <input
                    type="date"
                    name="birth_date"
                    placeholder="Birth Date"
                    value={profileData.birth_date || ''}
                    onChange={handleChange}
                />
                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
}

export default Profile;
