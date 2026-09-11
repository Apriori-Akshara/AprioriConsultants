import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { getVerifiedSatServerAccessState } from "../../lib/sat/satAccess";
import { getSatLoginUrl } from "../../lib/sat/satLogin";
import { getSatTestAccess } from "../../lib/sat/testAccess";
import { buildClientSafeTest, normalizeMockKey } from "../../lib/sat/adaptiveMockEngine";
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
  const satNumber = testKey === "SAT1" ? 1 : null;
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
  const [route, setRoute] = useState("standard");
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
    if (phase === "running" && remaining === 0) finishModule();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remaining, phase]);

  async function persistPosition(nextIndex) {
    if (!attemptId || !section) return;
    await fetch("/api/sat/mock-progress", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ action: "position", attemptId, testKey: test.testKey, section: section.key, module: moduleIndex === 0 ? "module-1" : "module-2", questionIndex: nextIndex }) }).catch(() => null);
  }

  function moveToQuestion(index) {
    const bounded = Math.max(0, Math.min(index, questions.length - 1));
    setQuestionIndex(bounded);
    persistPosition(bounded);
  }

  function loadModule(nextSectionIndex, nextModuleIndex, nextRoute = "standard") {
    const nextSection = test.sections[nextSectionIndex];
    const key = nextModuleIndex === 0 ? "module-1" : `module-2-${nextRoute}`;
    const nextModule = nextSection.modules.find((item) => item.key === key) || nextSection.modules[nextModuleIndex];
    setSectionIndex(nextSectionIndex);
    setModuleIndex(nextModuleIndex);
    setQuestions(nextModule.questions || []);
    setQuestionIndex(0);
    setRemaining((nextModule.minutes || 32) * 60);
    setEliminated({});
    setTool(null);
    setPhase("running");
  }

  function chooseAnswer(value) {
    if (!question || saving) return;
    setAnswers((current) => ({ ...current, [question.questionId]: value }));
    fetch("/api/sat/mock-progress", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ action: "answer", attemptId, testKey: test.testKey, questionId: question.questionId, answer: value, section: section.key, module: moduleIndex === 0 ? "module-1" : "module-2", questionIndex }) }).catch(() => null);
  }

  function toggleFlag() {
    if (!question) return;
    const next = !isFlagged;
    setFlags((current) => ({ ...current, [question.questionId]: next }));
    fetch("/api/sat/mock-progress", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ action: "flag", attemptId, testKey: test.testKey, questionId: question.questionId, flagged: next }) }).catch(() => null);
  }

  function toggleEliminate(label) { setEliminated((current) => ({ ...current, [label]: !current[label] })); }

  async function finishModule() {
    if (saving) return;
    setSaving(true);
    try {
      if (moduleIndex === 0) {
        const response = await fetch("/api/sat/mock-progress", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ action: "route", attemptId, testKey: test.testKey, section: section.key, answers }) });
        const data = await response.json();
        const nextRoute = data.route || "standard";
        setRoute(nextRoute);
        loadModule(sectionIndex, 1, nextRoute);
      } else if (sectionIndex < test.sections.length - 1) {
        setBreakRemaining(600);
        setPhase("break");
      } else {
        const response = await fetch("/api/sat/mock-progress", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ action: "finish", attemptId, testKey: test.testKey, answers }) });
        const data = await response.json();
        setResult(data.scores || null);
        setPhase("results");
      }
    } finally { setSaving(false); }
  }

  function beginTest() { loadModule(0, 0); }
  function continueAfterBreak() { loadModule(1, 0); }

  if (phase === "loading") return <div className={styles.centerState}>Preparing your secure mock test…</div>;
  if (phase === "error") return <div className={styles.centerState}>We could not start this mock test. Please refresh and try again.</div>;

  if (phase === "instructions") return (
    <div className={styles.page}><main className={styles.shell}>
      <div className={styles.brandLine}>APRIORI TEST LAB</div>
      <section className={styles.instructions}>
        <span className={styles.eyebrow}>{test.testKey === "PSAT1" ? "PSAT/NMSQT" : "DIGITAL SAT"}</span>
        <h1>{test.label}</h1>
        <p>This adaptive mock uses two timed modules in Reading and Writing and two timed modules in Math. Questions can be reviewed and revisited within the active module.</p>
        <div className={styles.ruleGrid}>
          <div><strong>Reading and Writing</strong><span>2 × 32 minutes · 54 questions</span></div>
          <div><strong>Math</strong><span>2 × 35 minutes · 44 questions</span></div>
          <div><strong>Break</strong><span>10 minutes between sections</span></div>
          <div><strong>Math tools</strong><span>Calculator and reference sheet throughout Math</span></div>
        </div>
        <button className={styles.primaryButton} onClick={beginTest}>Begin Mock Test</button>
      </section>
    </main></div>
  );

  if (phase === "break") return (
    <div className={styles.page}><main className={styles.shell}><section className={styles.breakCard}>
      <span className={styles.eyebrow}>10-MINUTE BREAK</span><h1>Take a break before Math.</h1>
      <p>You may continue early. Your Reading and Writing responses are saved.</p>
      <div className={styles.breakTimer}>{formatTime(breakRemaining)}</div>
      <button className={styles.primaryButton} onClick={continueAfterBreak}>Continue to Math</button>
    </section></main></div>
  );

  if (phase === "results") return (
    <div className={styles.page}><main className={styles.shell}><section className={styles.resultsCard}>
      <span className={styles.eyebrow}>MOCK COMPLETE</span><h1>Test complete</h1>
      <p>Your attempt has been saved. The adaptive route and section performance are available in your results.</p>
      {result && <div className={styles.resultGrid}>{Object.entries(result).map(([key, value]) => <div key={key}><strong>{String(key).replace(/([A-Z])/g, " $1")}</strong><span>{typeof value === "object" ? JSON.stringify(value) : String(value)}</span></div>)}</div>}
      <button className={styles.primaryButton} onClick={() => router.push("/SATMocks")}>Return to Mock Tests</button>
    </section></main></div>
  );

  if (!question) return <div className={styles.centerState}>Loading the next module…</div>;

  const answer = answers[question.questionId] || "";
  const options = question.choices || [];
  const moduleLabel = moduleIndex === 0 ? "Module 1" : `Module 2 · ${route === "high" ? "Higher difficulty" : route === "low" ? "Foundation" : "Standard"}`;
  const showFigure = isMath && Boolean(question.figure);

  return (
    <div className={styles.page}>
      <main className={styles.shell} style={{ "--sat-zoom": `${zoom}%` }}>
        <header className={styles.testHeader}>
          <div><span className={styles.eyebrow}>{test.testKey === "PSAT1" ? "PSAT/NMSQT" : "DIGITAL SAT"}</span><strong>{section.label}</strong><span>{moduleLabel}</span></div>
          <div className={styles.headerActions}><span className={remaining < 300 ? styles.timerDanger : styles.timer}>{formatTime(remaining)}</span><button onClick={() => setTool("menu")}>Question Menu</button></div>
        </header>

        <div className={styles.toolBar}>
          <button className={isFlagged ? styles.activeTool : ""} onClick={toggleFlag}>Mark for Review</button>
          {isMath && <><button onClick={() => setTool("calculator")}>Desmos Calculator</button><button onClick={() => setTool("reference")}>Reference Sheet</button></>}
          <button onClick={() => setTool("notes")}>Highlights & Notes</button>
          <button onClick={() => setTool("line")}>Line Reader</button>
          <button onClick={() => setTool("eliminate")}>Option Eliminator</button>
          <button onClick={() => setZoom((value) => Math.min(125, value + 10))}>Zoom +</button>
          <button onClick={() => setZoom((value) => Math.max(85, value - 10))}>Zoom −</button>
        </div>

        <section className={styles.questionArea} style={{ fontSize: `${zoom}%` }}>
          <div className={styles.questionMeta}><span>Question {questionIndex + 1} of {questions.length}</span><span>{answeredCount} answered · {flaggedCount} flagged</span></div>
          <div className={styles.questionCard}>
            {question.passage && <div className={styles.passage}>{cleanPrompt(question.passage)}</div>}
            {question.stimulus && <div className={styles.stimulus}>{cleanPrompt(question.stimulus)}</div>}
            {showFigure && <MathVisualStimulus figure={question.figure} skill={question.skill} />}
            <h2>{cleanPrompt(question.prompt)}</h2>
            {question.questionType === "student-produced-response" || question.questionType === "spr" ? (
              <div className={styles.sprBox}><label htmlFor="spr">Enter your answer</label><input id="spr" value={answer} onChange={(event) => chooseAnswer(event.target.value)} inputMode="decimal" autoComplete="off" /></div>
            ) : (
              <div className={styles.choiceList}>{options.map((choice, index) => { const label = String.fromCharCode(65 + index); return <button key={label} className={`${answer === label ? styles.selectedChoice : ""} ${eliminated[label] ? styles.eliminatedChoice : ""}`} onClick={() => chooseAnswer(label)}><span className={styles.choiceLabel}>{label}</span><span>{cleanPrompt(choice)}</span></button>; })}</div>
            )}
          </div>
        </section>

        <nav className={styles.questionNavigator} aria-label="Question navigator">
          <div><strong>Question Navigator</strong><span>{answeredCount}/{questions.length} answered</span></div>
          <div className={styles.navigatorGrid}>{questions.map((item, index) => <button key={item.questionId} className={`${index === questionIndex ? styles.currentQuestion : ""} ${answers[item.questionId] ? styles.answeredQuestion : ""} ${flags[item.questionId] ? styles.flaggedQuestion : ""}`} onClick={() => moveToQuestion(index)}>{index + 1}</button>)}</div>
          <div className={styles.navigatorActions}><button onClick={() => moveToQuestion(questionIndex - 1)} disabled={questionIndex === 0}>Previous</button><button onClick={() => moveToQuestion(questionIndex + 1)} disabled={questionIndex === questions.length - 1}>Next</button><button onClick={finishModule}>{saving ? "Saving…" : moduleIndex === 1 && sectionIndex === test.sections.length - 1 ? "Finish Test" : "Finish Module"}</button></div>
        </nav>

        {tool === "menu" && <div className={styles.overlay} onClick={() => setTool(null)}><section className={styles.drawer} onClick={(event) => event.stopPropagation()}><div className={styles.drawerHeader}><h2>Question Menu</h2><button onClick={() => setTool(null)}>Done</button></div><p>Jump to any question in the current module.</p><div className={styles.menuGrid}>{questions.map((item, index) => <button key={item.questionId} onClick={() => { moveToQuestion(index); setTool(null); }} className={`${answers[item.questionId] ? styles.answeredQuestion : ""} ${flags[item.questionId] ? styles.flaggedQuestion : ""}`}>{index + 1}</button>)}</div></section></div>}
        {tool === "calculator" && <div className={styles.overlay} onClick={() => setTool(null)}><section className={styles.calculatorPanel} onClick={(event) => event.stopPropagation()}><div className={styles.drawerHeader}><h2>Desmos Calculator</h2><button onClick={() => setTool(null)}>Done</button></div><iframe title="Desmos calculator" src="https://www.desmos.com/testing/cb-sat-2023/calculator" className={styles.calculatorFrame} /></section></div>}
        {tool === "reference" && <div className={styles.overlay} onClick={() => setTool(null)}><section className={styles.referencePanel} onClick={(event) => event.stopPropagation()}><div className={styles.drawerHeader}><h2>Math Reference Sheet</h2><button onClick={() => setTool(null)}>Done</button></div><div className={styles.referenceContent}><p>A = lw</p><p>A = πr²</p><p>C = 2πr</p><p>V = lwh</p><p>V = πr²h</p><p>a² + b² = c²</p><p>30°–60°–90° and 45°–45°–90° triangle relationships</p></div></section></div>}
        {tool === "notes" && <div className={styles.overlay} onClick={() => setTool(null)}><section className={styles.notesPanel} onClick={(event) => event.stopPropagation()}><div className={styles.drawerHeader}><h2>Highlights & Notes</h2><button onClick={() => setTool(null)}>Done</button></div><textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Write a note about this question…" /></section></div>}
        {tool === "line" && <div className={styles.lineReader} onClick={() => setTool(null)}><div>Line Reader</div></div>}
        {tool === "eliminate" && <div className={styles.overlay} onClick={() => setTool(null)}><section className={styles.eliminatePanel} onClick={(event) => event.stopPropagation()}><div className={styles.drawerHeader}><h2>Option Eliminator</h2><button onClick={() => setTool(null)}>Done</button></div><p>Cross out choices you think are wrong. This does not change your saved answer.</p><div className={styles.eliminateChoices}>{options.map((choice, index) => { const label = String.fromCharCode(65 + index); return <button key={label} className={eliminated[label] ? styles.eliminatedButton : ""} onClick={() => toggleEliminate(label)}><strong>{label}</strong>{choice}</button>; })}</div></section></div>}
      </main>
    </div>
  );
}
