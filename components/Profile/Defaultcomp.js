import React from 'react';
import SemicircleProgress from './SemicircleProgress';
import ExerciseProgress from './ExerciseProgress';
import WeeklyPointsGraph from './WeeklyPointsGraph';
import StatCard from './StatCard';
import { FaMedal, FaTrophy, FaCrown, FaChartLine, FaStar } from 'react-icons/fa';
import styles from '../../src/styles/Profile/ProfilePage.module.css';

const Defaultcomp = ({lesson, length, sections, filteredObject, group, userData, userRank, streak, thisWeeksScores, weeklyBest, weeklyAverage, monthlyBest, monthlyAverage, totalScores}) => {

  return (
    <div className={styles.page}>
      <div className={styles.topSection}>
        <div className={styles.left}>
          <SemicircleProgress progress={75} length={length} lesson={lesson} sections={sections} filteredObject={filteredObject}/>
        </div>
        <div className={styles.right}>
          <ExerciseProgress lesson={lesson} length={length} sections={sections} filteredObject={filteredObject} group={group}/>
        </div>
      </div>
      <div className={styles.bottomSection}>
        <div className={styles.graphContainer}>
          <WeeklyPointsGraph thisWeeksScores={thisWeeksScores}/>
          <div className={styles.belowcontainer}>
            <StatCard 
              title="Best Score" 
              value="1300" 
              description="Your best performance" 
              Icon={FaCrown} 
              iconColor="#f44336"  // Red icon container
              weeklyLabel="Weekly Best"
              weeklyValue={weeklyBest}
              monthlyLabel="Monthly Best"
              monthlyValue={weeklyBest > monthlyBest ? weeklyBest : monthlyBest} 
            />
            <StatCard 
              title="Avg Score" 
              value="1150" 
              description="Average score" 
              Icon={FaChartLine} 
              iconColor="#3f51b5"  // Indigo icon container
              weeklyLabel="Weekly Avg"
              weeklyValue={weeklyAverage}
              monthlyLabel="Monthly Avg"
              monthlyValue={monthlyAverage}
            />
          </div>
        </div>
        <div className={styles.statsContainer}>
          <StatCard 
            title="Total Points" 
            value={userData?.totalScore}
            description="Overall score" 
            Icon={FaStar} 
            iconColor="#2196f3"
          />
          <StatCard 
            title="Rank" 
            value={userRank ? userRank : totalScores.length+1} 
            description="Your current rank" 
            Icon={FaMedal} 
            iconColor="#ff9800"
          />
          <StatCard 
            title="Achievements" 
            value={streak} 
            description="Days streak" 
            Icon={FaTrophy} 
            iconColor="#9c27b0"  // Purple icon container
          />
        </div>
      </div>
    </div>
  );
};

export default Defaultcomp;
