import React from 'react'
import { FaUserAlt } from "react-icons/fa";
import { IoChatbubblesOutline } from "react-icons/io5";
import { FaCcPaypal } from "react-icons/fa";
import { BsPhoneFill } from "react-icons/bs";
import styles from "../../src/styles/home/herobuttom.module.css"
import Reveal from '../../components/Reveal'

export default function Herobottom() {
  return (
    <div className={styles.bigcontainer}>
    <div className={styles.container}>
      <div className={styles.block}>
        <div>
        <Reveal>
          <FaUserAlt className={styles.icons}/>
        </Reveal>
        </div>
        <Reveal>
        <div>24 HOURS SERVICE</div>
        </Reveal>
      </div>
      <div className={styles.block1}>
        <div>
        <Reveal>
          <IoChatbubblesOutline className={styles.icons}/>
          </Reveal>
        </div>
        <Reveal>
        <div>ONLINE HELP</div>
        </Reveal>
      </div>
      <div className={styles.block2}>
        <div>
        <Reveal>
          <FaCcPaypal className={styles.icons}/>
          </Reveal>
        </div>
        <Reveal>
        <div>ONLINE PAYMENT</div>
        </Reveal>
      </div>
      <div className={styles.block3}>
        <div>
        <Reveal>
          <BsPhoneFill className={styles.icons}/>
          </Reveal>
        </div>
        <Reveal>
        <div>+91 9717189650<br/>+91 9717189659</div>
        </Reveal>
      </div>
    </div>
    </div>
  )
}
