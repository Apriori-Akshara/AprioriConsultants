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
      <div className={styles.contopic}>French Language</div>
    </div>

    <div className={styles.container}>
      <div className={styles.flex}>
        <div className={styles.imgcont}>
          <Image className={styles.img} src={'/languages/frenchlanguage (1).jpg'} width={500} height={500} alt='img'/>
        </div>
        <div>
          <div>Apriori Education is pleased to offer an exciting French language course that will immerse you in the rich and sophisticated culture of France. Our course is designed to help you develop a comprehensive understanding of the French language, its grammar, vocabulary, and syntax, all while gaining an appreciation for French culture, history, and traditions.
          </div>
          <div>
          Our team of experienced and highly trained French language instructors is dedicated to creating a unique learning experience for our students. We understand that learning a language is not just about memorising vocabulary and grammar rules; it is also about engaging with the culture and lifestyle that the language represents.
          Our curriculum is designed to meet the needs of students at all levels of proficiency, from beginners to advanced speakers. Whether you are looking to improve your conversational skills or to develop a deeper understanding of French literature and culture, our course is tailored to your individual needs and goals.
          </div>          
        </div>
      </div>
      <div className={styles.flex2}>
        <div className={styles.imgcont}>
          <Image className={styles.img} src={'/languages/frenchlanguage (2).jpg'} width={500} height={500} alt='img'/>
        </div>
        <div>
          <div>
          At Apriori Education, we believe that language learning should be an enjoyable and enriching experience. That is why we have created a dynamic and interactive classroom environment that encourages active participation and engagement from our students. Our instructors use a variety of teaching methods and materials to keep our classes effective, including multimedia presentations, interactive exercises, and group discussions.
          </div>      
          <div>By the end of our course, you will have gained not only a comprehensive understanding of the French language but also a deep appreciation for French culture and history. You will have the skills and confidence to communicate effectively in French, whether in academic, professional, or social settings.
          We invite you to join us on this exciting journey of language learning and cultural exploration. Sign up for our French language course today and let us help you achieve your language learning goals.</div>    
        </div>
      </div>
    </div>

    <div className={styles.cardcontainer}>
        <div className={styles.card}>
          <div className={styles.heading}>French Proficiency <span>Test/Diploma</span></div>
          <div className={styles.desc}>DELF (Diplôme d'Études en Langue Française ) & DALF (Diplôme Approfondi de Langue Français) - The French Ministry of Education offers the DELF and DALF as formal certifications of non-native speakers' fluency in the French language. The certificates are widely accepted on a global scale, and the Ministry of Human Resource Development in India also uses them to evaluate students' French language proficiency. They are made up of six distinct diplomas that refer to the Common European Framework of Reference for Languages levels of language proficiency (CEFR). The 6 certificates are completely independent, so applicants can sign up to test out their preference. Four skills—listening, speaking, reading, and writing—are assessed at each level. The certificates are valid for a lifetime and may be employed by the certificate-holders for various employment and academic opportunities in francophone countries. In 2023, The DELE exams for various diplomas will be held in March, April, June, July, September and December with centers being in Chandigarh, Jaipur, Delhi, Kolkata, Ahmedabad, Vadodara, Indore, Bhopal, Mumbai, Pune, Panjim, Bangalore, Chennai, Coimbatore, Hyderabad, Pondicherry, Mysore, Mangalore, Trichy, and Trivandrum. For more information and expert guidance regarding the preparation and tests for foreign languages, reach out to us at Apriori Education Solutions.</div>
        </div>
    </div>

    <div className={styles.cardflex}>
      <div className={styles.card1}>
        <div className={styles.cardheading}>Language courses for <span>students</span></div>
        <div className={styles.desc}>We, at Apriori Education, are offering a French language learning course for school students, designed to help them improve their French language skills through interactive sessions and personalised attention. The course covers various topics such as grammar, vocabulary, pronunciation, and cultural insights. Students will also have the opportunity to practise their French writing and speaking skills with their peers and experienced instructors. By the end of the course, students will gain the confidence and proficiency to communicate effectively in French.</div>
      </div>

      <div className={styles.card1}>
        <div className={styles.cardheading}>Crash courses for <span>professionals</span></div>
        <div className={styles.desc}>Learning a new language can be a valuable investment in your career. With around 300 million speakers in the world, French is one of the most spoken languages, thus a crash course in French language is an excellent way to gain a new skill that can open doors to new opportunities. From expanding your business horizons to enhancing your resume, French language proficiency can be a game-changer. Not only will it make communication smoother, but it will also demonstrate cultural awareness and show your commitment to excellence. So, why not take the leap and enroll in a French language crash course today?</div>
      </div>
    </div>

    </div>
  )
}