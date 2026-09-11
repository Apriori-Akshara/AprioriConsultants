import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { getVerifiedSatServerAccessState } from "../../lib/sat/satAccess";
import { getSatLoginUrl } from "../../lib/sat/satLogin";
import { getSatTestAccess } from "../../lib/sat/testAccess";
import { buildClientSafeTest, normalizeMockKey, getModuleForRoute } from "../../lib/sat/adaptiveMockEngine";
import MathVisualStimulus from "../../components/sat/MathVisualStimulus";
import styles from "../../styles/SATMockTest.module.css";

function formatTime(totalSeconds) {
  const safe = Math.max(Number(totalSeconds) || 0, 0);
  return `${Math.floor(safe / 60).toString().padStart(2, "0")}:${(safe % 60).toString().padStart(2, "0")}`;
}

function cleanPrompt(value) {
  return String(value || "")
    .replace(/^\s*(?:PSAT\/NMSQT|PSAT|SAT|Reading and Writing|Math)\s*[:\-–]\s*/i, "")
    .replace(/^\s*(?:PSAT\/NMSQT|PSAT|SAT)\s+/i, "")
    .trim();
}

export async function getServerSideProps(context) {
  const accessState = await getVerifiedSatServerAccessState(context.req);
  if (!accessState.authenticated) {
    return { redirect: { destination: getSatLoginUrl(`/SATMocks/${context.params.testId}`), permanent: false } };
  }
  const testKey = normalizeMockKey(String(context.params.testId || ""));
  if (!testKey) return { notFound: true };
  const satNumber = testKey === "SAT1" ? 1 : testKey === "SAT2" ? 2 : null;
  const access = satNumber ? await getSatTestAccess(accessState.user?.id, satNumber) : { allowed: true };
  if (!access.allowed) return { redirect: { destination: `/SATMocks/purchase?test=${satNumber}`, permanent: false } };
  return { props: { test: buildClientSafeTest(testKey) } };
}

export default function SATMockTest({ test }) {
  const router = useRouter();
  const [phase, setPhase] = useState("loading");
  const [attemptId, setAttemptId] = useState(null);
  const [sectionIndex, setSectionIndex] = useState(0);
  const [moduleIndex, setModuleIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flags, setFlags] = useState({});
  const [routes, setRoutes] = useState({ "reading-writing": "standard", math: "standard" });
  const [remaining, setRemaining] = useState(0);
  const [breakRemaining, setBreakRemaining] = useState(600);
  const [result, setResult] = useState(null);
  const [tool, setTool] = useState(null);
  const [zoom, setZoom] = useState(100);
  const [eliminated, setEliminated] = useState({});
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);

  const section = test?.sections?.[sectionIndex];
  const question = questions[questionIndex];
  const isMath = section?.key === "math";
  const isFlagged = Boolean(question && flags[question.questionId]);
  const answeredCount = useMemo(() => Object.values(answers).filter((value) => value !== "").length, [answers]);
  const flaggedCount = useMemo(() => Object.values(flags).filter(Boolean).length, [flags]);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const response = await fetch("/api/sat/mock-progress", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ action: "start", testKey: test.testKey }) });
        const data = await response.json();
        if (!active) return;
        if (!response.ok) { setPhase("error"); return; }
        setAttemptId(data.attempt?.id || null);
        setAnswers(data.attempt?.answers || {});
        setFlags(data.attempt?.flags || {});
        setPhase("instructions");
      } catch { if (active) setPhase("error"); }
    })();
    return () => { active = false; };
  }, [test.testKey]);

  useEffect(() => {
    if (phase !== "running" || remaining <= 0) return undefined;
    const id = window.setInterval(() => setRemaining((value) => value - 1), 1000);
    return () => window.clearInterval(id);
  }, [phase, remaining]);

  useEffect(() => {
    if (phase === "break" && breakRemaining > 0) {
      const id = window.setInterval(() => setBreakRemaining((value) => value - 1), 1000);
      return () => window.clearInterval(id);
    }
    return undefined;
  }, [phase, breakRemaining]);

  useEffect(() => {
    if (phase === "running" && remaining <= 0) advanceModule();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remaining, phase]);

  useEffect(() => {
    if (!section) return;
    const sectionRoute = routes[section.key] || "standard";
    const next = getModuleForRoute({ sections: test.sections }, section.key, moduleIndex, sectionRoute);
    setQuestions(next?.questions || []);
    setQuestionIndex(0);
    setRemaining((next?.minutes || 0) * 60);
  }, [sectionIndex, moduleIndex, routes, test]);

  async function persist(action, payload = {}) {
    if (!attemptId) return null;
    setSaving(true);
    try {
      const response = await fetch("/api/sat/mock-progress", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ action, attemptId, ...payload }) });
      return await response.json().catch(() => null);
    } finally { setSaving(false); }
  }

  function beginTest() {
    setPhase("running");
    setRemaining((test.sections?.[0]?.modules?.[0]?.minutes || 32) * 60);
  }

  async function selectAnswer(value) {
    if (!question) return;
    const next = { ...answers, [question.questionId]: value };
    setAnswers(next);
    await persist("answer", { questionId: question.questionId, answer: value });
  }

  async function toggleFlag() {
    if (!question) return;
    const nextValue = !flags[question.questionId];
    setFlags((current) => ({ ...current, [question.questionId]: nextValue }));
    await persist("flag", { questionId: question.questionId, flagged: nextValue });
  }

  async function moveTo(index) {
    const safeIndex = Math.max(0, Math.min(index, questions.length - 1));
    setQuestionIndex(safeIndex);
    await persist("position", { section: section?.key, module: section?.modules?.[moduleIndex]?.key, questionIndex: safeIndex });
  }

  async function advanceModule() {
    if (moduleIndex === 0) {
      const routeData = await persist("route", { section: section.key });
      const nextRoute = ["high", "standard", "low"].includes(routeData?.route) ? routeData.route : "standard";
      setRoutes((current) => ({ ...current, [section.key]: nextRoute }));
      setModuleIndex(1);
      setQuestionIndex(0);
      setPhase("running");
      return;
    }
    if (sectionIndex < test.sections.length - 1) {
      setSectionIndex((value) => value + 1);
      setModuleIndex(0);
      setQuestionIndex(0);
      setPhase("break");
      setBreakRemaining(600);
      return;
    }
    const finishData = await persist("finish", { answers });
    setResult(finishData?.scores || null);
    setPhase("complete");
  }

  function startBreak() {
    setPhase("running");
  }

  function toggleEliminate(index) {
    if (!question || question.questionType !== "multiple-choice") return;
    const key = `${question.questionId}-${index}`;
    setEliminated((current) => ({ ...current, [key]: !current[key] }));
  }

  if (phase === "loading") return <div className={styles.statePage}><h1>Loading mock test…</h1></div>;
  if (phase === "error") return <div className={styles.statePage}><h1>We could not start this attempt.</h1><button onClick={() => router.reload()}>Try again</button></div>;
  if (phase === "instructions") return (
    <div className={styles.instructionsPage}>
      <div className={styles.instructionsCard}>
        <span className={styles.eyebrow}>APRIORI TEST LAB</span>
        <h1>{test.label}</h1>
        <p>Two timed sections, adaptive Module 2 routing, persistent progress, and the full SAT-style tool set are ready for this form.</p>
        <ul><li>Reading and Writing: 64 minutes across two modules</li><li>Math: 70 minutes across two modules</li><li>Mark for Review, navigator, calculator, reference sheet, notes, line reader, option eliminator, and zoom are available where applicable.</li></ul>
        <button className={styles.primaryButton} onClick={beginTest}>Begin Test</button>
      </div>
    </div>
  );
  if (phase === "break") return (
    <div className={styles.statePage}><div className={styles.breakCard}><span className={styles.eyebrow}>OPTIONAL BREAK</span><h1>Take a short break</h1><p>You have up to 10 minutes before the next section.</p><strong>{formatTime(breakRemaining)}</strong><button className={styles.primaryButton} onClick={startBreak}>Continue</button></div></div>
  );
  if (phase === "complete") return (
    <div className={styles.statePage}><div className={styles.breakCard}><span className={styles.eyebrow}>TEST COMPLETE</span><h1>{test.label}</h1><p>Your attempt has been saved. The results and progress dashboard will use the persisted answers from this attempt.</p><button className={styles.primaryButton} onClick={() => router.push('/SATMocks')}>Back to Mock Library</button></div></div>
  );

  const module = section?.key ? getModuleForRoute({ sections: test.sections }, section.key, moduleIndex, routes[section.key] || "standard") : null;
  const choiceValues = question?.choices || [];

  return (
    <div className={styles.runnerPage}>
      <header className={styles.runnerHeader}>
        <div><span className={styles.eyebrow}>{test.label}</span><strong>{section?.label} · {module?.key}</strong></div>
        <div className={styles.headerTools}><span className={styles.timer}>{formatTime(remaining)}</span><button onClick={toggleFlag}>{isFlagged ? 'Unmark' : 'Mark for Review'}</button><button onClick={() => setTool(tool === 'navigator' ? null : 'navigator')}>Question Menu</button></div>
      </header>

      <main className={styles.runnerMain}>
        <section className={styles.questionPanel}>
          <div className={styles.questionTop}><span>Question {questionIndex + 1} of {questions.length}</span><span>{answeredCount} answered · {flaggedCount} flagged</span></div>
          <div className={styles.questionContent} style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top left' }}>
            <p className={styles.questionPrompt}>{cleanPrompt(question?.prompt)}</p>
            {question?.figure ? <MathVisualStimulus figure={question.figure} /> : null}
            {question?.questionType === 'student-produced-response' ? (
              <input className={styles.sprInput} inputMode="decimal" value={answers[question.questionId] || ''} onChange={(event) => selectAnswer(event.target.value)} placeholder="Enter answer" />
            ) : (
              <div className={styles.choiceList}>
                {choiceValues.map((choice, index) => {
                  const key = `${question.questionId}-${index}`;
                  const selected = answers[question.questionId] === choice;
                  return <button key={key} className={`${styles.choiceButton} ${selected ? styles.choiceSelected : ''} ${eliminated[key] ? styles.choiceEliminated : ''}`} onClick={() => selectAnswer(choice)} onContextMenu={(event) => { event.preventDefault(); toggleEliminate(index); }}>{String.fromCharCode(65 + index)}. {choice}</button>;
                })}
              </div>
            )}
          </div>
        </section>

        <aside className={styles.toolRail}>
          <button onClick={() => setTool(tool === 'calculator' ? null : 'calculator')}>{isMath ? 'Calculator' : 'Tools'}</button>
          <button onClick={() => setTool(tool === 'reference' ? null : 'reference')}>Reference</button>
          <button onClick={() => setTool(tool === 'notes' ? null : 'notes')}>Notes</button>
          <button onClick={() => setTool(tool === 'line-reader' ? null : 'line-reader')}>Line Reader</button>
          <div className={styles.zoomControls}><button onClick={() => setZoom((value) => Math.max(85, value - 10))}>−</button><span>{zoom}%</span><button onClick={() => setZoom((value) => Math.min(125, value + 10))}>+</button></div>
        </aside>

        {tool === 'calculator' && isMath ? <div className={styles.toolPanel}><iframe title="Desmos calculator" src="https://www.desmos.com/testing/cb-digital-sat/graphing" /></div> : null}
        {tool === 'reference' && isMath ? <div className={styles.toolPanel}><h3>Math Reference</h3><p>Circle: A = πr² · Triangle: A = ½bh · Pythagorean theorem: a² + b² = c²</p></div> : null}
        {tool === 'notes' ? <div className={styles.toolPanel}><h3>Highlights &amp; Notes</h3><textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Write a note for this attempt…" /></div> : null}
        {tool === 'line-reader' ? <div className={styles.toolPanel}><h3>Line Reader</h3><p>Use this guide to focus on one line of the passage at a time.</p></div> : null}
        {tool === 'navigator' ? <div className={styles.navigatorPanel}>{questions.map((item, index) => <button key={item.questionId} className={`${styles.navigatorItem} ${answers[item.questionId] ? styles.navigatorAnswered : ''} ${flags[item.questionId] ? styles.navigatorFlagged : ''}`} onClick={() => moveTo(index)}>{index + 1}</button>)}</div> : null}
      </main>

      <footer className={styles.runnerFooter}>
        <button onClick={() => moveTo(questionIndex - 1)} disabled={questionIndex === 0}>Previous</button>
        <button onClick={() => moveTo(questionIndex + 1)} disabled={questionIndex === questions.length - 1}>Next</button>
        <button className={styles.primaryButton} onClick={advanceModule} disabled={saving}>{moduleIndex === 1 && sectionIndex === test.sections.length - 1 ? 'Finish Test' : 'Continue'}</button>
      </footer>
    </div>
  );
}
