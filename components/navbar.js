import styles from "../src/styles/home/navbar.module.css"
import Image from "next/image"

export default function navbar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <Image className={styles.logoimage} src={'/logo/logo.jpg'} width={400} height={400} alt="logo-image"/>
      </div>
      <div>
        <ul className={styles.ul}>
          <li className={styles.active}>Home</li>
          <li>Admissions</li>
          <li>Test Prep</li>
          <li>Languages</li>
          <li>Testimonials</li>
          <li>About Us</li>
          <li>Contact Us</li>
        </ul>
      </div>
    </div>
  )
}
