import styles from '../login/Login.module.css'
import { useState } from 'react';
import { useUserContext } from '../../contexts/UserContext';
import { useNavigate } from 'react-router';

export default function CreateUser() {
    const navigate = useNavigate();
    const { user, isAuthenticated } = useUserContext();
    const [errors, setErrors] = useState({});

    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        phoneNumber: '',
        email: '',
        password: '12345678'
    });

    const validate = (values) => {

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
        if (!isAuthenticated) {
            alert('You must be logged in to create a user!');
            navigate('/login');
            return;
        }

        const validationErrors = validate(values);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const res = await fetch('http://localhost:8086/api/users/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + btoa(user?.email + ':' + user?.plainPassword),
                },
                body: JSON.stringify(values)
            });

            if (!res.ok) {
                const errorData = await res.json();
                setErrors(errorData);
                return;
            }

            const data = await res.json();
            alert(`User with email ${data.email} created successfully!`);
            setValues({
                firstName: '',
                lastName: '',
                dateOfBirth: '',
                phoneNumber: '',
                email: ''
            });
        } catch (err) {
            alert(err.message);
        }
    }

    return (
        <>
            <div className={styles.formContainer}>
                <h1>Create an user</h1>
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
                            value={values.firstName}
                            onChange={onChange}
                        />
                        {errors.firstName && <p className={styles.textDanger}>{errors.firstName}</p>}
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor="lastName">Last name</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={values.lastName}
                            onChange={onChange}
                        />
                        {errors.lastName && <p className={styles.textDanger}>{errors.lastName}</p>}
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor="dateOfBirth">Date of birth</label>
                        <input
                            type="date"
                            id="dateOfBirth"
                            name="dateOfBirth"
                            value={values.dateOfBirth}
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
                            value={values.phoneNumber}
                            onChange={onChange}
                        />
                        {errors.phoneNumber && <p className={styles.textDanger}>{errors.phoneNumber}</p>}
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            autoComplete="new-email"
                            name="email"
                            value={values.email}
                            onChange={onChange}
                        />
                        {errors.email && <p className={styles.textDanger}>{errors.email}</p>}
                    </div>
                    <button type="submit">Create</button>
                </form>
            </div>
        </>
    );
}
