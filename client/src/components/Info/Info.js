import React from 'react';
import styles from './Info.module.css';
import { useParams } from 'react-router-dom';

function Info({ userInfo }) {

    /** Get URL to ID from it */
    let params = useParams()

    let selectedUser = userInfo && userInfo.filter((user) => (
        user._id === params.id
    ))

    return (
        <div className={styles.infoContainer}>
            {
                selectedUser ? selectedUser.map((user) =>
                    <div className={styles.infoSubContainer} key={user._id}>
                        <p><span className={styles.infoTitle}>Name:</span> <span className={styles.details}>{user.name}</span></p>
                        <p><span className={styles.infoTitle}>Email:</span> <span className={styles.details}>{user.email}</span></p>
                        <p><span className={styles.infoTitle}>Total:</span> <span className={styles.details}>{user.balance}$</span></p>
                    </div>
                ) : 'loading...'
            }
        </div>
    )
}

export default Info