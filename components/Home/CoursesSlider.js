import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import styles from "../../src/styles/home/ourcourses.module.css"

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
          <div>
            <Image className={styles.img} src={"/Homepageassets/p1.jpg"} width={400} height={400} alt="image"/>
          </div>
          <div className={styles.cardinfo}>
            <div className={styles.cardsubtitle}>Course Subtitle here</div>
            <div className={styles.cardtitle}>COURSE TITLE HERE</div>
            <div className={styles.carddesc}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
            <div className={styles.cardflexend}>
              <div><div>Date</div><div>June 26</div></div>
              <div className={styles.discount}><div>Discount</div><div>15%</div></div>
              <div><div>Duration</div><div>6 months</div></div>
            </div>
          </div>
          <div>
            
          </div>
        </div>
        <div className={styles.card}>
          <div>
            <Image className={styles.img} src={"/Homepageassets/p1.jpg"} width={400} height={400} alt="image"/>
          </div>
          <div className={styles.cardinfo}>
            <div className={styles.cardsubtitle}>Course Subtitle here</div>
            <div className={styles.cardtitle}>COURSE TITLE HERE</div>
            <div className={styles.carddesc}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
            <div className={styles.cardflexend}>
              <div><div>Date</div><div>June 26</div></div>
              <div className={styles.discount}><div>Discount</div><div>15%</div></div>
              <div><div>Duration</div><div>6 months</div></div>
            </div>
          </div>
          <div>
            
          </div>
        </div>
        <div className={styles.card}>
          <div>
            <Image className={styles.img} src={"/Homepageassets/p1.jpg"} width={400} height={400} alt="image"/>
          </div>
          <div className={styles.cardinfo}>
            <div className={styles.cardsubtitle}>Course Subtitle here</div>
            <div className={styles.cardtitle}>COURSE TITLE HERE</div>
            <div className={styles.carddesc}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
            <div className={styles.cardflexend}>
              <div><div>Date</div><div>June 26</div></div>
              <div className={styles.discount}><div>Discount</div><div>15%</div></div>
              <div><div>Duration</div><div>6 months</div></div>
            </div>
          </div>
          <div>
            
          </div>
        </div>
        <div className={styles.card}>
          <div>
            <Image className={styles.img} src={"/Homepageassets/p1.jpg"} width={400} height={400} alt="image"/>
          </div>
          <div className={styles.cardinfo}>
            <div className={styles.cardsubtitle}>Course Subtitle here</div>
            <div className={styles.cardtitle}>COURSE TITLE HERE</div>
            <div className={styles.carddesc}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
            <div className={styles.cardflexend}>
              <div><div>Date</div><div>June 26</div></div>
              <div className={styles.discount}><div>Discount</div><div>15%</div></div>
              <div><div>Duration</div><div>6 months</div></div>
            </div>
          </div>
          <div>
            
          </div>
        </div>
      </Slider>
    </div>
  );
}

export default CoursesSlider;
