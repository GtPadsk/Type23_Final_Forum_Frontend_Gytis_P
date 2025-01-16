import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import QuestionForm from "../QuestionForm/QuestionForm";
import QuestionCard from "../QuestionCard/QuestionCard";
import axios from "axios";
import { useRouter } from "next/router";

const Main = () => {
    const [questions, setQuestions] = useState([])
    const router = useRouter()

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_GET_QUESTIONS_PORT}`)
                // console.log("Backend response:", response.data)
                if (Array.isArray(response.data.questions)) {
                    setQuestions(response.data.questions)
                    // console.log("Questions state updated:", response.data.questions)
                } else {
                    console.error("Unexpected response format:", response.data)
                }
            } catch (error) {
                console.error("Error fetching questions:", error)
            }
        }
        fetchQuestions();
    }, []);

    const questionClick = (id) => {
        router.push(`/question/${id}`)
    }

    return (
        <div className={styles.main}>
            <h1>Questions</h1>
            <QuestionForm />
            <div className={styles.cardContainer}>
                {questions.length > 0 ? (
                    questions.map((question) => (
                        <div
                            key={question._id}
                            className={styles.clickableCard}
                            onClick={() => questionClick(question._id)}
                        >
                            <QuestionCard question={question} />
                        </div>))
                ) : (
                    <p>No questions available</p>
                )}
            </div>
        </div>
    );
};

export default Main;