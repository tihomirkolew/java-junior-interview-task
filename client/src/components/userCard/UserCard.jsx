import { useUserContext } from "../../contexts/UserContext";
import styles from "./UserCard.module.css";

export default function UserCard({
    id,
    firstName,
    lastName,
    dateOfBirth,
    email,
    phoneNumber,
    userListStyles
}) {
    const { user } = useUserContext();

    const createdDate = new Date(dateOfBirth).toLocaleString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });

    const isOwnProfile = String(user?.id) === String(id);

    return (
        <div className={`${userListStyles} ${styles.userInfoContainer}`}>
            <div className={styles.userInfo}>
                <h2 className={styles.fullName}>Name: {firstName} {lastName}</h2>
                <p className="date-of-birth">Birth date: {createdDate}</p>
                <p className="email">Email: {email}</p>
                <p className="phone-number">Phone number: {phoneNumber}</p>
            </div>
            {isOwnProfile && <p className={styles.ownProfile}>This is your profile</p>}
        </div>
    );
}
