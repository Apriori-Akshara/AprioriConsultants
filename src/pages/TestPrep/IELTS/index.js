import Image from 'next/image'
import React from 'react'
import Navbar from '../../../../components/NavbarJS'
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
      <div className={styles.heading}>About the <span>IELTS</span></div>
      <h1>WHAT IS THE IELTS EXAM?</h1>
      <p>IELTS stands for The International English Language Testing System. It is an international standardized test used to assess non-native English speakers' proficiency in the English language. The test scores are accepted in universities across UK, Australia, New Zealand, USA, and Canada. The results for the exam are available within 13 business days of taking the test. The registration fee for the exam is 250 USD, and the test center can send a maximum of five original copies of the results directly to the receiving institutions without additional charge.</p>
      <h3>GENERAL OVERVIEW</h3>
      <p>The IELTS Exam is divided into four sections:</p>
      <ol>
      <li>Listening</li>
      <li>Reading</li>
      <li>Writing</li>
      <li>Speaking</li>
      </ol>
      <p>A summary of what each section comprises of is given in the table below</p>
      <div className={styles.imgc}>
        <Image className={styles.img} src={'/testpreppage/ss4.png'} height={500} width={500} alt='img'/>
        <div>Table 1:Components of the IELTS exam</div>
      </div>

    </div>
    </div>
  )
}