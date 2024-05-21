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
      <div className={styles.heading}>About the <span>ACT</span></div>
      <h1>WHAT IS THE ACT TEST?</h1>
      <p>The ACT is a 3-hour-long standardized entrance exam. Many colleges require scores from the ACT or SAT tests as a part of the admissions process. These scores help colleges broadly gauge an idea of the student's academic abilities and accordingly make admissions decisions. Thus, the ACT score is a key component in college applications.</p>
      <p>The purpose of the ACT test is to measure a high school student's readiness for college and provide colleges with one common data point that can be used to compare all applicants. College admissions officers will review standardized test scores alongside the student's high school GPA, the classes they took in high school, letters of recommendation from teachers or mentors, extracurricular activities, admissions interviews, and personal essays. The importance gives to ACT scores in the college application process varies across different schools.</p>
      <p>Overall, the higher you score on the ACT and/or SAT, the more options for attending and paying for college will be available to you.</p>
      <h3>What is on the ACT?</h3>
      <p>There are four sections on the ACT:</p>
      <ol>
      <li>English</li>
      <li>Reading</li>
      <li>Math</li>
      <li>Science</li>
      </ol>
      <p>The ACT also includes an optional 40-minute Writing Test. Some colleges may require that you complete the ACT Writing Test.</p>
      <div className={styles.imgc}>
        <Image className={styles.img} src={'/testpreppage/ss2.png'} height={500} width={500} alt='img'/>
        <div>Table 1: Overview of the ACT sections</div>
      </div>
      <div className={styles.imgc}>
        <Image className={styles.img} src={'/testpreppage/ss3.png'} height={500} width={500} alt='img'/>
        <div>Table 2: Time alloted and questions per section</div>
      </div>

    </div>
    </div>
  )
}