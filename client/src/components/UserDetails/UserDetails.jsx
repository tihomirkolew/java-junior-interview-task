import UserCard from "../userCard/UserCard";
import styles from './UserDetails.module.css'
import { useUserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router";
import { useState } from "react";

export default function UserDetails() {

    const { user, isAuthenticated } = useUserContext();
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        id: '',
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        email: '',
        phoneNumber: ''
    });

    const [values, setValues] = useState({ id: '' });

    const [errors, setErrors] = useState({});

    if (!isAuthenticated) {
        alert('You must be logged in to create a user!');
        navigate('/login');
        return;
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

        if (!values.id) {
            setErrors(state => ({
                ...state,
                id: 'Id is required!'
            }));
            return;
        }

        try {
            const res = await fetch(`http://localhost:8086/api/users/${values.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + btoa(user?.email + ':' + user?.plainPassword),
                }
            });

            if (!res.ok) {
                const errorData = await res.json();
                setErrors(errorData)
                console.log(errorData);

                return;
            }

            const data = await res.json();
            setUserData({ id: values.id, ...data });
            console.log(values.id);
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <>
            <div className={styles.searchUserContainer}>
                <form
                    id="search-user-form"
                    className={styles.form}
                    method="GET"
                    onSubmit={onSubmit}
                >
                    <div className={styles.inputContainer}>
                        <label>Enter an id</label>
                        <input
                            type="id"
                            name="id"
                            value={values.id}
                            onChange={onChange}
                        />
                        <button type="submit">Search</button>
                    </div>
                    {errors.id && <p className={styles.textDanger}>{errors.id}</p>}
                </form>
                <div className={styles.userInfo}>
                    {userData.id && <UserCard key={userData.id} {...userData} />}
                </div>
            </div>
        </>
    );
}
