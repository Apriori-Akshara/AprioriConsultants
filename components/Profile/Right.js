import React, { forwardRef } from 'react'
import styles from '../../src/styles/Profileright.module.css'
import Defaultcomp from './Defaultcomp'
import Leaderboard from './Leaderboard'

const Right = forwardRef(function Right(props, ref) { const { length, selection, lesson, sections, filteredObject, group, userData, totalScores, userRank, streak, thisWeeksScores, weeklyBest, weeklyAverage, monthlyBest, monthlyAverage} = props;

  return (
    <div ref={ref} className={styles.container}>
        {selection.section !== 'Leader' ? 
          <Defaultcomp 
          lesson={lesson} 
          sections={sections} 
          filteredObject={filteredObject} 
          group={group} 
          userData={userData}
          userRank={userRank}
          length={length}
          streak={streak}
          thisWeeksScores={thisWeeksScores}
          weeklyBest={weeklyBest}
          weeklyAverage={weeklyAverage}
          monthlyBest={monthlyBest}
          monthlyAverage={monthlyAverage}
          totalScores={totalScores}
          /> : 
          <Leaderboard 
          lesson={lesson} 
          sections={sections}
          totalScores={totalScores}/>
        }
    </div>
  );
});

export default Right;