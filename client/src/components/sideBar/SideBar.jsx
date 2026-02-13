import { Link } from 'react-router';
import styles from './SideBar.module.css';

export default function SideBar() {
    return (
        <div className={styles.sidebar}>
            <div>
                <Link to="/" className={styles.title}>User Management</Link>

                <nav className={styles.nav}>
                    <ul>
                        <li><Link to="">Create user</Link></li>
                        <li><Link to="">User details</Link></li>
                        <li><Link to="">All users</Link></li>
                        <li><Link to="">Search users</Link></li>
                        <li><Link to="">Edit user</Link></li>
                        <li><Link to="">Delete user</Link></li>
                    </ul>
                </nav>
            </div>
            <nav className={styles.nav}>
            <hr className={styles.divider} />
                <ul>
                    <li><Link to="">Login</Link></li>
                    <li><Link to="">Register</Link></li>
                    <li><Link to="">Logout</Link></li>
                </ul>
            </nav>
        </div>
    );
}
