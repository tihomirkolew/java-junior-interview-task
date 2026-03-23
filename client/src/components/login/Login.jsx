import { Link } from 'react-router';
import { useUserContext } from '../../contexts/UserContext';
import styles from './Login.module.css'
import { useState } from 'react';

export default function Login() {

    const { loginHandler, errors, setErrors } = useUserContext();

    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const validateForm = (values) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(values.email)) {
            return { email: 'Please enter a valid email address.' };
        }

        if (!values.password) {
            return { password: 'Please enter a valid password.' };
        }

        return {};
    }

    const onSubmit = async (е) => {
        е.preventDefault();

        const validationErrors = validateForm(values);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            console.log(validationErrors);
            
            return;
        }

        try {
            await loginHandler(values.email, values.password);
        } catch (error) {
            alert(error.message);
        }
    }

    const onChange = (e) => {
        e.preventDefault();
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    }

    return (
        <div className={styles.formContainer}>
            <h1>Login</h1>
            <form
                className={styles.form}
                onSubmit={onSubmit}
                noValidate
            >
                <div className={styles.inputContainer}>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        noValidate
                        value={values.email}
                        onChange={onChange}
                    />
                </div>
                <div className={styles.inputContainer}>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        noValidate
                        value={values.password}
                        onChange={onChange}
                    />
                </div>
                {errors.email && <p className={styles.textDanger}>{errors.email}</p>}
                {errors.password && <p className={styles.textDanger}>{errors.password}</p>}
                <p className={styles.registerLink}><Link to="/register">Don't have an account? Register here.</Link></p>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}
