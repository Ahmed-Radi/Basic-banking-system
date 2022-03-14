import React, { useEffect } from 'react'
import styles from './UsersTable.module.css';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from './../../Redux/Action/UserAction';

export default function UsersTable() {
    /** connect with redux */
    const { userInfo } = useSelector(state => state.user)
    const dispatch = useDispatch()
    useEffect(() => { dispatch(fetchUser()) }, [])
    return (
        <div>
            <div className="container" id={styles.tableContainer}>
                <div className="row">
                    <div className="col-12">
                        <h2>All Users</h2>
                    </div>
                </div>
                <table className="table" id={styles.table}>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Current balance</th>
                            <th scope="col">Operation</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        userInfo ?
                        userInfo.map((user, index) => (
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.balance}$</td>
                            <td>
                                <Link to={`/transaction/${user._id}`} className={styles.button}>View</Link>
                            </td>
                        </tr>
                        )) : <tr><td>loading...</td></tr>
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
