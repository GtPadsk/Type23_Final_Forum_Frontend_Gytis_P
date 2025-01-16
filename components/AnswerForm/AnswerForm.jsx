import React, { useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";

const AnswerForm = ({ questionId }) => {
    const [answer, setAnswer] = useState("");
    const [authError, setAuthError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setAuthError("");

        try {
            const token = localStorage.getItem("token");

            if (!token) {
                setAuthError("You must log in to post an answer.");
                return;
            }

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_POST_ANSWER_PORT}`,
                { answer_text: answer, question_id: questionId },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("Answer posted successfully:", response.data);
            setAnswer("");

        } catch (error) {
            console.error("Error posting answer:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.answer_wrapper}>
            <label htmlFor="answerText">Your answer:</label>
            <textarea
                id="answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                required
            ></textarea>
            <button type="submit" className={styles.submitBtn}>Submit Answer</button>
            {authError && <p className={styles.error}>{authError}</p>}
        </form>
    );
};

export default AnswerForm;
