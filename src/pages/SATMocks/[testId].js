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

function positionToIndexes(attempt) {
  const sectionIndex = attempt?.current_section === "math" ? 1 : 0;
  const moduleIndex = String(attempt?.current_module || "module-1").endsWith("module-2") ? 1 : 0;
  return { sectionIndex, moduleIndex };
}

export async function getServerSideProps(context) {
  const accessState = await getVerifiedSatServerAccessState(context.req);
  if (!accessState.authenticated) return { redirect: { destination: getSatLoginUrl(`/SATMocks/${context.params.testId}`), permanent: false } };

  const testKey = normalizeMockKey(String(context.params.testId || ""));
  if (!testKey) return { notFound: true };

  const mockMatch = testKey.match(/^(PSAT|SAT)(\d+)$/);
  const testNumber = Number(mockMatch?.[2]);
  if (!mockMatch || !Number.isInteger(testNumber) || testNumber < 1 || testNumber > 10) return { notFound: true };

  const access = await getSatTestAccess(accessState.user?.id, testNumber);
  if (!access.allowed) return { notFound: true };

  const test = buildClientSafeTest(testKey);
  if (!test) return { notFound: true };
  return { props: { test } };
}

export default function SATMockTest({ test }) {
  const router = useRouter();
  const [phase, setPhase] = useState("loading");
  const [attemptId, setAttemptId] = useState(null);
  const [resuming, setResuming] = useState(false);
  const [sectionIndex, setSectionIndex] = useState(0);
  const [moduleIndex, setModuleIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flags, setFlags] = useState({});
  const [routes, setRoutes] = useState({ "reading-writing": "standard", math: "standard" });
  const [remaining, setRemaining] = useState(0);
  const [breakRemaining, setBreakRemaining] = useState(600);
  const [breakDeadlineAt, setBreakDeadlineAt] = useState(null);
  const [deadlineAt, setDeadlineAt] = useState(null);
  const [result, setResult] = useState(null);
  const [tool, setTool] = useState(null);
  const [zoom, setZoom] = useState(100);
  const [eliminated, setEliminated] = useState({});
  const [notes, setNotes] = useState({});
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const section = test?.sections?.[sectionIndex];
  const sectionRoute = section ? routes[section.key] || "standard" : "standard";
  const module = section?.key ? getModuleForRoute(test, section.key, moduleIndex, sectionRoute) : null;
  const question = questions[questionIndex];
  const isMath = section?.key === "math";
  const isFlagged = Boolean(question && flags[question.questionId]);
  const answeredCount = useMemo(() => Object.values(answers).filter((value) => value !== "").length, [answers]);
  const flaggedCount = useMemo(() => Object.values(flags).filter(Boolean).length, [flags]);
  const moduleAnsweredCount = useMemo(() => questions.filter((item) => answers[item.questionId] !== undefined && String(answers[item.questionId]).trim() !== "").length, [answers, questions]);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const response = await fetch("/api/sat/mock-progress", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ action: "start", testKey: test.testKey }) });
        const data = await response.json();
        if (!active) return;
        if (!response.ok) throw new Error(data?.error || "Unable to load attempt");
        const attempt = data.attempt || {};
        const indexes = positionToIndexes(attempt);
        setAttemptId(attempt.id || null);
        setResuming(Boolean(data.resumed));
        setAnswers(attempt.answers || {});
        setFlags(attempt.flags || {});
        setNotes(attempt.notes || {});
        setRoutes({ "reading-writing": attempt.module2_route_rw || "standard", math: attempt.module2_route_math || "standard" });
        setSectionIndex(indexes.sectionIndex);
        setModuleIndex(indexes.moduleIndex);
        setQuestionIndex(Math.max(0, Number(attempt.current_question) || 0));
        setDeadlineAt(attempt.module_deadline_at || null);
        setBreakDeadlineAt(attempt.break_deadline_at || null);
        setPhase(attempt.break_deadline_at ? "break" : "instructions");
      } catch (error) {
        if (active) { setErrorMessage(error.message || "Unable to load this attempt."); setPhase("error"); }
      }
    })();
    return () => { active = false; };
  }, [test.testKey]);

  useEffect(() => {
    if (!module) return;
    setQuestions(module.questions || []);
    if (questionIndex >= (module.questions || []).length) setQuestionIndex(0);
  }, [module]);

  useEffect(() => {
    if (!deadlineAt || phase !== "running") return undefined;
    const tick = () => {
      const seconds = Math.max(0, Math.ceil((new Date(deadlineAt).getTime() - Date.now()) / 1000));
      setRemaining(seconds);
      if (seconds <= 0) void advanceModule(true);
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [deadlineAt, phase]);

  useEffect(() => {
    if (!breakDeadlineAt || phase !== "break") return undefined;
    const tick = () => {
      const seconds = Math.max(0, Math.ceil((new Date(breakDeadlineAt).getTime() - Date.now()) / 1000));
      setBreakRemaining(seconds);
      if (seconds <= 0) void resumeBreak();
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [breakDeadlineAt, phase]);

  async function persist(action, payload = {}) {
    if (!attemptId) return null;
    setSaving(true);
    try {
      const response = await fetch("/api/sat/mock-progress", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ action, attemptId, testKey: test.testKey, ...payload }) });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) return { ...data, ok: false, status: response.status };
      return { ...data, ok: true, status: response.status };
    } finally {
      setSaving(false);
    }
  }

  async function beginTest() {
    setErrorMessage("");
    const data = await persist("begin");
    if (!data?.ok) { setErrorMessage(data?.error || "Unable to start the timer."); return; }
    setDeadlineAt(data.deadlineAt);
    setPhase("running");
  }

  async function selectAnswer(value) {
    if (!question || phase !== "running") return;
    const next = { ...answers, [question.questionId]: value };
    setAnswers(next);
    const data = await persist("answer", { questionId: question.questionId, answer: value, section: section?.key, module: module?.key, questionIndex });
    if (!data?.ok && data?.expired) {
      setErrorMessage("Time has expired for this module. Moving to the next stage.");
      await advanceModule(true);
    }
  }

  async function toggleFlag() {
    if (!question) return;
    const nextValue = !flags[question.questionId];
    setFlags((current) => ({ ...current, [question.questionId]: nextValue }));
    await persist("flag", { questionId: question.questionId, flagged: nextValue });
  }

  async function saveNote(value) {
    if (!question) return;
    setNotes((current) => ({ ...current, [question.questionId]: value }));
    await persist("note", { questionId: question.questionId, note: value });
  }

  async function moveTo(index) {
    const safeIndex = Math.max(0, Math.min(index, questions.length - 1));
    setQuestionIndex(safeIndex);
    await persist("position", { section: section?.key, module: module?.key, questionIndex: safeIndex });
  }

  async function advanceModule(force = false) {
    if (!section || (saving && !force)) return;
    const data = await persist("advance", { section: section.key, module: module?.key });
    if (!data?.ok) { setErrorMessage(data?.error || "Unable to move to the next stage."); return; }
    if (data.next?.complete) {
      const finishData = await persist("finish");
      setResult(finishData?.scores || null);
      setPhase("complete");
      setDeadlineAt(null);
      return;
    }
    if (data.next?.break) {
      setSectionIndex(1);
      setModuleIndex(0);
      setQuestionIndex(0);
      setBreakDeadlineAt(data.next.breakDeadlineAt);
      setDeadlineAt(null);
      setPhase("break");
      return;
    }
    const next = data.next;
    setSectionIndex(next.section === "math" ? 1 : 0);
    setModuleIndex(String(next.module || "module-1").endsWith("module-2") ? 1 : 0);
    setQuestionIndex(0);
    setRoutes((current) => ({ ...current, [next.section]: next.route || current[next.section] || "standard" }));
    setDeadlineAt(next.deadlineAt || null);
    setErrorMessage("");
    setPhase("running");
  }

  async function resumeBreak() {
    const data = await persist("resume-break");
    if (!data?.ok) { setErrorMessage(data?.error || "Unable to continue to Math."); return; }
    const next = data.next;
    setSectionIndex(1);
    setModuleIndex(0);
    setQuestionIndex(0);
    setBreakDeadlineAt(null);
    setDeadlineAt(next.deadlineAt);
    setPhase("running");
  }

  function startResume() {
    if (deadlineAt) setPhase("running");
    else void beginTest();
  }

  function toggleEliminate(index) {
    if (!question || question.questionType !== "multiple-choice") return;
    const key = `${question.questionId}-${index}`;
    setEliminated((current) => ({ ...current, [key]: !current[key] }));
  }

  if (phase === "loading") return <div className={styles.centerState}><h1>Loading mock test…</h1></div>;
  if (phase === "error") return <div className={styles.centerState}><div><h1>We could not load this attempt.</h1><p>{errorMessage}</p><button className={styles.primaryButton} onClick={() => router.reload()}>Try again</button></div></div>;

  if (phase === "instructions") return (
    <div className={styles.page}><div className={styles.shell}><div className={styles.brandLine}>APRIORI TEST LAB</div><section className={styles.instructions}>
      <span className={styles.eyebrow}>{resuming ? "RESUME YOUR ATTEMPT" : "READY TO BEGIN"}</span>
      <h1>{resuming ? "Continue your mock test" : test.label}</h1>
      <p>{resuming ? `Your saved progress is ready. You are at ${section?.label || "the current section"}, Module ${moduleIndex + 1}. Your answers, flags and notes remain attached to this attempt.` : "Two timed sections, adaptive Module 2 routing, persistent progress and the SAT-style tool set are ready for this form."}</p>
      <div className={styles.ruleGrid}><div><strong>Reading and Writing</strong><span>32 minutes per module</span></div><div><strong>Math</strong><span>35 minutes per module</span></div><div><strong>Adaptive routing</strong><span>Module 2 is selected from Module 1 performance</span></div><div><strong>Saved progress</strong><span>Answers, flags, notes and position persist securely</span></div></div>
      {resuming && <div className={styles.resumeSummary}><strong>{answeredCount} answers saved</strong><span>{flaggedCount} questions flagged for review</span></div>}
      <button className={styles.primaryButton} onClick={startResume}>{resuming ? "Resume Test" : "Begin Test"}</button>
    </section></div></div>
  );

  if (phase === "break") return (
    <div className={styles.page}><div className={styles.shell}><section className={styles.breakShell}>
      <span className={styles.eyebrow}>OPTIONAL BREAK</span><h1>Take a short break</h1><p>The Math section is ready after this break. The Math timer has not started.</p><div className={styles.breakTimer}>{formatTime(breakRemaining)}</div>
      <button className={styles.primaryButton} onClick={resumeBreak}>Continue to Math</button>
    </section></div></div>
  );

  if (phase === "complete") return (
    <div className={styles.page}><div className={styles.shell}><section className={styles.resultShell}>
      <span className={styles.eyebrow}>TEST COMPLETE</span><h1>{test.label}</h1><p className={styles.resultNote}>Your attempt has been saved. This completion screen reports practice performance; it is not an official College Board scaled score.</p>
      {result ? <div className={styles.resultGrid}><div><strong>{result.accuracy}%</strong><span>Overall accuracy</span></div><div><strong>{result.totalCorrect}/{result.totalQuestions}</strong><span>Questions correct</span></div><div><strong>{result.readingWriting?.accuracy ?? 0}%</strong><span>Reading and Writing</span></div><div><strong>{result.math?.accuracy ?? 0}%</strong><span>Math</span></div></div> : <p>Results could not be loaded immediately. Your completed attempt remains saved.</p>}
      <button className={styles.primaryButton} onClick={() => router.push(`/SATMocks/results?attemptId=${attemptId}`)}>View Detailed Report</button>
      <button className={styles.secondaryButton} onClick={() => router.push("/SATMocks")}>Back to Mock Library</button>
    </section></div></div>
  );

  const choiceValues = question?.choices || [];
  const progress = questions.length ? ((questionIndex + 1) / questions.length) * 100 : 0;

  return <div className={styles.page}>
    <header className={styles.topbar}><div><span className={styles.topbarLabel}>{test.label}</span><strong>{section?.label} · Module {moduleIndex + 1} of 2</strong></div><div className={styles.topTools}>
      <div className={styles.timer}><span>TIME REMAINING</span><strong>{formatTime(remaining)}</strong></div><button className={styles.toolButton} onClick={() => setTool(tool === "formula" ? null : "formula")}>Formula</button><button className={styles.toolButton} onClick={() => setTool(tool === "notes" ? null : "notes")}>Notes</button><button className={styles.toolButton} onClick={() => setZoom((value) => value === 100 ? 110 : value === 110 ? 125 : 100)}>Zoom {zoom}%</button></div></header>
    <main className={styles.testShell} style={{ "--mock-zoom": `${zoom / 100}` }}>
      <aside className={styles.questionRail}><div className={styles.railHeader}><span>{section?.label}</span><strong>Module {moduleIndex + 1}</strong></div><div className={styles.railGrid}>{questions.map((item, index) => <button key={item.questionId} className={`${styles.railButton} ${index === questionIndex ? styles.railButtonCurrent : ""} ${answers[item.questionId] ? styles.railButtonAnswered : ""} ${flags[item.questionId] ? styles.railButtonFlagged : ""}`} onClick={() => moveTo(index)}>{index + 1}</button>)}</div><div className={styles.railSummary}><span>{moduleAnsweredCount} answered</span><span>{flaggedCount} flagged</span></div></aside>
      <section className={styles.questionPane}>
        <div className={styles.questionHeader}><span>Question {questionIndex + 1} of {questions.length}</span><div className={styles.questionActions}><button className={isFlagged ? styles.flagButtonActive : styles.flagButton} onClick={toggleFlag}>{isFlagged ? "Flagged" : "Flag"}</button></div></div>
        <div className={styles.progressBar}><span style={{ width: `${progress}%` }} /></div>
        <div className={styles.questionBody}>
          {question?.figure && <MathVisualStimulus figure={question.figure} />}
          {question?.stimulus && <div className={styles.stimulus}>{question.stimulus}</div>}
          <div className={styles.prompt}>{cleanPrompt(question?.prompt)}</div>
          {question?.questionType === "multiple-choice" ? <div className={styles.choiceGrid}>{choiceValues.map((choice, index) => { const eliminatedKey = `${question.questionId}-${index}`; const selected = String(answers[question.questionId] ?? "") === String(choice); const eliminatedChoice = eliminated[eliminatedKey]; return <button key={`${question.questionId}-${index}`} className={`${styles.choiceButton} ${selected ? styles.choiceSelected : ""} ${eliminatedChoice ? styles.choiceEliminated : ""}`} onClick={() => selectAnswer(choice)}><span className={styles.choiceLetter}>{String.fromCharCode(65 + index)}</span><span>{choice}</span></button> })}</div> : <input className={styles.gridIn} value={answers[question?.questionId] || ""} onChange={(event) => selectAnswer(event.target.value)} aria-label="Student response" />}
          {tool === "notes" && <div className={styles.notesPanel}><label htmlFor="mock-note">Notes for this question</label><textarea id="mock-note" value={notes[question?.questionId] || ""} onChange={(event) => void saveNote(event.target.value)} placeholder="Write a private note…" /></div>}
          {tool === "formula" && <div className={styles.formulaPanel}><strong>Reference formulas</strong><p>a² + b² = c²</p><p>Area of a circle = πr²</p><p>Volume of a rectangular prism = lwh</p></div>}
        </div>
        <div className={styles.footerActions}><button className={styles.secondaryButton} disabled={questionIndex === 0} onClick={() => moveTo(questionIndex - 1)}>Previous</button><button className={styles.secondaryButton} disabled={questionIndex === questions.length - 1} onClick={() => moveTo(questionIndex + 1)}>Next</button><button className={styles.primaryButton} onClick={() => advanceModule(false)}>{moduleIndex === 1 && sectionIndex === 1 ? "Submit Mock" : moduleIndex === 1 ? "Continue to Math" : "Finish Module"}</button></div>
      </section>
    </main>
  </div>;
}
