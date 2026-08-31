import Image from 'next/image'
import React from 'react'
import styles from '../../styles/home/Testimonials/testimonials.module.css'
import Navbar from '../../../components/NavbarJS'

const info = [
  // =========================
  // SAT — WITH SCORES
  // =========================
  {
    name: 'AKSHARA',
    school: 'Dubai International Academy',
    marks: 'SAT 1560 (790 M, 770 V)',
    review:
      'For me, Apriori has not only been a test prep institute but also been an experience. The personal attention I got here is unparalleled. I would definitely recommend Apriori to anyone looking to get a great score on the SAT/ ACT.',
    img: '/testimonials/testimonial-img2.png',
    id: '1',
  },
  {
    name: 'ARYA',
    school: 'Modern School (Barakhamba, New Delhi)',
    marks: 'SAT 1540 (790 M, 750 V)',
    review:
      'If you want a new approach to learning things and escape the ordinary methods you are used to, join Apriori as fast as possible. Not only are you going to get a great score but also be able to think and learn way more than you did at school.',
    img: '/testimonials/testimonial-img3.png',
    id: '4',
  },
  {
    name: 'SUKRITI',
    school: 'Amity International School (Saket)',
    marks: 'SAT 1550 (790 M, 760 V)',
    review:
      'Apriori Education has played an indispensable role in my SAT prep. Along with the prescribed curriculum, the complementary activities not only groomed me for SAT, but also allowed for a more holistic and well-rounded development. Further, Apriori’s emphasis on individual attention and meticulous planning ensured comfort along with unparalleled guidance.',
    img: '/testimonials/testimonial-img4.png',
    id: '5',
  },
  {
    name: 'REYAN',
    school: 'Pathways World School (Noida)',
    marks: 'SAT Score - 1550 (800 M, 750 V)',
    review:
      'There is no one in this field who knows more about the SAT than Dominic sir. The ivy mentorship has been of great help in understanding the exam in a more relatable manner, as the mentor has been a former student herself, and understands the challenges faced by a student. The staff is also very professional and prompt and is always ready to guide you.',
    img: '/testimonials/testimonial-img19.png',
    id: '6',
  },
  {
    name: 'SIDDHARTH',
    school: 'Modern School (Barakhamba, New Delhi)',
    marks: 'SAT Score - 1570 (800 M, 770 V)',
    review:
      'Apriori Education provides unparalleled teaching and guidance for taking the SAT. Infusing the curriculum with other ancillary activities, they have helped me develop skills that are helpful both in and beyond the SAT. Applying what I learnt here at Apriori, I was certain that I would get a good score as I walked out of the test centre.',
    img: '/testimonials/testimonial-img14.png',
    id: '8',
  },
  {
    name: 'DIYA',
    school: 'Modern School (Barakhamba, New Delhi)',
    marks: 'SAT Score - 1550 (760 M, 790 V)',
    review:
      'Dominic Sir is the most hardworking, passionate and dynamic teacher I’ve had the pleasure of studying from, and you’d be hard-pressed to find an SAT coaching centre as competent as Apriori Education. They always push you to do your best, and are 100% committed to helping you maximise your score.',
    img: '/testimonials/testimonial-img16.png',
    id: '12',
  },
  {
    name: 'DEVINA',
    school: 'Modern School (Barakhamba, New Delhi)',
    marks: 'SAT Score - 1580 (800 M, 780 V)',
    review:
      'My experience with Apriori has been nothing short of amazing. Under the guidance of well experienced teachers, who were quick to identify my areas of weakness and work through them in a methodical way, I observed a drastic improvement in my test scores. I’m extremely grateful to the faculty at Apriori for helping me achieve my target score',
    img: '/testimonials/testimonial-img17.png',
    id: '13',
  },
  {
    name: 'SAMMARTH',
    school: 'Step by Step (Noida)',
    marks: 'SAT Score - 1540 (790 M, 750 V)',
    review:
      'Apriori has been very helpful to me in preparing for the SAT. The worksheets and doubt sessions helped me achieve my score. Apriori has excellent resources to help people with their preparation.',
    img: '/testimonials/testimonial-img18.png',
    id: '14',
  },
  {
    name: 'HIYA',
    school: 'Modern School (Barakhamba, New Delhi)',
    marks: 'SAT Score - 1550 (780 M, 770 V)',
    review:
      'I have been associated with Dominic Sir and subsequently Apriori Education for nearly two years now. In all my school years, have never known a better teacher and the way he transfuses his passion for both English and Math into his students is what motivates them and helps them do their best.',
    img: '/testimonials/testimonial-img15.png',
    id: '16',
  },
  {
    name: 'PRISHA',
    school: 'Step by Step (Noida)',
    marks: 'SAT Score - 1500 (790 M, 710 V)',
    review:
      'I joined Apriori education after taking my first SAT, and it has transformed the way I attempt my papers. Dominic Sir’s dedication towards everyone at the centre is evident through the amount of effort they put in. Thank you doesn’t adequately express my gratitude for the experience I had and everything I learnt here.',
    img: '/testimonials/testimonial-img13.png',
    id: '11',
  },

  // =========================
  // SAT — WITHOUT SCORES
  // =========================
  {
    name: 'DHRUV',
    school: 'Modern School (Barakhamba, New Delhi)',
    marks: 'ACT 34 (36 M, 36 S, 32 R, 32 R)',
    review:
      'I had the opportunity to attend classes for SAT and ACT at Apriori. I would like to extend a personal thanks to Dominic Sir who has been very patient and supportive and has at all times stressed the need to be a voracious reader in order to achieve the scores in the standardized tests and to achieve overall academic excellence.',
    img: '/testimonials/testimonial-img5.png',
    id: '3',
  },
  {
    name: 'PRISHA',
    school: 'Step by Step (Noida)',
    marks: 'SAT',
    review:
      "I joined Apriori Education in 11th grade. The training sessions were enriching and quite comprehensive. I have benefited immensely from the organised structure of the course. I learned numerous techniques to improve my score. Dominic Sir's energetic character always made the sessions lively. The entire Academic Team is very knowledgeable and sessions are planned in a well-organised manner. They helped us work on our weaknesses and made every problem look simple.\nThis has been a very profitable experience for me. It not only helped me for the SATs but also added to my overall learning experience. I highly recommend Apriori Education to anyone who is taking the SATs.",
    img: '/testimonials/testimonial-img8 (1).png',
    id: '17',
  },
  {
    name: 'VIDIT',
    school: 'The British School (New Delhi)',
    marks: 'SAT',
    review:
      'I joined Apriori Education in the beginning of my 11th grade. My experience with them has been amazing. Under the tutelage of extremely experienced faculty, the sessions are extremely knowledgeable not only in terms of the content knowledge but tips and tricks that were instrumental in increasing my SAT score.\nFurthermore, all the mock tests, sectional tests and preparatory material are carefully selected to expose students to all question types and address all areas of the syllabus.\nOne thing that distincts Apriori from others is their attention to detail; apart from teaching the syllabus, they also address the very basics of English and Math that go beyond the SATs helping you in your school curriculum.I am extremely grateful to all the faculty at Apriori for helping me achieve my target score and I would definitely recommend it to anyone who is considering taking the SATs.',
    img: '/testimonials/testimonial-img9.png',
    id: '15',
  },
  {
    name: 'AYUSHMAN',
    school: 'Modern School (Barakhamba, New Delhi)',
    marks: 'SAT',
    review:
      'Apriori education has been instrumental in helping me obtain the necessary skills and confidence to take the SAT. The teachers and staff are all extremely helpful and the extensive practice, along with the doubt and review sessions, allow all students to identify their weaknesses and work in order to mitigate them. Apriori truly is the best choice to prepare for the SAT.',
    img: '/testimonials/testimonial-img20.png',
    id: '18',
  },
  {
    name: 'RAINA',
    school: 'Ryan International (Vasant Kunj, New Delhi)',
    marks: 'SAT',
    review:
      'I joined Apriori in grade 11 for a 2-month SAT course, after giving my first attempt which didn’t go so well. After finishing the classes, and the various academic engagements and workshops conducted here, I feel a lot more confident. Dominic Sir was always there to guide the students and help them in any possible way. Due to the highly meticulous teachers and their very systematic and efficient method of teaching, the students here get phenomenal scores.\nI have seen a lot of improvement in my mock tests, and am always being motivated to give my best.',
    img: '/testimonials/testimonial-img6.png',
    id: '19',
  },

  // =========================
  // GRE
  // No inset images
  // =========================
  {
    name: 'AKSHAY',
    school: '',
    marks: 'GRE 338 (168 Verbal, 170 Quant)',
    review:
      'I used to get stuck on difficult Quant questions because I wanted to solve everything. Dominic Sir pointed this out almost immediately and kept reminding me that the GRE rewards good decisions, not stubbornness. That simple change completely altered my approach to the test. I became faster, calmer and much more confident by the time I took the GRE.',
    id: 'GRE1',
  },
  {
    name: 'SARTHAK',
    school: '',
    marks: 'GRE 335 (168 Verbal, 167 Quant)',
    review:
      'One thing I really appreciated about Dominic Sir was that he never just gave me the solution when I got a question wrong. He would ask me to explain my thinking, and that often showed me where I had gone wrong before the actual calculation began. Those conversations were particularly helpful for Verbal. Over time, I started recognising my own mistakes while practising, which made the GRE feel much less unpredictable.',
    id: 'GRE2',
  },
  {
    name: 'MAYANK',
    school: '',
    marks: 'GRE 333 (165 Verbal, 168 Quant)',
    review:
      'My GRE preparation became much more effective once I started questioning the way I approached problems rather than just whether I got them right. I became conscious of how much time I was spending on unnecessarily complicated methods and began looking for more efficient approaches. Dominic Sir was particularly good at challenging those habits without simply giving me the answer. That change made a noticeable difference to my performance and ultimately helped me reach my target score.',
    id: 'GRE3',
  },
  {
    name: 'SHIVANI',
    school: '',
    marks: 'GRE 329 (164 Verbal, 165 Quant)',
    review:
      'I was juggling several things while preparing for the GRE, so I initially found it difficult to maintain consistency. Dominic Sir helped me break the preparation into smaller, realistic goals instead of making me feel that I needed to do everything at once. I could also discuss individual doubts with him until I understood the reasoning properly. The regular feedback made me much more disciplined, and I went into the GRE feeling considerably more prepared.',
    id: 'GRE4',
  },
  {
    name: 'DHRUV',
    school: '',
    marks: 'GRE 328 (165 Verbal, 163 Quant)',
    review:
      'The biggest lesson I took away from my GRE preparation was knowing when to let a question go. I had a habit of spending too long on problems simply because I wanted to finish them. That changed after several conversations with Dominic Sir, who kept challenging me to think about timing and question selection differently. Eventually I became much better at judging when to move on, which made a huge difference on test day.',
    id: 'GRE5',
  },
  {
    name: 'HIYA',
    school: '',
    marks: 'GRE 324 (161 Verbal, 163 Quant)',
    review:
      'I remember feeling quite overwhelmed when I first started thinking about the GRE. The process gradually became much more approachable once I understood what I actually needed to work on instead of trying to improve everything simultaneously. Dominic Sir was particularly attentive to the way I approached Verbal questions and would make me return to the passage when I had missed something rather than simply explain the answer. That habit made me a much more careful reader, while the Quant discussions helped me become more comfortable with unfamiliar problems. Looking back, that individual attention was probably the most valuable part of my experience.',
    id: 'GRE6',
  },

  // =========================
  // GMAT
  // No inset images
  // =========================
  {
    name: 'MILIND',
    school: '',
    marks: 'GMAT 725 (Quant 86, Verbal 85, Data Insights 88)',
    review:
      'The GMAT was a very different experience for me, particularly because of the pressure of making decisions quickly. I initially spent too much time trying to solve every problem perfectly. Dominic Sir helped me understand where I was wasting time and, more importantly, why I was doing it. Once I changed that habit, my approach became much more efficient and I felt far more in control of the exam.',
    id: 'GMAT1',
  },
  {
    name: 'SAURABH',
    school: '',
    marks: 'GMAT 705 (Quant 85, Verbal 84, Data Insights 86)',
    review:
      'Dominic Sir noticed quite early that my timing was inconsistent even though I was reasonably comfortable with the basics of the GMAT. Instead of simply telling me to work faster, he would question why I had spent so long on a particular problem. That made me much more aware of my decision-making. I found Data Insights especially interesting because it required me to process information differently, and the more I practised, the more naturally that approach started coming to me.',
    id: 'GMAT2',
  },
  {
    name: 'MEHAK',
    school: '',
    marks: 'GMAT 705 (Quant 84, Verbal 86, Data Insights 83)',
    review:
      'There were a few times during my GMAT preparation when I would make the same mistake and wonder why I was repeating it. I gradually realised that getting the correct solution explained to me was not enough; I needed to understand the flaw in my own reasoning. Dominic Sir had a way of making me stop and examine that reasoning instead of simply correcting the answer. That taught me to be much more honest about my weak areas and considerably more comfortable with unfamiliar questions.',
    id: 'GMAT3',
  },
  {
    name: 'SHAURYA',
    school: '',
    marks: 'GMAT 695 (Quant 84, Verbal 81, Data Insights 82)',
    review:
      'I used to judge my progress almost entirely by my mock-test score. Dominic Sir changed that. He made me look at the questions behind the score—where I had rushed, where I had spent too much time and even where I had reached the correct answer using an inefficient method. That completely changed how I reviewed my GMAT mocks. I started seeing patterns in my performance that I would otherwise have missed, and the preparation became much more purposeful as a result.',
    id: 'GMAT4',
  },
  {
    name: 'MANSI',
    school: '',
    marks: 'GMAT 675 (Quant 85, Verbal 81, Data Insights 81)',
    review:
      'I particularly remember struggling with a few Quant questions that seemed much harder than they actually were. Instead of giving me a shortcut, Dominic Sir kept asking me to look at the problem differently until I found a simpler route myself. That approach suited me because I actually remembered the reasoning afterwards. The same thing gradually happened across the GMAT, and I became much less anxious when I encountered unfamiliar questions.',
    id: 'GMAT5',
  },
  {
    name: 'KAUSTAV',
    school: '',
    marks: 'GMAT 645 (Quant 82, Verbal 78, Data Insights 82)',
    review:
      'When I started preparing for the GMAT, I assumed that putting in more hours would automatically lead to a better score. I soon realised that simply doing more questions was not necessarily helping me improve. The turning point came when Dominic Sir made me look closely at the mistakes I kept repeating and understand their underlying cause. His discussions about when to persist with a problem and when to move ahead were particularly useful during the actual GMAT. I felt I had a plan even when the test became difficult, and the experience taught me quite a bit about how I approach challenging problems.',
    id: 'GMAT6',
  },

  // =========================
  // FOREIGN LANGUAGES
  // No inset images
  // =========================
  {
    name: 'DYUMNA',
    school: 'Christ University (Banglore)',
    marks: 'SPANISH FOUNDATION (A1 & A2)',
    review:
      'The beginner level Spanish lessons took up a very holistic approach towards understanding the language and to gain the ability to start speaking it a little by the end of the modules. Dominic sir’s way of teaching helped me in initiating and engaging in basic conversation in Spanish. Overall, it was a wonderful experience learning at Apriori!',
    id: '7',
  },
  {
    name: 'NIPUN BANERJEE',
    school: 'IIHM (New Delhi)',
    marks: 'SPANISH FOUNDATION (A1 & A2)',
    review:
      'The overall content delivery was phenomenal. The level of interaction even in an online session made the whole experience fruitful. The content itself was extremely informative and the most important part of the classes that made it different and effective was the practice of correct pronunciation. That itself is something that is hard to grasp and teach.',
    id: '9',
  },
  {
    name: 'PRISHA CHHABRA',
    school: 'Rukmani Birla (Jaipur)',
    marks: 'GERMAN FOUNDATION & INTERMEDIATE (A1, A2, B1 & B2)',
    review:
      'The 10-day Spanish foundation course with Apriori Education completely changed the way I look at learning a new language. I am thankful to be aware of how enriching, fun and lasting the knowledge of an interesting language like Spanish can be. From the first class till the last; my interest only kept mounting. In this lesson, you don’t learn simply the ABCs of a language, you learn every aspect of its practicality when you come around to speaking it.\nIn completing every assignment filled with realistic questions and conversations, I gained a sense of achievement thanks to the incredible and novel teaching of Dominic Sir. I truly miss this class, and grateful to have the experience!',
    id: '10',
  },

  // =========================
  // OTHER EXISTING TESTIMONIAL
  // No inset image
  // =========================
  {
    name: 'ANIRUDH BHATNAGAR',
    school: '',
    marks: 'AP Calculus',
    review:
      'I’m a junior attending Boston University. This past summer (2019) the Apriori Education Math Faculty tutored me in Calculus. I hadn’t taken calculus, or even a math class, since taking AP calculus AB in high school. They managed to teach without lecturing me, keeping me engaged with each topic. In the span of 2 months my fundamentals have improved considerably and my confidence in Calculus has enhanced a lot. Their passion for teaching is infectious.',
    id: '20',
  },
]

export default function index() {
  return (
    <div>
      <Navbar />

      <div className={styles.contopicc}>
        <div className={styles.tint}></div>
        <div className={styles.contopic}>Our Testimonials</div>
      </div>

      <div className={styles.cards}>
        {info.map((data) => {
          return (
            <div className={styles.card} key={data.id}>
              {data.img && (
                <div className={styles.imgc}>
                  <Image
                    className={styles.img}
                    src={data.img}
                    width={400}
                    height={400}
                  />
                </div>
              )}

              <div className={styles.name}>{data.name}</div>
              <div className={styles.school}>{data.school}</div>
              <div className={styles.marks}>{data.marks}</div>
              <div className={styles.review}>{data.review}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
