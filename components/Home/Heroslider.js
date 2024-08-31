import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import styles from "../../src/styles/home/Slider/heroslider.module.css"
import Reveal from "../Reveal";

export default function Heroslider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    cssEase: "linear"
  };
  return (
    <Slider {...settings} className={styles.slider}>
      <div className={styles.heroimgcont}>
        <div className={styles.herodata}>
        <Reveal>
          <div className={styles.topcont}>
            <div className={styles.top}>OUR IDEOLOGY</div>
          </div>
        </Reveal>
        <Reveal>
          <div className={styles.middlecont}>
            <div className={styles.middle}>To educate curious minds about limitless possibilities</div>
          </div>
        </Reveal>
        <Reveal>
          <div className={styles.btmcont}>
            <div className={styles.btm}>We provides always our best services for our clients and always<br/>try to achieve our client's trust and satisfaction.</div>
          </div>
        </Reveal>
        <Reveal>
          <div className={styles.buttoncont}>
            <button className={styles.button}>Apply Now</button>
          </div>
        </Reveal>
        </div>
        <div className={styles.tint1}></div>
        <Image className={styles.heroimg} src={"/Heroslider/carasoul1.png"} width={1200} height={1200} alt="hero-image"/>
      </div>
      <div className={styles.heroimgcont}>
        <div className={styles.herodata}>
          <div className={styles.topcont}>
            <div className={styles.top}>OUR PHILOSOPHY</div>
          </div>
          <div className={styles.middlecont}>
            <div className={styles.middle}>Planning, consistency, and focus outshine talent... every time!</div>
          </div>
          <div className={styles.btmcont}>
            <div className={styles.btm}>Empowering curiosity, fostering inclusivity. <br/>Lifelong learning without boundaries. Join us at Apriori Education for an inspiring educational journey</div>
          </div>
          <div className={styles.buttoncont}>
            <button className={styles.button}>Apply Now</button>
          </div>
        </div>
        <div className={styles.tint1}></div>
        <Image className={styles.heroimg} src={"/Heroslider/carsoul2.png"} width={1200} height={1200} alt="hero-image"/>
      </div>
      {/* <div className={styles.heroimgcont}>
        <div className={styles.herodata}>
          <div className={styles.topcont}>
            <div className={styles.top}>EDUCATION</div>
          </div>
          <div className={styles.middlecont}>
            <div className={styles.middle}>EDUCATION FOR EVERYONE</div>
          </div>
          <div className={styles.btmcont}>
            <div className={styles.btm}>We provides always our best services for our clients and always<br/>try to achieve our client's trust and satisfaction.</div>
          </div>
          <div className={styles.buttoncont}>
            <button className={styles.button}>Apply Now</button>
          </div>
        </div>
        <Image className={styles.heroimg} src={"/Heroslider/bg3.jpg"} width={1200} height={1200} alt="hero-image"/>
      </div> */}
    </Slider>
  );
}
