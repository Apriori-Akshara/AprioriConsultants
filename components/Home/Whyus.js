import Image from 'next/image'
import React from 'react'
import styles from "../../src/styles/home/whyus.module.css"
import { FaUserAlt } from "react-icons/fa";
import { FaComputer } from "react-icons/fa6";
import { FaMoneyCheckAlt } from "react-icons/fa";
import Reveal from '../../components/Reveal'

export default function Whyus() {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
      <Reveal>
      <div className={styles.heading}>WHY CHOOSE US?</div>
      </Reveal>

      <Reveal>
        <div className={styles.card}>
          <div className={styles.icondiv}>
            <FaComputer className={styles.icon}/>
          </div>
          <div className={styles.text}>
            <div className={styles.top}>ADMISSIONS COUNSELLING SERVICES (ACS)</div>
            <div className={styles.btm}>Avail of Personalized (ACS) for US, UK, Canada, Australia, and Singapore.</div>
          </div>
        </div>
      </Reveal>

      <Reveal>
        <div className={styles.card}>
          <div className={styles.icondiv}>
            <FaUserAlt className={styles.icon}/>
          </div>
          <div className={styles.text}>
            <div className={styles.top}>TEST PREPARATION SERVICES</div>
            <div className={styles.btm}>Learn from trainers with over 10 years of industry experience.</div>
          </div>
        </div>
        </Reveal>

        <Reveal>
        <div className={styles.card}>
          <div className={styles.icondiv}>
            <FaMoneyCheckAlt className={styles.icon}/>
          </div>
          <div className={styles.text}>
            <div className={styles.top}>SUCCESS RATE</div>
            <div className={styles.btm}>Read our student testimonials to know what our students say about us.</div>
          </div>
        </div>
        </Reveal>

        <Reveal>
        <div className={styles.card}>
          <div className={styles.icondiv}>
            <FaMoneyCheckAlt className={styles.icon}/>
          </div>
          <div className={styles.text}>
            <div className={styles.top}>SCHOLARSHIPS</div>
            <div className={styles.btm}>Merit-based as well as need-based scholarships will be provided to deserving students.</div>
          </div>
        </div>
        </Reveal>
      </div>
      <div>
        <Image className={styles.img} src={"/Homepageassets/t2.png"} width={1000} height={1000} alt="image"/>
      </div>
    </div>
  )
}
