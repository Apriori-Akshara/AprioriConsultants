import Image from 'next/image'
import React from 'react'
import Navbar from '../../../../components/NavbarJS'
import styles from '../../../styles/home/Languages/languagespage.module.css'

export default function index() {
  return (
    <div>
      <Navbar />
      <div className={styles.contopicc}>
        <div className={styles.tint}></div>
      <div className={styles.contopic}>German Language</div>
    </div>

    <div className={styles.container}>
      <div className={styles.flex}>
        <div className={styles.imgcont}>
          <Image className={styles.img} src={'/languages/germanlanguage1.jpg'} width={500} height={500} alt='img'/>
        </div>
        <div>
          <div>Learning a new language can be a fascinating journey that opens up a world of opportunities. Amongst the various languages spoken around the world, German has always been a popular choice among language enthusiasts. The German language and culture have always held a certain charm and intrigue, and now, Apriori Education is proud to offer a German language course that promises to be an experience like no other.
          </div>

          <div>
          German culture has always been admired for its precision, discipline, and attention to detail. The German language is a reflection of these values and is known for its complex grammar and lexical structure. For many of us, learning German can seem daunting at first, but with Apriori Education's experienced teachers and innovative teaching methods, learning German will be an enjoyable and engaging experience.
          </div>          
        </div>
      </div>
      <div className={styles.flex2}>
        <div className={styles.imgcont}>
          <Image className={styles.img} src={'/languages/germanlanguage2.jpg'} width={500} height={500} alt='img'/>
        </div>
        <div>
          <div>
          The course is designed to cater to learners of all levels, from beginners to advanced learners. Students will be introduced to the basics of German grammar, vocabulary, and sentence structure. The course also gives learners a deeper understanding of German culture, traditions and its people.
          </div>      
          <div>Whether you are a student looking to study in Germany, a professional seeking to expand your career opportunities, or simply a language enthusiast, our German language course is the perfect way to start your journey. With our language experts, innovative teaching methods, and engaging course content, you will be speaking and understanding German in no time. Sign up for the course today and start exploring the rich and intriguing world of German language and culture.</div>    
        </div>
      </div>
    </div>

    <div className={styles.cardcontainer}>
        <div className={styles.card}>
          <div className={styles.heading}>German Proficiency <span>Test/Diploma</span></div>
          <div className={styles.desc}>Goethe-Zertifikat tests - Six examinations, one for each CEFR level, are available through the Goethe-Institut. The Goethe-Institut is the foremost organisation in the world devoted to advancing German language and culture. Worldwide, employers and educational institutions recognise and highly respect the certifications issued by Goethe-Institut. The Zertifikat exam is recognised by the German Federal Government as well. The Zertifikat Deutsch exam is given at six locations, 5 to 6 times a year, throughout India, including Bangalore, Chennai, Kolkata, Mumbai, New Delhi, and Pune, by the Goethe-Institut or Max Mueller Bhavan. In collaboration with the Goethe-Institut, Goethe-Zertifikat also holds the Zertifikat test in Ahmedabad, Chandigarh, Coimbatore, Hyderabad, and Trivandrum. Depending on the certificate's CEFR level, the certificates enable people to enroll in German universities as students or teachers and can be used to prove intermediate or advanced German language proficiency for job opportunities.<br/><br/>

TestDaF (Test Deutsch ALS Fremdsprache) - Every institution in Germany accepts the TestDaF, which is an entrance exam primarily for German-speaking universities. Also, it serves as a valuable qualification for academic careers. It is a test for upper-intermediate and advanced users (CEFR levels B2 through C1) which has a lifetime validity. The TestDaF is available in over 90 countries worldwide, around 6 times a year. The exam is administered in India by the Goethe-Institut at five test locations: Bangalore, New Delhi, Pune, Coimbatore, and Chennai. The four language abilities are carefully evaluated by the TestDaF (Listening, Reading Comprehension, Written Production, and Oral Production) and in order to pass the TestDaF as a whole, candidates must pass each and every component of the test.</div>
        </div>
    </div>

    <div className={styles.cardflex}>
      <div className={styles.card1}>
        <div className={styles.cardheading}>Language courses for <span>students</span></div>
        <div className={styles.desc}>The German language course for school students is designed to teach students the basics of German grammar, vocabulary, and pronunciation. The course is taught by experienced teachers who use fun and interactive methods to make learning German engaging. Students will learn how to hold conversations in German, read and write in the language, and they will also learn to better understand German culture. By the end of the course, students will have a solid foundation in the German language and be ready to take their skills to the next level through tests for certification such as the Goethe-Zertifikat and TestDaF.</div>
      </div>

      <div className={styles.card1}>
        <div className={styles.cardheading}>Crash courses for <span>professionals</span></div>
        <div className={styles.desc}>Looking to expand your professional horizons? Learning German can be a great way to open up new opportunities. With our German crash course, you'll quickly develop the language skills you need to communicate with German-speaking clients or colleagues, or seek greater employment opportunities. From basic vocabulary to complex grammar, our experienced instructors will guide you every step of the way. Not only will you be able to understand and speak German, but you'll also gain cultural insights that will help you build strong business and/or academic relationships. Our crash course is designed to fit your requirements, and with the support of our experienced instructors, you'll be able to achieve your language learning goals in no time. Don't wait - start your German language journey today!</div>
      </div>
    </div>

    </div>
  )
}