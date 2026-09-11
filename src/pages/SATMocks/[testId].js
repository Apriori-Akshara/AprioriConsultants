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

  const test = buildClientSafeTest(testKey);
  if (!test) return { notFound: true };
  return { props: { test } };
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
  const sectionRoute = section ? routes[section.key] || "standard" : "standard";
  const module = section?.key ? getModuleForRoute(test, section.key, moduleIndex, sectionRoute) : null;
  const question = questions[questionIndex];
  const isMath = section?.key === "math";
  const isFlagged = Boolean(question && flags[question.questionId]);
  const answeredCount = useMemo(() => Object.values(answers).filter((value) => value !== "").length, [answers]);
  const flaggedCount = useMemo(() => Object.values(flags).filter(Boolean).length, [flags]);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
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
        setFlags(data.attempt?.flags || {});
        setRoutes({
          "reading-writing": data.attempt?.module2_route_rw || "standard",
          math: data.attempt?.module2_route_math || "standard",
        });
        setPhase("instructions");
      } catch {
        if (active) setPhase("error");
      }
    })();
    return () => { active = false; };
  }, [test.testKey]);

  useEffect(() => {
    if (!module) return;
    setQuestions(module.questions || []);
    setQuestionIndex(0);
    setRemaining((module.minutes || 0) * 60);
  }, [module]);

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
    if (phase === "running" && remaining <= 0) {
      void advanceModule();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remaining, phase]);

  async function persist(action, payload = {}) {
    if (!attemptId) return null;
    setSaving(true);
    try {
      const response = await fetch("/api/sat/mock-progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ action, attemptId, ...payload }),
      });
      return await response.json().catch(() => null);
    } finally {
      setSaving(false);
    }
  }

  function beginTest() {
    setPhase("running");
    setRemaining((test.sections?.[0]?.modules?.[0]?.minutes || 32) * 60);
  }

  async function selectAnswer(value) {
    if (!question) return;
    const next = { ...answers, [question.questionId]: value };
    setAnswers(next);
    await persist("answer", {
      questionId: question.questionId,
      answer: value,
      section: section?.key,
      module: module?.key,
      questionIndex,
    });
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
    await persist("position", { section: section?.key, module: module?.key, questionIndex: safeIndex });
  }

  async function advanceModule() {
    if (!section || saving) return;

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
    setSectionIndex((value) => value + 1);
    setModuleIndex(0);
    setQuestionIndex(0);
  }

  function toggleEliminate(index) {
    if (!question || question.questionType !== "multiple-choice") return;
    const key = `${question.questionId}-${index}`;
    setEliminated((current) => ({ ...current, [key]: !current[key] }));
  }

  if (phase === "loading") return <div className={styles.centerState}><h1>Loading mock test…</h1></div>;
  if (phase === "error") return <div className={styles.centerState}><div><h1>We could not start this attempt.</h1><button className={styles.primaryButton} onClick={() => router.reload()}>Try again</button></div></div>;

  if (phase === "instructions") return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <div className={styles.brandLine}>APRIORI TEST LAB</div>
        <section className={styles.instructions}>
          <span className={styles.eyebrow}>READY TO BEGIN</span>
          <h1>{test.label}</h1>
          <p>Two timed sections, adaptive Module 2 routing, persistent progress, and the SAT-style tool set are ready for this form.</p>
          <div className={styles.ruleGrid}>
            <div><strong>Reading and Writing</strong><span>64 minutes across two modules</span></div>
            <div><strong>Math</strong><span>70 minutes across two modules</span></div>
            <div><strong>Adaptive routing</strong><span>Module 2 is selected from Module 1 performance</span></div>
            <div><strong>Tools</strong><span>Navigator, calculator, reference, notes, review and zoom</span></div>
          </div>
          <button className={styles.primaryButton} onClick={beginTest}>Begin Test</button>
        </section>
      </div>
    </div>
  );

  if (phase === "break") return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <section className={styles.breakShell}>
          <span className={styles.eyebrow}>OPTIONAL BREAK</span>
          <h1>Take a short break</h1>
          <p>You have up to 10 minutes before the next section.</p>
          <div className={styles.breakTimer}>{formatTime(breakRemaining)}</div>
          <button className={styles.primaryButton} onClick={startBreak}>Continue</button>
        </section>
      </div>
    </div>
  );

  if (phase === "complete") return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <section className={styles.resultShell}>
          <span className={styles.eyebrow}>TEST COMPLETE</span>
          <h1>{test.label}</h1>
          <p className={styles.resultNote}>Your attempt has been saved. The results below are based on the persisted adaptive routes.</p>
          {result ? (
            <div className={styles.resultGrid}>
              <div><strong>{result.accuracy}%</strong><span>Overall accuracy</span></div>
              <div><strong>{result.totalCorrect}/{result.totalQuestions}</strong><span>Questions correct</span></div>
              <div><strong>{result.readingWriting?.accuracy ?? 0}%</strong><span>Reading and Writing</span></div>
              <div><strong>{result.math?.accuracy ?? 0}%</strong><span>Math</span></div>
            </div>
          ) : null}
          <button className={styles.primaryButton} onClick={() => router.push('/SATMocks')}>Back to Mock Library</button>
        </section>
      </div>
    </div>
  );

  const choiceValues = question?.choices || [];
  const progress = questions.length ? ((questionIndex + 1) / questions.length) * 100 : 0;

  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <div><span className={styles.topbarLabel}>{test.label}</span><strong>{section?.label} · Module {moduleIndex + 1} of 2</strong></div>
        <div className={styles.topTools}>
          <div className={styles.timer}><span>TIME REMAINING</span><strong>{formatTime(remaining)}</strong></div>
          <button className={styles.toolButton} onClick={toggleFlag}>{isFlagged ? "Unmark" : "Mark for Review"}</button>
          <button className={styles.toolButton} onClick={() => setTool(tool === "navigator" ? null : "navigator")}>Question Menu</button>
        </div>
      </header>

      <div className={styles.moduleStrip}>
        <div><span>Current section</span><strong>{section?.label}</strong></div>
        <div><span>Module</span><strong>{moduleIndex + 1} of 2</strong></div>
        <div><span>Questions</span><strong>{questions.length}</strong></div>
        <div><span>Progress</span><strong>{answeredCount} answered</strong></div>
      </div>

      <main className={styles.testShell}>
        <div className={styles.progressTrack}><div style={{ width: `${progress}%` }} /></div>
        <div className={styles.questionMeta}>
          <span>Question {questionIndex + 1} of {questions.length} · {flaggedCount} flagged</span>
          <div className={styles.metaTools}><button onClick={() => setZoom((value) => Math.max(85, value - 10))}>A−</button><button onClick={() => setZoom((value) => Math.min(125, value + 10))}>A+</button></div>
        </div>

        <section className={styles.questionCard}>
          <div className={styles.prompt} style={{ fontSize: `${16 * (zoom / 100)}px` }}>{cleanPrompt(question?.prompt)}</div>
          {question?.figure ? <MathVisualStimulus figure={question.figure} /> : null}

          {question?.questionType === "student-produced-response" ? (
            <input className={styles.numericInput} inputMode="decimal" value={answers[question.questionId] || ""} onChange={(event) => selectAnswer(event.target.value)} placeholder="Enter answer" />
          ) : (
            <div className={styles.choices}>
              {choiceValues.map((choice, index) => {
                const key = `${question.questionId}-${index}`;
                const selected = answers[question.questionId] === choice;
                return <button key={key} className={`${styles.choice} ${selected ? styles.choiceSelected : ""} ${eliminated[key] ? styles.choiceEliminated : ""}`} onClick={() => selectAnswer(choice)} onContextMenu={(event) => { event.preventDefault(); toggleEliminate(index); }}><span className={styles.choiceLetter}>{String.fromCharCode(65 + index)}</span><span>{choice}</span></button>;
              })}
            </div>
          )}

          <div className={styles.navigation}>
            <button className={styles.secondaryButton} onClick={() => moveTo(questionIndex - 1)} disabled={questionIndex === 0}>Previous</button>
            <button className={styles.secondaryButton} onClick={() => moveTo(questionIndex + 1)} disabled={questionIndex === questions.length - 1}>Next</button>
            <button className={styles.primaryButton} onClick={advanceModule} disabled={saving}>{moduleIndex === 1 && sectionIndex === test.sections.length - 1 ? "Finish Test" : "Continue"}</button>
          </div>

          <button className={styles.questionMenuButton} onClick={() => setTool(tool === "navigator" ? null : "navigator")}>Open Question Navigator</button>
          <button className={styles.secondaryToolLink} onClick={() => setTool(tool === "calculator" ? null : "calculator")} disabled={!isMath}>{isMath ? "Open Calculator" : "Calculator available in Math"}</button>
          <button className={styles.secondaryToolLink} onClick={() => setTool(tool === "reference" ? null : "reference")} disabled={!isMath}>Math Reference</button>
          <button className={styles.secondaryToolLink} onClick={() => setTool(tool === "notes" ? null : "notes")}>Notes</button>
          <button className={styles.secondaryToolLink} onClick={() => setTool(tool === "line-reader" ? null : "line-reader")}>Line Reader</button>
        </section>
      </main>

      {tool ? (
        <div className={styles.overlay} onClick={() => setTool(null)}>
          <div className={tool === "navigator" ? styles.drawer : tool === "calculator" ? styles.calculatorPanel : tool === "reference" ? styles.referencePanel : styles.notesPanel} onClick={(event) => event.stopPropagation()}>
            <div className={styles.drawerHeader}><h2>{tool === "navigator" ? "Question Navigator" : tool === "calculator" ? "Desmos Calculator" : tool === "reference" ? "Math Reference" : "Notes"}</h2><button onClick={() => setTool(null)}>Close</button></div>

            {tool === "navigator" ? (
              <>
                <div className={styles.navigatorLegend}><span>Answered: {answeredCount}</span><span>Flagged: {flaggedCount}</span></div>
                <div className={styles.questionGrid}>{questions.map((item, index) => <button key={item.questionId} className={`${styles.questionCell} ${answers[item.questionId] ? styles.questionAnswered : ""} ${flags[item.questionId] ? styles.questionFlagged : ""} ${index === questionIndex ? styles.questionCurrent : ""}`} onClick={async () => { await moveTo(index); setTool(null); }}>{index + 1}</button>)}</div>
              </>
            ) : tool === "calculator" ? (
              <iframe className={styles.calculatorFrame} title="Desmos calculator" src="https://www.desmos.com/testing/cb-digital-sat/graphing" />
            ) : tool === "reference" ? (
              <div className={styles.referenceGrid}><div><strong>Triangle</strong><p>A = ½bh</p></div><div><strong>Circle</strong><p>A = πr²</p></div><div><strong>Pythagorean theorem</strong><p>a² + b² = c²</p></div><div><strong>Coordinate geometry</strong><p>Use the coordinate-plane relationships needed by the question.</p></div></div>
            ) : (
              <textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Write a note for this attempt…" />
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
