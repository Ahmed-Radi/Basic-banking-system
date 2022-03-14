import React from 'react'
import styles from './Home.module.css';
import image from './Finance app-cuate.svg'
import UsersTable from '../UsersTable/UsersTable';

function Home() {


    return (
        <div className={styles.homeContainer}>
            <svg className={styles.svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="#a2d9ff" fillOpacity="1" d="M0,0L48,42.7C96,85,192,171,288,218.7C384,267,480,277,576,245.3C672,213,768,139,864,96C960,53,1056,43,1152,85.3C1248,128,1344,224,1392,272L1440,320L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
            </svg>
            <div className="container">
                <div className="row">
                    <div className="col-md-5">
                        <div id={styles.headerContainer}>
                            <h1 className={styles.headerHead}>Basic Bank system</h1>
                            <p className={styles.headerDescription}>basic bank system help to transaction money between users</p>
                        </div>
                    </div>
                    <div className="col-md-7">
                        <img src={image} className={styles.headerImage} alt="image1" />
                    </div>
                </div>
            </div>
            <UsersTable />
        </div>
    )
}

export default Home