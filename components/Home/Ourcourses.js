import React from 'react'
import styles from "../../src/styles/home/ourcourses.module.css"
import CoursesSlider from "./CoursesSlider"
import Reveal from '../../components/Reveal'

export default function Ourcourses() {
  return (
    <div className={styles.container}>
    
      <Reveal><div className={styles.heading}>Our <span>Premium Services</span></div></Reveal>
      <Reveal><div className={styles.headingtext}>
        {/* Unlock advanced knowledge with our exclusive Premium courses. Dive deeper into specialized subjects and gain a competitive edge. */}
        </div></Reveal>
      <div>
        <CoursesSlider />
      </div>
    </div>
  )
}
