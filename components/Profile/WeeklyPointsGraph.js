import styles from '../../src/styles/Profile/WeeklyPointsGraph.module.css';
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the necessary Chart.js components
ChartJS.register(PointElement, LineElement, CategoryScale, LinearScale, Tooltip, Legend);

const WeeklyPointsGraph = ({thisWeeksScores}) => {
  const data = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        label: 'Weekly Points',
        data: [
          thisWeeksScores.Sunday || 0,
          thisWeeksScores.Monday || 0, 
          thisWeeksScores.Tuesday || 0, 
          thisWeeksScores.Wednesday || 0, 
          thisWeeksScores.Thursday || 0, 
          thisWeeksScores.Friday || 0, 
          thisWeeksScores.Saturday || 0],
        fill: true, // Fill the area under the line
        backgroundColor: '#2196f3', // Translucent blue fill
        borderColor: '#2196f3',
        tension: 0.1,
        pointBackgroundColor: '#2196f3',
        pointBorderColor: '#fff',
        pointRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className={styles.chartContainer}>
      <h3>Weekly Points</h3>
      <div className={styles.chart}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default WeeklyPointsGraph;
