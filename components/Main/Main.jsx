import React from "react";
import styles from "./styles.module.css";
import QuestionForm from "../QuestionForm/QuestionForm";
import Card from "../Card/Card";

const Main = () => {
    return (
        <>
            <div className={styles.wrapper}>
                <QuestionForm />
                <Card />


            </div>
        </>
    )
};

export default Main;