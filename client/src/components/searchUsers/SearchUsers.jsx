import { useNavigate } from 'react-router';
import { useUserContext } from '../../contexts/UserContext';
import styles from './SearchUsers.module.css'
import { useState } from 'react';
import UserCard from '../userCard/UserCard';

export default function UserSearch() {
    // todo: search user form

    const { user, isAuthenticated } = useUserContext();
    const navigate = useNavigate();

    const [userData, setUserData] = useState([]);
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [totalPages, setTotalPages] = useState();
    const [page, setPage] = useState(0);

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

    const fetchUsers = async (currentPage = 0) => {
        const size = values.size || 5;

        try {
            const res = await fetch(
                `http://localhost:8086/api/users/search?term=${values.param}&page=${currentPage}&size=${size}`,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Basic ' + btoa(user?.email + ':' + user?.plainPassword),
                    }
                }
            );

            if (!res.ok) {
                const errorData = await res.json();
                setErrors(errorData);
                console.log(errorData);
                return;
            }

            const data = await res.json();
            console.log(data.content);

            setUserData(data.content);
            setTotalPages(data.totalPages);
            setPage(currentPage);
        } catch (error) {
            alert(error.message);
        }


    }

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!values.param) {
            setErrors(state => ({
                ...state,
                param: 'Param is required!'
            }));
            return;
        }
        await fetchUsers(0);
    }

    const handlePageChange = (newPage) => {
        fetchUsers(newPage);
    }

    return (
        <>
            <div className={styles.searchUserContainer}>
                <h1>Search an user</h1>
                <form
                    id="search-user-form"
                    className={styles.form}
                    onSubmit={onSubmit}
                >
                    <div className={styles.inputContainer}>
                        <div className={styles.searchInputField}>
                            <input
                                type="text"
                                name="param"
                                placeholder="Search"
                                value={values.param || ''}
                                onChange={onChange}
                            />
                        </div>
                        <div className={styles.buttonAndPageSizeField}>
                            <input
                                type="number"
                                name="size"
                                value={values.size || 5}
                                onChange={onChange}
                                min={1}
                                style={{ width: `${String(values.size || 5).length + 2}ch` }}
                            />
                            <button type="submit">Search</button>
                        </div>
                    </div>
                    {errors.param && <p className={styles.textDanger}>{errors.param}</p>}
                </form>

                <div className={styles.userInfo}>
                    {userData.map(u => <UserCard key={u.id} {...u} userListStyles={styles.userInfoContainer} />)}
                </div>

                {totalPages > 1 && (
                    <div className={styles.pagination}>
                        <div>
                            <button onClick={() => handlePageChange(page - 1)} disabled={page === 0}>Prev</button>
                            <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages - 1}>Next</button>
                        </div>
                        <span>{page + 1} / {totalPages}</span>
                    </div>
                )}
            </div>
        </>
    );
}
