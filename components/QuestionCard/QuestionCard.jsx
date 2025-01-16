import React from "react";
import styles from "./styles.module.css";

const QuestionCard = ({ question }) => {
    return (
        <div className={styles.card}>
            <p>{question.question_text}</p>
        </div>);
};

export default QuestionCard;
