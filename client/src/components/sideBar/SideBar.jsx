import { Link } from 'react-router';
import styles from './SideBar.module.css';
import { useUserContext } from '../../contexts/UserContext';

export default function SideBar() {
    const { user, isAuthenticated } = useUserContext();

    return (
        <div className={styles.sidebar}>
            <div>
                <Link to="/" className={styles.title}>User Management</Link>

                <nav className={styles.nav}>
                    <ul>
                        {isAuthenticated && (
                            <>
                                <li><Link to="/create">Create user</Link></li>
                                <li><Link to="/details">User details</Link></li>
                                <li><Link to="/list">All users</Link></li>
                                <li><Link to="/search">Search users</Link></li>
                                <li><Link to="/edit">Edit user</Link></li>
                            </>
                        )}

                    </ul>
                </nav>
            </div>
            <nav className={styles.nav}>
                <hr className={styles.divider} />
                <ul>
                    {!isAuthenticated && (
                        <>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/register">Register</Link></li>
                        </>)
                    }
                    {isAuthenticated && (
                        <li><Link to="/logout">Logout</Link></li>
                    )}
                    <span>Logged in with: {user?.email}</span>
                </ul>
            </nav>
        </div>
    );
}
