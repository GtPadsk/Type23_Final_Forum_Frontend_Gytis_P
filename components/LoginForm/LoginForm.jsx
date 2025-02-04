import React, { useState } from 'react'
import axios from 'axios'
import styles from "./styles.module.css"
import { useRouter } from 'next/navigation'

const LoginForm = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [logoutMessage, setLogoutMessage] = useState('')

    const router = useRouter()

    const onLogin = async () => {
        setError("")
        setSuccess("")

        if (!email || !password) {
            return setError("Please enter email and password")
        }

        try {
            const userData = {
                email: email,
                password: password,
            }


            const response = await axios.post(`${process.env.NEXT_PUBLIC_LOGIN_PORT}`, userData)


            if (response.status === 200 || response.status === 201) {
                const { token } = response.data
                localStorage.setItem("token", token)
                console.log("Token saved:", token)
                setSuccess("Login successful! Redirecting...")
                setError("")
                setTimeout(() => router.push("/"), 1000)
                return
            } else {
                setError("Invalid email or password")
            }

        } catch (error) {
            setError("Login failed, try again please.")
        }
    }
    const handleLogout = () => {
        localStorage.removeItem('token');
        setLogoutMessage('Successfully logged out!')
        router.push('/login');
    };

    return (
        <>
            <div className={styles.wrapper}>
                <label htmlFor="email">Email :</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="password">Password :</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                {error && <p className={styles.error}>{error}</p>}
                {success && <p className={styles.success}>{success}</p>}
                {logoutMessage && <p className={styles.success}>{logoutMessage}</p>}
                <br />
                <button
                    type="submit"
                    className={styles.submitBtn}
                    onClick={onLogin}
                >Login</button>
                <br />
                <button
                    type="button"
                    onClick={handleLogout}
                    className={styles.submitBtn}
                >Logout</button>
                <br />
                <a href="#" className={styles.link}>Forgot Password?</a>
            </div>
        </>

    )

}


export default LoginForm