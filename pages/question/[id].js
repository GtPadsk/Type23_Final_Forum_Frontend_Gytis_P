import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Header from "@/components/Header/Header"
import NavigationBar from "@/components/NavigationBar/NavigationBar"
import Footer from "@/components/Footer/Footer"
import styles from "./styles.module.css"
import axios from "axios"


const QuestionPage = () => {
    const router = useRouter()
    const { id } = router.query
    const [question, setQuestion] = useState(null)
    const [answers, setAnswers] = useState([])

    useEffect(() => {
        if (id) {
            const fetchQuestionAndAnswers = async () => {
                try {
                    const questionResponse = await axios.get(`${process.env.NEXT_PUBLIC_GET_QUESTIONS_PORT}/${id}`)
                    setQuestion(questionResponse.data)

                    const answersResponse = await axios.get(`${process.env.NEXT_PUBLIC_GET_ANSWERS_PORT}/question/${id}/answers`)
                    setAnswers(answersResponse.data)
                } catch (err) {
                    console.error("Error fetching question and answers:", err)
                }
            }

            fetchQuestionAndAnswers()
        }
    }, [id])

    return (
        <div>
            <Header />
            <NavigationBar />
            {question && (
                <div className={styles.wrapper}>
                    <h1>{question.question_text}</h1>
                    <div>{answers.length > 0 ? (
                        answers.map((answer) => (
                            <div key={answer._id}>
                                <p>{answer.answer_text}</p>
                            </div>
                        ))
                    ) : (
                        <p>No answers available</p>
                    )}
                    </div>
                </div>
            )}
            <Footer />
        </div>
    );
}

export default QuestionPage 
