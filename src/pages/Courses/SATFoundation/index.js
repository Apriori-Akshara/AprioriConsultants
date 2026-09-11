import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Navbar from "../../../../components/NavbarJS";
import styles from "../../../styles/SATFoundation.module.css";
import {
  FaBookOpen,
  FaClipboardCheck,
  FaClock,
  FaRegClock,
  FaListAlt,
  FaTasks,
  FaFileAlt,
  FaArrowLeft,
  FaCheckCircle,
} from "react-icons/fa";
import { SAT_FOUNDATION_CONTENT } from "../../../data/sat/foundation/foundationContent";

const levelLabel = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
};

const subjectLabel = {
  verbal: "Verbal",
  math: "Math",
};

const typeIcons = {
  lesson: FaBookOpen,
  assignment: FaClipboardCheck,
  "timed-drill": FaClock,
  "non-timed-drill": FaRegClock,
  "topic-exercise": FaListAlt,
  "section-test": FaTasks,
  "practice-test": FaFileAlt,
};

export default function SATFoundation() {
  const router = useRouter();
  const unitId = typeof router.query.unit === "string" ? router.query.unit : null;
  const selectedUnit = SAT_FOUNDATION_CONTENT.find(
    ({ activity }) => activity.activityId === unitId
  );

  if (selectedUnit) {
    const { activity, lesson, practice } = selectedUnit;

    return (
      <>
        <Navbar />
        <div className={styles.foundationContainer}>
          <Link href="/Courses/SATFoundation" style={{ color: "#2563eb", fontWeight: 600 }}>
            <FaArrowLeft style={{ marginRight: 8 }} /> Back to Foundation
          </Link>

          <div style={{ marginTop: 24 }}>
            <div style={{ color: "#2563eb", fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              {subjectLabel[activity.subject]} · {levelLabel[activity.level]}
            </div>
            <h1 className={styles.header} style={{ textAlign: "left", marginTop: 8 }}>
              {activity.title}
            </h1>
            <p className={styles.description} style={{ textAlign: "left", marginBottom: 20 }}>
              {activity.description}
            </p>
          </div>

          <div className={styles.sectionsWrapper} style={{ alignItems: "stretch" }}>
            <div className={styles.sectionCard} style={{ width: "100%", alignItems: "stretch" }}>
              <h2 className={styles.sectionTitle} style={{ textAlign: "left" }}>
                Lesson
              </h2>

              <p style={{ color: "#334155", lineHeight: 1.75 }}>{lesson.overview}</p>

              <h3 style={{ color: "#1e293b", marginBottom: 8 }}>Method</h3>
              <ol style={{ color: "#475569", lineHeight: 1.8, paddingLeft: 22 }}>
                {lesson.method.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>

              <div style={{ background: "#eff6ff", border: "1px solid #dbeafe", borderRadius: 10, padding: 18, marginTop: 8 }}>
                <strong style={{ color: "#1d4ed8" }}>Worked example</strong>
                <p style={{ marginBottom: 0, color: "#334155", lineHeight: 1.7 }}>{lesson.example}</p>
              </div>

              <div style={{ marginTop: 18, padding: 18, borderLeft: "4px solid #3b82f6", background: "#f8fafc" }}>
                <strong style={{ color: "#1e3a8a" }}>Checkpoint</strong>
                <p style={{ marginBottom: 0, color: "#475569" }}>{lesson.checkpoint}</p>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 24 }}>
            <h2 className={styles.sectionTitle}>Practice Check</h2>
            <div className={styles.cardsGrid} style={{ gridTemplateColumns: "1fr", gap: 14 }}>
              {practice.map((question, index) => (
                <div className={styles.lessonCard} key={question.id} style={{ alignItems: "flex-start", textAlign: "left", cursor: "default" }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "flex-start", width: "100%" }}>
                    <FaCheckCircle className={styles.icon} style={{ flex: "0 0 auto", marginTop: 2 }} />
                    <div style={{ width: "100%" }}>
                      <div style={{ color: "#64748b", fontSize: 12, fontWeight: 700, marginBottom: 6 }}>
                        PRACTICE {index + 1}
                      </div>
                      <div style={{ color: "#1e293b", fontWeight: 600, lineHeight: 1.55 }}>
                        {question.prompt}
                      </div>
                      <ol type="A" style={{ color: "#475569", lineHeight: 1.7, paddingLeft: 24, marginBottom: 0 }}>
                        {question.options.map((option) => (
                          <li key={option}>{option}</li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  const contentBySubject = ["verbal", "math"].map((subject) => ({
    subject,
    units: SAT_FOUNDATION_CONTENT.filter(({ activity }) => activity.subject === subject),
  }));

  return (
    <>
      <Navbar />
      <div className={styles.foundationContainer}>
        <h1 className={styles.header}>SAT Foundation</h1>
        <p className={styles.description}>
          Build the skills that come before full-length SAT practice. Start with a concept lesson, then use the original practice checks to confirm your understanding.
        </p>

        {contentBySubject.map(({ subject, units }) => (
          <div className={styles.sectionCard} key={subject} style={{ width: "100%", alignItems: "stretch", marginBottom: 24 }}>
            <h2 className={styles.sectionTitle} style={{ textAlign: "left" }}>
              {subjectLabel[subject]}
            </h2>
            <div className={styles.cardsGrid}>
              {units.map(({ activity }) => {
                const Icon = typeIcons[activity.activityType] || FaBookOpen;
                return (
                  <Link
                    href={`/Courses/SATFoundation?unit=${activity.activityId}`}
                    className={styles.lessonCard}
                    key={activity.activityId}
                    style={{ textDecoration: "none", alignItems: "flex-start", textAlign: "left" }}
                  >
                    <Icon className={styles.icon} />
                    <div style={{ width: "100%" }}>
                      <div style={{ color: "#64748b", fontSize: 12, fontWeight: 700, textTransform: "uppercase", marginBottom: 6 }}>
                        {levelLabel[activity.level]} · {activity.topic}
                      </div>
                      <div style={{ color: "#1e293b", fontSize: 1.02 + "rem", fontWeight: 700, lineHeight: 1.35 }}>
                        {activity.title}
                      </div>
                      <div style={{ color: "#64748b", fontSize: 14, lineHeight: 1.55, marginTop: 8 }}>
                        {activity.description}
                      </div>
                      <div style={{ color: "#2563eb", fontSize: 13, fontWeight: 700, marginTop: 12 }}>
                        Start lesson →
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}

        <div style={{ textAlign: "center", marginTop: 8 }}>
          <p style={{ color: "#64748b", marginBottom: 12 }}>
            More assignments, drills, topic exercises and section tests will be added on this same Foundation content architecture.
          </p>
          <Link href="/SATMocks" style={{ color: "#2563eb", fontWeight: 700 }}>
            Ready for Mock Tests? Open SAT Mock Tests →
          </Link>
        </div>
      </div>
    </>
  );
}
