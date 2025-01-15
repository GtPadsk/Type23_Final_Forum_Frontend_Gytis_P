import React from "react";
import styles from "./styles.module.css";
import Link from 'next/link'

const Header = () => {
    return (
        <>
            <div className={styles.wrapper}>
                <h1 className={styles.logo}><Link className={styles.logo} href="/">Ask.it</Link></h1>
                <p>Ask a question, or answer one.</p>
            </div>
        </>
    )
}

export default Header