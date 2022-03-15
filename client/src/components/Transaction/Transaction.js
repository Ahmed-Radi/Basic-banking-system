import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../Redux/Action/UserAction';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './Transaction.module.css'
import Info from '../Info/Info';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import moment from 'moment';

export default function Transaction() {
    // Dispatch Action - Redux
    const usersInfo  = useSelector(state => state.user.userInfo)
    const dispatch = useDispatch()
    useEffect(() => { dispatch(fetchUser()) },[])
    // Get money from input
    const [inputMoney, setInputMoney] = useState("");
    // Get user to send and get money
    const [userInfo, setUserInfo] = useState([]);
    const [sendeeId, setSendeeId] = useState("");
    // Get Transaction from DB
    useEffect(() => (
        setUserInfo(usersInfo)
    ), [usersInfo])
    const [transaction, setTransaction] = useState([])
    // Set transaction in state
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
    const navigate = useNavigate();

    // Validation
    let schema = yup.object().shape({
        person: yup.string().required('please select one'),
        money: yup.number().typeError('you must specify a number').min(1).required().test({
            name: 'money',
            message: 'Your money not enough to do this transaction',
            test: (value) => checkMoney(value), // It will work if the function return 'FALSE'
        }),
    });
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })
    const checkMoney = (value) => {
        const sender = usersInfo.filter(user => user._id === userId)
        if (value > sender[0].balance) {
            return false;
        } else {
            return true;
        }
    }
    function postTransactionData({ sender, sendee, money }) {
        const updatedSender = { ...sender, balance: sender.balance - money };
        const updatedSendee = { ...sendee, balance: sendee.balance + money };
        if(updatedSender.balance<0){
            // Don't have enough funds!
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

    const onSubmitForm = () => {
        const sender = getUser(userId);
        const sendee = getUser(sendeeId);
        const money = parseInt(inputMoney,10);
        if (!sender || !sendee || !money || Number.isNaN(money) || money < 0) {
            // Invalid transaction
            return;
        }
        postTransactionData({ sender, sendee, money });
        // console.log(errors)
        navigate('/transactions')
    };

    return (
        <div className="container">
            <Info userInfo={userInfo} />
            <form onSubmit={handleSubmit(onSubmitForm)} className={styles.form}>
                <div className={styles.formInputs}>
                    <label htmlFor="money">
                        <span className={styles.label}>Enter Money:</span>
                    </label>
                    <input
                        {...register('money')}
                        name="money"
                        id="money"
                        type="number"
                        value={inputMoney}
                        className={styles.input}
                        onChange={(e) => setInputMoney(e.target.value)}
                        placeholder="Enter number"
                    />
                    <p className={styles.validation}>{errors.money?.message}</p>
                </div>
                <div className={styles.formInputs}>
                    <label htmlFor="person">
                        <span className={styles.label}>Send To:</span>
                    </label>
                    <select
                        {...register("person")}
                        value={sendeeId}
                        name="person"
                        id="person"
                        className={styles.input}
                        onChange={(e) => setSendeeId(e.target.value)}
                    >
                        <option value={''}>Unset</option>
                        {usersInfo && usersInfo.filter(({_id})=>_id!==userId).map((user) => (
                            <option key={user._id} value={user._id}>{user.name}</option>
                        ))}
                    </select>
                    <p className={styles.validation}>{errors.person?.message}</p>
                </div>
                <button type="submit"  className={styles.button}>Submit</button>
            </form>
            <div id={styles.tableContainer}>
                <table className="table" id={styles.table}>
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
                                <td>{index+1}</td>
                                <td>{moment(transaction.transactionTime).format('MMMM Do YYYY, h:mm:ss a')}</td>
                                {/* <td>{transaction.transactionTime.replace('T', ' ').replace('Z', '')}</td> */}
                                <td>
                                    {usersInfo.map((user) => (
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
    );
}
