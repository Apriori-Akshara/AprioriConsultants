import styles from "./satcomp.module.css";

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <h1>Master the SAT with Confidence</h1>
        <p>Realistic practice tests, analytics, and tips to help you excel.</p>
        <a href="#tests">Get Started</a>
      </div>
    </section>
  );
}