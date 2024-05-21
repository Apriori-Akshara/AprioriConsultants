import Image from 'next/image'
import React from 'react'
import { SlCalender } from 'react-icons/sl'
import styles from '../../src/styles/home/news.module.css'
import Reveal from "../Reveal";

export default function News() {
  return (
    <div>
    <div className={styles.topcontainer}>
    <Reveal>
            <div className={styles.heading}>Our <span>Flagship</span> Programs</div>
    </Reveal>
<Reveal>
  <div className={styles.headingtext}>Embark on a multifaceted learning journey with our Flagship Programs. From fostering literacy and numeracy skills to unlocking the world of multilingualism, we empower curious minds across disciplines</div>
</Reveal>
      
    </div>

    <div className={styles.cards}>

    <Reveal>
      <div className={styles.card}>
        <div>
        <Image className={styles.img} src={'/events/1.jpg'} width={400} height={400} alt='img'/>
        </div>
        <div className={styles.textcontainer}>
          <div className={styles.text1}>ELITE READING CIRCLE</div>
          {/* <div className={styles.text2}>Admin | <SlCalender /> 21 July 2024</div> */}
          <div className={styles.text2}>In our Elite Reading Circles, passionate learners gather to discuss literary texts, fostering natural dialogue, critical thinking, and a passion for reading.</div>
          <div className={styles.text3}>Read More</div>
        </div>
      </div>
      </Reveal>

      <Reveal>
      <div className={styles.card}>
        <div>
        <Image className={styles.img} src={'/events/2.jpg'} width={400} height={400} alt='img'/>
        </div>
        <div className={styles.textcontainer}>
          <div className={styles.text1}>NO FEAR MATHEMATICS</div>
          {/* <div className={styles.text2}>Admin | <SlCalender /> 21 July 2024</div> */}
          <div className={styles.text2}>In our No Fear Mathematics approach, we dismantle myths and anxiety associated with math. We empower learners to embrace the subject with confidence and curiosity.</div>
          <div className={styles.text3}>Read More</div>
        </div>
      </div>
      </Reveal>

      <Reveal>
      <div className={styles.card}>
        <div>
        <Image className={styles.img} src={'/events/3.jpg'} width={400} height={400} alt='img'/>
        </div>
        <div className={styles.textcontainer}>
          <div className={styles.text1}>POLYGLOT CLUB</div>
          {/* <div className={styles.text2}>Admin | <SlCalender /> 21 July 2024</div> */}
          <div className={styles.text2}>Polyglot Club, the Language Exchange Social Network. Our community offers learners the opportunity to practice and learn foreign languages.</div>
          <div className={styles.text3}>Read More</div>
        </div>
      </div>
      </Reveal>

    </div>
    </div>
  )
}
