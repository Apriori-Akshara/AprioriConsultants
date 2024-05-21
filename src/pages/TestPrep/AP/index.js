import Image from 'next/image'
import React from 'react'
import Navbar from '../../../../components/navbar'
import styles from '../../../styles/home/testprep/testpreppages.module.css'

export default function index() {
  return (
    <div>
      <Navbar />
      <div className={styles.contopicc}>
        <div className={styles.tint}></div>
      <div className={styles.contopic}>Test Preparation Undergrad</div>
    </div>

    <div className={styles.container}>
      <div className={styles.heading}>About the <span>AP</span></div>
      <h1>WHAT IS AP?</h1>
      <p><b>Advanced Placement</b> (abbreviated as AP) is a program offered by College Board that provides high-school students with college-level curricula. The Advanced Placement Program offers 34 courses and exams across mathematics, sciences, social sciences, arts, and world language, but individual schools and test centers determine the subjects to be offered.<b>In India, 22 different AP exam courses are available for you to choose from.</b></p>
      <p>The Advanced Placement exams' duration can vary from 90 minutes to 200 minutes, depending on the subject. The exam consists of multiple-choice questions (MCQs) and a free-response section. The examination is generally offered in paper and pencil format. However, due to safety concerns related to the pandemic, the exam was also conducted online for some regions.</p>
      <p>The examination is generally offered in paper and pencil format. However, due to safety concerns related to the pandemic, the exam was also conducted online for some regions.</p>
      <h3>COMPONENTS OF THE AP EXAM:</h3>
      <p>First part of the exam comprises multiple choice questions. Candidate has to choose the answer out of four or five options. There is no negative marking if the student chooses an incorrect answer or the question is unattempted.</p>
      <p>While the second part requires students to respond in long format. It can be an essay, a solution to a problem, a spoken response.</p>

    </div>
    </div>
  )
}