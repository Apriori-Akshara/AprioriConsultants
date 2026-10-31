import React, { useState } from "react";
import Image from "next/image";
import Slider from "react-slick";
import styles from "../../src/styles/home/ourcourses.module.css";
import Link from "next/link";

const premiumServices = [
  {
    id: "admissions-counselling",
    href: "/Admissions",
    image: "/newimages/adms-counselling-img.jpg",
    title: <>Admissions Counselling <br /> Services</>,
    description:
      "From building strong profiles to choosing the right courses, our program equips counselors with the tools they need to guide students toward success.",
  },
  {
    id: "undergraduate-test-prep",
    href: "/TestPrep",
    image: "/newimages/foreign languages.png",
    title: <>Test Prep - Undergrad <br /> SAT/ ACT/ AP</>,
    description:
      "Prepare for your undergraduate journey with our comprehensive GRE, GMAT, and LSAT test prep courses. Master critical thinking and exam strategies.",
  },
  {
    id: "postgraduate-test-prep",
    href: "/TestPrep",
    image: "/newimages/GREGMATLSAT.png",
    title: <>Test Prep - Postgrad <br /> GRE/ GMAT/ LSAT</>,
    description:
      "Ace your postgraduate admissions tests with our expert-led GRE, GMAT, and LSAT preparation courses. Unlock your potential and secure your academic future!",
  },
  {
    id: "language-proficiency",
    href: "/TestPrep",
    image: "/newimages/LanguageProficiency.jpeg",
    title: <>Language Proficiency <br /> IELTS/ TOEFL/ SPOKEN ENGLISH</>,
    description:
      "Master the art of communication with our Language Proficiency courses. Whether you’re preparing for IELTS or TOEFL, we’ve got you covered!",
  },
  {
    id: "foreign-languages",
    href: "/Languages",
    image: "/newimages/test-prep-act-sat-img.jpg",
    title: <>Foreign Languages <br />SPANISH/ FRENCH/ GERMAN</>,
    description:
      "Embark on a linguistic adventure with our Spanish, French, German, and Italian courses. Explore cultures, enhance communication, and broaden your horizons!",
  },
];

function ServiceCards() {
  return premiumServices.map((service) => (
    <div className={styles.card} key={service.id}>
      <Link className={styles.link} href={service.href}>
        <Image
          className={styles.img}
          src={service.image}
          width={400}
          height={400}
          alt="image"
        />
        <div className={styles.cardinfo}>
          <div className={styles.cardtitle}>{service.title}</div>
          <div className={styles.carddesc}>{service.description}</div>
          <div className={styles.text3}>Read More</div>
        </div>
      </Link>
    </div>
  ));
}

export default function CoursesSlider() {
  const [sliderReady, setSliderReady] = useState(false);

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
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={styles.sliderFrame}>
      {!sliderReady && (
        <div className={styles.fallbackGrid}>
          <ServiceCards />
        </div>
      )}

      <div
        className={
          sliderReady ? styles.slidercontainer : styles.sliderPreload
        }
      >
        <Slider
          className={styles.slider}
          {...settings}
          onInit={() => setSliderReady(true)}
        >
          <ServiceCards />
        </Slider>
      </div>
    </div>
  );
}
