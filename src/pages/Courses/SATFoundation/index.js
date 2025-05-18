import React from 'react'
import Navbar from '../../../../components/NavbarJS'
import styles from '../../../styles/SATFoundation.module.css'
import { FaBookOpen, FaClipboardCheck, FaClock, FaRegClock, FaListAlt, FaTasks, FaFileAlt } from 'react-icons/fa'

export default function SATFoundation() {
  return (
    <>
      <Navbar />
      <div className={styles.foundationContainer}>
        <h1 className={styles.header}>SAT Foundation</h1>
        <p className={styles.description}>
          The SAT Foundation course is designed to build a strong base in both Verbal and Math sections of the SAT. Explore structured lessons, targeted assignments, and a variety of practice opportunities to master every concept.
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
