// components/QuestionGrid.tsx

import React from "react";
import styles from "./QuestionGrid.module.css";

export default function QuestionGrid({ totalQuestions, currentIndex, answers, onSelectQuestion, currentStep }) {
  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>Question Grid</h3>
      <div className={styles.grid}>
        {Array.from({ length: totalQuestions }).map((_, index) => {
          const uniqueKey = `${currentStep}-${index}`;
          let variant = styles.default; // Default color
          if (answers[uniqueKey]?.value) {
            variant = styles.answered; // Answered
          } else if (index < currentIndex) {
            variant = styles.skipped; // Skipped
          }

          return (
            <button
              key={index}
              onClick={() => onSelectQuestion(index)}
              className={`${styles.button} ${variant}`}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}
