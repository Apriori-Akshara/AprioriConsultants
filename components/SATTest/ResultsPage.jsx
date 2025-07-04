import React, { useEffect } from "react";
import { useRouter } from "next/router";
import questionsData from "@/data/questions.json";
import styles from "./ResultPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addFinishedQuiz, updateCompletedQuizzes } from "@/Store";
import { addSingleFinishedQuizToServer } from "@/helperfunction/Finishedquiz";
import { sendQuizdata } from "@/helperfunction/SendQuizdata";

export default function ResultsPage({ answers }) {
  const router = useRouter();
  const { id, englishModule2Questions, mathModule2Questions } = router.query;
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  
  // Retrieve simple questions for English and Math
  const simpleEnglishQuestions = questionsData[id]?.filter((q) => q.type === "english") || [];
  const simpleMathQuestions = questionsData[id]?.filter((q) => q.type === "math") || [];

  // Parse the module2 questions passed from the test page
  const englishModule2 = englishModule2Questions ? JSON.parse(englishModule2Questions) : [];
  const mathModule2 = mathModule2Questions ? JSON.parse(mathModule2Questions) : [];

    const handleAddQuiz = async ({ questionType, quizId, subject }) => {
    // Update Redux state and localStorage
    dispatch(addFinishedQuiz({questionType, exercise:quizId, language:subject}));
    dispatch(updateCompletedQuizzes({ exercise: quizId, language: subject, questionTypes: questionType }));

    // Send the new finished quiz to the backend as a single object
    try {
      // First, try to update the quiz data
      let result;
      try {
        result = await addSingleFinishedQuizToServer({
          userId: user.userId,
          questionType,
          exercise: quizId,
          language: subject,
        });
        console.log("Finished quiz updated on server:", result);
      } catch (error) {
        console.error("Error with addSingleFinishedQuizToServer:", error.message);
        // Continue with the next operation even if this one fails
      }
      
      // Then, try to send the quiz data with points
      try {
        const add = await sendQuizdata({
          userId: user.userId,
          questionTypes: questionType,
          exercise: quizId,
          language: subject,
          points: totalMarks, // Set score to 100 points
        });
        console.log("Quiz points data sent successfully:", add);
      } catch (error) {
        console.error("Error with sendQuizdata:", error.message);
      }
    } catch (error) {
      console.error("General error in handleAddQuiz:", error);
    }
  };

  const calculateMarks = (questions, baseKey) => {
    return questions.reduce((total, question, index) => {
      // Try both (simple) key and module2 key if needed.
      const keySimple = `${baseKey}-${index}`;
      const keyModule2 = `${baseKey}-module2-${index}`;
      const answerSimple = answers[keySimple];
      const answerModule2 = answers[keyModule2];
      
      let isCorrect = false;
      if (answerSimple) {
        isCorrect = answerSimple.value === question.answer;
      } else if (answerModule2) {
        isCorrect = answerModule2.value === question.answer;
      }
      return total + (isCorrect ? 1 : 0);
    }, 0);
  };

  const englishSimpleMarks = calculateMarks(simpleEnglishQuestions, "english");
  const mathSimpleMarks = calculateMarks(simpleMathQuestions, "math");
  const englishModule2Marks = calculateMarks(englishModule2, "english-module2");
  const mathModule2Marks = calculateMarks(mathModule2, "math-module2");
  
  const totalEnglish = englishSimpleMarks + englishModule2Marks;
  const totalMath = mathSimpleMarks + mathModule2Marks;
  const totalMarks = totalEnglish + totalMath;
  const totalQuestions = simpleEnglishQuestions.length + englishModule2.length + simpleMathQuestions.length + mathModule2.length;

  useEffect(() => {
  if (user && id) {
    handleAddQuiz({ quizId: id, questionType: "MCQs", subject: "SAT" });
  }
}, [user, id]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Test Results</h1>
      <div className={styles.marks}>
        <p>Total Marks: {totalMarks} / {totalQuestions}</p>
      </div>

      {/* Simple English Test Section */}
      <h2 className={styles.title}>English Test</h2>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tableHeader}>
            <th>Question #</th>
            <th>Selected Answer</th>
            <th>Correct Answer</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {simpleEnglishQuestions.map((question, index) => {
            const uniqueKey = `english-${index}`;
            const answer = answers[uniqueKey];
            const isCorrect = answer?.value === question.answer;
            return (
              <tr key={index} className={isCorrect ? styles.correct : styles.wrong}>
                <td>{index + 1}</td>
                <td>{answer?.value || "Not Answered"}</td>
                <td>{question.answer}</td>
                <td>{isCorrect ? "✔️ Correct" : "❌ Wrong"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* English Test Module 2 Section */}
      <h2 className={styles.title}>English Test Module 2</h2>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tableHeader}>
            <th>Question #</th>
            <th>Selected Answer</th>
            <th>Correct Answer</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {englishModule2.map((question, index) => {
            const uniqueKey = `english-module2-${index}`;
            const answer = answers[uniqueKey];
            const isCorrect = answer?.value === question.answer;
            return (
              <tr key={index} className={isCorrect ? styles.correct : styles.wrong}>
                <td>{index + 1}</td>
                <td>{answer?.value || "Not Answered"}</td>
                <td>{question.answer}</td>
                <td>{isCorrect ? "✔️ Correct" : "❌ Wrong"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Simple Math Test Section */}
      <h2 className={styles.title}>Math Test</h2>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tableHeader}>
            <th>Question #</th>
            <th>Selected Answer</th>
            <th>Correct Answer</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {simpleMathQuestions.map((question, index) => {
            const uniqueKey = `math-${index}`;
            const answer = answers[uniqueKey];
            const isCorrect = answer?.value === question.answer;
            return (
              <tr key={index} className={isCorrect ? styles.correct : styles.wrong}>
                <td>{index + 1}</td>
                <td>{answer?.value || "Not Answered"}</td>
                <td>{question.answer}</td>
                <td>{isCorrect ? "✔️ Correct" : "❌ Wrong"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Math Test Module 2 Section */}
      <h2 className={styles.title}>Math Test Module 2</h2>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tableHeader}>
            <th>Question #</th>
            <th>Selected Answer</th>
            <th>Correct Answer</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {mathModule2.map((question, index) => {
            const uniqueKey = `math-module2-${index}`;
            const answer = answers[uniqueKey];
            const isCorrect = answer?.value === question.answer;
            return (
              <tr key={index} className={isCorrect ? styles.correct : styles.wrong}>
                <td>{index + 1}</td>
                <td>{answer?.value || "Not Answered"}</td>
                <td>{question.answer}</td>
                <td>{isCorrect ? "✔️ Correct" : "❌ Wrong"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}