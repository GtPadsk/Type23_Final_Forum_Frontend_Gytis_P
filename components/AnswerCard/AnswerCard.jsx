import React from "react";
import styles from "./styles.module.css";

const AnswerCard = ({ answer }) => {
    return (
        <div className={styles.card}>
            <p>{answer.answer_text}</p>
        </div>
    );
};

export default AnswerCard;
