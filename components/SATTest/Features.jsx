import styles from "./satcomp.module.css";

const features = [
  { title: 'Adaptive Practice', description: 'Difficulty adjusts as you improve.' },
  { title: 'Detailed Analytics', description: 'Track your strengths and weaknesses.' },
  { title: 'Extensive Question Bank', description: 'Thousands of questions with explanations.' },
];

export default function Features() {
  return (
    <section className={styles.features}>
      <div className={styles.container}>
        {features.map((feature) => (
          <div key={feature.title} className={styles.feature}>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}