import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

import {
  FROZEN_MOCK_KEYS,
  buildFrozenIdentityIndex,
  ensureSafeOutputDirectory,
  normalizeMathSourceNotation,
  processSourceInputs,
  writeImportArtifacts,
} from './questionBankSourceImport.mjs';

const repoRoot = process.cwd();
const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'apriori-step2-import-'));

function assertIncludes(haystack, needle, label) {
  assert.ok(String(haystack).includes(needle), label + ': expected ' + JSON.stringify(needle));
}

function writeSimpleDocx(filePath, paragraphs, tableRows = []) {
  const escapeXml = (value) => String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
  const body = [
    ...paragraphs.map((value) => '<w:p><w:r><w:t>' + escapeXml(value) + '</w:t></w:r></w:p>'),
    ...(tableRows.length ? [
      '<w:tbl>',
      ...tableRows.map((row) => '<w:tr>' + row.map((cell) => '<w:tc><w:p><w:r><w:t>' + escapeXml(cell) + '</w:t></w:r></w:p></w:tc>').join('') + '</w:tr>'),
      '</w:tbl>',
    ] : []),
    '<w:sectPr/>',
  ].join('');
  const xml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>' + body + '</w:body></w:document>';

  function crc32(buffer) {
    let crc = 0xffffffff;
    for (const byte of buffer) {
      crc ^= byte;
      for (let i = 0; i < 8; i += 1) crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
    }
    return (crc ^ 0xffffffff) >>> 0;
  }
  function zipStore(files) {
    const local = [];
    const central = [];
    let offset = 0;
    for (const [name, value] of files) {
      const nameBuf = Buffer.from(name);
      const data = Buffer.from(value);
      const header = Buffer.alloc(30 + nameBuf.length);
      header.writeUInt32LE(0x04034b50, 0);
      header.writeUInt16LE(20, 4);
      header.writeUInt16LE(0, 6);
      header.writeUInt16LE(0, 8);
      header.writeUInt16LE(0, 10);
      header.writeUInt16LE(0, 12);
      header.writeUInt32LE(crc32(data), 14);
      header.writeUInt32LE(data.length, 18);
      header.writeUInt32LE(data.length, 22);
      header.writeUInt16LE(nameBuf.length, 26);
      header.writeUInt16LE(0, 28);
      nameBuf.copy(header, 30);
      local.push(header, data);
      const c = Buffer.alloc(46 + nameBuf.length);
      c.writeUInt32LE(0x02014b50, 0);
      c.writeUInt16LE(20, 4);
      c.writeUInt16LE(20, 6);
      c.writeUInt16LE(0, 8);
      c.writeUInt16LE(0, 10);
      c.writeUInt16LE(0, 12);
      c.writeUInt16LE(0, 14);
      c.writeUInt32LE(crc32(data), 16);
      c.writeUInt32LE(data.length, 20);
      c.writeUInt32LE(data.length, 24);
      c.writeUInt16LE(nameBuf.length, 28);
      c.writeUInt16LE(0, 30);
      c.writeUInt16LE(0, 32);
      c.writeUInt16LE(0, 34);
      c.writeUInt16LE(0, 36);
      c.writeUInt32LE(0, 38);
      c.writeUInt32LE(offset, 42);
      nameBuf.copy(c, 46);
      central.push(c);
      offset += header.length + data.length;
    }
    const localBuffer = Buffer.concat(local);
    const centralBuffer = Buffer.concat(central);
    const eocd = Buffer.alloc(22);
    eocd.writeUInt32LE(0x06054b50, 0);
    eocd.writeUInt16LE(0, 4);
    eocd.writeUInt16LE(0, 6);
    eocd.writeUInt16LE(files.length, 8);
    eocd.writeUInt16LE(files.length, 10);
    eocd.writeUInt32LE(centralBuffer.length, 12);
    eocd.writeUInt32LE(localBuffer.length, 16);
    return Buffer.concat([localBuffer, centralBuffer, eocd]);
  }
  fs.writeFileSync(filePath, zipStore([
    ['word/document.xml', xml],
    ['[Content_Types].xml', '<?xml version="1.0" encoding="UTF-8"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"/>'],
  ]));
}

function writeSimplePdf(filePath, textLines) {
  const escapePdf = (value) => String(value).replace(/([\\()])/g, '\\$1');
  const stream = [
    'BT',
    '/F1 10 Tf',
    '72 720 Td',
    ...textLines.map((line, index) => (index === 0 ? '(' + escapePdf(line) + ') Tj' : '0 -16 Td (' + escapePdf(line) + ') Tj')),
    'ET',
  ].join('\n');
  const objects = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
    '<< /Length ' + Buffer.byteLength(stream, 'latin1') + ' >>\nstream\n' + stream + '\nendstream',
  ];
  let pdf = '%PDF-1.4\n';
  const offsets = [0];
  for (let i = 0; i < objects.length; i += 1) {
    offsets.push(Buffer.byteLength(pdf, 'latin1'));
    pdf += (i + 1) + ' 0 obj\n' + objects[i] + '\nendobj\n';
  }
  const xref = Buffer.byteLength(pdf, 'latin1');
  pdf += 'xref\n0 ' + (objects.length + 1) + '\n0000000000 65535 f \n';
  for (let i = 1; i <= objects.length; i += 1) pdf += String(offsets[i]).padStart(10, '0') + ' 00000 n \n';
  pdf += 'trailer\n<< /Root 1 0 R /Size ' + (objects.length + 1) + ' >>\nstartxref\n' + xref + '\n%%EOF';
  fs.writeFileSync(filePath, Buffer.from(pdf, 'latin1'));
}

const frozen = buildFrozenIdentityIndex(repoRoot);
assert.equal(frozen.frozenMockCount, 30);
assert.equal(frozen.frozenQuestionCount, 5880);
assert.deepEqual(FROZEN_MOCK_KEYS, [
  'SAT1','SAT2','SAT3','SAT4','SAT5','SAT6','SAT7','SAT8','SAT9','SAT10',
  'PSAT1','PSAT2','PSAT3','PSAT4','PSAT5','PSAT6','PSAT7','PSAT8','PSAT9','PSAT10',
  'SAT11','SAT12','SAT13','SAT14','SAT15','SAT16','SAT17','SAT18','SAT19','SAT20'
]);
const sat1Id = frozen.mocks.get('SAT1').questions[0].questionId;
const psat1Id = frozen.mocks.get('PSAT1').questions[0].questionId;
const sat2MathId = frozen.mocks.get('SAT2').questions.find((q) => q.section === 'math' && q.module === 'math-module-1').questionId;
assert.ok(sat1Id && psat1Id && sat2MathId);

assert.equal(normalizeMathSourceNotation('x ^ 2 <= 9 and sqrt(x)'), 'x^2 ≤ 9 and sqrt(x)');

const docxPath = path.join(tempRoot, 'source.docx');
writeSimpleDocx(docxPath, [
  'MOCK: SAT1',
  'SECTION: reading-writing',
  'MODULE: rw-module-1',
  '### Question: ' + sat1Id,
  'PROMPT:',
  'The expression x <= 4 has the same meaning as a comparison using a single inequality symbol.',
  'CHOICES:',
  '[ "x < 4", "x = 4", "x ≤ 4", "x > 4" ]',
  'ANSWER: C',
  'EXPLANATION:',
  'The symbol ≤ means less than or equal to 4. The notation sqrt(x) remains unchanged.',
], [['Year', 'Rate'], ['2024', '4.2']]);

const pdfPath = path.join(tempRoot, 'source.pdf');
writeSimplePdf(pdfPath, [
  'MOCK: PSAT1',
  'SECTION: reading-writing',
  'MODULE: rw-module-1',
  'QUESTION 1',
  'PROMPT:',
  'The committee reviewed the proposal carefully.',
  'CHOICES:',
  '[ "A", "B", "C", "D" ]',
  'ANSWER: A',
  'EXPLANATION:',
  'The sentence is complete and correctly formed.',
]);

const structuredText = [
  'MOCK: SAT2',
  'SECTION: math',
  'MODULE: math-module-1',
  '### Question: ' + sat2MathId,
  'PROMPT:',
  'If x ^ 2 = 9, which value could x be?',
  'CHOICES:',
  '[ "-3", "0", "2", "4" ]',
  'ANSWER: A',
  'EXPLANATION:',
  'Squaring -3 gives 9.',
  '',
].join('\n');

const ambiguousText = [
  'MOCK: SAT1',
  'SECTION: math',
  'QUESTION 1',
  'PROMPT:',
  'This item is intentionally ambiguous.',
  'CHOICES:',
  '[ "A", "B", "C", "D" ]',
  'ANSWER: A',
  'EXPLANATION:',
  'The item lacks the module needed for deterministic mapping.',
].join('\n');

const sat3Id = frozen.mocks.get('SAT3').questions[0].questionId;

const malformedText = [
  'MOCK: SAT3',
  '### Question: ' + sat3Id,
  'PROMPT:',
  'A prompt is present, but required answer/explanation fields are absent.',
].join('\n');

const inputs = [
  { name: 'source.docx', kind: 'file', data: fs.readFileSync(docxPath) },
  { name: 'source.pdf', kind: 'file', data: fs.readFileSync(pdfPath) },
  { name: 'source.md', kind: 'pasted-text', data: Buffer.from(structuredText) },
  { name: 'ambiguous.md', kind: 'pasted-text', data: Buffer.from(ambiguousText) },
  { name: 'malformed.md', kind: 'pasted-text', data: Buffer.from(malformedText) },
];

const first = processSourceInputs({ repoRoot, inputs });
assert.equal(first.status, 'SOURCE_IMPORT_CANDIDATE_ONLY');
assert.equal(first.productionMutation, false);
assert.equal(first.summary.frozenBoundaryPreserved, true);
assert.ok(first.mappings.some((m) => m.mappingMethod === 'explicit-testKey-questionId'));
assert.ok(first.mappings.some((m) => m.mappingMethod === 'mock-section-module-position'));
assert.ok(first.exceptions.some((e) => e.code === 'AMBIGUOUS_MAPPING'));
assert.ok(first.exceptions.some((e) => e.code === 'MISSING_REQUIRED_CONTENT'));
assert.ok(first.figureCandidates.some((figure) => figure.type === 'table'));
assert.ok(first.candidates.length >= 3);

const sat1Candidate = first.candidates.find((candidate) => candidate.testKey === 'SAT1');
assert.ok(sat1Candidate);
assertIncludes(sat1Candidate.prompt, '≤ 4', 'Math source notation normalization');
assertIncludes(sat1Candidate.explanation, 'sqrt(x)', 'Meaning-preserving Math notation');
assert.equal(sat1Candidate.productionMutation, false);

const second = processSourceInputs({ repoRoot, inputs });
assert.deepEqual(second.mappings, first.mappings);
assert.deepEqual(second.candidates, first.candidates);
assert.deepEqual(second.figureCandidates, first.figureCandidates);
assert.deepEqual(second.exceptions, first.exceptions);

const outputDir = path.join(tempRoot, 'out');
const importerStatusBefore = spawnSync('git', ['status', '--porcelain'], { cwd: repoRoot, encoding: 'utf8' });
assert.equal(importerStatusBefore.status, 0, 'Unable to capture pre-import Git status.');
const written = writeImportArtifacts({ repoRoot, outputDir, inputs });
assert.equal(written.result.summary.productionMutation, false);
assert.equal(written.result.summary.frozenBoundaryPreserved, true);
assert.ok(fs.existsSync(path.join(outputDir, 'import-manifest.json')));
assert.ok(fs.existsSync(path.join(outputDir, 'candidates.json')));
assert.ok(fs.existsSync(path.join(outputDir, 'exceptions.json')));
assert.ok(fs.existsSync(path.join(outputDir, 'figure-candidates.json')));
assert.ok(fs.existsSync(path.join(outputDir, 'human-editable', 'SAT1.md')));

const human = fs.readFileSync(path.join(outputDir, 'human-editable', 'SAT1.md'), 'utf8');
assertIncludes(human, 'STATUS: CANDIDATE', 'Human-editable candidate status');
assertIncludes(human, '### Question: ' + sat1Id, 'Human-editable identity preservation');
assertIncludes(human, 'APPROVAL: NOT APPROVED', 'Human-editable approval boundary');

assert.throws(
  () => ensureSafeOutputDirectory(repoRoot, 'question-banks/legacy-30-mock-corpus'),
  /Production paths are not writable/,
  'Production output guard',
);

const importerStatusAfter = spawnSync('git', ['status', '--porcelain'], { cwd: repoRoot, encoding: 'utf8' });
assert.equal(importerStatusAfter.status, 0, 'Unable to inspect post-import Git status.');
assert.equal(
  importerStatusAfter.stdout.trim(),
  importerStatusBefore.stdout.trim(),
  'Step 2 importer changed tracked repository files.',
);

console.log(JSON.stringify({
  status: 'STEP2_ACCEPTANCE_PASS',
  frozenMockCount: frozen.frozenMockCount,
  frozenQuestionCount: frozen.frozenQuestionCount,
  mappedQuestionCount: first.summary.mappedQuestionCount,
  candidateCount: first.summary.candidateCount,
  figureCandidateCount: first.summary.figureCandidateCount,
  exceptionCodes: [...new Set(first.exceptions.map((item) => item.code))],
  deterministicMapping: true,
  humanEditableCandidateGenerated: true,
  productionMutation: false,
}, null, 2));

fs.rmSync(tempRoot, { recursive: true, force: true });