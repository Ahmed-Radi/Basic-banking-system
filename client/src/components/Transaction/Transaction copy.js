import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../Redux/Action/UserAction';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './Transaction.module.css'
import Info from '../Info/Info';

export default function Transaction() {
    // Dispatch action -Redux
    const usersInfo  = useSelector(state => state.user.userInfo)
    const dispatch = useDispatch()
    useEffect(() => { dispatch(fetchUser()) },[])
    // Get money from input
    // Get user to send and get money
    const [inputMoney, setInputMoney] = useState("");
    const [userInfo, setUserInfo] = useState([]);
    const [sendeeId, setSendeeId] = useState('');
    const [transaction, setTransaction] = useState([])
    // validation
    const [userMoney, setUserMoney] = useState(false);
    const [negativeMoney, setNegativeMoney] = useState(false);
    const [notSelected, setNotSelected] = useState(false);
    const [notEnterMoney, setNotEnterMoney] = useState(false);
    const [completeTransaction, setCompleteTransaction] = useState(false);
    // Get Transaction from DB
    useEffect(() => (
        setUserInfo(usersInfo)
    ), [usersInfo])
    // Set transaction
    useEffect(() => {
        const id = params.id;
        fetch(`${id}`)
        .then(response => response.json())
        .then(transaction => (
            setTransaction(transaction)
        ))
    },[])

    // Get Id user(sender) from URL
    const params = useParams()
    const userId = params.id;

    function postTransactionData({ sender, sendee, money }) {
        const updatedSender = { ...sender, balance: sender.balance - money };
        const updatedSendee = { ...sendee, balance: sendee.balance + money };
        if(updatedSender.balance < 0 && updatedSender.balance < inputMoney){
            // Don't have enough funds!
            setNegativeMoney(true)
            setNotEnterMoney(true)
            setUserMoney(true)
            return;
        }
        // console.log("transaction:", updatedSender, updatedSendee);
        setUserInfo((prev) =>
            prev.map((user) => {
                if (user._id === sender._id) {
                    return updatedSender;
                }
                if (user._id === sendee._id) {
                    return updatedSendee;
                }
                return user;
            })
        );

        axios.post('/transaction', {
            cost: money,
            user: updatedSender._id,
            sendTo: updatedSendee._id,
        })
        axios.patch(`/update/${userId}`, {
            balanceSender: updatedSender.balance,
            balanceSendee: updatedSendee.balance,
            id: updatedSendee._id
        })
    }

    function getUser(personId) {
        return userInfo.find((user) => user._id === personId);
    }

    const onSubmitForm = (e) => {
        e.preventDefault();
        const sender = getUser(userId);
        const sendee = getUser(sendeeId);
        const money = parseInt(inputMoney,10);
        if (!sender || !sendee || !money || Number.isNaN(money)) {
            //Invalid transaction
            setCompleteTransaction(true)
            return;
        }
        postTransactionData({ sender, sendee, money });
    };
    return (
        <div className="container">
            <Info userInfo={userInfo} />
            { completeTransaction ? <p>Please check your balance and user to send to money</p> : '' }
            <form onSubmit={onSubmitForm} className={styles.form}>
                <div className={styles.formInputs}>
                    <label htmlFor="money">
                        <span className={styles.label}>Enter Money:</span>
                    </label>
                    <input
                        name="money"
                        id="money"
                        type="number"
                        value={inputMoney}
                        className={styles.input}
                        onChange={(e) => {
                            setInputMoney(e.target.value)
                            e.target.value > 0 ? setNotEnterMoney(false) : setNotEnterMoney(true)
                        }}
                    />
                    <p className={userMoney ? styles.validation : styles.notValidation}>Please, Enter money</p>
                    <p className={negativeMoney ? styles.validation : styles.notValidation}>Please, Enter positive money</p>
                    <p className={userMoney ? styles.validation: styles.notValidation }>You don't have much money</p>
                </div>
                <div className={styles.formInputs}>
                    <label htmlFor="person">
                        <span className={styles.label}>Send To:</span>
                    </label>
                    <select value={sendeeId} id="person" className={styles.input}
                        onChange={(e) => {
                            setSendeeId(e.target.value)
                            e.target.value !== undefined ? setNotSelected(false) : setNotSelected(true)
                        }}
                    >
                        <option value={''}>Unset</option>
                        {usersInfo && usersInfo.filter(({_id})=>_id!==userId).map((user) => (
                            <option key={user._id} value={user._id}>{user.name}</option>
                        ))}
                    </select>
                    <p className={notSelected ? styles.validation : styles.notValidation}>Please, Select one</p>
                </div>
                <button type="submit"  className={styles.button}>Submit</button>
            </form>
            <div id={styles.tableContainer}>
                <table className="table table-striped" id={styles.table}>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Time</th>
                            <th scope="col">Send To</th>
                            <th scope="col">Money Sent</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            transaction ? transaction.map((transaction, index) => (
                            <tr key={transaction._id}>
                                <th scope="row">{index+1}</th>
                                <td>{transaction.transactionTime.replace('T', ' ').replace('Z', '')}</td>
                                <td>
                                    {usersInfo.map((user) => (
                                        user._id === transaction.sendTo ? user.name : ''
                                    ))}
                                </td>
                                <td>{transaction.cost}</td>
                            </tr>
                            )) : <tr><td>'loadding...'</td></tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}
