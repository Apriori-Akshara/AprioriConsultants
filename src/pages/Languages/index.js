import React from 'react'
import Navbar from '../../../components/NavbarJS'
import styles from '../../styles/home/Languages/languages.module.css'
import Slider from '../../../components/Languagespage/slider'
import Reveal from '../../../components/Reveal'
import { FaUserAlt } from "react-icons/fa";
import { FaComputer } from "react-icons/fa6";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { MdOutlinePersonalVideo } from "react-icons/md";

export default function index() {
  return (
    <div>
    <Navbar />
    <div className={styles.contopicc}>
    <div className={styles.tint}></div>
      <div className={styles.contopic}>Foreign Languages</div>
    </div>

    <Slider />

    <div className={styles.btmcontainer}>

    <div className={styles.left}>
      <Reveal>
      <div className={styles.heading}>WHY CHOOSE US?</div>
      </Reveal>

      <div className={styles.cards}>
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

        <Reveal>
        <div className={styles.card}>
          <div className={styles.icondiv}>
            <MdOutlinePersonalVideo className={styles.icon}/>
          </div>
          <div className={styles.text}>
            <div className={styles.top}>INTERACTIVE LEARNING</div>
            <div className={styles.btm}>We provide engaging content and incorporate multimedia elements to enhance learning.</div>
          </div>
        </div>
        </Reveal>

        <Reveal>
        <div className={styles.card}>
          <div className={styles.icondiv}>
            <FaMoneyCheckAlt className={styles.icon}/>
          </div>
          <div className={styles.text}>
            <div className={styles.top}>STRUCTURED LESSONS</div>
            <div className={styles.btm}>We organize lessons from beginner to advanced levels and create a clear progression path for learners to follow.</div>
          </div>
        </div>
        </Reveal>
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

    </div>
  )
}
