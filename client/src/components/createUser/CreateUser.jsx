import { useState } from 'react';
import styles from '../login/Login.module.css'
import { useUserContext } from '../../contexts/UserContext';

export default function CreateUser() {

    const { user, isAuthenticated } = useUserContext();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        phoneNumber: '',
        email: '',
        password: ''
    });

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(user);
        console.log(user?.accessToken);

        await fetch('http://localhost:8086/api/users/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(user?.email + ':' + user?.plainPassword),
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
                throw new Error('User creation failed');
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
                <h1>Create user</h1>
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
                            name="firstName"
                            value={formData.firstName}
                            onChange={onChange}
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor="lastName">Last name</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={onChange}
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor="dateOfBirth">Date of birth</label>
                        <input
                            type="date"
                            id="dateOfBirth"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={onChange}
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor="phoneNumber">Phone number</label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            autoComplete="tel"
                            value={formData.phoneNumber}
                            onChange={onChange}
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            autoComplete="new-email"
                            name="email"
                            value={formData.email}
                            onChange={onChange}
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            name="password"
                            value={formData.password}
                            onChange={onChange}
                        />
                    </div>
                    <button type="submit">Create</button>
                </form>
            </div>
        </>
    );
}
