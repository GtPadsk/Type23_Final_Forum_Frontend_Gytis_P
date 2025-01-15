import React from 'react'
import Link from 'next/link'
import styles from './styles.module.css'

const NavigationBar = () => {
    return (
        <nav className={styles.navbarWrapper}>
            <ul className={styles.navList}>
                <li className={styles.navItem}><Link className={styles.navItem} href="/">Home</Link></li>
                <li className={styles.navItem}><Link className={styles.navItem} href="/login">Login</Link></li>
                <li className={styles.navItem}><Link className={styles.navItem} href="/register">Register</Link></li>
            </ul>
        </nav>
    );
}

export default NavigationBar
