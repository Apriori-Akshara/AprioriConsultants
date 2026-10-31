import React from "react";
import styles from "../../src/styles/home/ourcourses.module.css";
import CoursesSlider from "./CoursesSlider";

export default function Ourcourses() {
  return (
    <section
      className={styles.container}
      aria-labelledby="premium-services-heading"
    >
      <h2 id="premium-services-heading" className={styles.heading}>
        Our <span>Premium Services</span>
      </h2>
      <CoursesSlider />
    </section>
  );
}
