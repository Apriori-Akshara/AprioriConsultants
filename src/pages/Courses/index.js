import React from 'react'
import Navbar from '../../../components/NavbarJS'
import styles from '../../styles/Courses.module.css'
import { FaGraduationCap, FaChartLine, FaUserShield } from 'react-icons/fa'
import Link from 'next/link'

export default function Courses() {
  return (
    <>
      <Navbar />
      <div className={styles.coursesContainer}>
        <h1 className={styles.header}>Courses</h1>
        <p className={styles.description}>
          At Apriori EduSolutions, we offer comprehensive SAT preparation courses designed to help students excel. Choose from our Foundation or Advanced tracks to match your current level and goals.
        </p>
        <div className={styles.boxesWrapper}>
          <Link href='/Courses/SATFoundation' className={styles.courseBox}>
            <FaGraduationCap className={styles.icon} />
            <h2 className={styles.boxTitle}>SAT Foundation</h2>
            <p className={styles.boxDesc}>
              Build a strong base in SAT Math, Reading, and Writing. Ideal for students starting their SAT journey or looking to solidify core concepts.
            </p>
          </Link>
          <Link href='/Courses/SATAdvanced' className={styles.courseBox}>
            <FaChartLine className={styles.icon} />
            <h2 className={styles.boxTitle}>SAT Advanced</h2>
            <p className={styles.boxDesc}>
              Tackle advanced SAT strategies, timed practice, and high-difficulty questions. Perfect for students aiming for top scores and scholarship opportunities.
            </p>
          </Link>
        </div>
        <Link href='/Admin' className={styles.adminDashboard}>
          <FaUserShield className={styles.adminIcon} />
          <div>
            <h3>Admin Dashboard</h3>
            <p>
              Access course management, student progress tracking, and analytics. For authorized administrators only.
            </p>
          </div>
        </Link>
      </div>
    </>
  )
}
