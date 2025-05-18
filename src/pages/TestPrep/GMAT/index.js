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
      <div className={styles.contopic}>Test Preparation Postgrad</div>
    </div>

    <div className={styles.container}>
      <div className={styles.heading}>About the <span>GMAT</span></div>
      <h1>WHAT IS GMAT?</h1>
      <p>The Graduate Management Admissions Test (GMAT) is a 3-hour and 7 minutes long standardized test used for admission in graduate management programs of business schools for universities across the world. In fact, the GMAT scores are used for admission selection in more than 7,700 programs at 2,400 universities and organizations in 110 countries. The exam is offered multiple times a year and has a registration fee of USD 275. A noteworthy point about the GMAT is that it cannot be attempted more than five times, out of which the online GMAT can only be taken a maximum of two times.</p>
      <h2>What is on the GMAT?</h2>
      <p>The GMAT Exam has four separately timed sections. You will have the opportunity to take two optional eight-minute breaks during the exam. A brief description of the four sections is as follows:</p>
      
      <div className={styles.imgc}>
        <Image className={styles.img} src={'/testpreppage/ss7.png'} height={500} width={500} alt='img'/>
        <div>Table 1: Marks and Time distribution for the GMAT</div>
      </div>
      <div className={styles.imgc}>
        <Image className={styles.img} src={'/testpreppage/3.png'} height={500} width={500} alt='img'/>
        <div>Graph 1: GMAT Quant Concepts by frequency</div>
      </div>

    </div>
    </div>
  )
}