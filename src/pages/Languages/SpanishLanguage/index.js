import Image from 'next/image'
import React from 'react'
import Navbar from '../../../../components/navbar'
import styles from '../../../styles/home/Languages/languagespage.module.css'

export default function index() {
  return (
    <div>
      <Navbar />
      <div className={styles.contopicc}>
        <div className={styles.tint}></div>
      <div className={styles.contopic}>Spanish Language</div>
    </div>

    <div className={styles.container}>
      <div className={styles.flex}>
        <div className={styles.imgcont}>
          <Image className={styles.img} src={'/languages/spanishlanguage1.jpg'} width={500} height={500} alt='img'/>
        </div>
        <div>
          <div>Are you looking to expand your horizons and dive into the exciting world of a foreign language and culture? Look no further than Apriori Education's Spanish language course! With more than 548 million speakers, not only is Spanish one of the most widely spoken languages in the world, it also opens doors to new cultural experiences and professional opportunities.</div>

          <div>
            With our expert instructors, you'll be well on your way to fluency in no time.
            Our curriculum is carefully crafted to ensure that you're not just memorising vocabulary words, but that you're truly internalising the language. Through interactive activities and cultural immersion, you'll learn not just how to speak Spanish, but how to truly understand and connect with Spanish-speaking cultures. Our instructors, with years of experience teaching the language to students of all levels, are passionate about sharing the language and culture with others, and they'll be with you every step of the way to ensure your success.
          </div>          
        </div>
      </div>
      <div className={styles.flex2}>
        <div className={styles.imgcont}>
          <Image className={styles.img} src={'/languages/spanishlanguage2.jpg'} width={500} height={500} alt='img'/>
        </div>
        <div>
          <div>
          You'll be learning alongside other students who share your enthusiasm about interacting with new languages and cultures, and together you'll form an encouraging and dynamic learning environment. So what are you waiting for? Sign up for our Spanish language course today and embark on an exciting new journey of language and cultural exploration! For school students interested in exploring a foreign language and culture, we have curated a deeply-engaging Spanish language course where students will receive expert guidance from our highly trained and proficient teachers who strive to create an interactive and encouraging learning space for our students.
          </div>      
          <div>The students will have a solid grasp over the Spanish language by the end of the course, which will help them explore their career options in the future and our courses also instill a sense of respect and curiosity for other languages and cultures.</div>    
        </div>
      </div>
    </div>

    <div className={styles.cardcontainer}>
        <div className={styles.card}>
          <div className={styles.heading}>Spanish Proficiency <span>Test/Diploma</span></div>
          <div className={styles.desc}>DELE (Diplomas de Español Como Lengua Extranjera) Spanish Diploma - Spanish language proficiency is officially recognised by the Ministry of Education, Culture, and Sport of Spain through the issuance of DELE diplomas. The Universidad de Salamanca in Spain prepares the exams and is responsible for the overall assessment of all exams, while the Institute Cervantes organises the exam sessions. The DELE is recognised internationally by public and private educational institutions, governments, and organisations and many undergraduate and graduate university courses require it. The exam follows the CEFR guidelines and is valid for a lifetime once you pass the exams. The six levels of the DELE Spanish Diplomas range from the most fundamental (A1) to the most advanced (C2) levels. In India, DELE exams will be held 6 times, from February to November, in Jaipur, Mumbai, New Delhi, Kolkata and Chennai. For more information and expert guidance regarding the preparation and tests for foreign languages, reach out to us at Apriori Education Solutions.</div>
        </div>
    </div>

    <div className={styles.cardflex}>
      <div className={styles.card1}>
        <div className={styles.cardheading}>Language courses for <span>students</span></div>
        <div className={styles.desc}>For school students interested in exploring a foreign language and culture, we have curated a deeply-engaging Spanish language course where students will receive expert guidance from our highly trained and proficient teachers who strive to create an interactive and encouraging learning space for our students.The students will have a solid grasp over the Spanish language by the end of the course, which will help them explore their career options in the future and our courses also instill a sense of respect and curiosity for other languages and cultures.</div>
      </div>

      <div className={styles.card1}>
        <div className={styles.cardheading}>Crash courses for <span>professionals</span></div>
        <div className={styles.desc}>Expand your horizons and broaden your career opportunities by learning Spanish! With over 500 million native speakers worldwide, Spanish is a valuable language to learn in any industry. With our crash course, you can quickly pick up the basics of this widely spoken language and impress potential employers with your language skills. Not only will it make you a valuable asset in the workplace, but it will also open up doors to new business partnerships and connections. Don't miss out on the chance to enhance your career prospects - enroll in our Spanish crash course today!</div>
      </div>
    </div>

    </div>
  )
}
