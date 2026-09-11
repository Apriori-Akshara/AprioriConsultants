import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";

import { getVerifiedSatServerAccessState } from "../../lib/sat/satAccess";
import { getSatLoginUrl } from "../../lib/sat/satLogin";
import { getSatTestAccess } from "../../lib/sat/testAccess";
import { buildClientSafeTest, normalizeMockKey } from "../../lib/sat/adaptiveMockEngine";

import styles from "../../styles/SATMockTest.module.css";

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const seconds = Math.max(totalSeconds % 60, 0).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export async function getServerSideProps(context) {
  const accessState = await getVerifiedSatServerAccessState(context.req);

  if (!accessState.authenticated) {
    return { redirect: { destination: getSatLoginUrl(`/SATMocks/${context.params.testId}`), permanent: false } };
  }

  const raw = String(context.params.testId || "");
  const testKey = normalizeMockKey(raw);

  if (!testKey) return { notFound: true };

  const satNumber = testKey === "SAT1" ? 1 : null;
  const access = satNumber ? await getSatTestAccess(accessState.user?.id, satNumber) : { allowed: true };
  if (!access.allowed) {
    return { redirect: { destination: `/SATMocks/purchase?test=${satNumber || ""}`, permanent: false } };
  }

  const test = buildClientSafeTest(testKey);
  return { props: { test } };
}

export default function SATMockTest({ test }) {
  const router = useRouter();
  const [attemptId, setAttemptId] = useState(null);
  const [phase, setPhase] = useState("loading");
  const [sectionIndex, setSectionIndex] = useState(0);
  const [moduleIndex, setModuleIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [route, setRoute] = useState("standard");
  const [remaining, setRemaining] = useState(0);
  const [breakRemaining, setBreakRemaining] = useState(600);
  const [result, setResult] = useState(null);
  const [saving, setSaving] = useState(false);

  const section = test?.sections?.[sectionIndex];
  const question = questions[questionIndex];
  const answeredCount = useMemo(() => Object.keys(answers).filter((id) => answers[id] !== "").length, [answers]);

  useEffect(() => {
    let active = true;
    async function start() {
      const response = await fetch("/api/sat/mock-progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ action: "start", testKey: test.testKey }),
      });
      const data = await response.json();
      if (!active) return;
      if (!response.ok) {
        setPhase("error");
        return;
      }
      setAttemptId(data.attempt?.id || null);
      setAnswers(data.attempt?.answers || {});
      setPhase("instructions");
    }
    start();
    return () => { active = false; };
  }, [test.testKey]);

  useEffect(() => {
    if (phase !== "running" || remaining <= 0) return undefined;
    const timer = window.setInterval(() => setRemaining((value) => value - 1), 1000);
    return () => window.clearInterval(timer);
  }, [phase, remaining]);

  useEffect(() => {
    if (phase === "break" && breakRemaining > 0) {
      const timer = window.setInterval(() => setBreakRemaining((value) => value - 1), 1000);
      return () => window.clearInterval(timer);
    }
    return undefined;
  }, [phase, breakRemaining]);

  useEffect(() => {
    if (phase === "running" && remaining === 0) finishModule();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remaining, phase]);

  function setModuleQuestions(nextSectionIndex, nextModuleIndex, nextRoute = "standard") {
    const nextSection = test.sections[nextSectionIndex];
    const moduleKey = nextModuleIndex === 0 ? "module-1" : `module-2-${nextRoute}`;
    const nextModule = nextSection.modules.find((item) => item.key === moduleKey) || nextSection.modules[nextModuleIndex];
    setQuestions(nextModule.questions);
    setSectionIndex(nextSectionIndex);
    setModuleIndex(nextModuleIndex);
    setQuestionIndex(0);
    setRemaining(nextModule.minutes * 60);
    setPhase("running");
  }

  function beginTest() {
    setModuleQuestions(0, 0);
  }

  function chooseAnswer(value) {
    if (!question || saving) return;
    setAnswers((current) => ({ ...current, [question.questionId]: value }));
    fetch("/api/sat/mock-progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        action: "answer",
        attemptId,
        questionId: question.questionId,
        answer: value,
        section: section.key,
        module: moduleIndex === 0 ? "module-1" : "module-2",
      }),
    }).catch(() => null);
  }

  async function finishModule() {
    if (saving) return;
    setSaving(true);

    const isModuleOne = moduleIndex === 0;
    const isLastModuleInSection = moduleIndex === 1;
    const isLastSection = sectionIndex === test.sections.length - 1;

    try {
      if (isModuleOne) {
        const response = await fetch("/api/sat/mock-progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ action: "route", attemptId, testKey: test.testKey, section: section.key, answers }),
        });
        const data = await response.json();
        const nextRoute = data.route || "standard";
        setRoute(nextRoute);
        setModuleQuestions(sectionIndex, 1, nextRoute);
      } else if (isLastModuleInSection && !isLastSection) {
        setBreakRemaining(600);
        setPhase("break");
      } else {
        const response = await fetch("/api/sat/mock-progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ action: "finish", attemptId, testKey: test.testKey, answers }),
        });
        const data = await response.json();
        setResult(data.scores || null);
        setPhase("results");
      }
    } finally {
      setSaving(false);
    }
  }

  function continueAfterBreak() {
    setModuleQuestions(1, 0);
  }

  const moduleLabel = moduleIndex === 0
    ? "Module 1"
    : `Module 2 · ${route === "high" ? "Higher difficulty route" : route === "low" ? "Foundation route" : "Standard route"}`;

  if (phase === "loading") return <div className={styles.centerState}>Preparing your secure mock test…</div>;
  if (phase === "error") return <div className={styles.centerState}>We could not start this mock test. Please refresh and try again.</div>;

  if (phase === "instructions") {
    return (
      <div className={styles.page}>
        <main className={styles.shell}>
          <div className={styles.brandLine}>APRIORI TEST LAB</div>
          <section className={styles.instructions}>
            <span className={styles.eyebrow}>{test.testKey === "PSAT1" ? "PSAT/NMSQT" : "DIGITAL SAT"}</span>
            <h1>{test.label}</h1>
            <p>This full-length adaptive mock is organized as two timed sections. Your Module 2 difficulty route is selected from your Module 1 performance.</p>
            <div className={styles.ruleGrid}>
              <div><strong>Reading and Writing</strong><span>2 × 32 minutes · 54 questions</span></div>
              <div><strong>Math</strong><span>2 × 35 minutes · 44 questions</span></div>
              <div><strong>Break</strong><span>10 minutes between sections</span></div>
              <div><strong>Calculator</strong><span>Available throughout Math</span></div>
            </div>
            <button className={styles.primaryButton} onClick={beginTest}>Begin Mock Test</button>
          </section>
        </main>
      </div>
    );
  }

  if (phase === "break") {
    return (
      <div className={styles.page}>
        <main className={styles.breakShell}>
          <span className={styles.eyebrow}>SECTION BREAK</span>
          <h1>Take your 10-minute break.</h1>
          <p>Use this time to reset before Math. Your Reading and Writing responses have been saved.</p>
          <div className={styles.breakTimer}>{formatTime(breakRemaining)}</div>
          <button className={styles.primaryButton} onClick={continueAfterBreak}>Continue to Math</button>
        </main>
      </div>
    );
  }

  if (phase === "results") {
    return (
      <div className={styles.page}>
        <main className={styles.resultShell}>
          <span className={styles.eyebrow}>MOCK COMPLETE</span>
          <h1>{test.label}</h1>
          <div className={styles.scoreHero}><strong>{result?.accuracy ?? 0}%</strong><span>overall accuracy</span></div>
          <div className={styles.resultGrid}>
            <div><span>Reading and Writing</span><strong>{result?.readingWriting?.correct ?? 0}/{result?.readingWriting?.total ?? 54}</strong></div>
            <div><span>Math</span><strong>{result?.math?.correct ?? 0}/{result?.math?.total ?? 44}</strong></div>
            <div><span>Total correct</span><strong>{result?.totalCorrect ?? 0}/{result?.totalQuestions ?? 98}</strong></div>
          </div>
          <p className={styles.resultNote}>Your attempt and score are now part of the SAT progress dashboard.</p>
          <button className={styles.primaryButton} onClick={() => router.push("/Profile")}>View Progress Dashboard</button>
        </main>
      </div>
    );
  }

  const progress = questions.length ? ((questionIndex + 1) / questions.length) * 100 : 0;

  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <div><span className={styles.topbarLabel}>{test.testKey === "PSAT1" ? "PSAT/NMSQT" : "SAT"}</span><strong>{test.label}</strong></div>
        <div className={styles.timer}><span>TIME LEFT</span><strong>{formatTime(remaining)}</strong></div>
      </header>

      <div className={styles.moduleStrip}>
        <div><span>{section.label}</span><strong>{moduleLabel}</strong></div>
        <div><span>Progress</span><strong>{questionIndex + 1} / {questions.length}</strong></div>
        <div><span>Answered</span><strong>{answeredCount}</strong></div>
        <div><span>{section.key === "math" ? "Calculator" : "Mode"}</span><strong>{section.key === "math" ? "Enabled" : "No calculator"}</strong></div>
      </div>

      <main className={styles.testShell}>
        <div className={styles.progressTrack}><div style={{ width: `${progress}%` }} /></div>
        <div className={styles.questionMeta}><span>Question {questionIndex + 1}</span><span>{question?.skill}</span></div>
        <section className={styles.questionCard}>
          <div className={styles.prompt}>{question?.prompt}</div>
          {question?.questionType === "student-produced-response" ? (
            <input
              className={styles.numericInput}
              inputMode="numeric"
              value={answers[question.questionId] || ""}
              onChange={(event) => chooseAnswer(event.target.value)}
              aria-label="Answer"
            />
          ) : (
            <div className={styles.choices}>
              {(question?.choices || []).map((choice, index) => {
                const label = String.fromCharCode(65 + index);
                const selected = answers[question.questionId] === label;
                return (
                  <button key={label} className={`${styles.choice} ${selected ? styles.choiceSelected : ""}`} onClick={() => chooseAnswer(label)}>
                    <span className={styles.choiceLetter}>{label}</span><span>{choice}</span>
                  </button>
                );
              })}
            </div>
          )}
        </section>

        <div className={styles.navigation}>
          <button className={styles.secondaryButton} disabled={questionIndex === 0} onClick={() => setQuestionIndex((value) => Math.max(value - 1, 0))}>Previous</button>
          {questionIndex < questions.length - 1 ? (
            <button className={styles.primaryButton} onClick={() => setQuestionIndex((value) => value + 1)}>Save & Next</button>
          ) : (
            <button className={styles.primaryButton} onClick={() => finishModule()} disabled={saving}>{saving ? "Saving…" : "Finish Module"}</button>
          )}
        </div>
      </main>
    </div>
  );
}
