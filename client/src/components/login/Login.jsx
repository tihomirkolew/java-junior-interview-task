import { useNavigate } from 'react-router';
import { useUserContext } from '../../contexts/UserContext';
import styles from './Login.module.css'
import { useState } from 'react';

export default function Login() {

    const { loginHandler } = useUserContext();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const onSubmit = async (е) => {
        е.preventDefault();
        try {
            await loginHandler(formData.email, formData.password);
            navigate('/');
        } catch (error) {
            alert('Login failed: ' + error.message);
        }
    }

    const changeHandler = (e) => {
        e.preventDefault();
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    return (
        <div className={styles.formContainer}>
            <h1>Login</h1>
            <form
                className={styles.form}
                onSubmit={onSubmit}
            >
                <div className={styles.inputContainer}>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={changeHandler}
                    />
                </div>
                <div className={styles.inputContainer}>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={changeHandler}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}
