import React from 'react';
import styles from '../../src/styles/Profile/SemicircleProgress.module.css';

const FullCircleProgress = ({lesson, sections, length, filteredObject}) => { 
   // Get lengths of each language array
  // Calculate total count of all unique exercises
  const totalExercisesCount = Object.values(filteredObject).reduce((sum, exercises) => sum + exercises.length, 0);
  let progress;
  const strokeWidth = 25;
  const viewWidth = 200;
  const viewHeight = 200; // full circle, so height equals width
  const radius = (viewWidth - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  // const safeProgress = Math.min(Math.max(progress, 0), 100)

  const totalLength = 6
  const dashOffset = circumference - ((length/totalLength)*100 / 100) * circumference;

  return (
    <div>
      <div className={styles.big}>
        <div>
          <div className={styles.heading}>Total Progress</div>
          <div className={styles.small}>{length}/{totalLength} Exercises completed</div>
        </div>
        <div className={styles.container}>
          <svg width="100%" height="100%" viewBox={`0 0 ${viewWidth} ${viewHeight}`}>
            <circle
              className={styles.bg}
              cx={viewWidth / 2}
              cy={viewHeight / 2}
              r={radius}
              fill="none"
              stroke="#eee"
              strokeWidth={strokeWidth}
            />
            <circle
              className={styles.progress}
              cx={viewWidth / 2}
              cy={viewHeight / 2}
              r={radius}
              fill="none"
              stroke="#9c27b0"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
              transform={`rotate(-90 ${viewWidth / 2} ${viewHeight / 2})`}
            />
          </svg>
          <div className={styles.text}>{Math.floor((length/totalLength)*100) || 0}%</div>
        </div>
      </div>
    </div>
  );
};

export default FullCircleProgress;
