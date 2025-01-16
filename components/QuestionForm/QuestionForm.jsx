import React, { useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";

const QuestionForm = () => {
    const [question, setQuestion] = useState("");

    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.question_wrapper}>

                    <label htmlFor="question">Ask a question :</label>

                    <textarea className={styles.question} id=""></textarea>

                    <button type="submit" className={styles.submitBtn}>Submit</button>

                </div>
            </div>
        </>
    )
}

export default QuestionForm