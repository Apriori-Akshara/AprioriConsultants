import React from "react";
import Navbar from "../../../components/NavbarJS";
import styles from "../../styles/AdminDashboard.module.css";
import {
  FaBookOpen,
  FaClipboardCheck,
  FaClock,
  FaRegClock,
  FaListAlt,
  FaTasks,
  FaFileAlt,
  FaUser,
} from "react-icons/fa";
import Link from "next/link";

export default function AdminDashboard() {
  return (
    <>
      <Navbar />
      <div className={styles.dashboardContainer}>
        <h1 className={styles.header}>Admin Dashboard</h1>
        <div className={styles.buttonRow}>
          <Link href="/Slip/Payment">
            <button className={styles.actionButton}>Payment Slip</button>
          </Link>
          <Link href="/Slip/Payslip">
            <button className={styles.actionButton}>Salary Slip</button>
          </Link>
        </div>
        <div className={styles.dashboardContent}>
          <aside className={styles.sidebar}>
            <h2 className={styles.sidebarTitle}>Navigation</h2>
            <ul className={styles.sidebarList}>
              <li>
                <FaUser className={styles.sidebarIcon} /> Users
              </li>
              <li>
                <FaBookOpen className={styles.sidebarIcon} /> Lessons
              </li>
              <li>
                <FaClipboardCheck className={styles.sidebarIcon} /> Assignments
              </li>
              <li>
                <FaClock className={styles.sidebarIcon} /> Timed Drills
              </li>
              <li>
                <FaRegClock className={styles.sidebarIcon} /> Non-Timed Drills
              </li>
              <li>
                <FaListAlt className={styles.sidebarIcon} /> Exercises (Topic
                wise)
              </li>
              <li>
                <FaTasks className={styles.sidebarIcon} /> Section wise Tests
              </li>
              <li>
                <FaFileAlt className={styles.sidebarIcon} /> Practice Tests
              </li>
            </ul>
          </aside>
          <main className={styles.mainArea}>
            {/* Main dashboard content can go here */}
            <span style={{ opacity: 0.5 }}>
              Select an item from the sidebar to begin.
            </span>
          </main>
        </div>
      </div>
    </>
  );
}
