import fs from 'node:fs';
import path from 'node:path';
import { writeImportArtifacts } from './questionBankSourceImport.mjs';

function parseArgs(argv) {
  const inputs = [];
  let output = '';
  let sourceName = 'pasted-content.txt';
  let readStdin = false;
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--input') {
      const value = argv[++i];
      if (!value) throw new Error('--input requires a file path.');
      inputs.push(value);
    } else if (arg === '--output') {
      output = argv[++i] || '';
    } else if (arg === '--stdin') {
      readStdin = true;
    } else if (arg === '--source-name') {
      sourceName = argv[++i] || sourceName;
    } else if (arg === '--help' || arg === '-h') {
      console.log([
        'Usage:',
        '  node scripts/importQuestionBankSources.mjs --input <file> [--input <file> ...] [--output <dir>]',
        '  cat <structured-text> | node scripts/importQuestionBankSources.mjs --stdin [--source-name <name>]',
        '',
        'Accepted files: .docx, .pdf, .json, .md, .txt, .text',
        'Outputs are candidate-only. In-repository output is restricted to .question-bank-import.',
      ].join('\n'));
      return null;
    } else {
      throw new Error('Unknown argument: ' + arg);
    }
  }
  if (readStdin && inputs.length) throw new Error('Use --stdin or --input; do not combine them.');
  if (!readStdin && !inputs.length) throw new Error('Provide at least one --input or use --stdin.');
  return { inputs, output, sourceName, readStdin };
}

const args = parseArgs(process.argv.slice(2));
if (!args) process.exit(0);
const repoRoot = process.cwd();
const inputDescriptors = [];

for (const inputPath of args.inputs) {
  const absolute = path.resolve(repoRoot, inputPath);
  if (!fs.existsSync(absolute)) throw new Error('Input file not found: ' + inputPath);
  inputDescriptors.push({ name: inputPath, kind: 'file', data: fs.readFileSync(absolute) });
}

if (args.readStdin) {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  inputDescriptors.push({ name: args.sourceName, kind: 'pasted-text', data: Buffer.concat(chunks) });
}

const result = writeImportArtifacts({
  repoRoot,
  outputDir: args.output || path.join('.question-bank-import', new Date().toISOString().replace(/[:.]/g, '-')),
  inputs: inputDescriptors,
});

console.log(JSON.stringify({
  status: result.result.status,
  outputDir: result.outputDir,
  summary: result.result.summary,
  exceptionCodes: [...new Set(result.result.exceptions.map((item) => item.code))],
}, null, 2));