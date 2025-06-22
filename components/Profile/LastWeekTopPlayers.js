// components/LastWeekTopPlayers.jsx
import React from 'react';
import styles from '../../src/styles/Profile/LastWeekTopPlayers.module.css';
import { useSelector } from 'react-redux';

const LastWeekTopPlayers = ({ totalScores }) => {
  const {user} = useSelector((state) => state.auth);
  // Sort totalScores in descending order and take the top 3 players
  const sortedScores = [...totalScores]
    .sort((a, b) => b.performance.totalScore - a.performance.totalScore)

    const filteredScores = user.contest
  ? sortedScores.filter(data => data.active && data.name && data.contest === user.contest)
  : sortedScores.filter(data => data.active && data.name);

  // Arrange positions: center is 1st, right is 2nd, left is 3rd.
  const podium = {
    first: filteredScores[0] || { userId: 'N/A', performance: { totalScore: 0 } },
    second: filteredScores[1] || { userId: 'N/A', performance: { totalScore: 0 } },
    third: filteredScores[2] || { userId: 'N/A', performance: { totalScore: 0 } },
  };
  console.log(filteredScores[0])
  return (
    <div className={styles.container}>
      <h3>Last Week's Top 3</h3>
      <div className={styles.podium}>
        <div className={`${styles.podiumItem} ${styles.third}`}>
          <div className={styles.playerIcon}>🥉</div>
          <div className={styles.playerName}>{filteredScores[2]?.name ? filteredScores[2]?.name : podium.third.userId}</div>
          <div className={styles.podiumBlock}>
            <span className={styles.playerPoints}>{podium.third.performance.totalScore}</span>
          </div>
        </div>
        <div className={`${styles.podiumItem} ${styles.first}`}>
          <div className={styles.playerIcon}>👑</div>
          <div className={styles.playerName}>{filteredScores[0]?.name ? filteredScores[0].name :podium.first.userId}</div>
          <div className={styles.podiumBlock}>
            <span className={styles.playerPoints}>{podium.first.performance.totalScore}</span>
          </div>
        </div>
        <div className={`${styles.podiumItem} ${styles.second}`}>
          <div className={styles.playerIcon}>🥈</div>
          <div className={styles.playerName}>{filteredScores[1]?.name ? filteredScores[1].name : podium.second.userId}</div>
          <div className={styles.podiumBlock}>
            <span className={styles.playerPoints}>{podium.second.performance.totalScore}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LastWeekTopPlayers;
