import React, { useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";

const QuestionForm = () => {
    const [question, setQuestion] = useState("");
    const [authError, setAuthError] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        setAuthError("")

        try {
            const token = localStorage.getItem("token");

            if (!token) {
                setAuthError("You must log in to post a question.")
                return
            }

            // console.log("Using token:", token)
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_POST_QUESTION_PORT}`,
                { question_text: question },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                }
            )
            console.log("Question posted successfully:", response.data)
            setQuestion("")

        } catch (error) {
            console.error("Error posting question:", error)

            if (error.response && error.response.status === 401) {
                setAuthError("You must log in to post a question.")
            } else {
                console.error("Error posting question:", error)
            }

        }
    }
    return (
        <form onSubmit={handleSubmit} className={styles.question_wrapper}>
            <label htmlFor="questionText">Ask a question :</label>
            <textarea
                id="question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                required
            ></textarea>
            <button type="submit" className={styles.submitBtn}>Submit</button>
            {authError && <p className={styles.error}>{authError}</p>}
        </form>
    )
}


export default QuestionForm