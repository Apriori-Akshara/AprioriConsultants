import Image from 'next/image'
import React from 'react'
import Navbar from '../../../../components/NavbarJS'
import styles from '../../../styles/home/testprep/testpreppages.module.css'

export default function index() {
  return (
    <div>
      <Navbar />
      <div className={styles.contopicc}>
        <div className={styles.tint}></div>
      <div className={styles.contopic}>Test Preparation Postgrad</div>
    </div>

    <div className={styles.container}>
      <div className={styles.heading}>About the <span>GRE</span></div>
      <h1>WHAT IS GRE?</h1>
      <p>The Graduate Record Examinations (GRE) is a 3-hour and 45 minutes long standardized test used for admission in graduate schools for universities across the United States, Canada, United Kingdom, Europe, Singapore, Australia, and many other countries. In fact, scholarships can also be offered based on GRE scores and past academic scores. There are approximately 1,000 GRE test centers in 160+ countries. There is no age restriction for registering for the exam.</p>
      <h2>What is on the GRE?</h2>
      <p><b>Here is a brief overview of the types of questions asked on the GRE Exam:</b></p>
      <h2>1.GRE Verbal Reasoning</h2>
      <p>The verbal reasoning questions appear in several formats. Half of them require you to read passages and answer questions on those passages. The other half requires you to read, interpret, and complete existing sentences, paragraphs, or groups of sentences.</p>
      <p>The verbal reasoning section has three sub-sections: Reading Comprehension, Sentence Equivalence, and Text Completion.</p>
      <h4>1.1 Reading Comprehension</h4>
      <p>This section includes three types of questions -</p>
      <ol>
        <li>Traditional multiple-choice, where out of the five answer choices you must select one.</li>
        <li>Multiple choice where you must choose all the correct answers.</li>
        <li>Select-in-passage questions where you choose the sentence in the passage that meets a specific description.</li>
      </ol>
      <h4>1.2 Sentence Equivalence</h4>
      <p>The sentence equivalence questions consist of a single sentence, one blank, and six answer choices. You need to select two answer choices that fit the meaning of the sentence. No marks are given if only one of the two chosen answers is correct.</p>
      <h4>1.3 Text Completion</h4>
      <p>The passage in this section will consist of one to five sentences, with one to three blanks and three answer choices per blank. Also, selecting one answer choice for one blank does not affect what answer choice you can choose for another blank.</p>
      <h2>2.GRE Quantitative Reasoning</h2>
      <p>The GRE Quantitative Reasoning section contains four types of questions:</p>
      <ol>
        <li>Quantitative Comparison Questions</li>
        <li>Multiple choice questions where you select one answer choice</li>
        <li>Multiple choice questions where you select one or more answer choices</li>
        <li>Numeric entry questions</li>
      </ol>
      <p>The GRE questions mentioned above appear either independently or as a set of questions called data interpretation. The data interpretation questions are based on the same data presented in graphs, tables, or other forms.</p>
      <div className={styles.imgc}>
        <Image className={styles.img} src={'/testpreppage/2.png'} height={500} width={500} alt='img'/>
        <div>Graph 1: GRE Quant Concepts by frequency</div>
      </div>
      <h2>3.GRE Analytical Writing</h2>
      <p>The analytical writing section consists of two types of task</p>
      <ol>
        <li>An Analyse an Issue Task</li>
        <li>An Analyse an Argument Task</li>
      </ol>
      <h4>3.1 Analyze an Issue Task</h4>
      <p>In this type of question, you need to think critically about a topic and then clearly express your thoughts about it in writing. The test taker will be given an issue statement followed by a set of specific instructions to answer.</p>
      <h4>3.2 Analyze an Argument</h4>
      <p>In this type of question, you will be presented with a brief passage in which the author makes a case or interpretation of events backed up by evidence. Your task is to discuss the logical soundness of the author’s claim based on specific instructions.</p>
      <p>The overall testing time for the GRE General Test is about three hours and 45 minutes. There are six sections with a 10-minute break following the third section.</p>
      <div className={styles.imgc}>
        <Image className={styles.img} src={'/testpreppage/ss6.png'} height={500} width={500} alt='img'/>
        <div>Table 2: Time alloted and questions per section</div>
      </div>
      <p>1. An unidentified unscored section that does not count toward your score may be included and may appear in any order after the Analytical Writing section. Questions in the unscored section are being tried out either for possible use in future tests or to ensure that scores on new editions of the test are comparable to scores from earlier editions.</p>
      <p>2. An identified research section that does not count toward your score may be included in place of the unscored section. The research section will always appear at the end of the test. Questions in this section are included for ETS research purposes.</p>
      <p>The Analytical Writing section will always be first. The Verbal Reasoning, Quantitative Reasoning and unidentified/unscored sections may appear in any order; therefore, you should treat each section as if it counts toward your score.</p>
      <p>The types of questions in each section for both Computer and paper-delivered exams remain the same, except for reading comprehension Select-in-passage questions are not included in the paper-based test.</p>

    </div>
    </div>
  )
}