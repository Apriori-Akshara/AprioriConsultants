import Image from 'next/image'
import React from 'react'
import styles from "../../src/styles/home/welcome.module.css"

export default function Welcome() {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div>
          <div className={styles.headingtop}>WELCOME TO <span>APRIORI</span></div>
          <div className={styles.headinglow}>Lorem ipsum dolor sit amet, consectetur adipisi cing elit. Quos dolo rem consequ untur, natus laudantium commodi earum aliquid in ullam.</div>
        </div>
        <div className={styles.cards}>
          <div className={styles.card}>
            <Image className={styles.img} src={"/Homepageassets/1 (1).jpg"} width={400} height={400}/>
            <div className={styles.cardtopic}>Graduation <span>Degree</span></div>
            <div className={styles.cardlow}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur, magnam dolore tempore.</div>
            <button className={styles.button}>Read More</button>
          </div>
          <div className={styles.card}>
            <Image className={styles.img} src={"/Homepageassets/1 (2).jpg"} width={400} height={400}/>
            <div className={styles.cardtopic}>Graduation <span>Degree</span></div>
            <div className={styles.cardlow}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur, magnam dolore tempore.</div>
            <button className={styles.button}>Read More</button>
          </div>
        </div>
      </div>
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
    </div>
  )
}
