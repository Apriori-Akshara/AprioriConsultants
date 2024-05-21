import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import styles from "../../src/styles/home/ourcourses.module.css"
import Reveal from '../../components/Reveal'
import Link from "next/link";

function CoursesSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <div className={styles.slidercontainer}>
      <Slider className={styles.slider} {...settings}>
        <div className={styles.card}>
        <Link className={styles.link} href='/Admissions'>
          <div>
            <Image className={styles.img} src={"/newimages/adms-counselling-img.jpg"} width={400} height={400} alt="image"/>
          </div>
          <div className={styles.cardinfo}>
          <Reveal>
            <div className={styles.cardtitle}>Admissions Counselling <br/>  Services </div>
            <div className={styles.carddesc}>From building strong profiles to choosing the right courses, our program equips counselors with the tools they need to guide students toward success.</div>
           <div className={styles.text3}>Read More</div>
            {/* <div className={styles.cardflexend}>
              <div><div>Date</div><div>June 26</div></div>
              <div className={styles.discount}><div>Discount</div><div>15%</div></div>
              <div><div>Duration</div><div>6 months</div></div>
            </div> */}
            </Reveal>
          </div>
          <div>
            
          </div>
          </Link>
        </div>
        <div className={styles.card}>
        <Link className={styles.link} href='/TestPrep'>
          <div>
            <Image className={styles.img} src={"/newimages/foreign languages.png"} width={400} height={400} alt="image"/>
          </div>
          <div className={styles.cardinfo}>
          <Reveal>
            <div className={styles.cardtitle}>Test Prep - Undergrad <br/> SAT/ ACT/ AP</div>
            <div className={styles.carddesc}>Prepare for your undergraduate journey with our comprehensive GRE, GMAT, and LSAT test prep courses. Master critical thinking and exam strategies.</div>
           <div className={styles.text3}>Read More</div>
            {/* <div className={styles.cardflexend}>
              <div><div>Date</div><div>June 26</div></div>
              <div className={styles.discount}><div>Discount</div><div>15%</div></div>
              <div><div>Duration</div><div>6 months</div></div>
            </div> */}
            </Reveal>
          </div>
          <div>
            
          </div>
          </Link>
        </div>
        <div className={styles.card}>
        <Link className={styles.link} href='/TestPrep'>
          <div>
            <Image className={styles.img} src={"/newimages/GREGMATLSAT.png"} width={400} height={400} alt="image"/>
          </div>
          <div className={styles.cardinfo}>
          <Reveal>
            <div className={styles.cardtitle}>Test Prep - Postgrad <br/> GRE/ GMAT/ LSAT</div>
            <div className={styles.carddesc}>Ace your postgraduate admissions tests with our expert-led GRE, GMAT, and LSAT preparation courses. Unlock your potential and secure your academic future!</div>
            <div className={styles.text3}>Read More</div>
            {/* <div className={styles.cardflexend}>
              <div><div>Date</div><div>June 26</div></div>
              <div className={styles.discount}><div>Discount</div><div>15%</div></div>
              <div><div>Duration</div><div>6 months</div></div>
            </div> */}
            </Reveal>
          </div>
          <div>
            
          </div>
          </Link>
        </div>
        <div className={styles.card}>
        <Link className={styles.link} href='/TestPrep'>
          <div>
            <Image className={styles.img} src={"/newimages/LanguageProficiency.jpeg"} width={400} height={400} alt="image"/>
          </div>
          <div className={styles.cardinfo}>
          <Reveal>
            <div className={styles.cardtitle}>Language Proficiency <br/> IELTS/ TOEFL/ SPOKEN ENGLISH</div>
            <div className={styles.carddesc}>Master the art of communication with our Language Proficiency courses. Whether you’re preparing for IELTS or TOEFL, we’ve got you covered!</div>
            <div className={styles.text3}>Read More</div>
            {/* <div className={styles.cardflexend}>
              <div><div>Date</div><div>June 26</div></div>
              <div className={styles.discount}><div>Discount</div><div>15%</div></div>
              <div><div>Duration</div><div>6 months</div></div>
            </div> */}
            </Reveal>
          </div>
          <div>
            
          </div>
          </Link>
        </div>

        <div className={styles.card}>
        <Link className={styles.link} href='/Languages'>
          <div>
            <Image className={styles.img} src={"/newimages/test-prep-act-sat-img.jpg"} width={400} height={400} alt="image"/>
          </div>
          <div className={styles.cardinfo}>
          <Reveal>
            <div className={styles.cardtitle}>Foreign Languages <br/>SPANISH/ FRENCH/ GERMAN</div>
            <div className={styles.carddesc}>Embark on a linguistic adventure with our Spanish, French, German, and Italian courses. Explore cultures, enhance communication, and broaden your horizons!</div>
            <div className={styles.text3}>Read More</div>
            {/* <div className={styles.cardflexend}>
              <div><div>Date</div><div>June 26</div></div>
              <div className={styles.discount}><div>Discount</div><div>15%</div></div>
              <div><div>Duration</div><div>6 months</div></div>
            </div> */}
            </Reveal>
          </div>
          <div>
            
          </div>
          </Link>
        </div>
      </Slider>
    </div>
  );
}

export default CoursesSlider;
