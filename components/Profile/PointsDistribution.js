// components/PointsDistribution.jsx
import React from 'react';
import styles from '../../src/styles/Profile/PointsDistribution.module.css';

const PointsDistribution = () => {
  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>Points Distribution</h3>
      <div className={styles.inner}>
        <ul className={styles.list}>
          <li>
            <span className={styles.attempt}>1st Attempt:</span> <strong>+10</strong>
          </li>
          <li>
            <span className={styles.attempt}>2nd Attempt:</span> <strong>+5</strong>
          </li>
          <li>
            <span className={styles.attempt}>3+ Attempts:</span> <strong>+3</strong>
          </li>
        </ul>
        <div className={styles.bonus}>
          <p className={styles.bonusHeading}>Bonus points for accuracy:</p>
          <ul className={styles.bonusList}>
            <li>
              <span className={styles.accuracy}>Accuracy ≥ 90%:</span> <strong>2X</strong>
            </li>
            <li>
              <span className={styles.accuracy}>Accuracy 75-90%:</span> <strong>1X</strong>
            </li>
            <li>
              <span className={styles.accuracy}>Accuracy below 75%:</span> <strong>.5X</strong>
            </li>
          </ul>
        </div>
        <div className={styles.bonus}>
          <p className={styles.bonusHeading}>Daily Rewards:</p>
          <ul className={styles.bonusList}>
            <li>
              <span className={styles.accuracy}>For first attempt of the day:</span> <strong>+50</strong>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PointsDistribution;
