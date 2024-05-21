import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Navbar from '../../../components/navbar'
import styles from '../../styles/home/testprep/testprep.module.css'

export default function index() {
  return (
    <div>
      <Navbar />
      <div className={styles.contopicc}>
        <div className={styles.tint}></div>
      <div className={styles.contopic}>Test Preparation</div>
    </div>

    <div className={styles.container}>
      <div className={styles.heading}>Test Preparation <span>Undergrad</span></div>
      <div className={styles.cards}>

        <div className={styles.card}>
        <Link className={styles.link} href='/TestPrep/SAT'>
          <div className={styles.imgc}>
            <Image className={styles.img} src={'/testprep/SAT.png'} height={500} width={500} alt='img'/>
          </div>
          <div className={styles.textc}>
            <div className={styles.topc}>
              <Image className={styles.logo} src={'/logo/logo.jpg'} height={500} width={500} alt='img'/>
              <div className={styles.logotext}>APRIORI EDUCATION SERVICES</div>
            </div>
            <div className={styles.desc}>TEST PREPARATION FOR SAT</div>
          </div>
          </Link>
        </div>

        <div className={styles.card}>
        <Link className={styles.link} href='/TestPrep/ACT'>
          <div className={styles.imgc}>
            <Image className={styles.img} src={'/testprep/undergradact.png'} height={500} width={500} alt='img'/>
          </div>
          <div className={styles.textc}>
            <div className={styles.topc}>
              <Image className={styles.logo} src={'/logo/logo.jpg'} height={500} width={500} alt='img'/>
              <div className={styles.logotext}>APRIORI EDUCATION SERVICES</div>
            </div>
            <div className={styles.desc}>TEST PREPARATION FOR ACT</div>
          </div>
          </Link>
        </div>

        <div className={styles.card}>
        <Link className={styles.link} href='/TestPrep/IELTS'>
          <div className={styles.imgc}>
            <Image className={styles.img} src={'/testprep/undergradIELTS.jpg'} height={500} width={500} alt='img'/>
          </div>
          <div className={styles.textc}>
            <div className={styles.topc}>
              <Image className={styles.logo} src={'/logo/logo.jpg'} height={500} width={500} alt='img'/>
              <div className={styles.logotext}>APRIORI EDUCATION SERVICES</div>
            </div>
            <div className={styles.desc}>TEST PREPARATION FOR IELTS</div>
          </div>
          </Link>
        </div>

        <div className={styles.card}>
          <Link className={styles.link} href='/TestPrep/TOEFL'>
          <div className={styles.imgc}>
            <Image className={styles.img} src={'/testprep/IELTSTOEFL.jpeg'} height={500} width={500} alt='img'/>
          </div>
          <div className={styles.textc}>
            <div className={styles.topc}>
              <Image className={styles.logo} src={'/logo/logo.jpg'} height={500} width={500} alt='img'/>
              <div className={styles.logotext}>APRIORI EDUCATION SERVICES</div>
            </div>
            <div className={styles.desc}>TEST PREPARATION FOR TOEFL</div>
          </div>
          </Link>
        </div>

        <div className={styles.card}>
        <Link className={styles.link} href='/TestPrep/AP'>
          <div className={styles.imgc}>
            <Image className={styles.img} src={'/testprep/ap.png'} height={500} width={500} alt='img'/>
          </div>
          <div className={styles.textc}>
            <div className={styles.topc}>
              <Image className={styles.logo} src={'/logo/logo.jpg'} height={500} width={500} alt='img'/>
              <div className={styles.logotext}>APRIORI EDUCATION SERVICES</div>
            </div>
            <div className={styles.desc}>TEST PREPARATION FOR AP</div>
          </div>
          </Link>
        </div>

        <div className={styles.card}>
          <div className={styles.imgc}>
            <Image className={styles.img} src={'/testprep/duolingo.png'} height={500} width={500} alt='img'/>
          </div>
          <div className={styles.textc}>
            <div className={styles.topc}>
              <Image className={styles.logo} src={'/logo/logo.jpg'} height={500} width={500} alt='img'/>
              <div className={styles.logotext}>APRIORI EDUCATION SERVICES</div>
            </div>
            <div className={styles.desc}>DUOLINGO ENGLISH TEST</div>
          </div>
        </div>

      </div>
    </div>

    <div className={styles.container}>
      <div className={styles.heading}>Test Preparation <span>Postgrad</span></div>
      <div className={styles.cards}>

        <div className={styles.card}>
        <Link className={styles.link} href='/TestPrep/GRE'>
          <div className={styles.imgc}>
            <Image className={styles.img} src={'/testprep/gre.png'} height={500} width={500} alt='img'/>
          </div>
          <div className={styles.textc}>
            <div className={styles.topc}>
              <Image className={styles.logo} src={'/logo/logo.jpg'} height={500} width={500} alt='img'/>
              <div className={styles.logotext}>APRIORI EDUCATION SERVICES</div>
            </div>
            <div className={styles.desc}>TEST PREPARATION FOR GRE</div>
          </div>
          </Link>
        </div>

        <div className={styles.card}>
        <Link className={styles.link} href='/TestPrep/GMAT'>
          <div className={styles.imgc}>
            <Image className={styles.img} src={'/testprep/gmat.png'} height={500} width={500} alt='img'/>
          </div>
          <div className={styles.textc}>
            <div className={styles.topc}>
              <Image className={styles.logo} src={'/logo/logo.jpg'} height={500} width={500} alt='img'/>
              <div className={styles.logotext}>APRIORI EDUCATION SERVICES</div>
            </div>
            <div className={styles.desc}>TEST PREPARATION FOR GMAT</div>
          </div>
          </Link>
        </div>

        <div className={styles.card}>
        <Link className={styles.link} href='/TestPrep/LSAT'>
          <div className={styles.imgc}>
            <Image className={styles.img} src={'/testprep/LSAT.jpg'} height={500} width={500} alt='img'/>
          </div>
          <div className={styles.textc}>
            <div className={styles.topc}>
              <Image className={styles.logo} src={'/logo/logo.jpg'} height={500} width={500} alt='img'/>
              <div className={styles.logotext}>APRIORI EDUCATION SERVICES</div>
            </div>
            <div className={styles.desc}>TEST PREPARATION FOR LSAT</div>
          </div>
          </Link>
        </div>

        <div className={styles.card}>
        <Link className={styles.link} href='/TestPrep/IELTS-POST'>
          <div className={styles.imgc}>
            <Image className={styles.img} src={'/testprep/testIELTS.jpg'} height={500} width={500} alt='img'/>
          </div>
          <div className={styles.textc}>
            <div className={styles.topc}>
              <Image className={styles.logo} src={'/logo/logo.jpg'} height={500} width={500} alt='img'/>
              <div className={styles.logotext}>APRIORI EDUCATION SERVICES</div>
            </div>
            <div className={styles.desc}>TEST PREPARATION FOR IELTS</div>
          </div>
          </Link>
        </div>

        <div className={styles.card}>
        <Link className={styles.link} href='/TestPrep/TOEFL-POST'>
          <div className={styles.imgc}>
            <Image className={styles.img} src={'/testprep/IELTSTOEFL.jpeg'} height={500} width={500} alt='img'/>
          </div>
          <div className={styles.textc}>
            <div className={styles.topc}>
              <Image className={styles.logo} src={'/logo/logo.jpg'} height={500} width={500} alt='img'/>
              <div className={styles.logotext}>APRIORI EDUCATION SERVICES</div>
            </div>
            <div className={styles.desc}>TEST PREPARATION FOR TOEFL</div>
          </div>
          </Link>
        </div>

        <div className={styles.card}>
          <div className={styles.imgc}>
            <Image className={styles.img} src={'/testprep/duolingo.png'} height={500} width={500} alt='img'/>
          </div>
          <div className={styles.textc}>
            <div className={styles.topc}>
              <Image className={styles.logo} src={'/logo/logo.jpg'} height={500} width={500} alt='img'/>
              <div className={styles.logotext}>APRIORI EDUCATION SERVICES</div>
            </div>
            <div className={styles.desc}>DUOLINGO ENGLISH TEST</div>
          </div>
        </div>

      </div>
    </div>

    </div>
  )
}
