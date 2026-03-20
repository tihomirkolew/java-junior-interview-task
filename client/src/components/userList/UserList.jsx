import { useEffect, useState } from "react";
import { useUserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router";
import styles from './UserList.module.css';
import UserCard from "../userCard/UserCard";

export default function UserList() {
    // todo: fix styles for userInfoContainer

    const { user, isAuthenticated } = useUserContext();
    const navigate = useNavigate();
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        // fetch users from server

        if (!isAuthenticated) {
            alert('You must be logged in to view the user list!');
            navigate('/login');
            return;
        }

        try {
            fetch('http://localhost:8086/api/users', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + btoa(user?.email + ':' + user?.plainPassword),
                }
            })
                .then(response => response.json())
                .then(data => {
                    setUserList(data);
                    console.log(userList);
                    
                })
                .catch(error => {
                    console.error('Error fetching users:', error);
                });
        } catch (error) {
            console.error('Error fetching users:', error);
        }

    }, []);

    return (
        <>

            <div className={styles.userListContainer}>
                <h1>Users list</h1>
                {userList.length > 0 ? (
                    userList.map(u =>
                        <UserCard
                            key={u.id}
                            {...u}
                            userListStyles={styles.userInfoContainer}
                        />)
                ) : (
                    <p>No users found.</p>
                )}
            </div>
        </>
    );
}
