import fs from 'node:fs';

const targetPath = 'src/data/sat/mockContent/mathBankFactoryRemediatedUnique.js';
const text = fs.readFileSync(targetPath, 'utf8');

const from = "  let difficulty = ['easy', 'medium', 'medium', 'hard'][occurrence % 4];";
const to = "  // Use a 10-item difficulty lane (30% easy / 50% medium / 20% hard)\n  // so each source skill has materially broader coverage of the frozen\n  // target difficulty distribution without weakening the difficulty gate.\n  const difficultyLane = ['easy', 'easy', 'easy', 'medium', 'medium', 'medium', 'medium', 'medium', 'hard', 'hard'];\n  let difficulty = difficultyLane[occurrence % difficultyLane.length];";

if (text.includes(from)) {
  fs.writeFileSync(targetPath, text.replace(from, to), 'utf8');
  console.log(JSON.stringify({ applied: true, rerunnable: true, difficultyDistribution: { easy: 30, medium: 50, hard: 20 } }, null, 2));
} else if (text.includes("const difficultyLane = ['easy', 'easy', 'easy', 'medium', 'medium', 'medium', 'medium', 'medium', 'hard', 'hard'];")) {
  console.log(JSON.stringify({ applied: false, rerunnable: true, alreadyApplied: true, difficultyDistribution: { easy: 30, medium: 50, hard: 20 } }, null, 2));
} else {
  throw new Error('Expected Batch M difficulty assignment was not found; refusing an unsafe patch.');
}
