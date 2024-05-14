import React from 'react'
import styles from "../../src/styles/home/ourcourses.module.css"
import CoursesSlider from "./CoursesSlider"

export default function Ourcourses() {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>Our <span>Courses</span></div>
      <div className={styles.headingtext}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem autem voluptatem obcaecati!</div>
      <div>
        <CoursesSlider />
      </div>
    </div>
  )
}
