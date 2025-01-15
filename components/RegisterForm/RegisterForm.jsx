import React from "react";
import cookie from "js-cookie";
import axios from "axios";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const router = useRouter()

    const onRegister = async () => {
        setError("")

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

        } catch (error) {
            console.error("Error registering:", error.response ? error.response.data : error.message)
        }
    }

}