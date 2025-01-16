import React, { useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";

const QuestionForm = ({ refreshQuestions }) => {
    const [question, setQuestion] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("No auth token found");
            }
            console.log("Using token:", token)
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_POST_QUESTION_PORT}`,
                { question_text: question },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            console.log("Question posted successfully:", response.data)
            setQuestion("")
            refreshQuestions()
        } catch (error) {
            console.error("Error posting question:", error)
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
        </form>
    )
}


export default QuestionForm