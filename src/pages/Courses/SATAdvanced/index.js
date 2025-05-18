import React from 'react'
import Navbar from '../../../../components/NavbarJS'
import styles from '../../../styles/SATAdvanced.module.css'
import { FaBookOpen, FaClipboardCheck, FaClock, FaRegClock, FaListAlt, FaTasks, FaFileAlt } from 'react-icons/fa'

export default function SATAdvanced() {
  return (
    <>
      <Navbar />
      <div className={styles.advancedContainer}>
        <h1 className={styles.header}>SAT Advanced</h1>
        <p className={styles.description}>
          The SAT Advanced course is designed for students aiming for top scores. Dive deep into advanced strategies, challenging assignments, and rigorous practice to master every aspect of the SAT.
        </p>
        <div className={styles.sectionsWrapper}>
          {/* Verbal Section */}
          <div className={styles.sectionCard}>
            <h2 className={styles.sectionTitle}>Verbal Lessons</h2>
            <div className={styles.cardsGrid}>
              <div className={styles.lessonCard}>
                <FaBookOpen className={styles.icon} />
                <span>Lessons</span>
              </div>
              <div className={styles.lessonCard}>
                <FaClipboardCheck className={styles.icon} />
                <span>Assignments</span>
              </div>
              <div className={styles.lessonCard}>
                <FaClock className={styles.icon} />
                <span>Timed Drills</span>
              </div>
              <div className={styles.lessonCard}>
                <FaRegClock className={styles.icon} />
                <span>Non-Timed Drills</span>
              </div>
              <div className={styles.lessonCard}>
                <FaListAlt className={styles.icon} />
                <span>Exercises (Topic wise)</span>
              </div>
              <div className={styles.lessonCard}>
                <FaTasks className={styles.icon} />
                <span>Section wise Tests</span>
              </div>
              <div className={styles.lessonCard}>
                <FaFileAlt className={styles.icon} />
                <span>Practice Tests</span>
              </div>
            </div>
          </div>
          {/* Math Section */}
          <div className={styles.sectionCard}>
            <h2 className={styles.sectionTitle}>Math Lessons</h2>
            <div className={styles.cardsGrid}>
              <div className={styles.lessonCard}>
                <FaBookOpen className={styles.icon} />
                <span>Lessons</span>
              </div>
              <div className={styles.lessonCard}>
                <FaClipboardCheck className={styles.icon} />
                <span>Assignments</span>
              </div>
              <div className={styles.lessonCard}>
                <FaClock className={styles.icon} />
                <span>Timed Drills</span>
              </div>
              <div className={styles.lessonCard}>
                <FaRegClock className={styles.icon} />
                <span>Non-Timed Drills</span>
              </div>
              <div className={styles.lessonCard}>
                <FaListAlt className={styles.icon} />
                <span>Exercises (Topic wise)</span>
              </div>
              <div className={styles.lessonCard}>
                <FaTasks className={styles.icon} />
                <span>Section wise Tests</span>
              </div>
              <div className={styles.lessonCard}>
                <FaFileAlt className={styles.icon} />
                <span>Practice Tests</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
