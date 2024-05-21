import Image from 'next/image'
import styles from '../../src/styles/home/events.module.css'
import { SlCalender } from "react-icons/sl";
import { FaLocationDot } from "react-icons/fa6";
import Reveal from '../../components/Reveal'

export default function Events() {
  return (
    <div className={styles.container}>
    <div className={styles.topcontainer}>
    <Reveal>
      <div className={styles.heading}>Upcoming <span>Events</span></div>
      </Reveal>
      <Reveal>
      <div className={styles.headingtext}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem autem voluptatem obcaecati!</div>
      </Reveal>
    </div>

    <div className={styles.cards}>

    <Reveal>
      <div className={styles.card}>
        <div className={styles.imgcontainer}>
          <Image className={styles.img} src={'/events/as7.jpg'} width={400} height={400} alt='img'/>
        </div>
        <div className={styles.textcontainer}>
          <div className={styles.text1}>Upcoming Events Title</div>
          <div className={styles.text2}><SlCalender className={styles.icons}/> June 26, 2016 | <FaLocationDot className={styles.icons}/> New York</div>
          <div className={styles.text2}>Lorem ipsum dolor sit amet, consectetur adi isicing elit. Quas eveniet, nemo dicta. Ullam nam.</div>
          <div className={styles.text4}>Read More →</div>
        </div>
      </div>
      </Reveal>

      <Reveal>
      <div className={styles.card}>
        <div className={styles.imgcontainer}>
          <Image className={styles.img} src={'/events/as8.jpg'} width={400} height={400} alt='img'/>
        </div>
        <div className={styles.textcontainer}>
          <div className={styles.text1}>Upcoming Events Title</div>
          <div className={styles.text2}><SlCalender className={styles.icons}/> June 26, 2016 | <FaLocationDot className={styles.icons}/> New York</div>
          <div className={styles.text2}>Lorem ipsum dolor sit amet, consectetur adi isicing elit. Quas eveniet, nemo dicta. Ullam nam.</div>
          <div className={styles.text4}>Read More →</div>
        </div>
      </div>
      </Reveal>

      <Reveal>
      <div className={styles.card}>
        <div className={styles.imgcontainer}>
          <Image className={styles.img} src={'/events/as9.jpg'} width={400} height={400} alt='img'/>
        </div>
        <div className={styles.textcontainer}>
          <div className={styles.text1}>Upcoming Events Title</div>
          <div className={styles.text2}><SlCalender className={styles.icons}/> June 26, 2016 | <FaLocationDot className={styles.icons}/> New York</div>
          <div className={styles.text2}>Lorem ipsum dolor sit amet, consectetur adi isicing elit. Quas eveniet, nemo dicta. Ullam nam.</div>
          <div className={styles.text4}>Read More →</div>
        </div>
      </div>
      </Reveal>

      <Reveal>
      <div className={styles.card}>
        <div className={styles.imgcontainer}>
          <Image className={styles.img} src={'/events/as10.jpg'} width={400} height={400} alt='img'/>
        </div>
        <div className={styles.textcontainer}>
          <div className={styles.text1}>Upcoming Events Title</div>
          <div className={styles.text2}><SlCalender className={styles.icons}/> June 26, 2016 | <FaLocationDot className={styles.icons}/> New York</div>
          <div className={styles.text2}>Lorem ipsum dolor sit amet, consectetur adi isicing elit. Quas eveniet, nemo dicta. Ullam nam.</div>
          <div className={styles.text4}>Read More →</div>
        </div>
      </div>
      </Reveal>

    </div>

    </div>
  )
}
