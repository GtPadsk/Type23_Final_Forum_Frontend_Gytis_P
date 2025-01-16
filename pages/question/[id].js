import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Header from "@/components/Header/Header"
import NavigationBar from "@/components/NavigationBar/NavigationBar"
import Footer from "@/components/Footer/Footer"
import AnswerCard from "@/components/AnswerCard/AnswerCard"
import axios from "axios"
import styles from "./styles.module.css"
import AnswerForm from "@/components/AnswerForm/AnswerForm"

const QuestionPage = () => {
    const [question, setQuestion] = useState(null);
    const [answers, setAnswers] = useState([]);

    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        if (id) {
            const fetchQuestionAndAnswers = async () => {
                try {

                    console.log('attempting to fetch question and answers for ID:', id);

                    const questionResponse = await axios.get(
                        `${process.env.NEXT_PUBLIC_GET_QUESTIONS_PORT}/${id}`
                    );
                    setQuestion(questionResponse.data)

                    console.log('Question fetched :', questionResponse.data);

                    console.log('attempting to fetch answers for ID:', id);

                    console.log(
                        `${process.env.NEXT_PUBLIC_GET_ANSWERS_PORT}/question/${id}/answers`
                    );
                    const answersResponse = await axios.get(
                        `${process.env.NEXT_PUBLIC_GET_ANSWERS_PORT}/question/${id}/answers`
                    );
                    console.log(answersResponse);

                    setAnswers(answersResponse.data.answers)
                    console.log("Answers fetched:", answersResponse.data)

                } catch (error) {
                    console.error("Error fetching question and answers:", error.message)
                }
            };


            fetchQuestionAndAnswers();
        }
    }, [id]);

    return (
        <div>
            <Header />
            <NavigationBar />
            {question && (
                <div className={styles.wrapper}>
                    <h1>{question.question_text}</h1>
                    <div>
                        {answers.length > 0 ? (
                            answers.map((answer) => (
                                <AnswerCard key={answer.id} answer={answer} />
                            ))
                        ) : (
                            <p>No answers available</p>
                        )}
                    </div>
                </div>
            )}
            <AnswerForm questionId={id} />
            <Footer />
        </div>
    );
};

export default QuestionPage;
