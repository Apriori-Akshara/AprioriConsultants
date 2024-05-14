import Image from 'next/image'
import React from 'react'
import { SlCalender } from 'react-icons/sl'
import styles from '../../src/styles/home/news.module.css'

export default function News() {
  return (
    <div>
    <div className={styles.topcontainer}>
      <div className={styles.heading}>Upcoming <span>Events</span></div>
      <div className={styles.headingtext}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem autem voluptatem obcaecati!</div>
    </div>

    <div className={styles.cards}>

      <div className={styles.card}>
        <div>
        <Image className={styles.img} src={'/events/1.jpg'} width={400} height={400} alt='img'/>
        </div>
        <div className={styles.textcontainer}>
          <div className={styles.text1}>POST TITLE HERE</div>
          <div className={styles.text2}>Admin | <SlCalender /> 21 July 2024</div>
          <div className={styles.text2}>Lorem ipsum dolor sit amet, consectetur adi isicing elit. Quas eveniet, nemo dicta. Ullam nam.</div>
          <div className={styles.text3}>Read More</div>
        </div>
      </div>

      <div className={styles.card}>
        <div>
        <Image className={styles.img} src={'/events/2.jpg'} width={400} height={400} alt='img'/>
        </div>
        <div className={styles.textcontainer}>
          <div className={styles.text1}>POST TITLE HERE</div>
          <div className={styles.text2}>Admin | <SlCalender /> 21 July 2024</div>
          <div className={styles.text2}>Lorem ipsum dolor sit amet, consectetur adi isicing elit. Quas eveniet, nemo dicta. Ullam nam.</div>
          <div className={styles.text3}>Read More</div>
        </div>
      </div>

      <div className={styles.card}>
        <div>
        <Image className={styles.img} src={'/events/3.jpg'} width={400} height={400} alt='img'/>
        </div>
        <div className={styles.textcontainer}>
          <div className={styles.text1}>POST TITLE HERE</div>
          <div className={styles.text2}>Admin | <SlCalender /> 21 July 2024</div>
          <div className={styles.text2}>Lorem ipsum dolor sit amet, consectetur adi isicing elit. Quas eveniet, nemo dicta. Ullam nam.</div>
          <div className={styles.text3}>Read More</div>
        </div>
      </div>

    </div>
    </div>
  )
}
