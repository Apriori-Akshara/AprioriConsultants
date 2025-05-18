import Image from 'next/image'
import React from 'react'
import styles from '../../styles/home/Testimonials/testimonials.module.css'
import Navbar from '../../../components/NavbarJS'

const info = [{name:'AKSHARA THAKUR', 
                school:'Dubai International Academy', 
                marks: 'SAT 1560 (790 M, 770 V)', 
                review:'For me, Apriori has not only been a test prep institute but also been an experience. The personal attention I got here is unparalleled. I would definitely recommend Apriori to anyone looking to get a great score on the SAT/ ACT.', 
                img: '/testimonials/testimonial-img2.png',
              id:'1'},

              {name:'ROHIT BHATNAGAR', 
                school:'Boston University', 
                marks: 'GMAT 750 (50 M, 42 V)', 
                review:'What is truly remarkable about the Apriori team is their commitment to being not only test prep professionals, but also teachers and mentors. My success on the GMAT was a direct result of their attention to detail and their focus on helping me understand test concepts.', 
                img: '/testimonials/testimonial-img1.png',
                id:'2'},

                {name:'DHRUV SHARMA', 
                school:'Modern School (Barakhamba, New Delhi)', 
                marks: 'ACT 34 (36 M, 36 S, 32 R, 32 R)', 
                review:'I had the opportunity to attend classes for SAT and ACT at Apriori. I would like to extend a personal thanks to Dominic Sir who has been very patient and supportive and has at all times stressed the need to be a voracious reader in order to achieve the scores in the standardized tests and to achieve overall academic excellence.', 
                img: '/testimonials/testimonial-img5.png',
                id:'3'},

                {name:'ARYA LAMBA', 
                school:'Modern School (Barakhamba, New Delhi)', 
                marks: 'SAT 1540 (790 M, 750 V)', 
                review:'If you want a new approach to learning things and escape the ordinary methods you are used to, join Apriori as fast as possible. Not only are you going to get a great score but also be able to think and learn way more than you did at school.', 
                img: '/testimonials/testimonial-img3.png',
                id:'4'},

                {name:'SUKRITI GUPTA', 
                school:'Amity International School (Saket)', 
                marks: 'SAT 1550 (790 M, 760 V)', 
                review:'Apriori Education has played an indispensable role in my SAT prep. Along with the prescribed curriculum, the complementary activities not only groomed me for SAT, but also allowed for a more holistic and well-rounded development. Further, Apriori’s emphasis on individual attention and meticulous planning ensured comfort along with unparalleled guidance.', 
                img: '/testimonials/testimonial-img4.png',
                id:'5'},

                {name:'REYAN MEHTA', 
                school:'Pathways World School (Noida)', 
                marks: 'SAT Score - 1550 (800 M, 750 V)', 
                review:'There is no one in this field who knows more about the SAT than Dominic sir. The ivy mentorship has been of great help in understanding the exam in a more relatable manner, as the mentor has been a former student herself, and understands the challenges faced by a student. The staff is also very professional and prompt and is always ready to guide you.', 
                img: '/testimonials/testimonial-img19.png',
                id:'6'},

                {name:'DYUMNA', 
                school:'Christ University (Banglore)', 
                marks: 'SPANISH FOUNDATION (A1 & A2)', 
                review:'The beginner level Spanish lessons took up a very holistic approach towards understanding the language and to gain the ability to start speaking it a little by the end of the modules. Dominic sir’s way of teaching helped me in initiating and engaging in basic conversation in Spanish. Overall, it was a wonderful experience learning at Apriori!', 
                img: '/testimonials/testimonial-img10.png',
                id:'7'},

                {name:'SIDDHARTH GARG', 
                school:'Modern School (Barakhamba, New Delhi)', 
                marks: 'SAT Score - 1570 (800 M, 770 V)', 
                review:'Apriori Education provides unparalleled teaching and guidance for taking the SAT. Infusing the curriculum with other ancillary activities, they have helped me develop skills that are helpful both in and beyond the SAT. Applying what I learnt here at Apriori, I was certain that I would get a good score as I walked out of the test centre.', 
                img: '/testimonials/testimonial-img14.png',
                id:'8'},

                {name:'NIPUN BANERJEE', 
                school:'IIHM (New Delhi)', 
                marks: 'SPANISH FOUNDATION (A1 & A2)', 
                review:'The overall content delivery was phenomenal. The level of interaction even in an online session made the whole experience fruitful. The content itself was extremely informative and the most important part of the classes that made it different and effective was the practice of correct pronunciation. That itself is something that is hard to grasp and teach.', 
                img: '/testimonials/testimonial-img12.png',
                id:'9'},

                {name:'PRISHA CHHABRA', 
                school:'Rukmani Birla (Jaipur)', 
                marks: 'GERMAN FOUNDATION & INTERMEDIATE (A1, A2, B1 & B2)', 
                review:'The 10-day Spanish foundation course with Apriori Education completely changed the way I look at learning a new language. I am thankful to be aware of how enriching, fun and lasting the knowledge of an interesting language like Spanish can be. From the first class till the last; my interest only kept mounting. In this lesson, you don’t learn simply the ABCs of a language, you learn every aspect of its practicality when you come around to speaking it. In completing every assignment filled with realistic questions and conversations, I gained a sense of achievement thanks to the incredible and novel teaching of Dominic Sir. I truly miss this class, and grateful to have the experience!', 
                img: '/testimonials/testimonial-img11.png',
                id:'10'},

                {name:'PRISHA NAVEEN', 
                school:'Step by Step (Noida)', 
                marks: 'SAT', 
                review:"I joined Apriori Education in 11th grade. The training sessions were enriching and quite comprehensive. I have benefited immensely from the organised structure of the course. I learned numerous techniques to improve my score. Dominic Sir's energetic character always made the sessions lively. The entire Academic Team is very knowledgeable and sessions are planned in a well-organised manner. They helped us work on our weaknesses and made every problem look simple. This has been a very profitable experience for me. It not only helped me for the SATs but also added to my overall learning experience. I highly recommend Apriori Education to anyone who is taking the SATs.", 
                img: '/testimonials/testimonial-img8 (1).png',
                id:'17'},

                {name:'VIDIT MAHAJAN', 
                school:'The British School (New Delhi)', 
                marks: 'SAT', 
                review:'I joined Apriori Education in the beginning of my 11th grade. My experience with them has been amazing. Under the tutelage of extremely experienced faculty, the sessions are extremely knowledgeable not only in terms of the content knowledge but tips and tricks that were instrumental in increasing my SAT score. Furthermore, all the mock tests, sectional tests and preparatory material are carefully selected to expose students to all question types and address all areas of the syllabus. One thing that distincts Apriori from others is their attention to detail; apart from teaching the syllabus, they also address the very basics of English and Math that go beyond the SATs helping you in your school curriculum.I am extremely grateful to all the faculty at Apriori for helping me achieve my target score and I would definitely recommend it to anyone who is considering taking the SATs.', 
                img: '/testimonials/testimonial-img9.png',
                id:'15'},

                {name:'DIYA SABHARWAL', 
                school:'Modern School (Barakhamba, New Delhi)', 
                marks: 'SAT Score - 1550 (760 M, 790 V)', 
                review:'Dominic Sir is the most hardworking, passionate and dynamic teacher I’ve had the pleasure of studying from, and you’d be hard-pressed to find an SAT coaching centre as competent as Apriori Education. They always push you to do your best, and are 100% committed to helping you maximise your score.', 
                img: '/testimonials/testimonial-img16.png',
                id:'12'},

                {name:'DEVINA AGGARWAL', 
                school:'Modern School (Barakhamba, New Delhi)', 
                marks: 'SAT Score - 1580 (800 M, 780 V)', 
                review:'My experience with Apriori has been nothing short of amazing. Under the guidance of well experienced teachers, who were quick to identify my areas of weakness and work through them in a methodical way, I observed a drastic improvement in my test scores. I’m extremely grateful to the faculty at Apriori for helping me achieve my target score', 
                img: '/testimonials/testimonial-img17.png',
                id:'13'},

                {name:'SAMMARTH KUMAR', 
                school:'Step by Step (Noida)', 
                marks: 'SAT Score - 1540 (790 M, 750 V)', 
                review:'Apriori has been very helpful to me in preparing for the SAT. The worksheets and doubt sessions helped me achieve my score. Apriori has excellent resources to help people with their preparation.', 
                img: '/testimonials/testimonial-img18.png',
                id:'14'},

                {name:'HIYA GUPTA', 
                school:'Modern School (Barakhamba, New Delhi)', 
                marks: 'SAT Score - 1550 (780 M, 770 V)', 
                review:'I have been associated with Dominic Sir and subsequently Apriori Education for nearly two years now. In all my school years, have never known a better teacher and the way he transfuses his passion for both English and Math into his students is what motivates them and helps them do their best.', 
                img: '/testimonials/testimonial-img15.png',
                id:'16'},

                {name:'PRISHA TEWARI', 
                school:'Step by Step (Noida)', 
                marks: 'SAT Score - 1500 (790 M, 710 V)', 
                review:'I joined Apriori education after taking my first SAT, and it has transformed the way I attempt my papers. Dominic Sir’s dedication towards everyone at the centre is evident through the amount of effort they put in. Thank you doesn’t adequately express my gratitude for the experience I had and everything I learnt here.', 
                img: '/testimonials/testimonial-img13.png',
                id:'11'},

                {name:'AYUSHMAN JALAN', 
                school:'Modern School (Barakhamba, New Delhi)', 
                marks: 'SAT', 
                review:'Apriori education has been instrumental in helping me obtain the necessary skills and confidence to take the SAT. The teachers and staff are all extremely helpful and the extensive practice, along with the doubt and review sessions, allow all students to identify their weaknesses and work in order to mitigate them. Apriori truly is the best choice to prepare for the SAT.', 
                img: '/testimonials/testimonial-img20.png',
                id:'18'},

                {name:'RAINA KAPUR', 
                school:'Ryan International (Vasant Kunj, New Delhi)', 
                marks: 'SAT', 
                review:'I joined Apriori in grade 11 for a 2-month SAT course, after giving my first attempt which didn’t go so well. After finishing the classes, and the various academic engagements and workshops conducted here, I feel a lot more confident. Dominic Sir was always there to guide the students and help them in any possible way. Due to the highly meticulous teachers and their very systematic and efficient method of teaching, the students here get phenomenal scores. I have seen a lot of improvement in my mock tests, and am always being motivated to give my best.', 
                img: '/testimonials/testimonial-img6.png',
                id:'19'},

                {name:'ANIRUDH BHATNAGAR', 
                school:'', 
                marks: 'AP Calculus', 
                review:'I’m a junior attending Boston University. This past summer (2019) the Apriori Education Math Faculty tutored me in Calculus. I hadn’t taken calculus, or even a math class, since taking AP calculus AB in high school. They managed to teach without lecturing me, keeping me engaged with each topic. In the span of 2 months my fundamentals have improved considerably and my confidence in Calculus has enhanced a lot. Their passion for teaching is infectious.', 
                img: '/testimonials/testimonial-img7.png',
                id:'20'},
              ]

export default function index() {
  return (
    <div>
    <Navbar/>
          <div className={styles.contopicc}>
            <div className={styles.tint}></div>
              <div className={styles.contopic}>Our Testimonials</div>
            </div>

            <div className={styles.cards}>
              {info.map(data=>{
                return (<div className={styles.card}>
                  <div className={styles.imgc}>
                    <Image className={styles.img} src={data.img} width={400} height={400}/>
                  </div>
                    <div className={styles.name}>{data.name}</div>
                    <div className={styles.school}>{data.school}</div>
                    <div className={styles.marks}>{data.marks}</div>
                    <div className={styles.review}>{data.review}</div>
                </div>)})
              }

            </div>
    </div>
  )
}
