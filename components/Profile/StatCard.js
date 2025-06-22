import React from 'react';
import styles from '../../src/styles/Profile/StatCard.module.css';

const StatCard = ({ 
  title, 
  value, 
  description, 
  Icon, 
  iconColor,
  weeklyLabel,
  weeklyValue,
  monthlyLabel,
  monthlyValue
}) => {
  return (
    <div className={styles.card}>
      {Icon && (
        <div 
          className={styles.iconContainer} 
          style={{ background: iconColor || "#4caf50" }}
        >
          <Icon className={styles.icon} />
        </div>
      )}
      <h4 className={!weeklyLabel ? styles.title : styles.title1}>{title}</h4>
      
      {/* Render extra row if both weekly and monthly props are provided */}
      {weeklyLabel && monthlyLabel && (
        <div className={styles.extraRow}>
          <div className={styles.extraItem}>
            <span className={styles.extraLabel}>{weeklyLabel}</span>
            <span className={styles.extraValue}>{Math.floor(weeklyValue)}</span>
          </div>
          <div className={styles.extraItem}>
            <span className={styles.extraLabel}>{monthlyLabel}</span>
            <span className={styles.extraValue}>{Math.floor(monthlyValue)}</span>
          </div>
        </div>
      )}
      {!weeklyLabel && !monthlyLabel && <p className={styles.value}>{value}</p>}
      {!weeklyLabel && !monthlyLabel && <p className={styles.description}>{description}</p>}
      
    </div>
  );
};

export default StatCard;
