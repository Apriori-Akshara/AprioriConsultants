// components/ExerciseProgress.jsx
import React from 'react';
import styles from '../../src/styles/Profile/ExerciseProgress.module.css';

const ExerciseProgress = ({length, lesson, sections = [], filteredObject = {}, group = []}) => {
      // Get lengths of each language array
      const lengthsObject = Object.fromEntries(
        Object.entries(filteredObject).map(([key, value]) => [key, value.length])
      );

  const progressData = [
    { label: 'SAT Diagnostic Test', progress: lesson[sections[0]]?.length || 6, finished: length},
  ];

  return (
    <div className={styles.big}>
    <div className={styles.container}>
      {progressData.map((item) => (
        <div key={item.label} className={styles.progressItem}>
          <div className={styles.label}>{item.label}</div>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${(item.finished/item.progress)*100 || 0}%` }}
            ></div>
          </div>
          <div className={styles.percentage}>{Math.floor((item.finished/item.progress)*100) || 0}%</div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default ExerciseProgress;
