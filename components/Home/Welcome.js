import Image from 'next/image'
import React from 'react'
import styles from "../../src/styles/home/welcome.module.css"
import Reveal from '../../components/Reveal'
import Link from 'next/link'

export default function Welcome() {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
      <Reveal>
        <div>
          <div className={styles.headingtop}>WELCOME TO <span>APRIORI</span></div>
          <div className={styles.headinglow}>We believe that education is not just about acquiring knowledge; it’s a transformative journey that shapes individuals and empowers communities.</div>
        </div>
        </Reveal>
        <div className={styles.cards}>
        <Reveal>
          <div className={styles.card}>
          <Link className={styles.link} href='/Languages'><Image className={styles.img} src={"/Homepageassets/4.png"} width={400} height={400}/></Link>
            <Link className={styles.link} href='/Languages'><div className={styles.cardtopic}>Foreign <span>Languages</span></div></Link>
            <div className={styles.cardlow}>Explore the world through language. Join our immersive foreign language courses and unlock new horizons.</div>
            
            <button className={styles.button}><Link className={styles.link} href='/Languages'>Read More</Link></button>
            
          </div>
          </Reveal>
          <Reveal>
          <div className={styles.card}>
          <Link className={styles.link} href='/TestPrep'><Image className={styles.img} src={"/Homepageassets/testIELTS.jpg"} width={400} height={400}/></Link>
            <Link className={styles.link} href='/TestPrep'><div className={styles.cardtopic}>Test <span>Preparation</span></div></Link>
            <div className={styles.cardlow}>Unlock your potential with our comprehensive test preparation courses. We provide expert guidance, study materials & practice tests.</div>
            <button className={styles.button}><Link className={styles.link} href='/TestPrep'>Read More</Link></button>
          </div>
          </Reveal>
        </div>
      </div>
      <Reveal>
      <div className={styles.formsection}>
        <div className={styles.formheading}>Apply Now!</div>
        <input className={styles.input1} placeholder="Enter Name"/>
        <div className={styles.inputco}>
          <input className={styles.input2} placeholder="Email"/>
          <input className={styles.input2} placeholder="Number"/>
        </div>
        <div className={styles.inputco}>
          <input className={styles.input2} placeholder="Course"/>
          <input className={styles.input2} placeholder="Date"/>
        </div>
        <textarea className={styles.textarea} placeholder="Message"/>
        <button className={styles.formbutton}>Submit Request</button>
      </div>
      </Reveal>
    </div>
  )
}
