import styles from "../src/styles/home/navbar.module.css"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useRouter } from "next/router";
import Link from "next/link";

export default function navbar() {
  const[toggle,setToggle] = useState(false) 
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const router = useRouter();
  const isActive = (href) => router.pathname === href;

  const controlNavbar = () => {
    if (typeof window !== 'undefined') { 
      if (window.scrollY > lastScrollY && window.scrollY >= 150) { // if scroll down hide the navbar
        setShow(false); 
      } else { // if scroll up show the navbar
        setShow(true);  
      }
      // remember current page location to use in the next move
      setLastScrollY(window.scrollY); 
    }
  };

  useEffect(() => {   
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);
      // cleanup function
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }  

  }, [lastScrollY]);

  return (
    <div className={show ? `${styles.show}` : `${styles.hide}`}>
    <div className={styles.navbar}>
        <Image className={styles.logoimage} src={'/logo/logo.jpg'} width={400} height={400} alt="logo-image"/>
      <div>
        <ul className={toggle ? `${styles.uldown}` : `${styles.ul}`}>
          <Link href='/' className={isActive('/') ? `${styles.active}`: `${styles.link}`}>Home</Link>
          <Link href='/SATDiagnosticTest' className={isActive('/SATDiagnosticTest') ? `${styles.active}`: `${styles.link}`}>SAT Diagnostic Test</Link>
          <Link href='/Admissions' className={isActive('/Admissions') ? `${styles.active}`: `${styles.link}`}>Admissions</Link>
          <Link href='/TestPrep' className={isActive('/TestPrep') ? `${styles.active}`: `${styles.link}`}>Test Prep</Link>
          <Link href='/Languages' className={isActive('/Languages') ? `${styles.active}`: `${styles.link}`}>Languages</Link>
          <Link href='/Testimonials' className={isActive('/Testimonials') ? `${styles.active}`: `${styles.link}`}>Testimonials</Link>
          <Link href='/About' className={isActive('/About') ? `${styles.active}`: `${styles.link}`}>About Us</Link>
          <Link href='/Contact' className={isActive('/Contact') ? `${styles.active}`: `${styles.link}`}>Contact Us</Link>
        </ul>
      </div>

      <div className={styles.btnsconta}>
      <Link href='/Courses'><button className={styles.loginBtn}>Courses</button></Link>
      <Link href='/Auth'><button className={styles.loginBtn}>Login</button></Link>
      </div>

      <div className={styles.btnscontainer}>
          <button onClick={()=>{setToggle(!toggle)}} className={toggle ? `${styles.menu} ${styles.opened}` : `${styles.menu}`} aria-label="Main Menu">
            <svg width="50" height="50" viewBox="0 0 100 100">
                <path className={`${styles.line} ${styles.line1}`} d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" />
                <path className={`${styles.line} ${styles.line2}`} d="M 20,50 H 80" />
                <path className={`${styles.line} ${styles.line3}`} d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" />
              </svg>
          </button>
    </div>

    </div>
    </div>
  )
}
