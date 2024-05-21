import Image from 'next/image'
import React from 'react'
import Navbar from '../../../../components/navbar'
import styles from '../../../styles/home/testprep/testpreppages.module.css'

export default function index() {
  return (
    <div>
      <Navbar />
      <div className={styles.contopicc}>
        <div className={styles.tint}></div>
      <div className={styles.contopic}>Test Preparation Undergrad</div>
    </div>

    <div className={styles.container}>
      <div className={styles.heading}>About <span>SAT</span></div>
      <h1>WHAT IS THE SAT TEST?</h1>
      <p>The SAT is a 3-hour-long standardized test that is primarily divided into two components:</p>
      <ul>
        <li>Evidence-based Reading and Writing</li>
        <li>Math reasoning skills.</li>
      </ul>
      <p>The score for each of the two components of the Evidence-based Reading and Writing sections and Math sections are reported on an 800-point scale each making the exam a total of 1600 points. The scores are valid for 4 years.</p>
      <p>The New SAT has no negative marking. In the new test, multiple-choice options have been reduced from 5 to 4 choices. Moreover, the New SAT does not require direct use of vocabulary; instead, the words have to be understood so that they can be used in contextual settings.</p>
      <h2>GENERAL OVERVIEW</h2>
      <p>The test is administered five times a year (August, October, December, March, and May) in India and can be attempted more than once. These scores can be used by students to apply to universities in India, USA, and several other countries. Different schools have different SAT score requirements. Better scores result in better chances of admissions from universities.</p>
      <p>Registration for the SAT requires a valid original passport. The exam registration fee for the SAT exam (without the essay section) is USD 104. However, fee reduction is possible for low-income households. Moreover, Scholarships for low-income students to alliance universities is also possible.</p>
      <h2>THE CONTENT</h2>
      <h3>The Compulsory Sections</h3>
      <h3>Evidence-Based Reading & Writing: (200-800 points)</h3>
      <p>The <b>Evidence-Based Reading</b> section is 65 minutes long with 52 questions, all of which are passage-based and multiple choice. All questions are evidence-based that require the student to analyze and interpret the information given in the passages. Passages may be single or paired with informational graphics such as charts or tables. The passages will be drawn from the U.S and World Literature, History/Social Studies, and Science.</p>
      <p>The <b>Writing and Language</b> section is 35 minutes long with 44 multiple-choice questions based on several passages. Some passages are accompanied by informational graphics, such as tables, graphs, and charts. It focuses on one’s ability to analyze and edit the content of the passage, which means one will have to correct grammar and make changes in the passage. It asks one to edit/rectify errors in sentences within the passage, identify sentences that correct the misinterpretation of graphical data, select sentences that sharpen an argument, or add relevant supporting detail.</p>
      <p>For test prep for these sections, Apriori helps teach the students the necessary concepts and also introduces them to a variety of well-researched study materials. Besides this, Apriori also helps their students cultivate essential reading habits that aid tremendously in score improvement, as can be seen in the graph below:</p>
      <div className={styles.imgc}>
        <Image className={styles.img} src={'/testpreppage/1.png'} height={500} width={500} alt='img'/>
        <div>Graph 1: Time Spent on Reading Habts and Score Improvement</div>
      </div>
      <h3>Math: (200-800 points)</h3>
      <p>The Math section is broken down into a No Calculator (25 minutes long with 20 questions) and a Calculator(55 minutes long with 38 questions) Section, both of which add up to 58 questions that need to be solved in 80 minutes. The majority of questions are multiple-choice, but there will be some student-produced response questions which are known as Grid-ins; For these, instead of choosing from 4 answer choices the student will have to solve the problem and enter an answer by circling/shading the appropriate numbers.</p>
      <p>The Math test is divided into 4 main areas: (1) Heart of Algebra, (2) Problem Solving and Data Analysis, (3) Passport to Advanced Math, and (4) Additional topics in Math which include Geometry and Trigonometry.</p>
      <p>The following grid helps summarize the different test components:</p>
      <div className={styles.imgc}>
        <Image className={styles.img} src={'/testpreppage/ss1.png'} height={500} width={500} alt='img'/>
        <div>Graph 1: Time Spent on Reading Habts and Score Improvement</div>
      </div>

    </div>
    </div>
  )
}
