import React, { useState } from 'react'
import cookie from 'js-cookie';
import axios from 'axios'
import styles from "@/components/LoginForm/styles.module.css"
import { useRouter } from 'next/navigation'

const LoginForm = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

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

            console.log("Attempting login with:", userData);

            const response = await axios.post(`${process.env.NEXT_PUBLIC_LOGIN_PORT}`, userData)

            console.log("Login response received", response)

            if (response.status === 200 || response.status === 201) {
                cookie.set("token", response.data.token)
                setSuccess("Login successful! Redirecting...")
                setError("")
                setTimeout(() => router.push("/"), 1000)
                return
            } else {
                console.log("Login failed with status:", response.status)
                setError("Login failed, try again please.")
            }

        } catch (error) {
            console.error("Error logging in:", error.response ? error.response.data : error.message)
            setError("Login failed, try again please.")
        }
    }

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
                <button type="submit" className={styles.submitBtn} onClick={onLogin}>Login</button>
                <br />
                <a href="#" className={styles.link}>Forgot Password?</a>

                {error && <p className={styles.error}>{error}</p>}
                {success && <p className={styles.success}>{success}</p>}

            </div>
        </>

    )

}


export default LoginForm