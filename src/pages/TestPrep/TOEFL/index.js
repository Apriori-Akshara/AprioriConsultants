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
      <div className={styles.heading}>About the <span>TOEFL EXAM</span></div>
      <h1>WHAT IS THE TOEFL EXAM?</h1>
      <p>Test of English as a Foreign Language (abbreviated as TOEFL) is a standardized test of the English language for non-native English speakers. The test is accepted across 11,000 universities in over 190 countries. The test is offered over 50 times a year, and there are 4,500 test centers in over 190 countries. The registration fee for the test is 185 USD however there can be some variations depending on the country where the test is being taken. For identification, the test taker must present a valid passport with their name, photographs, and signature. TOEFL can also be taken at home provided the test taker meets the Equipment and Environment Requirements. There is also no limit to the number of times the test can be taken.</p>
      <h2>What is on the TOEFL?</h2>
      <p>The TOEFL test has 4 sections — Listening, Reading, Writing, and Speaking — plus a 5-minute, unscored Personal Video Statement.</p>
      <p>The total test takes about 1 ½ hours to complete, not including check in.</p>
      <div className={styles.imgc}>
        <Image className={styles.img} src={'/testpreppage/ss5.png'} height={500} width={500} alt='img'/>
        <div>Table 1: Overview of the TOEFL exam</div>
      </div>
    <ul>
      <li>The time and number of questions are approximate and can vary due to the adaptive format of the test. The test you take may include some unscored questions — either in the Listening and Writing sections, or in the Reading section. These questions are for research purposes and don’t count toward your score.</li>
    </ul>

    </div>
    </div>
  )
}