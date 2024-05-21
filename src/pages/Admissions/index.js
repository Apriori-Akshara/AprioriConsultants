import Image from 'next/image'
import React from 'react'
import Navbar from '../../../components/navbar'
import styles from '../../styles/home/admissions/admissions.module.css'
import { FaCheck } from "react-icons/fa";

export default function index() {
  return (
    <div>
      <Navbar />
      <div className={styles.contopicc}>
        <div className={styles.tint}></div>
      <div className={styles.contopic}>Admissions</div>
    </div>

    <div className={styles.cards}>
      <div className={styles.card1}>
        <div className={styles.topic1}>Step 1</div>
        <div className={styles.topic2}>STANDARDIZED TESTING</div>
        <ul>
          <li>Enroll with us for SAT/ ACT/ GRE/ GMAT/ IELTS/ TOEFL</li>
          <li>Achieve your target scores with the best trainers in the industry</li>
          <li>Avail of our merit-based scholarship</li>
        </ul>
      </div>

      <div className={styles.card1}>
        <div className={styles.topic1}>Step 2</div>
        <div className={styles.topic2}>PROFILE BUILDING</div>
        <ul>
          <li>Gain a customised strategy with precise timelines</li>
          <li>Discuss internships and research projects</li>
          <li>Explore impactful community engagements</li>
          <li>Discover ways to express your passions</li>
        </ul>
      </div>

      <div className={styles.card1}>
        <div className={styles.topic1}>Step 3</div>
        <div className={styles.topic2}>APPLICATIONS</div>
        <ul>
          <li>Shortlist your best fit colleges</li>
          <li>Submit engaging essays and impressive LORs</li>
          <li>Complete the Common App and other related forms seamlessly</li>
          <li>Prepare for college admission interviews with confidence</li>
        </ul>
      </div>
    </div>

    <div className={styles.container}>
      <div className={styles.flex}>
        <div className={styles.imgcont}>
          <Image className={styles.img} src={'/admissions/ourvision.jpg'} width={500} height={500} alt='img'/>
        </div>
        <div>
          <div className={styles.topic}>Our <span>Vision</span></div>
          <div>We guide you every step of the way to create a profile that highlights your</div>
          <div className={styles.grid}>
            <div className={styles.item}><FaCheck className={styles.icon}/>PASSION</div>
            <div className={styles.item}><FaCheck className={styles.icon}/>TALENT</div>
            <div className={styles.item}><FaCheck className={styles.icon}/>INITIATIVE</div>
            <div className={styles.item}><FaCheck className={styles.icon}/>IMPACT</div>
          </div>
          <div>Our vision is to create an inclusive platform that empowers learners of all ages and backgrounds to acquire knowledge, develop critical thinking skills, and foster a lifelong love for learning. Through engaging content, interactive courses, and collaborative communities, we aim to make education accessible, relevant, and enjoyable. Our commitment is to inspire curiosity, promote creativity, and prepare individuals for success in an ever-evolving world</div>
        </div>
      </div>
      <div className={styles.flex2}>
        <div className={styles.imgcont}>
          <Image className={styles.img} src={'/admissions/goal.png'} width={500} height={500} alt='img'/>
        </div>
        <div>
        <div className={styles.topic}>Our <span>Goal</span></div>
        <div>We are committed towards providing unmatched mentoring services to help students reach the college of their dream.

We aim to assist students and their families in the college application process from the very beginning by building a stellar profile that is best suited to the student’s personal aptitude and future goals.<br/>

Our process is focused on developing personal and meaningful relationships with the students and their families and then charting the best course of action to achieve their goals.</div>
        </div>
      </div>

      <div className={styles.flex3}>
        <div className={styles.imgcont}>
          <Image className={styles.img} src={'/admissions/1.jpg'} width={500} height={500} alt='img'/>
        </div>
        <div>
        <div className={styles.topic}><span>Focussed</span> Strategy and Planning </div>
        <div>Through one-on-one counselling sessions, we uncover the student's personal goals and passions and utilise this knowledge to provide a customized plan. In addition, we provide guidance for relevant internships, community service, and academic research projects which ensure that the student receives every opportunity to create a well- rounded profile.</div>
        </div>
      </div>
    </div>

    </div>
  )
}
