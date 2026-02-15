import styles from './Login.module.css'

export default function Login() {
    return (
        <div className={styles.formContainer}>
            <h1>Login</h1>
            <form className={styles.form}>
                <div className={styles.inputContainer}>
                    <label>Email</label>
                    <input type="email" />
                </div>
                <div className={styles.inputContainer}>
                    <label>Password</label>
                    <input type="password" />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}
