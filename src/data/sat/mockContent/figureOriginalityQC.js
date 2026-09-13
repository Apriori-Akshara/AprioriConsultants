const NUMBER_PATTERN = /-?\d+(?:\.\d+)?/g;
const COSMETIC_KEYS = new Set(['visualVariant', 'figurePurpose']);
const FIGURE_RELATIONSHIPS = Object.freeze({
  Algebra: new Set(['line_chart', 'bar_chart', 'table', 'coordinate_shape', 'linear_function_graph', 'parabola']),
  'Advanced Math': new Set(['parabola', 'line_chart', 'bar_chart', 'table', 'coordinate_shape']),
  'Problem-Solving and Data Analysis': new Set(['bar_chart', 'line_chart', 'scatter_plot', 'table']),
  'Geometry and Trigonometry': new Set(['right_triangle', 'general_triangle', 'circle', 'parabola', 'coordinate_shape', '3d_solid', 'geometry', 'table']),
});

function normalizeText(value) {
  return String(value ?? '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');
}

function canonicalNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? String(number) : normalizeText(value);
}

function stable(value) {
  if (value === null || value === undefined) return '';
  if (Array.isArray(value)) return `[${value.map(stable).join(',')}]`;
  if (typeof value === 'object') {
    return `{${Object.keys(value)
      .filter((key) => !COSMETIC_KEYS.has(key))
      .sort()
      .map((key) => `${key}:${stable(value[key])}`)
      .join('|')}}`;
  }
  return canonicalNumber(value);
}

function numericDataFingerprint(value) {
  return stable(value).replace(NUMBER_PATTERN, '<n>');
}

function exactDataFingerprint(value) {
  return stable(value);
}

function validateChartData(question, figure) {
  if (!Array.isArray(figure.x_labels) || figure.x_labels.length === 0) {
    throw new Error(`Figure validation failed ${question.questionId}: chart requires x_labels.`);
  }
  if (!Array.isArray(figure.series) || figure.series.length === 0) {
    throw new Error(`Figure validation failed ${question.questionId}: chart requires at least one series.`);
  }

  const width = figure.x_labels.length;
  figure.series.forEach((series, index) => {
    if (!series || typeof series !== 'object') {
      throw new Error(`Figure validation failed ${question.questionId}: chart series ${index} must be an object.`);
    }
    if (!Array.isArray(series.values) || series.values.length !== width) {
      throw new Error(`Figure validation failed ${question.questionId}: chart series ${index} does not match x_labels.`);
    }
    if (series.values.some((value) => !Number.isFinite(Number(value)))) {
      throw new Error(`Figure validation failed ${question.questionId}: chart series ${index} contains a non-numeric value.`);
    }
  });
}

function validateScatterData(question, figure) {
  if (!Array.isArray(figure.points) || figure.points.length < 2) {
    throw new Error(`Figure validation failed ${question.questionId}: scatter plot requires at least two points.`);
  }
  figure.points.forEach((point, index) => {
    if (!Array.isArray(point) || point.length !== 2 || point.some((value) => !Number.isFinite(Number(value)))) {
      throw new Error(`Figure validation failed ${question.questionId}: scatter point ${index} is invalid.`);
    }
  });
}

function validateTableData(question, figure) {
  if (!Array.isArray(figure.headers) || !figure.headers.length || !Array.isArray(figure.rows) || !figure.rows.length) {
    throw new Error(`Figure validation failed ${question.questionId}: table requires headers and rows.`);
  }
  figure.rows.forEach((row, index) => {
    if (!Array.isArray(row) || row.length !== figure.headers.length) {
      throw new Error(`Figure validation failed ${question.questionId}: table row ${index} width does not match headers.`);
    }
  });
}

function validateCoordinateShapeData(question, figure) {
  if (!Array.isArray(figure.vertices) || figure.vertices.length < 3) {
    throw new Error(`Figure validation failed ${question.questionId}: coordinate shape requires at least three vertices.`);
  }
  const uniqueVertices = new Set();
  figure.vertices.forEach((point, index) => {
    if (!Array.isArray(point) || point.length !== 2 || point.some((value) => !Number.isFinite(Number(value)))) {
      throw new Error(`Figure validation failed ${question.questionId}: coordinate vertex ${index} is invalid.`);
    }
    const key = `${canonicalNumber(point[0])},${canonicalNumber(point[1])}`;
    if (uniqueVertices.has(key)) {
      throw new Error(`Figure validation failed ${question.questionId}: coordinate shape contains duplicate vertices.`);
    }
    uniqueVertices.add(key);
  });
}

function validateFigureQuestionRelationship(question) {
  const figure = question.figure;
  const domain = String(question.domain || '').trim();
  const type = normalizeText(figure.type);

  if (!question.metadata || question.metadata.figurePurpose !== 'question-essential') {
    throw new Error(`Figure relationship validation failed ${question.questionId}: Math figure must be marked question-essential.`);
  }

  const allowed = FIGURE_RELATIONSHIPS[domain];
  if (allowed && !allowed.has(type)) {
    throw new Error(`Figure relationship validation failed ${question.questionId}: ${type} is not an approved figure family for ${domain}.`);
  }
}

function validateDataShape(question) {
  const figure = question.figure;
  if (!figure) return;

  validateFigureQuestionRelationship(question);

  if (['bar_chart', 'line_chart'].includes(figure.type)) validateChartData(question, figure);
  if (figure.type === 'scatter_plot') validateScatterData(question, figure);
  if (figure.type === 'table') validateTableData(question, figure);
  if (figure.type === 'coordinate_shape') validateCoordinateShapeData(question, figure);
}

export function getFigureStructureFingerprint(question) {
  if (!question?.figure || question.section !== 'math') return '';
  const figure = question.figure;
  return `${normalizeText(question.domain)}|${normalizeText(figure.type)}|${numericDataFingerprint(figure)}`;
}

export function getFigureDataFingerprint(question) {
  if (!question?.figure || question.section !== 'math') return '';
  const figure = question.figure;
  return `${normalizeText(question.domain)}|${normalizeText(figure.type)}|${exactDataFingerprint(figure)}`;
}

export function getFigureOriginalityFingerprint(question) {
  const structure = getFigureStructureFingerprint(question);
  const data = getFigureDataFingerprint(question);
  if (!structure || !data) return '';
  return `${structure}|data:${data}`;
}

export function validateFigureOriginality(question) {
  if (!question?.figure || question.section !== 'math') return question;
  validateDataShape(question);
  const structureFingerprint = getFigureStructureFingerprint(question);
  const dataFingerprint = getFigureDataFingerprint(question);
  const fingerprint = getFigureOriginalityFingerprint(question);

  if (!structureFingerprint || !dataFingerprint || !fingerprint) {
    throw new Error(`Figure originality validation failed ${question.questionId}: figure fingerprint is empty.`);
  }

  return {
    ...question,
    metadata: {
      ...(question.metadata || {}),
      figureOriginalityFingerprint: fingerprint,
      figureStructureFingerprint: structureFingerprint,
      figureDataFingerprint: dataFingerprint,
    },
  };
}

export function validateFigureOriginalityBatch(questions) {
  if (!Array.isArray(questions)) throw new Error('Figure originality validation expected an array.');
  return questions.map(validateFigureOriginality);
}

export function validateFigureOriginalitySeries(mocks) {
  if (!Array.isArray(mocks)) throw new Error('Figure originality series validation expected an array of mocks.');

  const seenData = new Map();
  const seenStructures = new Map();

  mocks.forEach((mock) => {
    const testId = String(mock?.testId || '').trim();
    (mock?.math || []).forEach((question) => {
      if (!question?.figure) return;
      const dataFingerprint = getFigureDataFingerprint(question);
      const structureFingerprint = getFigureStructureFingerprint(question);

      if (!dataFingerprint || !structureFingerprint) {
        throw new Error(`Figure originality series validation failed ${question.questionId}: missing figure fingerprint.`);
      }

      const previous = seenData.get(dataFingerprint);
      if (previous && previous.testId !== testId) {
        throw new Error(`Cross-mock figure duplication detected: ${question.questionId} duplicates ${previous.questionId} from ${previous.testId}.`);
      }
      if (!previous) seenData.set(dataFingerprint, { testId, questionId: question.questionId });

      const structurePrevious = seenStructures.get(structureFingerprint);
      if (structurePrevious && structurePrevious.testId !== testId) {
        const previousData = structurePrevious.dataFingerprint;
        if (previousData !== dataFingerprint) {
          // Same construction family with different data is allowed; exact data reuse is not.
          return;
        }
      }
      if (!structurePrevious) seenStructures.set(structureFingerprint, { testId, questionId: question.questionId, dataFingerprint });
    });
  });

  return mocks;
}

export default validateFigureOriginalityBatch;
