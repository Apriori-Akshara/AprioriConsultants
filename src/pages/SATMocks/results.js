import Link from "next/link";
import { useEffect, useState } from "react";
import { getVerifiedSatServerAccessState } from "../../lib/sat/satAccess";
import { getSatLoginUrl } from "../../lib/sat/satLogin";
import styles from "../../styles/SATMockResults.module.css";

export async function getServerSideProps(context) {
  const accessState = await getVerifiedSatServerAccessState(context.req);
  if (!accessState.authenticated) {
    return { redirect: { destination: getSatLoginUrl("/SATMocks/results"), permanent: false } };
  }
  const attemptId = Number(context.query?.attemptId);
  return { props: { attemptId: Number.isInteger(attemptId) ? attemptId : null } };
}

function metricLabel(value) {
  return `${Number(value) || 0}%`;
}

function Breakdown({ title, items }) {
  return (
    <section className={styles.breakdown}>
      <div className={styles.sectionTitle}><span>{title}</span><small>Accuracy is calculated from all questions in the area</small></div>
      <div className={styles.breakdownGrid}>
        {(items || []).map((item) => (
          <div className={styles.breakdownCard} key={item.label}>
            <div><strong>{item.label}</strong><span>{item.correct}/{item.total} correct</span></div>
            <b>{metricLabel(item.accuracy)}</b>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function SATMockResults({ attemptId: initialAttemptId }) {
  const [report, setReport] = useState(null);
  const [attempts, setAttempts] = useState([]);
  const [attemptId, setAttemptId] = useState(initialAttemptId);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const url = attemptId ? `/api/sat/mock-progress?attemptId=${encodeURIComponent(attemptId)}` : "/api/sat/mock-progress";
        const response = await fetch(url, { credentials: "include" });
        const data = await response.json();
        if (!response.ok) throw new Error(data?.error || "Unable to load results");
        if (!active) return;
        if (attemptId) setReport(data.report || null);
        else {
          const completed = data.completed || [];
          setAttempts(completed);
          const latest = completed[0];
          if (latest) { setAttemptId(latest.id); setReport(latest.section_scores || null); }
        }
      } catch (loadError) {
        if (active) setError(loadError.message || "Unable to load results.");
      } finally {
        if (active) setLoading(false);
      }
    };
    void load();
    return () => { active = false; };
  }, [attemptId]);

  if (loading) return <div className={styles.page}><div className={styles.shell}><p>Loading your results…</p></div></div>;
  if (error) return <div className={styles.page}><div className={styles.shell}><h1>Results unavailable</h1><p>{error}</p><Link href="/SATMocks">Back to Mock Library</Link></div></div>;
  if (!report) return <div className={styles.page}><div className={styles.shell}><h1>No completed mock yet</h1><p>Complete a mock test and your detailed performance report will appear here.</p><Link href="/SATMocks">Go to Mock Library</Link></div></div>;

  const rw = report.sections?.["reading-writing"];
  const math = report.sections?.math;
  const completedDate = report.completedAt ? new Date(report.completedAt).toLocaleString() : "";

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.hero}>
          <div><span className={styles.eyebrow}>APRIORI PERFORMANCE REPORT</span><h1>{report.testLabel}</h1><p>{report.scoreNotice}</p></div>
          <Link className={styles.backLink} href="/SATMocks">Mock Library</Link>
        </header>

        <section className={styles.scoreGrid}>
          <div className={styles.scoreHero}><span>OVERALL ACCURACY</span><strong>{metricLabel(report.accuracy)}</strong><small>{report.totalCorrect}/{report.totalQuestions} correct</small></div>
          <div className={styles.stat}><span>ANSWERED</span><strong>{report.answered}</strong><small>of {report.totalQuestions}</small></div>
          <div className={styles.stat}><span>UNANSWERED</span><strong>{report.unanswered}</strong><small>questions</small></div>
          <div className={styles.stat}><span>COMPLETED</span><strong>{completedDate}</strong><small>saved securely</small></div>
        </section>

        <section className={styles.sectionGrid}>
          {[rw, math].map((section) => section && (
            <article className={styles.sectionCard} key={section.label}>
              <div className={styles.sectionTitle}><span>{section.label}</span><small>Module 2 route: {section.route}</small></div>
              <strong>{metricLabel(section.accuracy)}</strong>
              <p>{section.correct} correct · {section.incorrect} incorrect · {section.unanswered} unanswered</p>
              <div className={styles.moduleRows}>
                {Object.entries(section.modules || {}).map(([key, module]) => <div key={key}><span>{key === "module1" ? "Module 1" : `Module 2 · ${section.route}`}</span><b>{module.correct}/{module.total} · {metricLabel(module.accuracy)}</b></div>)}
              </div>
            </article>
          ))}
        </section>

        <Breakdown title="Performance by domain" items={report.domains} />
        <Breakdown title="Performance by skill" items={report.skills} />
        <Breakdown title="Performance by difficulty" items={report.difficulty} />

        <section className={styles.review}><div className={styles.sectionTitle}><span>Question-level summary</span><small>Correct answers are not exposed in the report payload</small></div><div className={styles.reviewGrid}>{(report.review || []).map((item, index) => <div className={`${styles.reviewItem} ${item.correct ? styles.correct : styles.incorrect}`} key={item.questionId}><span>{index + 1}</span><strong>{item.correct ? "Correct" : item.answered ? "Incorrect" : "Unanswered"}</strong><small>{item.section === "reading-writing" ? "R&W" : "Math"} · {item.module} · {item.domain}</small></div>)}</div></section>

        <footer className={styles.footer}><span>Attempt #{attemptId}</span><Link href="/SATMocks">Return to Mock Library</Link></footer>
      </div>
    </div>
  );
}
