import React from 'react'
import { FaUsers } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";
import { FaGraduationCap } from "react-icons/fa6";
import styles from '../../src/styles/home/counter.module.css'

export default function Counters() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div><FaUsers className={styles.icon1}/></div>
        <div className={styles.numbers}>50</div>
        <div className={styles.class}>PROESSORS</div>
      </div>
      <div className={styles.card}>
        <div><FaBook className={styles.icon}/></div>
        <div className={styles.numbers}>15</div>
        <div className={styles.class}>CLASS TYPE</div>
      </div>
      <div className={styles.card}>
        <div><FaHouse className={styles.icon}/></div>
        <div className={styles.numbers}>40</div>
        <div className={styles.class}>CLASS ROOMS</div>
      </div>
      <div className={styles.card}>
        <div><FaGraduationCap className={styles.icon}/></div>
        <div className={styles.numbers}>2345</div>
        <div className={styles.class}>STUDENTS</div>
      </div>
    </div>
  )
}
