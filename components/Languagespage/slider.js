import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import styles from "../../src/styles/home/Languages/slider.module.css"
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
        <Link className={styles.link} href={'/Languages/SpanishLanguage'}>
          <div>
            <Image className={styles.img} src={"/languages/1.jpg"} width={400} height={400} alt="image"/>
          </div>
          <div className={styles.cardinfo}>
          <Reveal>
            <div className={styles.cardtitle}>Spanish Language </div>
            <div className={styles.carddesc}>Are you looking to expand your horizons and dive into the exciting world of a foreign language and culture? Look no further than Apriori Education's...</div>
            <div className={styles.text3}>Read More</div>
            </Reveal>
          </div>
          <div>
            
          </div>
          </Link>
        </div>
        <div className={styles.card}>
        <Link className={styles.link} href={'/Languages/GermanLanguage'}>
          <div>
            <Image className={styles.img} src={"/languages/2.jpg"} width={400} height={400} alt="image"/>
          </div>
          <div className={styles.cardinfo}>
          <Reveal>
            <div className={styles.cardtitle}>German Language</div>
            <div className={styles.carddesc}>Learning a new language can be a fascinating journey that opens up a world of opportunities. Amongst the various languages spoken around...</div>
            <div className={styles.text3}>Read More</div>
            </Reveal>
          </div>
          <div>
            
          </div>
          </Link>
        </div>
        <div className={styles.card}>
        <Link className={styles.link} href={'/Languages/FrenchLanguage'}>
          <div>
            <Image className={styles.img} src={"/languages/3.jpg"} width={400} height={400} alt="image"/>
          </div>
          <div className={styles.cardinfo}>
          <Reveal>
            <div className={styles.cardtitle}>French Language</div>
            <div className={styles.carddesc}>Apriori Education is pleased to offer an exciting French language course that will immerse you in the rich and sophisticated culture of France...</div>
            <div className={styles.text3}>Read More</div>
            </Reveal>
          </div>
          <div>
            
          </div>
          </Link>
        </div>
        <div className={styles.card}>
        <Link className={styles.link} href={'/Languages/ItalianLanguage'}>
          <div>
            <Image className={styles.img} src={"/languages/4.jpg"} width={400} height={400} alt="image"/>
          </div>
          <div className={styles.cardinfo}>
          <Reveal>
            <div className={styles.cardtitle}>Italian Language</div>
            <div className={styles.carddesc}>Embarking on a language-learning journey is like unlocking a treasure chest of global connections. Explore diverse cultures, communicate...</div>
            <div className={styles.text3}>Read More</div>
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
