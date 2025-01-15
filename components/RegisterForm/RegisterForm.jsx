import React from "react";
import cookie from "js-cookie";
import axios from "axios";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const RegisterForm = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const router = useRouter()

    const onRegister = async () => {
        console.log("Button clicked");
        setError("")
        setSuccess("")

        if (!name || !email || !password) {
            return setError("Please enter name, email and password to register")
        }

        try {
            const userData = {
                name,
                email,
                password
            }

            console.log("Registering with:", userData);

            const response = await axios.post(`${process.env.NEXT_PUBLIC_REGISTER_PORT}`, userData)

            console.log("Registration response recieved:", response)

            if (response.status === 200 || response.status === 201) {
                cookie.set('token', response.data.token)
                setSuccess("Congratulations, registration successful")
                setError("")
                setTimeout(() => router.push("/"), 1000)
                return
            } else {
                console.log("Error: ", error)
                setError("Failed registration, please try again")
            }

        } catch (error) {
            console.error("Error registering:", error.response ? error.response.data : error.message)
            console.log("Full error object: ", error)
            setError("Failed registration, please try again")
        }
    }

    return (
        <>
            <div className={styles.wrapper}>
                <label htmlFor="name">Name :</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

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
                <button className={styles.submitBtn} onClick={onRegister}>Register</button>
                {error && <p className={styles.error}>{error}</p>}
                {success && <p className={styles.success}>{success}</p>}

            </div>
        </>
    )
}

export default RegisterForm