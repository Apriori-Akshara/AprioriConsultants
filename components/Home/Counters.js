import React from 'react'
import { FaUsers } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";
import { FaGraduationCap } from "react-icons/fa6";
import styles from '../../src/styles/home/counter.module.css'
import Reveal from '../../components/Reveal'

export default function Counters() {
  return (

    <div className={styles.container}>

      <div className={styles.card}>
      <Reveal>
        <div><FaUsers className={styles.icon1}/></div>
        <div className={styles.numbers}>50</div>
        <div className={styles.class}>PROESSORS</div>
        </Reveal>
      </div>
      <div className={styles.card}>
      <Reveal>
        <div><FaBook className={styles.icon}/></div>
        <div className={styles.numbers}>15</div>
        <div className={styles.class}>CLASS TYPE</div>
        </Reveal>
      </div>
      <div className={styles.card}>
      <Reveal>
        <div><FaHouse className={styles.icon}/></div>
        <div className={styles.numbers}>40</div>
        <div className={styles.class}>CLASS ROOMS</div>
        </Reveal>
      </div>
      <div className={styles.card}>
      <Reveal>
        <div><FaGraduationCap className={styles.icon}/></div>
        <div className={styles.numbers}>2345</div>
        <div className={styles.class}>STUDENTS</div>
        </Reveal>
      </div>

    </div>

  )
}
