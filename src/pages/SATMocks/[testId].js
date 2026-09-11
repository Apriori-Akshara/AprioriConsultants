import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";

import { getVerifiedSatServerAccessState } from "../../lib/sat/satAccess";
import { getSatLoginUrl } from "../../lib/sat/satLogin";
import { getSatTestAccess } from "../../lib/sat/testAccess";
import { buildClientSafeTest, normalizeMockKey } from "../../lib/sat/adaptiveMockEngine";

import styles from "../../styles/SATMockTest.module.css";

function formatTime(totalSeconds) {
  const minutes = Math.floor(Math.max(totalSeconds, 0) / 60).toString().padStart(2, "0");
  const seconds = Math.max(totalSeconds, 0) % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function cleanPrompt(value) {
  return String(value || "")
    .replace(/^\s*(?:PSAT\/NMSQT|PSAT|SAT|Reading and Writing|Math)\s*[:\-–]\s*/i, "")
    .replace(/^\s*(?:PSAT\/NMSQT|PSAT|SAT)\s+/i, "")
    .trim();
}

function VisualStimulus({ questionIndex, question }) {
  const variant = questionIndex % 5;
  const accent = question?.skill || "Math";

  if (variant === 0) {
    return (
      <div className={styles.figureBox} aria-label="Coordinate graph">
        <div className={styles.figureTitle}>Coordinate graph · {accent}</div>
        <svg viewBox="0 0 560 250" role="img">
          <line x1="50" y1="210" x2="530" y2="210" className={styles.axis} />
          <line x1="90" y1="30" x2="90" y2="225" className={styles.axis} />
          <polyline points="90,185 170,155 250,135 330,95 410,75 500,45" className={styles.graphLine} fill="none" />
          {[90,170,250,330,410,500].map((x) => <circle key={x} cx={x} cy={x === 90 ? 185 : x === 170 ? 155 : x === 250 ? 135 : x === 330 ? 95 : x === 410 ? 75 : 45} r="5" className={styles.graphPoint} />)}
          <text x="515" y="230">x</text><text x="66" y="38">y</text>
        </svg>
      </div>
    );
  }

  if (variant === 1) {
    return (
      <div className={styles.figureBox} aria-label="Scatterplot">
        <div className={styles.figureTitle}>Scatterplot · measured values</div>
        <svg viewBox="0 0 560 250" role="img">
          <line x1="55" y1="210" x2="530" y2="210" className={styles.axis} />
          <line x1="70" y1="25" x2="70" y2="225" className={styles.axis} />
          {[0,1,2,3,4,5,6,7].map((i) => <circle key={i} cx={110 + i * 50} cy={188 - (i * 18 + (i % 2) * 8)} r="6" className={styles.scatterPoint} />)}
          <line x1="95" y1="195" x2="490" y2="58" className={styles.trendLine} />
          <text x="500" y="230">input</text><text x="38" y="35">output</text>
        </svg>
      </div>
    );
  }

  if (variant === 2) {
    return (
      <div className={styles.figureBox} aria-label="Bar chart">
        <div className={styles.figureTitle}>Bar chart · comparison data</div>
        <svg viewBox="0 0 560 250" role="img">
          <line x1="55" y1="210" x2="530" y2="210" className={styles.axis} />
          {[120,165,95,190].map((height, i) => <rect key={i} x={90 + i * 105} y={210 - height} width="58" height={height} rx="6" className={styles.bar} />)}
          {['A','B','C','D'].map((label, i) => <text key={label} x={110 + i * 105} y="232">{label}</text>)}
        </svg>
      </div>
    );
  }

  if (variant === 3) {
    return (
      <div className={styles.figureBox} aria-label="Geometry figure">
        <div className={styles.figureTitle}>Geometry figure · dimensions not to scale</div>
        <svg viewBox="0 0 560 250" role="img">
          <polygon points="125,195 275,55 455,195" className={styles.shape} />
          <line x1="275" y1="55" x2="275" y2="195" className={styles.dash} />
          <text x="185" y="220">base</text><text x="286" y="125">h</text><text x="310" y="76">triangle</text>
        </svg>
      </div>
    );
  }

  return (
    <div className={styles.figureBox} aria-label="Data table">
      <div className={styles.figureTitle}>Data table · selected observations</div>
      <div className={styles.dataTable}>
        <div>Trial</div><div>Input</div><div>Output</div>
        {[1,2,3,4].map((n) => <><div key={`t${n}`}>{n}</div><div key={`i${n}`}>{10 + n * 5}</div><div key={`o${n}`}>{18 + n * 7}</div></>)}
      </div>
    </div>
  );
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

  return { props: { test: buildClientSafeTest(testKey) } };
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
  const [flags, setFlags] = useState({});
  const [route, setRoute] = useState("standard");
  const [remaining, setRemaining] = useState(0);
  const [breakRemaining, setBreakRemaining] = useState(600);
  const [result, setResult] = useState(null);
  const [saving, setSaving] = useState(false);
  const [tool, setTool] = useState(null);
  const [zoom, setZoom] = useState(100);
  const [eliminated, setEliminated] = useState({});
  const [note, setNote] = useState("");

  const section = test?.sections?.[sectionIndex];
  const question = questions[questionIndex];
  const answeredCount = useMemo(() => Object.keys(answers).filter((id) => answers[id] !== "").length, [answers]);
  const flaggedCount = useMemo(() => Object.values(flags).filter(Boolean).length, [flags]);
  const isMath = section?.key === "math";
  const isFlagged = Boolean(question && flags[question.questionId]);

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
      if (!response.ok) { setPhase("error"); return; }
      const attempt = data.attempt || {};
      setAttemptId(attempt.id || null);
      setAnswers(attempt.answers || {});
      setFlags(attempt.flags || {});
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

  function persistPosition(nextIndex = questionIndex) {
    if (!attemptId || !section) return;
    fetch("/api/sat/mock-progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        action: "position",
        attemptId,
        testKey: test.testKey,
        section: section.key,
        module: moduleIndex === 0 ? "module-1" : "module-2",
        questionIndex: nextIndex,
      }),
    }).catch(() => null);
  }

  function moveToQuestion(nextIndex) {
    const bounded = Math.max(0, Math.min(nextIndex, questions.length - 1));
    setQuestionIndex(bounded);
    persistPosition(bounded);
  }

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
    setTool(null);
    setEliminated({});
  }

  function beginTest() { setModuleQuestions(0, 0); }

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
        testKey: test.testKey,
        questionId: question.questionId,
        answer: value,
        section: section.key,
        module: moduleIndex === 0 ? "module-1" : "module-2",
        questionIndex,
      }),
    }).catch(() => null);
  }

  function toggleFlag() {
    if (!question) return;
    const next = !isFlagged;
    setFlags((current) => ({ ...current, [question.questionId]: next }));
    fetch("/api/sat/mock-progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ action: "flag", attemptId, testKey: test.testKey, questionId: question.questionId, flagged: next }),
    }).catch(() => null);
  }

  function toggleEliminate(label) {
    setEliminated((current) => ({ ...current, [label]: !current[label] }));
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
          method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include",
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
          method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include",
          body: JSON.stringify({ action: "finish", attemptId, testKey: test.testKey, answers }),
        });
        const data = await response.json();
        setResult(data.scores || null);
        setPhase("results");
      }
    } finally { setSaving(false); }
  }

  function continueAfterBreak() { setModuleQuestions(1, 0); }

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
            <p>This full-length adaptive mock follows the digital SAT Suite module structure. Each module is timed separately; you can move among questions in the current module and review before time expires.</p>
            <div className={styles.ruleGrid}>
              <div><strong>Reading and Writing</strong><span>2 × 32 minutes · 54 questions</span></div>
              <div><strong>Math</strong><span>2 × 35 minutes · 44 questions</span></div>
              <div><strong>Break</strong><span>10 minutes between sections</span></div>
              <div><strong>Math tools</strong><span>Calculator + reference sheet available throughout Math</span></div>
            </div>
            <button className={styles.primaryButton} onClick={beginTest}>Begin Mock Test</button>
          </section>
        </main>
      </div>
    );
  }

  if (phase === "break") {
    return (
      <div className={styles.page}><main className={styles.breakShell}>
        <span className={styles.eyebrow}>SECTION BREAK</span>
        <h1>Take your 10-minute break.</h1>
        <p>Reading and Writing responses, flags and progress have been saved.</p>
        <div className={styles.breakTimer}>{formatTime(breakRemaining)}</div>
        <button className={styles.primaryButton} onClick={continueAfterBreak}>Continue to Math</button>
      </main></div>
    );
  }

  if (phase === "results") {
    return (
      <div className={styles.page}><main className={styles.resultShell}>
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
      </main></div>
    );
  }

  const progress = questions.length ? ((questionIndex + 1) / questions.length) * 100 : 0;
  const moduleAnswers = questions.reduce((count, item) => count + (answers[item.questionId] ? 1 : 0), 0);
  const moduleFlags = questions.reduce((count, item) => count + (flags[item.questionId] ? 1 : 0), 0);

  return (
    <div className={styles.page} style={{ "--question-zoom": `${zoom}%` }}>
      <header className={styles.topbar}>
        <div><span className={styles.topbarLabel}>{test.testKey === "PSAT1" ? "PSAT/NMSQT" : "SAT"}</span><strong>{test.label}</strong></div>
        <div className={styles.topTools}>
          <button className={`${styles.toolButton} ${isFlagged ? styles.toolActive : ""}`} onClick={toggleFlag} aria-pressed={isFlagged}>🔖 {isFlagged ? "Flagged" : "Mark for Review"}</button>
          <button className={styles.toolButton} onClick={() => setTool("menu")}>☰ Questions</button>
          {isMath && <button className={styles.toolButton} onClick={() => setTool("calculator")}>∿ Calculator</button>}
          {isMath && <button className={styles.toolButton} onClick={() => setTool("reference")}>▤ Reference</button>}
          <div className={styles.timer}><span>TIME LEFT</span><strong>{formatTime(remaining)}</strong></div>
        </div>
      </header>

      <div className={styles.moduleStrip}>
        <div><span>{section.label}</span><strong>{moduleLabel}</strong></div>
        <div><span>Question</span><strong>{questionIndex + 1} / {questions.length}</strong></div>
        <div><span>Answered</span><strong>{moduleAnswers}</strong></div>
        <div><span>Review</span><strong>{moduleFlags}</strong></div>
      </div>

      <main className={styles.testShell}>
        <div className={styles.progressTrack}><div style={{ width: `${progress}%` }} /></div>
        <div className={styles.questionMeta}>
          <span>Question {questionIndex + 1}</span>
          <span>{question?.skill}</span>
          <div className={styles.metaTools}>
            <button onClick={() => setZoom((value) => Math.max(85, value - 10))}>−</button>
            <span>{zoom}%</span>
            <button onClick={() => setZoom((value) => Math.min(125, value + 10))}>+</button>
            <button onClick={() => setTool("notes")}>Notes</button>
            <button onClick={() => setTool("line-reader")}>Line Reader</button>
          </div>
        </div>

        <section className={styles.questionCard}>
          <div className={styles.prompt} style={{ fontSize: `calc(19px * ${zoom / 100})` }}>{cleanPrompt(question?.prompt)}</div>

          {isMath && questionIndex % 2 === 0 && <VisualStimulus questionIndex={questionIndex} question={question} />}

          {question?.questionType === "student-produced-response" ? (
            <input
              className={styles.numericInput}
              inputMode="decimal"
              value={answers[question.questionId] || ""}
              onChange={(event) => chooseAnswer(event.target.value)}
              aria-label="Answer"
            />
          ) : (
            <div className={styles.choices}>
              {(question?.choices || []).map((choice, index) => {
                const label = String.fromCharCode(65 + index);
                const selected = answers[question.questionId] === label;
                const crossed = Boolean(eliminated[label]);
                return (
                  <button
                    key={label}
                    className={`${styles.choice} ${selected ? styles.choiceSelected : ""} ${crossed ? styles.choiceEliminated : ""}`}
                    onClick={() => chooseAnswer(label)}
                  >
                    <span className={styles.choiceLetter}>{label}</span><span>{choice}</span>
                  </button>
                );
              })}
            </div>
          )}

          {!isMath && <button className={styles.secondaryToolLink} onClick={() => setTool("notes")}>Open Notes</button>}
          {question?.questionType !== "student-produced-response" && <button className={styles.secondaryToolLink} onClick={() => setTool("eliminate")}>Option Eliminator</button>}
        </section>

        <div className={styles.navigation}>
          <button className={styles.secondaryButton} disabled={questionIndex === 0} onClick={() => moveToQuestion(questionIndex - 1)}>Previous</button>
          {questionIndex < questions.length - 1 ? (
            <button className={styles.primaryButton} onClick={() => moveToQuestion(questionIndex + 1)}>Save & Next</button>
          ) : (
            <button className={styles.primaryButton} onClick={() => finishModule()} disabled={saving}>{saving ? "Saving…" : "Finish Module"}</button>
          )}
        </div>

        <button className={styles.questionMenuButton} onClick={() => setTool("menu")}>Open Question Navigator · {moduleAnswers} answered · {questions.length - moduleAnswers} blank · {moduleFlags} flagged</button>
      </main>

      {tool === "menu" && (
        <div className={styles.overlay} onClick={() => setTool(null)}>
          <section className={styles.drawer} onClick={(event) => event.stopPropagation()}>
            <div className={styles.drawerHeader}><div><span className={styles.eyebrow}>CURRENT MODULE</span><h2>Question Navigator</h2></div><button onClick={() => setTool(null)}>Close</button></div>
            <div className={styles.navigatorLegend}><span>● Answered</span><span>○ Blank</span><span>🔖 Flagged</span></div>
            <div className={styles.questionGrid}>
              {questions.map((item, index) => {
                const answered = Boolean(answers[item.questionId]);
                const flagged = Boolean(flags[item.questionId]);
                return <button key={item.questionId} className={`${styles.questionCell} ${answered ? styles.questionAnswered : ""} ${flagged ? styles.questionFlagged : ""} ${index === questionIndex ? styles.questionCurrent : ""}`} onClick={() => { moveToQuestion(index); setTool(null); }}>{index + 1}{flagged ? " 🔖" : ""}</button>;
              })}
            </div>
          </section>
        </div>
      )}

      {tool === "calculator" && <div className={styles.overlay} onClick={() => setTool(null)}><section className={styles.calculatorPanel} onClick={(event) => event.stopPropagation()}><div className={styles.drawerHeader}><h2>Desmos Calculator</h2><button onClick={() => setTool(null)}>Close</button></div><iframe title="Desmos graphing calculator" src="https://www.desmos.com/calculator" className={styles.calculatorFrame} /></section></div>}

      {tool === "reference" && <div className={styles.overlay} onClick={() => setTool(null)}><section className={styles.referencePanel} onClick={(event) => event.stopPropagation()}><div className={styles.drawerHeader}><h2>Math Reference Sheet</h2><button onClick={() => setTool(null)}>Close</button></div><div className={styles.referenceGrid}><div><strong>Area</strong><p>Rectangle: A = lw<br/>Triangle: A = ½bh<br/>Circle: A = πr²</p></div><div><strong>Volume</strong><p>Rectangular prism: V = lwh<br/>Cylinder: V = πr²h<br/>Sphere: V = 4/3πr³</p></div><div><strong>Right triangles</strong><p>a² + b² = c²</p></div><div><strong>Circle</strong><p>C = 2πr<br/>Arc length = rθ</p></div></div></section></div>}

      {tool === "notes" && <div className={styles.overlay} onClick={() => setTool(null)}><section className={styles.notesPanel} onClick={(event) => event.stopPropagation()}><div className={styles.drawerHeader}><h2>Notes</h2><button onClick={() => setTool(null)}>Close</button></div><textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Write a note for this question…" /></section></div>}

      {tool === "line-reader" && <div className={styles.lineReader} onClick={() => setTool(null)}><div className={styles.lineReaderGuide}>Line Reader · click anywhere to close</div></div>}

      {tool === "eliminate" && <div className={styles.overlay} onClick={() => setTool(null)}><section className={styles.eliminatePanel} onClick={(event) => event.stopPropagation()}><div className={styles.drawerHeader}><h2>Option Eliminator</h2><button onClick={() => setTool(null)}>Done</button></div><p>Cross out choices you think are wrong. This does not change your answer.</p><div className={styles.eliminateChoices}>{(question?.choices || []).map((choice, index) => { const label = String.fromCharCode(65 + index); return <button key={label} className={eliminated[label] ? styles.eliminatedButton : ""} onClick={() => toggleEliminate(label)}><strong>{label}</strong>{choice}</button>; })}</div></section></div>}
    </div>
  );
}
