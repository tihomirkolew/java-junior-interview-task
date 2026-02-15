import { useState } from 'react';
import styles from '../login/Login.module.css'

export default function Register() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        phoneNumber: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = async (e) => {
    e.preventDefault();

    await fetch('http://localhost:8086/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(res => {
            if (res.ok) {
                const contentType = res.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    return res.json();
                } else {
                    return res.text();
                }
            }
            throw new Error('Registration failed');
        })
        .then(data => {
            console.log(data);
        })
        .catch(err => {
            console.log(err);
        });
}



    return (
        <>
            <div className={styles.formContainer}>
                <h1>Register</h1>
                <form
                    id="register-form"
                    className={styles.form}
                    method="POST"
                    onSubmit={onSubmit}
                >
                    <div className={styles.inputContainer}>
                        <label htmlFor="firstName">First name</label>
                        <input
                            type="text"
                            id="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            name="firstName"
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor="lastName">Last name</label>
                        <input
                            type="text"
                            id="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            name="lastName"
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor="dateOfBirth">Date of birth</label>
                        <input
                            type="date"
                            id="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            name="dateOfBirth"
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor="phoneNumber">Phone number</label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            name="phoneNumber"
                            autoComplete="tel"
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            autoComplete="new-email"
                            name="email"
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            autoComplete="new-password"
                            name="password"
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            autoComplete="new-password"
                            name="confirmPassword"
                        />
                    </div>
                    <button type="submit">Register</button>
                </form>
            </div>
        </>
    );
}
