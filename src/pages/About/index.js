import Image from 'next/image'
import React from 'react'
import styles from '../../styles/home/Aboutus/about.module.css'

export default function index() {
  return (
    <div className={styles.container}>
      <div className={styles.contopic}>About Us</div>

      <div className={styles.flex1}>
      <div>
        <Image className={styles.img} src={'/Homepageassets/aboutus.png'} width={600} height={600} alt='img'/>
      </div>
        
        <div>
          <div className={styles.title}>REVOLUTIONIZING TEST PREP</div>
          <div className={styles.desc}>Apriori Education was formed with a vision to reverse the prevalent trend of diminishing interest in liberal arts education and to refute the view that it is any less practical or vocational compared to the technical fields of study. Hence, the organisation comprises mostly of academicians or individuals whose primary engagements are academic rather than entrepreneurial.
          We have carved out a niche for itself in International Standardised Tests by emphasising the importance of reading habits and reasoning skills. Our expertise lies in ensuring that students are able to realise their true potential by providing a conducive and challenging environment for their intellectual growth. The Academic Team comprises of Verbal and Math Trainers who have a strong grounding in their respective disciplines combined with extensive experience in the International Test Preparation industry.
          </div>
        </div>
      </div>

      <div className={styles.flex2}>
      <div>
        <Image className={styles.img} src={'/Homepageassets/aboutus.png'} width={600} height={600} alt='img'/>
      </div>
        
        <div>
          <div className={styles.title}>REVOLUTIONIZING TEST PREP</div>
          <div className={styles.desc}>Apriori Education was formed with a vision to reverse the prevalent trend of diminishing interest in liberal arts education and to refute the view that it is any less practical or vocational compared to the technical fields of study. Hence, the organisation comprises mostly of academicians or individuals whose primary engagements are academic rather than entrepreneurial.
          We have carved out a niche for itself in International Standardised Tests by emphasising the importance of reading habits and reasoning skills. Our expertise lies in ensuring that students are able to realise their true potential by providing a conducive and challenging environment for their intellectual growth. The Academic Team comprises of Verbal and Math Trainers who have a strong grounding in their respective disciplines combined with extensive experience in the International Test Preparation industry.
          </div>
        </div>
      </div>

      <div className={styles.statsc}>
        <div className={styles.title}>GET THE PERFECT EXAM SCORE</div>
        <div className={styles.desc}>Our committed and personalized test-prep services, simplified and engaging lectures, and well-researched study materials have helped.</div>
        <div className={styles.grid}>
          <div><div className={styles.number}>52</div><div className={styles.score}>scored 1500+ on the SAT</div></div>
          <div><div className={styles.number}>27</div><div className={styles.score}>scored 34+ on the ACT</div></div>
          <div><div className={styles.number}>85</div><div className={styles.score}>scored 700+ on the GMAT</div></div>
          <div><div className={styles.number}>56</div><div className={styles.score}>scored 300+ on the GRE</div></div>
          <div><div className={styles.number}>47</div><div className={styles.score}>scored 35+ on the IELTS</div></div>
          <div><div className={styles.number}>82</div><div className={styles.score}>scored 110+ on the TOEFL</div></div>
        </div>
      </div>

      <div className={styles.flex3}>
      <div>
        <div className={styles.title}>OUR GOAL</div>
        <div className={styles.desc}>Apriori Education was formed with a vision to reverse the prevalent trend of diminishing interest in liberal arts education and to refute the view that it is any less practical or vocational compared to the technical fields of study. Hence, the organization comprises mostly of academicians or individuals whose primary engagements are academic rather than entrepreneurial.</div>
      </div>
      <div>
        <Image className={styles.img} src={'/Homepageassets/about us 2.png'} width={600} height={600} alt='img'/>
      </div>
      </div>

    </div>
  )
}
