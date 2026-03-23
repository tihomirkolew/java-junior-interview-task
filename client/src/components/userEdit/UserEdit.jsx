import { useState } from 'react';
import styles from '../login/Login.module.css'
import { useUserContext } from '../../contexts/UserContext';
import { useNavigate } from 'react-router';
import { useUserDelete } from '../../hooks/useUserDelete';

export default function EditUser() {
    // todo: edit user form
    const navigate = useNavigate();

    const { user, isAuthenticated } = useUserContext();
    const { deleteHandler, deleteErrors } = useUserDelete();
    const [errors, setErrors] = useState({});

    const [userId, setUserId] = useState('');

    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        phoneNumber: '',
        email: ''
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

    const onIdChange = async (e) => {
        const id = e.target.value;

        setUserId(id);

        if (!id) {
            setValues({ firstName: '', lastName: '', dateOfBirth: '', phoneNumber: '', email: '' });
            setErrors({});
            return;
        }

        if (id && isAuthenticated) {
            try {
                const res = await fetch(`http://localhost:8086/api/users/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Basic ' + btoa(user?.email + ':' + user?.plainPassword),
                    }
                });

                const data = await res.json();

                if (!res.ok) {
                    setErrors(data);
                    setValues({ firstName: '', lastName: '', dateOfBirth: '', phoneNumber: '', email: '' });
                    return;
                }

                setErrors({});
                setValues({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    dateOfBirth: data.dateOfBirth,
                    phoneNumber: data.phoneNumber,
                    email: data.email
                })
            } catch (error) {
                console.log(error.message);
            }
        }

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
            navigate("/login");
            return;
        }

        if (!userId || isNaN(userId)) {
            setErrors({ id: 'Please enter a valid id.' });
            return;
        }

        const validationErrors = validate(values);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const res = await fetch(`http://localhost:8086/api/users/edit/${userId}`, {
                method: 'PUT',
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
            };

            const data = await res.json();
            setUserId('');
            setValues({
                firstName: '',
                lastName: '',
                dateOfBirth: '',
                phoneNumber: '',
                email: ''
            });
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <>
            <div className={styles.formContainer}>
                <h1>Edit user</h1>
                <form
                    id="register-form"
                    className={styles.form}
                    method="POST"
                    onSubmit={onSubmit}
                >
                    <div className={styles.inputContainer}>
                        <label htmlFor="id">Enter an id</label>
                        <input
                            id="id"
                            type="id"
                            name="id"
                            value={userId}
                            onChange={onIdChange}
                        />
                        {errors.id && <p className={styles.textDanger}>{errors.id}</p>}
                    </div>
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
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '70%' }}>
                        <button type="submit">Edit</button>
                        <button type="button" onClick={async () => {
                            await deleteHandler(userId);
                            onIdChange({ target: { value: userId } });
                        }}>Delete</button>
                    </div>
                </form >
            </div >

        </>
    );
}
