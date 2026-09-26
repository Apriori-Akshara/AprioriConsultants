import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import zlib from 'node:zlib';

export const FROZEN_MOCK_KEYS = [
  ...Array.from({ length: 10 }, (_, i) => 'SAT' + (i + 1)),
  ...Array.from({ length: 10 }, (_, i) => 'PSAT' + (i + 1)),
  ...Array.from({ length: 10 }, (_, i) => 'SAT' + (i + 11)),
];

const SECTION_ALIASES = new Map([
  ['reading-writing', 'reading-writing'],
  ['reading and writing', 'reading-writing'],
  ['reading & writing', 'reading-writing'],
  ['reading/writing', 'reading-writing'],
  ['r&w', 'reading-writing'],
  ['rw', 'reading-writing'],
  ['math', 'math'],
  ['mathematics', 'math'],
]);

const MODULE_ALIASES = new Map([
  ['rw-module-1', 'rw-module-1'],
  ['rw module 1', 'rw-module-1'],
  ['reading-writing module 1', 'rw-module-1'],
  ['reading and writing module 1', 'rw-module-1'],
  ['r&w module 1', 'rw-module-1'],
  ['rw-module-2', 'rw-module-2'],
  ['rw module 2', 'rw-module-2'],
  ['reading-writing module 2', 'rw-module-2'],
  ['reading and writing module 2', 'rw-module-2'],
  ['r&w module 2', 'rw-module-2'],
  ['math-module-1', 'math-module-1'],
  ['math module 1', 'math-module-1'],
  ['mathematics module 1', 'math-module-1'],
  ['math-module-2', 'math-module-2'],
  ['math module 2', 'math-module-2'],
  ['mathematics module 2', 'math-module-2'],
]);

function normalizeWhitespace(value) {
  return String(value ?? '')
    .replace(/\u00a0/g, ' ')
    .replace(/\r\n?/g, '\n')
    .split('\n')
    .map((line) => line.replace(/[ \t]+$/g, ''))
    .join('\n')
    .trim();
}

export function normalizeMathSourceNotation(value) {
  return normalizeWhitespace(value)
    .replace(/−/g, '-')
    .replace(/\u2212/g, '-')
    .replace(/<=/g, '≤')
    .replace(/>=/g, '≥')
    .replace(/([A-Za-z0-9)\]])[ \t]*\^[ \t]*([A-Za-z0-9({])/g, '$1^$2')
    .replace(/(\d)[ \t]*\/[ \t]*(\d)/g, '$1/$2');
}

function normalizeContentValue(value) {
  return normalizeMathSourceNotation(value);
}

export function normalizeMockKey(rawValue) {
  const raw = normalizeWhitespace(rawValue).replace(/^mock\s*[:#-]?\s*/i, '');
  if (!raw) return '';

  const lower = raw.toLowerCase().replace(/\s+/g, '');
  let match = lower.match(/^sat-series-[ab]-mock-(\d{1,2})$/);
  if (match) {
    const n = Number(match[1]);
    if (lower.includes('series-a') && n >= 1 && n <= 10) return 'SAT' + n;
    if (lower.includes('series-b') && n >= 11 && n <= 20) return 'SAT' + n;
    return '';
  }

  match = lower.match(/^psat-mock-(\d{1,2})$/);
  if (match) {
    const n = Number(match[1]);
    return n >= 1 && n <= 10 ? 'PSAT' + n : '';
  }

  match = lower.match(/^sat0*(\d{1,2})$/);
  if (match) {
    const n = Number(match[1]);
    return n >= 1 && n <= 20 ? 'SAT' + n : '';
  }

  match = lower.match(/^psat0*(\d{1,2})$/);
  if (match) {
    const n = Number(match[1]);
    return n >= 1 && n <= 10 ? 'PSAT' + n : '';
  }

  return '';
}

export function normalizeSection(rawValue) {
  const key = normalizeWhitespace(rawValue).toLowerCase().replace(/\s+/g, ' ');
  return SECTION_ALIASES.get(key) || '';
}

export function normalizeModule(rawValue) {
  const key = normalizeWhitespace(rawValue).toLowerCase().replace(/\s+/g, ' ');
  return MODULE_ALIASES.get(key) || '';
}

function decodeXml(value) {
  return String(value)
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&amp;/g, '&');
}

function zipEntries(buffer) {
  let eocd = -1;
  for (let i = buffer.length - 22; i >= 0; i -= 1) {
    if (buffer.readUInt32LE(i) === 0x06054b50) {
      eocd = i;
      break;
    }
  }
  if (eocd < 0) throw new Error('DOCX ZIP end-of-central-directory record was not found.');

  const entryCount = buffer.readUInt16LE(eocd + 10);
  const centralSize = buffer.readUInt32LE(eocd + 12);
  const centralOffset = buffer.readUInt32LE(eocd + 16);
  if (centralOffset + centralSize > buffer.length) throw new Error('DOCX central directory is outside the file bounds.');

  const files = new Map();
  let offset = centralOffset;
  for (let i = 0; i < entryCount; i += 1) {
    if (buffer.readUInt32LE(offset) !== 0x02014b50) throw new Error('Unsupported DOCX central-directory entry.');
    const method = buffer.readUInt16LE(offset + 10);
    const compressedSize = buffer.readUInt32LE(offset + 20);
    const fileSize = buffer.readUInt32LE(offset + 24);
    const nameLength = buffer.readUInt16LE(offset + 28);
    const extraLength = buffer.readUInt16LE(offset + 30);
    const commentLength = buffer.readUInt16LE(offset + 32);
    const localOffset = buffer.readUInt32LE(offset + 42);
    const name = buffer.subarray(offset + 46, offset + 46 + nameLength).toString('utf8');

    if (buffer.readUInt32LE(localOffset) !== 0x04034b50) throw new Error('Unsupported DOCX local-file header.');
    const localNameLength = buffer.readUInt16LE(localOffset + 26);
    const localExtraLength = buffer.readUInt16LE(localOffset + 28);
    const dataStart = localOffset + 30 + localNameLength + localExtraLength;
    const compressed = buffer.subarray(dataStart, dataStart + compressedSize);
    let data;
    if (method === 0) data = Buffer.from(compressed);
    else if (method === 8) data = zlib.inflateRawSync(compressed);
    else throw new Error('Unsupported DOCX compression method for ' + name + ': ' + method);

    if (data.length !== fileSize) throw new Error('DOCX entry size mismatch for ' + name);
    files.set(name, data);
    offset += 46 + nameLength + extraLength + commentLength;
  }
  return files;
}

function xmlText(xmlFragment) {
  const withBreaks = String(xmlFragment)
    .replace(/<w:tab\s*\/>/gi, '\t')
    .replace(/<w:br\s*\/>/gi, '\n')
    .replace(/<w:cr\s*\/>/gi, '\n');

  return decodeXml(
    [...withBreaks.matchAll(/<w:t\b[^>]*>([\s\S]*?)<\/w:t>/gi)]
      .map((match) => match[1])
      .join('')
      .replace(/<[^>]+>/g, ''),
  );
}

function parseDocxXml(xml) {
  const blocks = [];
  const tableCandidates = [];
  const bodyMatch = xml.match(/<w:body\b[^>]*>([\s\S]*?)<\/w:body>/i);
  const body = bodyMatch ? bodyMatch[1] : xml;

  const childRegex = /<(w:p|w:tbl)\b[^>]*>[\s\S]*?<\/\1>/gi;
  for (const match of body.matchAll(childRegex)) {
    const fragment = match[0];
    if (match[1].toLowerCase() === 'w:tbl') {
      const rows = [];
      for (const rowMatch of fragment.matchAll(/<w:tr\b[^>]*>([\s\S]*?)<\/w:tr>/gi)) {
        const cells = [];
        for (const cellMatch of rowMatch[1].matchAll(/<w:tc\b[^>]*>([\s\S]*?)<\/w:tc>/gi)) {
          cells.push(normalizeContentValue(xmlText(cellMatch[1])));
        }
        if (cells.length) rows.push(cells);
      }
      if (rows.length) {
        const candidate = { type: 'table', headers: rows[0], rows: rows.slice(1) };
        const index = tableCandidates.length + 1;
        tableCandidates.push(candidate);
        blocks.push({ kind: 'table', marker: '[[STRUCTURED_TABLE_' + index + ']]' });
      }
    } else {
      const text = normalizeContentValue(xmlText(fragment));
      if (text) blocks.push({ kind: 'text', text });
    }
  }

  return {
    text: blocks.map((block) => block.kind === 'table' ? block.marker : block.text).join('\n'),
    tableCandidates,
    imageCount: (xml.match(/<(?:a:blip|v:imagedata)\b/gi) || []).length,
  };
}

export function parseDocxBuffer(buffer) {
  const files = zipEntries(buffer);
  const documentXml = files.get('word/document.xml');
  if (!documentXml) throw new Error('DOCX does not contain word/document.xml.');
  return parseDocxXml(documentXml.toString('utf8'));
}

function pdfLiteralValue(raw) {
  const value = raw.slice(1, -1);
  let output = '';
  for (let i = 0; i < value.length; i += 1) {
    const char = value[i];
    if (char !== '\\') {
      output += char;
      continue;
    }
    const next = value[++i];
    if (next === 'n') output += '\n';
    else if (next === 'r') output += '\r';
    else if (next === 't') output += '\t';
    else if (next === 'b') output += '\b';
    else if (next === 'f') output += '\f';
    else if (next === '\r' || next === '\n') {
      if (next === '\r' && value[i + 1] === '\n') i += 1;
    } else if (/[0-7]/.test(next)) {
      let octal = next;
      for (let j = 0; j < 2 && /[0-7]/.test(value[i + 1] || ''); j += 1) octal += value[++i];
      output += String.fromCharCode(parseInt(octal, 8));
    } else {
      output += next;
    }
  }
  return output;
}

function pdfHexValue(raw) {
  const hex = raw.slice(1, -1).replace(/\s+/g, '');
  const even = hex.length % 2 ? hex + '0' : hex;
  return Buffer.from(even, 'hex').toString('latin1');
}

function extractPdfStrings(streamText) {
  const chunks = [];
  const pushStrings = (container) => {
    for (const match of container.matchAll(/\((?:\\.|[^\\()])*\)|<[0-9A-Fa-f\s]+>/g)) {
      const raw = match[0];
      chunks.push(raw.startsWith('(') ? pdfLiteralValue(raw) : pdfHexValue(raw));
    }
  };

  const source = String(streamText);
  for (const match of source.matchAll(/(\[[\s\S]*?\])\s*TJ\b/g)) pushStrings(match[1]);
  for (const match of source.matchAll(/((?:\((?:\\.|[^\\()])*\)|<[0-9A-Fa-f\s]+>))\s*(?:Tj|['"])\b/g)) pushStrings(match[1]);

  return chunks.map((value) => normalizeContentValue(value)).filter(Boolean).join('\n');
}

export function parsePdfBuffer(buffer) {
  const raw = buffer.toString('latin1');
  if (/\/Encrypt\b/.test(raw)) throw new Error('Encrypted PDFs are not supported by the Step 2 text-PDF intake path.');

  const imageCount = (raw.match(/\/Subtype\s*\/Image\b/g) || []).length;
  const textChunks = [];

  for (const match of raw.matchAll(/stream\r?\n([\s\S]*?)\r?\nendstream/g)) {
    const prefixStart = Math.max(0, match.index - 300);
    const prefix = raw.slice(prefixStart, match.index);
    const payload = Buffer.from(match[1], 'latin1');
    let decoded = payload;
    if (/\/FlateDecode\b/.test(prefix)) {
      try { decoded = zlib.inflateSync(payload); }
      catch (error) { throw new Error('Could not decompress a FlateDecode PDF text stream: ' + error.message); }
    }
    const text = extractPdfStrings(decoded.toString('latin1'));
    if (text) textChunks.push(text);
  }

  const text = textChunks.join('\n').trim();
  if (!text) throw new Error('No recoverable text was found in the PDF.');
  return { text, tableCandidates: [], imageCount };
}

function parseTopLevelFields(text) {
  const fields = {};
  for (const match of text.matchAll(/^([A-Z][A-Z0-9 _/&-]+):\s*(.*?)\s*$/gm)) {
    fields[match[1].trim().toUpperCase()] = match[2].trim();
  }
  return fields;
}

function splitQuestionBlocks(text) {
  const headings = [...text.matchAll(/^###\s*Question:\s*(.+?)\s*$/gm)];
  if (headings.length) {
    return headings.map((heading, index) => ({
      headingId: heading[1].trim(),
      block: text.slice(heading.index + heading[0].length, index + 1 < headings.length ? headings[index + 1].index : text.length).trim(),
      headingIndex: index + 1,
    }));
  }

  const markers = [...text.matchAll(/^QUESTION(?:\s+(\d+))?(?:\s*[:.)-].*)?$/gim)];
  if (!markers.length) return [];

  return markers.map((marker, index) => ({
    headingId: '',
    block: text.slice(marker.index + marker[0].length, index + 1 < markers.length ? markers[index + 1].index : text.length).trim(),
    headingIndex: index + 1,
  }));
}

function extractLabeledField(block, label, nextLabels) {
  const escaped = label.replace(/[.*+?^$()|[\]\\]/g, '\\$&');
  const start = block.match(new RegExp('^' + escaped + ':\\s*', 'im'));
  if (!start) return '';
  const after = block.slice(start.index + start[0].length);
  const next = nextLabels
    .map((nextLabel) => after.search(new RegExp('^' + nextLabel.replace(/[.*+?^$()|[\]\\]/g, '\\$&') + ':\\s*', 'im')))
    .filter((index) => index >= 0)
    .sort((a, b) => a - b)[0];
  return normalizeContentValue((next === undefined ? after : after.slice(0, next)).trim());
}

function canonicalChoices(value) {
  if (!value) return null;
  if (Array.isArray(value)) return value.map(normalizeContentValue);
  if (typeof value === 'object') return ['A', 'B', 'C', 'D'].map((key) => normalizeContentValue(value[key] ?? value[key.toLowerCase()] ?? ''));
  return null;
}

function parseChoices(block) {
  const raw = extractLabeledField(block, 'CHOICES', ['ANSWER', 'EXPLANATION', 'SYSTEM METADATA', 'STRUCTURED FIGURE', 'TABLE']);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    const choices = canonicalChoices(parsed);
    if (choices) return choices;
  } catch {}
  const choices = [];
  for (const match of raw.matchAll(/^\s*([A-D])[\.\):\-]\s*(.*?)\s*$/gm)) {
    choices['ABCD'.indexOf(match[1].toUpperCase())] = normalizeContentValue(match[2]);
  }
  return choices.length === 4 && choices.every(Boolean) ? choices : null;
}

function parseJsonField(block, label, nextLabels) {
  const raw = extractLabeledField(block, label, nextLabels);
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

export function parseStructuredText(text) {
  const normalized = normalizeWhitespace(text);
  const jsonCandidate = (() => {
    try { return JSON.parse(normalized); } catch { return null; }
  })();

  if (jsonCandidate) {
    const groups = Array.isArray(jsonCandidate) ? [{ questions: jsonCandidate }] : (
      Array.isArray(jsonCandidate.mocks) ? jsonCandidate.mocks :
      Array.isArray(jsonCandidate.questions) ? [jsonCandidate] : []
    );
    const questions = [];
    for (const group of groups) {
      const groupQuestions = Array.isArray(group.questions) ? group.questions : [];
      for (let i = 0; i < groupQuestions.length; i += 1) {
        questions.push({
          headingId: String(groupQuestions[i].questionId || ''),
          block: JSON.stringify(groupQuestions[i], null, 2),
          json: groupQuestions[i],
          group,
          headingIndex: i + 1,
        });
      }
    }
    return { topFields: {}, questions, tableCandidates: [], imageCount: 0, format: 'json' };
  }

  const topFields = parseTopLevelFields(normalized);
  const questions = splitQuestionBlocks(normalized);
  return { topFields, questions, tableCandidates: [], imageCount: 0, format: 'structured-text' };
}

function sourceQuestionFromBlock(item, parsed, sourceGroupCounters) {
  const json = item.json;
  if (json) {
    const group = item.group || {};
    const section = normalizeSection(json.section || json.SECTION || group.section || group.SECTION || parsed.topFields.SECTION || '');
    const module = normalizeModule(json.module || json.MODULE || group.module || group.MODULE || parsed.topFields.MODULE || '');
    const testKey = normalizeMockKey(json.testKey || json.TEST_KEY || group.testKey || group.TEST_KEY || parsed.topFields['TEST KEY'] || parsed.topFields.MOCK || '');
    const rawPosition = json.questionPosition ?? json.position ?? json.QUESTION_POSITION ?? '';
    const key = [testKey, section, module].join('|');
    const position = rawPosition === '' || rawPosition === null || rawPosition === undefined
      ? (sourceGroupCounters.get(key) || 0) + 1
      : Number(rawPosition);
    sourceGroupCounters.set(key, position);

    return {
      explicitQuestionId: String(json.questionId || json.QUESTION_ID || item.headingId || '').trim(),
      testKey,
      section,
      module,
      questionPosition: Number.isInteger(position) ? position : null,
      prompt: normalizeContentValue(json.prompt || json.PROMPT || ''),
      choices: canonicalChoices(json.choices || json.CHOICES || null),
      answer: normalizeContentValue(json.answer || json.ANSWER || ''),
      explanation: normalizeContentValue(json.explanation || json.EXPLANATION || ''),
      table: json.table || json.structuredFigure || null,
      rawIndex: item.headingIndex,
    };
  }

  const block = item.block;
  const inheritedTestKey = normalizeMockKey(
    extractLabeledField(block, 'TEST KEY', ['TEST ID', 'SECTION', 'MODULE', 'QUESTION ID', 'QUESTION POSITION', 'PROMPT', 'CHOICES', 'ANSWER', 'EXPLANATION', 'SYSTEM METADATA', 'STRUCTURED FIGURE', 'TABLE']) ||
    parsed.topFields['TEST KEY'] || parsed.topFields.MOCK || '',
  );
  const section = normalizeSection(
    extractLabeledField(block, 'SECTION', ['MODULE', 'QUESTION ID', 'QUESTION POSITION', 'PROMPT', 'CHOICES', 'ANSWER', 'EXPLANATION', 'SYSTEM METADATA', 'STRUCTURED FIGURE', 'TABLE']) ||
    parsed.topFields.SECTION || '',
  );
  const module = normalizeModule(
    extractLabeledField(block, 'MODULE', ['QUESTION ID', 'QUESTION POSITION', 'PROMPT', 'CHOICES', 'ANSWER', 'EXPLANATION', 'SYSTEM METADATA', 'STRUCTURED FIGURE', 'TABLE']) ||
    parsed.topFields.MODULE || '',
  );
  const explicitQuestionId = (
    item.headingId ||
    extractLabeledField(block, 'QUESTION ID', ['QUESTION POSITION', 'PROMPT', 'CHOICES', 'ANSWER', 'EXPLANATION', 'SYSTEM METADATA', 'STRUCTURED FIGURE', 'TABLE'])
  ).trim();

  const key = [inheritedTestKey, section, module].join('|');
  const rawPosition = extractLabeledField(block, 'QUESTION POSITION', ['PROMPT', 'CHOICES', 'ANSWER', 'EXPLANATION', 'SYSTEM METADATA', 'STRUCTURED FIGURE', 'TABLE']);
  const positionFromField = rawPosition ? Number(rawPosition) : NaN;
  const position = Number.isInteger(positionFromField) && positionFromField > 0
    ? positionFromField
    : (sourceGroupCounters.get(key) || 0) + 1;
  sourceGroupCounters.set(key, position);

  const figure = parseJsonField(block, 'STRUCTURED FIGURE', ['PROMPT', 'CHOICES', 'ANSWER', 'EXPLANATION', 'SYSTEM METADATA', 'TABLE']) ||
    parseJsonField(block, 'TABLE', ['PROMPT', 'CHOICES', 'ANSWER', 'EXPLANATION', 'SYSTEM METADATA']);

  return {
    explicitQuestionId,
    testKey: inheritedTestKey,
    section,
    module,
    questionPosition: position,
    prompt: extractLabeledField(block, 'PROMPT', ['CHOICES', 'ANSWER', 'EXPLANATION', 'SYSTEM METADATA', 'STRUCTURED FIGURE', 'TABLE']),
    choices: parseChoices(block),
    answer: extractLabeledField(block, 'ANSWER', ['EXPLANATION', 'SYSTEM METADATA', 'STRUCTURED FIGURE', 'TABLE']),
    explanation: extractLabeledField(block, 'EXPLANATION', ['SYSTEM METADATA', 'STRUCTURED FIGURE', 'TABLE']),
    table: figure,
    rawIndex: item.headingIndex,
  };
}

function parseLegacyQuestions(markdown) {
  const headings = [...markdown.matchAll(/^###\s*Question:\s*(.+?)\s*$/gm)];
  const output = [];
  for (let i = 0; i < headings.length; i += 1) {
    const block = markdown.slice(headings[i].index + headings[i][0].length, i + 1 < headings.length ? headings[i + 1].index : markdown.length);
    const id = headings[i][1].trim();
    const section = (block.match(/^SECTION:\s*(.+)$/im) || [,''])[1].trim();
    const module = (block.match(/^MODULE:\s*(.+)$/im) || [,''])[1].trim();
    const positionKey = [section, module].join('|');
    output.push({ questionId: id, section, module, positionKey });
  }
  const positions = new Map();
  return output.map((entry) => {
    const next = (positions.get(entry.positionKey) || 0) + 1;
    positions.set(entry.positionKey, next);
    return { ...entry, position: next };
  });
}

export function buildFrozenIdentityIndex(repoRoot) {
  const legacyRoot = path.resolve(repoRoot, 'question-banks/legacy-30-mock-corpus');
  const byQuestionId = new Map();
  const byPosition = new Map();
  const mocks = new Map();

  for (const testKey of FROZEN_MOCK_KEYS) {
    const filePath = path.join(legacyRoot, testKey + '.md');
    if (!fs.existsSync(filePath)) throw new Error('Frozen mock document is missing: ' + filePath);
    const markdown = fs.readFileSync(filePath, 'utf8');
    const top = parseTopLevelFields(markdown);
    const testId = top['TEST ID'] || '';
    const questions = parseLegacyQuestions(markdown);
    if (questions.length !== 196) throw new Error('Frozen mock ' + testKey + ' must contain 196 questions; found ' + questions.length);
    const mockRecord = { testKey, testId, questions: [] };

    for (const entry of questions) {
      if (byQuestionId.has(entry.questionId)) throw new Error('Duplicate frozen questionId: ' + entry.questionId);
      const record = {
        testKey,
        testId,
        questionId: entry.questionId,
        section: normalizeSection(entry.section),
        module: normalizeModule(entry.module),
        position: entry.position,
      };
      if (!record.section || !record.module) throw new Error('Frozen question has invalid section/module: ' + entry.questionId);
      byQuestionId.set(record.questionId, record);
      const positionKey = [testKey, record.section, record.module, record.position].join('|');
      if (byPosition.has(positionKey)) throw new Error('Duplicate frozen position mapping: ' + positionKey);
      byPosition.set(positionKey, record);
      mockRecord.questions.push(record);
    }

    mocks.set(testKey, mockRecord);
  }

  return {
    frozenMockCount: mocks.size,
    frozenQuestionCount: byQuestionId.size,
    mocks,
    byQuestionId,
    byPosition,
  };
}

function extractExplicitAnswerFromExplanation(explanation) {
  const match = String(explanation || '').match(/\b(?:Choice|Option)\s+([ABCD])\s+is\s+correct\b|\b(?:correct\s+answer|answer)\s*(?:is|:)\s*([ABCD])\b/i);
  return match ? (match[1] || match[2]).toUpperCase() : '';
}

function candidateExceptions(question, target) {
  const errors = [];
  if (!question.prompt) errors.push({ code: 'MISSING_REQUIRED_CONTENT', message: 'Prompt is missing.' });
  if (!question.explanation) errors.push({ code: 'MISSING_REQUIRED_CONTENT', message: 'Explanation is missing.' });
  const choices = canonicalChoices(question.choices);
  if (!choices && question.answer) errors.push({ code: 'MALFORMED_ANSWER_FORMAT', message: 'Answer was supplied but choices could not be parsed.' });
  if (choices && choices.length !== 4) errors.push({ code: 'MALFORMED_QUESTION_FORMAT', message: 'Multiple-choice source content must contain exactly four choices.' });
  if (choices && choices.some((choice) => !choice)) errors.push({ code: 'MALFORMED_QUESTION_FORMAT', message: 'One or more answer choices are empty.' });
  if (!question.answer) errors.push({ code: 'MISSING_REQUIRED_CONTENT', message: 'Answer is missing.' });
  if (choices && question.answer && !/^[A-D]$/i.test(question.answer)) errors.push({ code: 'MALFORMED_ANSWER_FORMAT', message: 'Multiple-choice answer must be A, B, C, or D.' });
  const explanationAnswer = extractExplicitAnswerFromExplanation(question.explanation);
  if (explanationAnswer && question.answer && explanationAnswer !== question.answer.toUpperCase()) {
    errors.push({ code: 'ANSWER_MISMATCH', message: 'Answer conflicts with the explicit answer stated in the explanation.' });
  }
  if (target && question.section && question.section !== target.section) errors.push({ code: 'INCOMPATIBLE_SECTION', message: 'Source section does not match the frozen target section.' });
  if (target && question.module && question.module !== target.module) errors.push({ code: 'INCOMPATIBLE_MODULE', message: 'Source module does not match the frozen target module.' });
  return errors;
}

function sanitizeFigureCandidate(value, sourceRef) {
  if (!value || typeof value !== 'object') return null;
  const type = normalizeWhitespace(value.type || '').toLowerCase();
  if (!type) return { exception: { code: 'MALFORMED_FIGURE_DATA', message: 'Structured figure candidate is missing a type.' } };
  if (type === 'table') {
    const headers = Array.isArray(value.headers) ? value.headers.map(normalizeContentValue) : [];
    const rows = Array.isArray(value.rows) ? value.rows.map((row) => Array.isArray(row) ? row.map(normalizeContentValue) : []) : [];
    if (!headers.length || rows.some((row) => row.length !== headers.length)) {
      return { exception: { code: 'FIGURE_DATA_INCONSISTENCY', message: 'Table figure candidate has inconsistent headers/rows.' } };
    }
    return {
      figure: { type: 'table', ariaLabel: 'Imported source table candidate', title: '', data: { headers, rows } },
      sourceRef,
    };
  }
  return { exception: { code: 'UNSUPPORTED_FIGURE_TYPE', message: 'Structured figure type is not supported by the Step 2 intake contract: ' + type } };
}

function buildMetadata(repoRoot, target) {
  const markdownPath = path.join(repoRoot, 'question-banks/legacy-30-mock-corpus', target.testKey + '.md');
  const markdown = fs.readFileSync(markdownPath, 'utf8');
  const headings = [...markdown.matchAll(/^###\s*Question:\s*(.+?)\s*$/gm)];
  const headingIndex = headings.findIndex((item) => item[1].trim() === target.questionId);
  if (headingIndex < 0) return {};
  const heading = headings[headingIndex];
  const end = headingIndex + 1 < headings.length ? headings[headingIndex + 1].index : markdown.length;
  const block = markdown.slice(heading.index + heading[0].length, end);
  const match = block.match(new RegExp('SYSTEM METADATA \\(DO NOT EDIT DIRECTLY\\):\\s*\\n' + String.fromCharCode(96).repeat(3) + 'json\\n([\\s\\S]*?)\\n' + String.fromCharCode(96).repeat(3)));
  return match ? JSON.parse(match[1]) : {};
}

function buildCandidateMarkdown(testKey, entries) {
  const fence = String.fromCharCode(96).repeat(3);
  const first = entries[0];
  const header = [
    '# ' + testKey + ' — Source-Import Candidate',
    '',
    'STATUS: CANDIDATE',
    'APPROVAL: NOT APPROVED',
    'TEST KEY: ' + testKey,
    'TEST ID: ' + (first.target.testId || ''),
    'QUESTION COUNT: ' + entries.length,
    '',
    '> Candidate content generated by the non-production bulk source-import workflow.',
    '> This file does not mutate canonical production content and requires the documented review/approval gates.',
    '',
  ];

  const blocks = entries.map((entry) => {
    const candidate = entry.candidate;
    const metadata = candidate.baseMetadata || {};
    return [
      '### Question: ' + entry.target.questionId,
      '',
      'STATUS: CANDIDATE',
      'TEST KEY: ' + testKey,
      'TEST ID: ' + entry.target.testId,
      'SECTION: ' + entry.target.section,
      'MODULE: ' + entry.target.module,
      'DOMAIN: ' + (metadata.domain || ''),
      'SKILL: ' + (metadata.skill || ''),
      'DIFFICULTY: ' + (metadata.difficulty || ''),
      'QUESTION TYPE: ' + (metadata.questionType || ''),
      '',
      'PROMPT:',
      candidate.prompt || '',
      '',
      'CHOICES:',
      JSON.stringify(candidate.choices || [], null, 2),
      '',
      'ANSWER: ' + (candidate.answer || ''),
      '',
      'EXPLANATION:',
      candidate.explanation || '',
      '',
      'SYSTEM METADATA (DO NOT EDIT DIRECTLY):',
      fence + 'json',
      JSON.stringify(metadata, null, 2),
      fence,
      '',
    ].join(String.fromCharCode(10));
  });

  return header.concat(blocks).join(String.fromCharCode(10));
}

function sha256Buffer(buffer) {
  return crypto.createHash('sha256').update(buffer).digest('hex');
}

export function ensureSafeOutputDirectory(repoRoot, requestedOutput) {
  const outputDir = path.resolve(repoRoot, requestedOutput || '.question-bank-import');
  const candidateRoot = path.resolve(repoRoot, '.question-bank-import');
  const relative = path.relative(repoRoot, outputDir);
  const insideRepo = relative && !relative.startsWith('..') && !path.isAbsolute(relative);
  const insideCandidateRoot = outputDir === candidateRoot || outputDir.startsWith(candidateRoot + path.sep);
  if (insideRepo && !insideCandidateRoot) {
    throw new Error('Step 2 importer may write only to .question-bank-import inside the repository or to an external output directory. Production paths are not writable.');
  }
  return outputDir;
}

function sourceDescriptor(input) {
  const buffer = Buffer.isBuffer(input.data) ? input.data : Buffer.from(String(input.data), 'utf8');
  return { name: input.name, kind: input.kind, sha256: sha256Buffer(buffer), bytes: buffer.length };
}

function extractSource(input) {
  const name = input.name || 'pasted-content.txt';
  const extension = path.extname(name).toLowerCase();
  const data = Buffer.isBuffer(input.data) ? input.data : Buffer.from(String(input.data), 'utf8');
  if (extension === '.docx') return { ...parseDocxBuffer(data), format: 'docx' };
  if (extension === '.pdf') return { ...parsePdfBuffer(data), format: 'pdf' };
  if (extension === '.json') return parseStructuredText(data.toString('utf8'));
  if (['.txt', '.md', '.text'].includes(extension) || input.kind === 'pasted-text') return parseStructuredText(data.toString('utf8'));
  throw new Error('Unsupported source type: ' + name + '. Accepted inputs are DOCX, PDF, JSON/structured text, or pasted structured text.');
}

function createInputQuestionList(parsed) {
  const sourceCounters = new Map();
  return parsed.questions.map((item) => sourceQuestionFromBlock(item, parsed, sourceCounters));
}

export function processSourceInputs({ repoRoot, inputs }) {
  const frozen = buildFrozenIdentityIndex(repoRoot);
  const result = {
    schemaVersion: 1,
    status: 'SOURCE_IMPORT_CANDIDATE_ONLY',
    productionMutation: false,
    frozenMockCount: frozen.frozenMockCount,
    frozenQuestionCount: frozen.frozenQuestionCount,
    sources: [],
    mappings: [],
    candidates: [],
    figureCandidates: [],
    exceptions: [],
  };

  const seenTargets = new Set();

  for (const input of inputs) {
    const descriptor = sourceDescriptor(input);
    const sourceRef = { sourceName: descriptor.name, sha256: descriptor.sha256 };
    result.sources.push(descriptor);

    let parsed;
    try {
      parsed = extractSource(input);
    } catch (error) {
      result.exceptions.push({
        code: 'SOURCE_PARSE_FAILED',
        severity: 'error',
        sourceName: descriptor.name,
        message: error.message,
      });
      continue;
    }

    if (parsed.imageCount > 0) {
      result.exceptions.push({
        code: 'FIGURE_STRUCTURE_NOT_RECOVERABLE',
        severity: 'review',
        sourceName: descriptor.name,
        message: 'Source contains embedded image figure material that was not reconstructed as structured data; human review is required.',
        count: parsed.imageCount,
      });
    }

    const sourceQuestions = createInputQuestionList(parsed);
    if (!sourceQuestions.length) {
      result.exceptions.push({
        code: 'MALFORMED_QUESTION_FORMAT',
        severity: 'error',
        sourceName: descriptor.name,
        message: 'No structured question blocks were recovered.',
      });
      continue;
    }

    for (const [index, question] of sourceQuestions.entries()) {
      let target = null;
      let mappingMethod = '';

      if (question.explicitQuestionId) {
        if (!question.testKey) {
          result.exceptions.push({
            code: 'AMBIGUOUS_MAPPING',
            severity: 'error',
            sourceName: descriptor.name,
            sourceQuestionIndex: index + 1,
            message: 'A questionId was supplied without an explicit frozen testKey/mock identity.',
          });
          continue;
        }

        target = frozen.byQuestionId.get(question.explicitQuestionId) || null;
        mappingMethod = 'explicit-testKey-questionId';

        if (!target) {
          result.exceptions.push({
            code: 'UNKNOWN_QUESTION_ID',
            severity: 'error',
            sourceName: descriptor.name,
            sourceQuestionIndex: index + 1,
            message: 'QuestionId is not present in the frozen 30-mock corpus: ' + question.explicitQuestionId,
          });
          continue;
        }

        if (target.testKey !== question.testKey) {
          result.exceptions.push({
            code: 'IDENTITY_TARGET_MISMATCH',
            severity: 'error',
            sourceName: descriptor.name,
            sourceQuestionIndex: index + 1,
            message: 'The supplied testKey and questionId do not identify the same frozen question.',
          });
          continue;
        }
      } else {
        if (!question.testKey || !question.section || !question.module || !Number.isInteger(question.questionPosition) || question.questionPosition < 1) {
          result.exceptions.push({
            code: 'AMBIGUOUS_MAPPING',
            severity: 'error',
            sourceName: descriptor.name,
            sourceQuestionIndex: index + 1,
            message: 'Position mapping requires an explicit frozen mock identity, section, module, and question position/order.',
          });
          continue;
        }

        const key = [question.testKey, question.section, question.module, question.questionPosition].join('|');
        target = frozen.byPosition.get(key) || null;
        mappingMethod = 'mock-section-module-position';

        if (!target) {
          result.exceptions.push({
            code: 'POSITION_OUT_OF_RANGE',
            severity: 'error',
            sourceName: descriptor.name,
            sourceQuestionIndex: index + 1,
            message: 'No frozen question exists at ' + key + '.',
          });
          continue;
        }
      }

      const targetKey = target.testKey + '|' + target.questionId;
      if (seenTargets.has(targetKey)) {
        result.exceptions.push({
          code: 'DUPLICATE_TARGET',
          severity: 'error',
          sourceName: descriptor.name,
          sourceQuestionIndex: index + 1,
          message: 'Multiple source items map to the same frozen target: ' + targetKey,
        });
        continue;
      }
      seenTargets.add(targetKey);

      const exceptions = candidateExceptions(question, target);
      const metadata = buildMetadata(repoRoot, target);
      const candidate = {
        testKey: target.testKey,
        questionId: target.questionId,
        sourceRef,
        mappingMethod,
        baseMetadata: metadata,
        prompt: question.prompt,
        choices: canonicalChoices(question.choices),
        answer: question.answer,
        explanation: question.explanation,
        status: 'CANDIDATE',
        productionMutation: false,
      };

      if (question.table) {
        const sanitized = sanitizeFigureCandidate(question.table, sourceRef);
        if (sanitized?.figure) {
          result.figureCandidates.push({ ...sanitized.figure, testKey: target.testKey, questionId: target.questionId, sourceRef });
        } else if (sanitized?.exception) {
          exceptions.push(sanitized.exception);
        }
      } else if (parsed.format === 'docx' && parsed.tableCandidates?.length) {
        const table = parsed.tableCandidates[Math.min(index, parsed.tableCandidates.length - 1)];
        if (table) {
          const sanitized = sanitizeFigureCandidate(table, sourceRef);
          if (sanitized?.figure) {
            result.figureCandidates.push({ ...sanitized.figure, testKey: target.testKey, questionId: target.questionId, sourceRef });
          }
        }
      }

      for (const exception of exceptions) {
        result.exceptions.push({
          ...exception,
          severity: exception.severity || 'review',
          sourceName: descriptor.name,
          sourceQuestionIndex: index + 1,
          target: { testKey: target.testKey, questionId: target.questionId },
        });
      }

      result.mappings.push({
        sourceName: descriptor.name,
        sourceQuestionIndex: index + 1,
        target: { testKey: target.testKey, questionId: target.questionId },
        mappingMethod,
        exceptionCount: exceptions.length,
      });
      result.candidates.push(candidate);
    }
  }

  result.summary = {
    sourceCount: result.sources.length,
    mappedQuestionCount: result.mappings.length,
    candidateCount: result.candidates.length,
    figureCandidateCount: result.figureCandidates.length,
    exceptionCount: result.exceptions.length,
    productionMutation: false,
    frozenBoundaryPreserved: result.frozenMockCount === FROZEN_MOCK_KEYS.length && result.frozenQuestionCount === FROZEN_MOCK_KEYS.length * 196,
  };

  return result;
}

export function writeImportArtifacts({ repoRoot, outputDir, inputs }) {
  const safeOutput = ensureSafeOutputDirectory(repoRoot, outputDir);
  fs.mkdirSync(safeOutput, { recursive: true });

  const result = processSourceInputs({ repoRoot, inputs });
  const byMock = new Map();
  for (const mapping of result.mappings) {
    const candidate = result.candidates.find((item) => item.testKey === mapping.target.testKey && item.questionId === mapping.target.questionId);
    if (!candidate) continue;
    if (!byMock.has(candidate.testKey)) byMock.set(candidate.testKey, []);
    byMock.get(candidate.testKey).push({ target: { ...mapping.target, testId: candidate.baseMetadata?.testId || '' }, candidate });
  }

  const humanDir = path.join(safeOutput, 'human-editable');
  fs.mkdirSync(humanDir, { recursive: true });
  for (const [testKey, entries] of byMock) {
    fs.writeFileSync(path.join(humanDir, testKey + '.md'), buildCandidateMarkdown(testKey, entries), 'utf8');
  }

  fs.writeFileSync(path.join(safeOutput, 'candidates.json'), JSON.stringify(result.candidates, null, 2) + String.fromCharCode(10), 'utf8');
  fs.writeFileSync(path.join(safeOutput, 'figure-candidates.json'), JSON.stringify(result.figureCandidates, null, 2) + String.fromCharCode(10), 'utf8');
  fs.writeFileSync(path.join(safeOutput, 'exceptions.json'), JSON.stringify(result.exceptions, null, 2) + String.fromCharCode(10), 'utf8');

  const manifest = {
    ...result,
    output: {
      root: safeOutput,
      candidates: path.join(safeOutput, 'candidates.json'),
      humanEditable: humanDir,
      figureCandidates: path.join(safeOutput, 'figure-candidates.json'),
      exceptions: path.join(safeOutput, 'exceptions.json'),
    },
  };
  fs.writeFileSync(path.join(safeOutput, 'import-manifest.json'), JSON.stringify(manifest, null, 2) + String.fromCharCode(10), 'utf8');
  return { result, manifest, outputDir: safeOutput };
}
