import React, { useEffect, useState } from 'react'
import styles from './AllTransaction.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../Redux/Action/UserAction';
import axios from 'axios';
import moment from 'moment';

export default function AllTransaction() {
    /** connect with redux */
    const { userInfo } = useSelector(state => state.user)
    const dispatch = useDispatch()
    useEffect(() => { dispatch(fetchUser()) },[])

    const [transaction, setTransaction] = useState([])

    useEffect(() => {
        axios.get(`/all`)
        .then(response => (
            setTransaction(response.data)
        ))
    },[])

    return (
        <div className={styles.allTransaction}>
            <h2 >All Transaction</h2>
            <div id={styles.tableContainer}>
                    <table className="table" id={styles.table}>
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Time</th>
                                <th scope="col">From</th>
                                <th scope="col">To</th>
                                <th scope="col">Send</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                transaction ? transaction.map((transaction, index) => (
                                <tr key={transaction._id}>
                                    <td>{index+1}</td>
                                    <td>{moment(transaction.transactionTime).format('MMMM Do YYYY, h:mm:ss a')}</td>
                                    <td>
                                        {userInfo.map((user) => (
                                            user._id === transaction.user ? user.name : ''
                                        ))}
                                    </td>
                                    <td>
                                        {userInfo.map((user) => (
                                            user._id === transaction.sendTo ? user.name : ''
                                        ))}
                                    </td>
                                    <td>{transaction.cost}$</td>
                                </tr>
                                )) : <tr><td>'loading...'</td></tr>
                            }
                        </tbody>
                    </table>
            </div>
        </div>
    )
}
