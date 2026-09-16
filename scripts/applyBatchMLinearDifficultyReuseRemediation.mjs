import fs from 'node:fs';
const file = 'src/data/sat/mockContent/mathBankFactoryRemediatedUnique.js';
const source = fs.readFileSync(file, 'utf8');
if (source.includes('// Batch M linear construction remediation v2')) {
  console.log('Native Batch M linear v2 difficulty already installed; no metadata relabel patch applied.');
  process.exit(0);
}
console.log('Superseded linear difficulty/reuse remediation detected; refusing to overwrite construction-level difficulty.');
process.exit(0);