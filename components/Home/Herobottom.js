import React from 'react'
import { FaUserAlt } from "react-icons/fa";
import { IoChatbubblesOutline } from "react-icons/io5";
import { FaCcPaypal } from "react-icons/fa";
import { BsPhoneFill } from "react-icons/bs";
import styles from "../../src/styles/home/herobuttom.module.css"

export default function Herobottom() {
  return (
    <div className={styles.bigcontainer}>
    <div className={styles.container}>
      <div className={styles.block}>
        <div>
          <FaUserAlt className={styles.icons}/>
        </div>
        <div>24 HOURS SERVICE</div>
      </div>
      <div className={styles.block1}>
        <div>
          <IoChatbubblesOutline className={styles.icons}/>
        </div>
        <div>ONLINE HELP</div>
      </div>
      <div className={styles.block2}>
        <div>
          <FaCcPaypal className={styles.icons}/>
        </div>
        <div>ONLINE PAYMENT</div>
      </div>
      <div className={styles.block3}>
        <div>
          <BsPhoneFill className={styles.icons}/>
        </div>
        <div>+91 9717189650<br/>+91 9717189659</div>
      </div>
    </div>
    </div>
  )
}
