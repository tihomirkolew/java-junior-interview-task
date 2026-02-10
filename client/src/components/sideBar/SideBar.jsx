import styles from './SideBar.module.css';

export default function SideBar() {
    return (
        <div className={styles.sidebar}>
            <div>
                <h1 className={styles.title}>User Management</h1>

                <nav className={styles.nav}>
                    <ul>
                        <li><a href="">Create a user</a></li>
                        <li><a href="">Read a user</a></li>
                        <li><a href="">Read all users</a></li>
                        <li><a href="">Read users by term</a></li>
                        <li><a href="">Edit user</a></li>
                        <li><a href="">Delete user</a></li>
                    </ul>
                </nav>
            </div>
            <nav className={styles.nav}>
            <hr className={styles.divider} />
                <ul>
                    <li><a href="">Login</a></li>
                    <li><a href="">Register</a></li>
                    <li><a href="">Logout</a></li>
                </ul>
            </nav>
        </div>
    );
}
