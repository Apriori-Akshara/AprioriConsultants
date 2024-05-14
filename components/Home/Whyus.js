import Image from 'next/image'
import React from 'react'
import styles from "../../src/styles/home/whyus.module.css"
import { FaUserAlt } from "react-icons/fa";
import { FaComputer } from "react-icons/fa6";
import { FaMoneyCheckAlt } from "react-icons/fa";

export default function Whyus() {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.heading}>WHY CHOOSE US?</div>

        <div className={styles.card}>
          <div className={styles.icondiv}>
            <FaComputer className={styles.icon}/>
          </div>
          <div className={styles.text}>
            <div className={styles.top}>Best Lab</div>
            <div className={styles.btm}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam interdum diam tortor, egestas varius erat aliquam.</div>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.icondiv}>
            <FaUserAlt className={styles.icon}/>
          </div>
          <div className={styles.text}>
            <div className={styles.top}>Best Teachers</div>
            <div className={styles.btm}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam interdum diam tortor, egestas varius erat aliquam.</div>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.icondiv}>
            <FaMoneyCheckAlt className={styles.icon}/>
          </div>
          <div className={styles.text}>
            <div className={styles.top}>Low Cost Services</div>
            <div className={styles.btm}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam interdum diam tortor, egestas varius erat aliquam.</div>
          </div>
        </div>
      </div>
      <div>
        <Image className={styles.img} src={"/Homepageassets/1 (4).jpg"} width={1000} height={1000} alt="image"/>
      </div>
    </div>
  )
}
