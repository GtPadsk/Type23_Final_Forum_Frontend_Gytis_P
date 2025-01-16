// import React, { useEffect, useState } from "react"
// import { useRouter } from "next/router"
// import axios from "axios"
// import styles from "../../styles.module.css"

// const QuestionPage = () => {
//     const router = useRouter()
//     const { id } = router.query
//     const [question, setQuestion] = useState(null)
//     const [answers, setAnswers] = useState([])

//     useEffect(() => {
//         if (id) {
//             const fetchQuestionAndAnswers = async () => {
//                 try {
//                     const questionResponse = await axios.get(`${process.env.NEXT_PUBLIC_GET_QUESTIONS_PORT}/${id}`)
//                     setQuestion(questionResponse.data)

//                     const answersResponse = await axios.get(`${process.env.NEXT_PUBLIC_GET_ANSWERS_PORT}/${id}`)
//                     setAnswers(answersResponse.data)
//                 } catch (err) {
//                     console.error("Error fetching question and answers:", err)
//                 }
//             }

//             fetchQuestionAndAnswers()
//         }
//     }, [id])

//     return (
//         <div className={styles.questionPage}>
//             <h1>{question.question_text}</h1>
//             <div className={styles.answersList}>
//                 {answers.length > 0 ? (
//                     answers.map((answer) => (
//                         <div key={answer._id} className={styles.answerItem}>
//                             <p>{answer.answer_text}</p>
//                         </div>
//                     ))
//                 ) : (
//                     <p>No answers available</p>
//                 )}
//             </div>
//         </div>
//     )
// }

// export default QuestionPage 
