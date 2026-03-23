import { useState } from 'react';
import styles from '../login/Login.module.css'
import { useNavigate } from 'react-router';

export default function Register() {
    const navigate = useNavigate();

    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        phoneNumber: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});

    const validateForm = (values) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneNumberRegex = /^\+?[0-9]{7,15}$/;

        if (!values.firstName) {
            return { firstName: 'First name is required!' };
        }

        if (!values.lastName) {
            return { lastName: 'Last name is required!' };
        }

        if (!values.dateOfBirth) {
            return { dateOfBirth: 'Date of birth is required!' };
        }

        if (!values.phoneNumber || !phoneNumberRegex.test(values.phoneNumber)) {
            return { phoneNumber: 'Valid phone number is required!' };
        }

        if (!emailRegex.test(values.email)) {
            return { email: 'Valid email is required!' };
        }

        if (!values.password) {
            return { password: 'Password is required!' };
        }

        if (values.password.length < 6) {
            return { password: 'Password must be at least 6 characters!' };
        }

        if (values.password !== values.confirmPassword) {
            return { confirmPassword: 'Passwords do not match!' };
        }

        return {};
    }

    const onChange = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));

        if (errors[e.target.name]) {
            setErrors(state => ({
                ...state,
                [e.target.name]: null
            }));
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateForm(values);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const res = await fetch('http://localhost:8086/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            });

            if (!res.ok) {
                const errorData = await res.json();
                setErrors(errorData);
                
                return;
            }

            // const data = await res.json();
            alert('Registration successful!');

            navigate('/login');

        } catch (err) {
            alert(err.message);
        }
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
                                value={values.firstName}
                                onChange={onChange}
                                name="firstName"
                                noValidate
                            />
                            {errors.firstName && <p className={styles.textDanger}>{errors.firstName}</p>}
                        </div>
                        <div className={styles.inputContainer}>
                            <label htmlFor="lastName">Last name</label>
                            <input
                                type="text"
                                id="lastName"
                                value={values.lastName}
                                onChange={onChange}
                                name="lastName"
                                noValidate
                            />
                            {errors.lastName && <p className={styles.textDanger}>{errors.lastName}</p>}
                        </div>
                        <div className={styles.inputContainer}>
                            <label htmlFor="dateOfBirth">Date of birth</label>
                            <input
                                type="date"
                                id="dateOfBirth"
                                value={values.dateOfBirth}
                                onChange={onChange}
                                name="dateOfBirth"
                                noValidate
                            />
                            {errors.dateOfBirth && <p className={styles.textDanger}>{errors.dateOfBirth}</p>}
                        </div>
                        <div className={styles.inputContainer}>
                            <label htmlFor="phoneNumber">Phone number</label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                value={values.phoneNumber}
                                onChange={onChange}
                                name="phoneNumber"
                                autoComplete="tel"
                                noValidate
                            />
                            {errors.phoneNumber && <p className={styles.textDanger}>{errors.phoneNumber}</p>}
                        </div>
                        <div className={styles.inputContainer}>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={values.email}
                                onChange={onChange}
                                autoComplete="new-email"
                                name="email"
                                noValidate
                            />
                            {errors.email && <p className={styles.textDanger}>{errors.email}</p>}
                        </div>
                        <div className={styles.inputContainer}>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={values.password}
                                onChange={onChange}
                                autoComplete="new-password"
                                name="password"
                                noValidate
                            />
                            {errors.password && <p className={styles.textDanger}>{errors.password}</p>}
                        </div>
                        <div className={styles.inputContainer}>
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={values.confirmPassword}
                                onChange={onChange}
                                autoComplete="new-password"
                                name="confirmPassword"
                                noValidate
                            />
                            {errors.confirmPassword && <p className={styles.textDanger}>{errors.confirmPassword}</p>}
                        </div>
                        <button type="submit">Register</button>
                    </form>
                </div>
            </>
        );
    }
