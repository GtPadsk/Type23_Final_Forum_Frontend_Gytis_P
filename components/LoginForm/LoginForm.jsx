import React, { useState } from 'react'
import cookie from 'js-cookie';
import axios from 'axios'
import styles from "@/components/LoginForm/styles.module.css"
import { useRouter } from 'next/navigation'

const LoginForm = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const router = useRouter()

    const onLogin = async () => {
        setError("")

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

            console.log(response)

            if (response.status === 200) {
                cookie.set("token", response.data.token)
                router.push("/")
            }

        } catch (error) {
            console.error("Error logging in:", error.response ? error.response.data : error.message)
            console.log("Login response received", response)
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
                <button onClick={onLogin}>Login</button>
                <br />
                <a href="#" className={styles.link}>Forgot Password?</a>

            </div>
        </>

    )

}


export default LoginForm