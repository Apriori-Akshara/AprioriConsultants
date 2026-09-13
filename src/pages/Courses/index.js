import React from 'react'
import Navbar from '../../../components/NavbarJS'
import styles from '../../styles/Courses.module.css'
import {
  FaGraduationCap,
  FaChartLine,
  FaClipboardCheck,
  FaUserShield,
} from 'react-icons/fa'
import Link from 'next/link'
import { useSelector } from 'react-redux'

export default function Courses() {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Navbar />
      <div className={styles.coursesContainer}>
        <div className={styles.satEyebrow}>SAT PREPARATION</div>
        <h1 className={styles.header}>Build Your SAT Preparation Path</h1>
        <p className={styles.description}>
          Move from core concepts to advanced strategy and realistic Digital SAT
          practice through one connected learning path.
        </p>

        <div className={styles.boxesWrapper}>
          <Link href='/Courses/SATFoundation' className={styles.courseBox}>
            <span className={styles.iconBadge}>
              <FaGraduationCap className={styles.icon} />
            </span>
            <span className={styles.cardKicker}>BUILD THE BASE</span>
            <h2 className={styles.boxTitle}>SAT Foundation</h2>
            <p className={styles.boxDesc}>
              Strengthen core Verbal and Math skills through lessons, targeted
              drills, topic practice, and structured assessments.
            </p>
            <span className={styles.cardAction}>Explore Foundation →</span>
          </Link>

          <Link href='/Courses/SATAdvanced' className={styles.courseBox}>
            <span className={styles.iconBadge}>
              <FaChartLine className={styles.icon} />
            </span>
            <span className={styles.cardKicker}>RAISE YOUR CEILING</span>
            <h2 className={styles.boxTitle}>SAT Advanced</h2>
            <p className={styles.boxDesc}>
              Develop higher-level strategy, timing, and difficult-question
              skills for students aiming for stronger SAT performance.
            </p>
            <span className={styles.cardAction}>Explore Advanced →</span>
          </Link>

          <div className={`${styles.courseBox} ${styles.mockBox}`}>
            <span className={styles.iconBadge}>
              <FaClipboardCheck className={styles.icon} />
            </span>
            <span className={styles.cardKicker}>TEST DAY PRACTICE</span>
            <h2 className={styles.boxTitle}>Mock Tests</h2>
            <p className={styles.boxDesc}>
              Choose dedicated PSAT/NMSQT or Digital SAT mock tests and continue
              through the same validated adaptive test experience.
            </p>
            <div className={styles.mockButtons}>
              <Link href='/PSATMocks' className={styles.mockButton}>PSAT Mock Tests</Link>
              <Link href='/SATMocks' className={styles.mockButton}>SAT Mock Tests</Link>
            </div>
          </div>
        </div>

        {user?.admin && (
          <Link href='/Admin' className={styles.adminDashboard}>
            <FaUserShield className={styles.adminIcon} />
            <div>
              <h3>Admin Dashboard</h3>
              <p>
                Access course management, student progress tracking, and analytics.
                For authorized administrators only.
              </p>
            </div>
          </Link>
        )}
      </div>
    </>
  )
}
