import styles from './Home.module.css';

export default function Home() {
    return (
        <>
            <div className={styles.homeContainer}>
                <h1>Welcome to my implementation of an user management system</h1>
                <p>This is an exercise of an java junior interview task <br /> using Spring Boot for back-end React JS for front-end.</p>
            </div>
        </>
    );
}