import Image from 'next/image'
import React from 'react'
import styles from '../../src/styles/home/footer.module.css'
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { BsSendFill } from "react-icons/bs";
import { FaPhoneAlt } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { FaLocationArrow } from "react-icons/fa";

export default function footer() {
  return (
    <div>
          <div className={styles.container}>
    <Image className={styles.bgimg} src={'/events/footerbg.png'} width={800} height={800} alt='img'/>

      <div className={styles.row1}>
        <Image className={styles.logoimage} src={'/logo/logo.jpg'} width={400} height={400} alt="logo-image"/>
        <div>GreenPeace is a library of Crowdfunding and Charity templates with predefined elements which helps you to build your own site. Lorem ipsum dolor sit amet consectetur.</div>
        <div className={styles.btn}>Read More</div>
      </div>

      <div className={styles.row3}>
        <div className={styles.heading1}>Social Links</div>
        <div className={styles.linkflex1}><FaInstagram /> <div>Instagram</div></div>
        <div className={styles.linkflex2}><FaFacebook /> <div>Facebook</div></div>
        <div className={styles.linkflex3}><FaTwitter /> <div>Twitter</div></div>
        <div className={styles.linkflex4}><FaLinkedin /> <div>Linkedin</div></div>
        <div className={styles.linkflex5}><FaYoutube /> <div>Youtube</div></div>
      </div>

      <div className={styles.row2}>
        <div className={styles.heading1}>Quick Contact</div>
        <div className={styles.linkflex6}><FaPhoneAlt /> <div>+91 97171 89650/ 659</div></div>
        <div className={styles.linkflex7}><SiGmail /> <div>info@aprioriconsultants.org</div></div>
        <div className={styles.linkflex8}><FaLocationArrow className={styles.icon}/> <div>89, Nehru Pl Market Rd, Nehru Place, New Delhi, Delhi 110019</div></div>

      </div>

      <div className={styles.newsletter}>
          <div className={styles.heading2}>Subscribe to our newsletter</div>
          <div className={styles.newletterdesc}>Subscribe to our newsletter for latest updates about our site for universe.</div>
          <div className={styles.newsletterc}>
            <input className={styles.input} placeholder='Your Email'/>
            <button className={styles.button}><BsSendFill /></button>
          </div>
        </div>
    </div>

    <div className={styles.bottom}>
    @ 2024 Apriori Consultants. All rights reserved. Privacy Policy.
    </div>
    </div>

  )
}
