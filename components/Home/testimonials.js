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
        <Reveal>
        <div className={styles.card}>
          <div className={styles.imgcontainer}>
            <Image className={styles.img} src={"/testimonials/testimonial-img2.png"} width={400} height={400} alt="image"/>
          </div>
          <div>
            <div className={styles.description}>For me, Apriori has not only been a test prep institute but also been an experience. The personal attention I got here is unparalleled. I would definitely recommend Apriori to anyone looking to get a great score on the SAT/ ACT.</div>
            <div className={styles.name}>AKSHARA THAKUR</div>
            <div className={styles.boldtext}>Dubai International Academy</div>
            <div className={styles.boldtext}>SAT 1560 (790 M, 770 V)</div>
          </div>
        </div>
        </Reveal>
        </div>

        <div className={styles.cardcontainer}>
        <Reveal>
        <div className={styles.card}>
          <div className={styles.imgcontainer}>
            <Image className={styles.img} src={"/testimonials/testimonial-img1.png"} width={400} height={400} alt="image"/>
          </div>
          <div>
            <div className={styles.description}>What is truly remarkable about the Apriori team is their commitment to being not only test prep professionals, but also teachers and mentors. My success on the GMAT was a direct result of their attention to detail and their focus on helping me understand test concepts.</div>
            <div className={styles.name}>ROHIT BHATNAGAR</div>
            <div className={styles.boldtext}>Boston University</div>
            <div className={styles.boldtext}>GMAT 750 (50 M, 42 V)</div>
          </div>
        </div>
        </Reveal>
        </div>

        <div className={styles.cardcontainer}>
        <Reveal>
        <div className={styles.card}>
          <div className={styles.imgcontainer}>
            <Image className={styles.img} src={"/testimonials/testimonial-img5.png"} width={400} height={400} alt="image"/>
          </div>
          <div>
            <div className={styles.description}>I had the opportunity to attend classes for SAT and ACT at Apriori. I would like to extend a personal thanks to Dominic Sir who has been very patient and supportive and has at all times stressed the need to be a voracious reader in order to achieve the scores in the standardized tests and to achieve overall academic excellence.</div>
            <div className={styles.name}>DHRUV SHARMA</div>
            <div className={styles.boldtext}>Modern School (Barakhamba, New Delhi)</div>
            <div className={styles.boldtext}>ACT 34 (36 M, 36 S, 32 R, 32 R)</div>
          </div>
        </div>
        </Reveal>
        </div>

        <div className={styles.cardcontainer}>
        <Reveal>
        <div className={styles.card}>
          <div className={styles.imgcontainer}>
            <Image className={styles.img} src={"/testimonials/testimonial-img3.png"} width={400} height={400} alt="image"/>
          </div>
          <div>
            <div className={styles.description}>If you want a new approach to learning things and escape the ordinary methods you are used to, join Apriori as fast as possible. Not only are you going to get a great score but also be able to think and learn way more than you did at school.</div>
            <div className={styles.name}>ARYA LAMBA</div>
            <div className={styles.boldtext}>Modern School (Barakhamba, New Delhi)</div>
            <div className={styles.boldtext}>SAT 1540 (790 M, 750 V)</div>
          </div>
        </div>
        </Reveal>
        </div>

        <div className={styles.cardcontainer}>
        <Reveal>
        <div className={styles.card}>
          <div className={styles.imgcontainer}>
            <Image className={styles.img} src={"/testimonials/testimonial-img4.png"} width={400} height={400} alt="image"/>
          </div>
          <div>
            <div className={styles.description}>Apriori Education has played an indispensable role in my SAT prep. Along with the prescribed curriculum, the complementary activities not only groomed me for SAT, but also allowed for a more holistic and well-rounded development. Further, Apriori’s emphasis on individual attention and meticulous planning ensured comfort along with unparalleled guidance.</div>
            <div className={styles.name}>SUKRITI GUPTA</div>
            <div className={styles.boldtext}>Amity International School (Saket)</div>
            <div className={styles.boldtext}>SAT 1550 (790 M, 760 V)</div>
          </div>
        </div>
        </Reveal>
        </div>

        <div className={styles.cardcontainer}>
        <Reveal>
        <div className={styles.card}>
          <div className={styles.imgcontainer}>
            <Image className={styles.img} src={"/testimonials/testimonial-img19.png"} width={400} height={400} alt="image"/>
          </div>
          <div>
            <div className={styles.description}>There is no one in this field who knows more about the SAT than Dominic sir. The ivy mentorship has been of great help in understanding the exam in a more relatable manner, as the mentor has been a former student herself, and understands the challenges faced by a student. The staff is also very professional and prompt and is always ready to guide you.</div>
            <div className={styles.name}>REYAN MEHTA</div>
            <div className={styles.boldtext}>Pathways World School (Noida)</div>
            <div className={styles.boldtext}>SAT Score - 1550 (800 M, 750 V)</div>
          </div>
        </div>
        </Reveal>
        </div>

      </Slider>
    </div>
  );
}

export default Testimonials;