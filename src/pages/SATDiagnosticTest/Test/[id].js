'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import questionsData from '@/data/questions.json';
import testsData from '@/data/tests.json';
import QuestionGrid from '../../../../components/SATTest/QuestionsGrid';
import styles from './Test.module.css'; // Adjust the path as necessary
import Navbar from '../../../../components/NavbarJS';

export default function TestSectionPage() {
  const router = useRouter();
  const { id } = router.query; // Get the id from the URL
  const test = testsData.find((t) => t.id === Number(id));
  const [englishresult, setEnglishresult] = useState(0);
  const [mathresult, setMathresult] = useState(0);
  console.log(id)

  if (!id) return <p>Loading...</p>;

  // Filter questions based on type
  const englishQuestions = questionsData[id]?.filter((q) => q.type === 'english');
  const easyenglishQuestions = questionsData?.[id]?.[53].englisheasy
  const medenglishQuestions = questionsData[id][54].englishmedium
  const hardenglishQuestions = questionsData[id][55].englishhard
  const mathQuestions = questionsData[id]?.filter((q) => q.type === 'math');
  const easymathQuestions = questionsData[id][50].matheasy
  const medmathQuestions = questionsData[id][51].mathmedium
  const hardmathQuestions = questionsData[id][52].mathhard

  const [currentStep, setCurrentStep] = useState('english'); // Track the current step
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [easyModule2Index, setEasyModule2Index] = useState(0); // Add this for the easy module 2
  const [breakTimeLeft, setBreakTimeLeft] = useState(10 * 60); // 10 minutes for the break
  const [testTimeLeft, setTestTimeLeft] = useState(75 * 60); // 75 minutes for each test
  const [answers, setAnswers] = useState({}); // Stores answers for each question
  const [adaptiveEnglishQuestions, setAdaptiveEnglishQuestions] = useState([]);
  const [adaptiveMathQuestions, setAdaptiveMathQuestions] = useState([]);

  console.log(adaptiveEnglishQuestions, adaptiveMathQuestions);

const handleAnswer = (index, value) => {
  let questionType = '';
  if (currentStep === 'english'){
  questionType = 'english';
  } else if (currentStep === 'english-module2') {
  questionType = 'english-module2';
  } else if (currentStep === 'math'){
    questionType = 'math';
  } else if (currentStep === 'math-module2') {
    questionType = 'math-module2';
  }
  const uniqueKey = `${currentStep}-${index}`; // Create a unique key for each question
  setAnswers((prev) => ({
    ...prev,
    [uniqueKey]: { value, type: questionType }, // Store the answer and type
  }));
};

const countCorrectAnswers = (step) => {
  // step should be 'english' or 'math'
  const questions = step === 'english' ? englishQuestions : mathQuestions;
  let correct = 0;
  questions.forEach((q, idx) => {
    const key = `${step}-${idx}`;
    if (
      answers[key] &&
      answers[key].value === q.answer
    ) {
      correct++;
    }
  });
  return correct;
};

  useEffect(() => {
    let timer;
    if (currentStep === 'break') {
      timer = setInterval(() => {
        setBreakTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else if (currentStep === 'english' || currentStep === 'math') {
      timer = setInterval(() => {
        setTestTimeLeft((prev) => {
          if (prev <= 1) {
            // Automatically submit the test when time runs out
            if (currentStep === 'english') {
              setCurrentStep('break');
              setCurrentQuestionIndex(0);
              setTestTimeLeft(75 * 60); // Reset timer for Math
            } else if (currentStep === 'math') {
              handleEndTest();
            }
          }
          return prev > 0 ? prev - 1 : 0;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [currentStep]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' + s : s}`;
  };

  const handleNext = () => {
    if (currentStep === 'english' && currentQuestionIndex < englishQuestions.length - 1) {
      setCurrentQuestionIndex((i) => i + 1);
    } else if (currentStep === 'english' && currentQuestionIndex === englishQuestions.length - 1) {
      const correct = countCorrectAnswers('english');
      setEnglishresult(correct);

      // SAT-style adaptive logic
      let nextSet = easyenglishQuestions;
      if (correct >= 15) {
        nextSet = hardenglishQuestions;
      } else if (correct >= 8) {
        nextSet = medenglishQuestions;
      }
      setAdaptiveEnglishQuestions(nextSet);
      setCurrentStep('english-module2');
      setCurrentQuestionIndex(0);
    } else if (currentStep === 'english-module2' && currentQuestionIndex < easyenglishQuestions.length - 1) {
      setCurrentQuestionIndex((i) => i + 1);
    } else if (currentStep === 'english-module2' && currentQuestionIndex === easyenglishQuestions.length - 1) {
      setCurrentStep('break');
      setCurrentQuestionIndex(0);
      setBreakTimeLeft(10 * 60);
      setTestTimeLeft(75 * 60);
    } else if (currentStep === 'math' && currentQuestionIndex < mathQuestions.length - 1) {
      setCurrentQuestionIndex((i) => i + 1);
    } else if (currentStep === 'math' && currentQuestionIndex === mathQuestions.length - 1) {
      const correct = countCorrectAnswers('math');
      setMathresult(correct);

      // SAT-style adaptive logic for Math
      let nextSet = easymathQuestions;
      if (correct >= 15) {
        nextSet = hardmathQuestions;
      } else if (correct >= 8) {
        nextSet = medmathQuestions;
      }
      setAdaptiveMathQuestions(nextSet);
      setCurrentStep('math-module2');
      setCurrentQuestionIndex(0);
    } else if (currentStep === 'math-module2' && currentQuestionIndex < easymathQuestions.length - 1) {
      setCurrentQuestionIndex((i) => i + 1);
    } else if (currentStep === 'math-module2' && currentQuestionIndex === easymathQuestions.length - 1) {
      handleEndTest();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((i) => i - 1);
    }
  };

  const handleSubmitEnglish = () => {
    const correctEnglish = countCorrectAnswers('english');
    setEnglishresult(correctEnglish);
    setCurrentStep('break');
    setCurrentQuestionIndex(0);
    setTestTimeLeft(75 * 60);
  };

  const handleSkipBreak = () => {
    setCurrentStep('math'); // Skip the break and move to the Math test
    setCurrentQuestionIndex(0); // Reset question index for Math
  };

  const handleEndBreak = () => {
    setCurrentStep('math'); // End the break and move to the Math test
    setCurrentQuestionIndex(0); // Reset question index for Math
  };

  const handleEndTest = () => {
    const correctMath = countCorrectAnswers('math');
    setMathresult(correctMath);
    router.push({
      pathname: '/SATDiagnosticTest/results',
      query: { id, answers: JSON.stringify(answers),
      englishModule2Questions: JSON.stringify(adaptiveEnglishQuestions),
      mathModule2Questions: JSON.stringify(adaptiveMathQuestions) },
    });
  };

  const currentQuestions =
    currentStep === 'english'
      ? englishQuestions
      : currentStep === 'english-module2'
      ? adaptiveEnglishQuestions
      : currentStep === 'math'
      ? mathQuestions
      : currentStep === 'math-module2'
      ? adaptiveMathQuestions
      : [];
  const currentQuestion = currentQuestions?.[currentQuestionIndex];

  if (!test || (currentStep !== 'break' && !currentQuestion)) return <p className="p-4">Loading...</p>;

  return (
        <>
              <Navbar />
 <div className={styles.outerContainer}>
      {currentStep === 'break' ? (
        <div className={styles.breakSection}>
          <h2>Take a Break</h2>
          <p>
            You have a 10-minute break before the Math test. Relax and prepare yourself!
          </p>
          <p className={styles.time}>⏱ {formatTime(breakTimeLeft)}</p>
          <div className={styles.buttonGroup}>
            <button onClick={handleSkipBreak} className={`${styles.btn} ${styles.btnBlue}`}>
              Skip Break
            </button>
            {breakTimeLeft === 0 && (
              <button onClick={handleEndBreak} className={`${styles.btn} ${styles.btnGreen}`}>
                Start Math Test
              </button>
            )}
          </div>
        </div>
      ) : (
       <div className={styles.testMain}>
          <div className={styles.headerRow}>
            <h2>
              {currentStep === 'english'
                ? 'English Test'
                : currentStep === 'english-module2'
                ? 'English Test Module 2'
                : currentStep === 'math'
                ? 'Math Test'
                : 'Math Test Module 2'}
            </h2>
            <div className={styles.timeInfo}>
              Time Left: ⏱ {formatTime(testTimeLeft)} <br />
              <div>Question {currentQuestionIndex + 1} of {currentQuestions.length}</div>
            </div>
          </div>
          <div className={styles.questionCard}>
            <div
              className={styles.questionText}
              dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
            ></div>
            <div className={styles.optionsGrid}>
              {currentQuestion.options.map((option, index) => (
                <label key={index} className={styles.optionLabel}>
                  <input
                    type="radio"
                    name={`question-${currentQuestionIndex}`}
                    value={option}
                    checked={answers[`${currentStep}-${currentQuestionIndex}`]?.value === option}
                    onChange={() => handleAnswer(currentQuestionIndex, option)}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div className={styles.buttonRow}>
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className={`${styles.btn} ${styles.btnGreen} ${currentQuestionIndex === 0 ? styles.btnDisabled : ''}`}
            >
              Previous
            </button>
            {currentStep === 'english' &&
            currentQuestionIndex === englishQuestions.length - 1 ? (
              <button onClick={handleNext} className={`${styles.btn} ${styles.btnPurple}`}>
                Next English Module
              </button>
            ) : currentStep === 'english-module2' &&
              currentQuestionIndex === adaptiveEnglishQuestions.length - 1 ? (
              <button onClick={handleNext} className={`${styles.btn} ${styles.btnPurple}`}>
                Finish English &amp; Take Break
              </button>
            ) : currentStep === 'math' &&
              currentQuestionIndex === mathQuestions.length - 1 ? (
              <button onClick={handleNext} className={`${styles.btn} ${styles.btnPurple}`}>
                Next Math Module
              </button>
            ) : currentStep === 'math-module2' &&
              currentQuestionIndex === adaptiveMathQuestions.length - 1 ? (
              <button onClick={handleNext} className={`${styles.btn} ${styles.btnPurple}`}>
                Finish &amp; See Results
              </button>
            ) : (
              <button onClick={handleNext} className={`${styles.btn} ${styles.btnGreen}`}>
                Next
              </button>
            )}
          </div>
        </div>
      )}

      {currentStep !== 'break' && (
        <QuestionGrid
          totalQuestions={currentQuestions.length}
          currentIndex={currentQuestionIndex}
          answers={answers}
          onSelectQuestion={setCurrentQuestionIndex}
          currentStep={currentStep} // Pass currentStep as a prop
        />
      )}
    </div>
     </>
  );
}