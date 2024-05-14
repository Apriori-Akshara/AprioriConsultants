import Image from "next/image";
import Reveal from "../Reveal";
import React from "react";
import Slider from "react-slick";
import styles from "../../src/styles/home/testimonials.module.css"

function Testimonials() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
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
    <div className={styles.cover}></div>
    <Image className={styles.background} src={'/events/bg2.jpg'} width={2000} height={2000} alt='image'></Image>
    <Reveal>
      <div className={styles.heading}>
        <div className={styles.heading1}>Testimonials</div>
      </div>
    </Reveal>
      <Slider className={styles.slider} {...settings}>

        <div className={styles.cardcontainer}>
        <div className={styles.card}>
          <div className={styles.imgcontainer}>
            <Image className={styles.img} src={"/events/1 (1).jpg"} width={400} height={400} alt="image"/>
          </div>
          <div>
            <div className={styles.description}>Lorem ipsum dolor sit amet, consectetur adi isicing elit. Quas eveniet, nemo dicta. Ullam nam. Lorem ipsum dolor sit amet, consectetur adi isicing elit. Quas eveniet, nemo dicta. Ullam nam. Lorem ipsum dolor sit amet, consectetur adi isicing elit. Quas eveniet, nemo dicta. Ullam nam. Lorem ipsum dolor sit amet, consectetur adi isicing elit. Quas eveniet, nemo dicta. Ullam nam. Lorem ipsum dolor sit amet, consectetur adi isicing elit. Quas eveniet, nemo dicta. Ullam nam. </div>
            <div className={styles.name}>Name</div>
            <div className={styles.boldtext}>Designation</div>
          </div>
        </div>
        </div>

        <div className={styles.cardcontainer}>
        <div className={styles.card}>
          <div className={styles.imgcontainer}>
            <Image className={styles.img} src={"/events/2 (1).jpg"} width={400} height={400} alt="image"/>
          </div>
          <div>
            <div className={styles.description}>Lorem ipsum dolor sit amet, consectetur adi isicing elit. Quas eveniet, nemo dicta. Ullam nam. Lorem ipsum dolor sit amet, consectetur adi isicing elit. Quas eveniet, nemo dicta. Ullam nam. Lorem ipsum dolor sit amet, consectetur adi isicing elit. Quas eveniet, nemo dicta. Ullam nam. Lorem ipsum dolor sit amet, consectetur adi isicing elit. Quas eveniet, nemo dicta. Ullam nam. Lorem ipsum dolor sit amet, consectetur adi isicing elit. Quas eveniet, nemo dicta. Ullam nam. </div>
            <div className={styles.name}>Name</div>
            <div className={styles.boldtext}>Designation</div>
          </div>
        </div>
        </div>

        <div className={styles.cardcontainer}>
        <div className={styles.card}>
          <div className={styles.imgcontainer}>
            <Image className={styles.img} src={"/events/3 (1).jpg"} width={400} height={400} alt="image"/>
          </div>
          <div>
            <div className={styles.description}>Lorem ipsum dolor sit amet, consectetur adi isicing elit. Quas eveniet, nemo dicta. Ullam nam. Lorem ipsum dolor sit amet, consectetur adi isicing elit. Quas eveniet, nemo dicta. Ullam nam. Lorem ipsum dolor sit amet, consectetur adi isicing elit. Quas eveniet, nemo dicta. Ullam nam. Lorem ipsum dolor sit amet, consectetur adi isicing elit. Quas eveniet, nemo dicta. Ullam nam. Lorem ipsum dolor sit amet, consectetur adi isicing elit. Quas eveniet, nemo dicta. Ullam nam. </div>
            <div className={styles.name}>Name</div>
            <div className={styles.boldtext}>Designation</div>
          </div>
        </div>
        </div>

        <div className={styles.cardcontainer}>
        <div className={styles.card}>
          <div className={styles.imgcontainer}>
            <Image className={styles.img} src={"/events/2 (1).jpg"} width={400} height={400} alt="image"/>
          </div>
          <div>
            <div className={styles.description}>Lorem ipsum dolor sit amet, consectetur adi isicing elit. Quas eveniet, nemo dicta. Ullam nam. Lorem ipsum dolor sit amet, consectetur adi isicing elit. Quas eveniet, nemo dicta. Ullam nam. Lorem ipsum dolor sit amet, consectetur adi isicing elit. Quas eveniet, nemo dicta. Ullam nam. Lorem ipsum dolor sit amet, consectetur adi isicing elit. Quas eveniet, nemo dicta. Ullam nam. Lorem ipsum dolor sit amet, consectetur adi isicing elit. Quas eveniet, nemo dicta. Ullam nam. </div>
            <div className={styles.name}>Name</div>
            <div className={styles.boldtext}>Designation</div>
          </div>
        </div>
        </div>

      </Slider>
    </div>
  );
}

export default Testimonials;