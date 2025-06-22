// LeaderboardPage.jsx
import React from 'react';
import LeaderboardTable from './LeaderboardTable';
import PointsDistribution from './PointsDistribution';
import LastWeekTopPlayers from './LastWeekTopPlayers';
import styles from '../../src/styles/Profile/LeaderboardPage.module.css';

const LeaderboardPage = ({totalScores}) => {
  return (
    <div className={styles.page}>
      <div className={styles.topSection}>
        <div className={styles.left}>
          <LeaderboardTable totalScores={totalScores}/>
        </div>
        <div className={styles.rightside}>
        <div className={styles.bottomSection}>
        <LastWeekTopPlayers totalScores={totalScores}/>
      </div>
        <div className={styles.right}>
          <PointsDistribution />
        </div>
      </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
