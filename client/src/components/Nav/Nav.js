import React from 'react'
import styles from './Nav.module.css'
import { Link, NavLink } from 'react-router-dom';

export default function Nav() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light" id={styles.navbar}>
            <div className="container">
                <Link className="navbar-brand" to="/">Bank system</Link>
                <button className="navbar-toggler"
                    type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
                    aria-expanded="false" aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink  className={({ isActive }) => isActive ?  `${styles.selected} nav-link`: `nav-link ${styles.navLink}`}  to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink  className={({ isActive }) => isActive ?  `${styles.selected} nav-link`: `nav-link ${styles.navLink}`} to="/transactions">Transaction History</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
