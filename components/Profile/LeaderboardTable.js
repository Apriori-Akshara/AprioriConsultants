import React from 'react';
import styles from '../../src/styles/Profile/LeaderboardTable.module.css';
import { BiUpArrowAlt, BiDownArrowAlt } from "react-icons/bi";
import { FaCrown } from "react-icons/fa6";
import { useSelector } from 'react-redux';

const LeaderboardTable = ({totalScores}) => {
const {user} = useSelector((state) => state.auth);
console.log("Total Scores:", user);
const filteredScores = user.contest
  ? totalScores.filter(data => data.active && data.name && data.contest === user.contest)
  : totalScores.filter(data => data.active && data.name);
  const sortedScores = [...filteredScores].sort((a, b) => b.performance.totalScore - a.performance.totalScore);
  return (
    <div className={styles.container}>
      <div className={styles.heading}>Leaderboard</div>
      {sortedScores.slice(0, 10).map((data, index) => (
        <div key={data.id} className={styles.card}>
          <div className={styles.flex1}>
            <div className={styles.rank}>
              {index === 0 ? (
                <FaCrown className={styles.cupIcon} />
              ) : index === 1 ? (<>🥈</>) : 
               index === 2 ? (<>🥉</>) : (
                <span>#{index + 1}</span>
              )}{" "}
              {data.name ? data.name : data.userId }
            </div>
            <span>
              {data.change === 'up' ? (
                <BiUpArrowAlt className={styles.up} />
              ) : (
                <BiDownArrowAlt className={styles.down} />
              )}
            </span>
          </div>
          <div className={styles.flex2}>
            points: <div className={styles.points}>{data.performance.totalScore}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LeaderboardTable;
