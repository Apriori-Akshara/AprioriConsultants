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
      <div className={styles.contopic}>Test Preparation Postgrad</div>
    </div>

    <div className={styles.container}>
      <div className={styles.heading}>About the <span>LSAT</span></div>
      <h1>WHAT IS LSAT?</h1>
      <p>The LSAT (Law School Admission Test) is a standardized test required for admission in law schools in countries such as the US, Canada, Australia etc. It is offered 6 times in a year (from 2018-19, before which it was only offered four times a year). The total duration of the exam is 3 hours and 30 minutes excluding all breaks. It is a paper-based test and contains 5 sections of 35 minutes each. The test is MCQ-based. One section is experimental and does not contribute to the final score of the candidate. A “good LSAT score” is dependent upon your target schools, and the top law schools have a steep demand in terms of the score (170+ out of 180).</p>
      <h2>WHAT ARE THE COMPONENTS OF THE LSAT?</h2>
      <ol>
        <li>Logical Reasoning (2 sections): the section tests the candidate’s ability to analyze, think critically, and evaluate an argument on its objective merits.</li>
        <li>Reading Comprehension (1 section): the section tests the ability to derive information from complex written text, make relevant connections and glean insights.</li>
        <li>Analytical Reasoning (1 section): the section tests the ability to interpret the make-up of relationships and deriving logical reasoning about the structure at hand.</li>
      </ol>
      <p>Another 35 minute writing section (unscored) is administered at the end of the test, which is sent to all the schools.</p>
      
      <div className={styles.imgc}>
        <Image className={styles.img} src={'/testpreppage/ss8.png'} height={500} width={500} alt='img'/>
        <div>Table 1: Components of the LSAT</div>
      </div>

    </div>
    </div>
  )
}