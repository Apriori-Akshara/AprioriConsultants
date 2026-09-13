const NUMBER_PATTERN = /-?\d+(?:\.\d+)?/g;

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
      .filter((key) => !['visualVariant', 'figurePurpose'].includes(key))
      .sort()
      .map((key) => `${key}:${stable(value[key])}`)
      .join('|')}}`;
  }
  return canonicalNumber(value);
}

function numericDataFingerprint(value) {
  return stable(value).replace(NUMBER_PATTERN, '<n>');
}

function validateDataShape(question) {
  const figure = question.figure;
  if (!figure) return;

  if (['bar_chart', 'line_chart'].includes(figure.type)) {
    if (!Array.isArray(figure.x_labels) || !figure.x_labels.length) {
      throw new Error(`Figure validation failed ${question.questionId}: chart requires x_labels.`);
    }
    if (!Array.isArray(figure.series) || !figure.series.length) {
      throw new Error(`Figure validation failed ${question.questionId}: chart requires at least one series.`);
    }
    const width = figure.x_labels.length;
    figure.series.forEach((series, index) => {
      if (!Array.isArray(series.values) || series.values.length !== width) {
        throw new Error(`Figure validation failed ${question.questionId}: chart series ${index} does not match x_labels.`);
      }
      if (series.values.some((value) => !Number.isFinite(Number(value)))) {
        throw new Error(`Figure validation failed ${question.questionId}: chart series ${index} contains a non-numeric value.`);
      }
    });
  }

  if (figure.type === 'scatter_plot') {
    if (!Array.isArray(figure.points) || figure.points.length < 2) {
      throw new Error(`Figure validation failed ${question.questionId}: scatter plot requires at least two points.`);
    }
    figure.points.forEach((point, index) => {
      if (!Array.isArray(point) || point.length !== 2 || point.some((value) => !Number.isFinite(Number(value)))) {
        throw new Error(`Figure validation failed ${question.questionId}: scatter point ${index} is invalid.`);
      }
    });
  }

  if (figure.type === 'table') {
    if (!Array.isArray(figure.headers) || !Array.isArray(figure.rows) || !figure.headers.length || !figure.rows.length) {
      throw new Error(`Figure validation failed ${question.questionId}: table requires headers and rows.`);
    }
    figure.rows.forEach((row, index) => {
      if (!Array.isArray(row) || row.length !== figure.headers.length) {
        throw new Error(`Figure validation failed ${question.questionId}: table row ${index} width does not match headers.`);
      }
    });
  }

  if (figure.type === 'coordinate_shape') {
    const uniqueVertices = new Set((figure.vertices || []).map((point) => `${Number(point[0])},${Number(point[1])}`));
    if (uniqueVertices.size !== figure.vertices.length) {
      throw new Error(`Figure validation failed ${question.questionId}: coordinate shape contains duplicate vertices.`);
    }
  }
}

export function getFigureOriginalityFingerprint(question) {
  if (!question?.figure || question.section !== 'math') return '';
  const figure = question.figure;
  return `${normalizeText(question.domain)}|${normalizeText(figure.type)}|${numericDataFingerprint(figure)}`;
}

export function validateFigureOriginality(question) {
  if (!question?.figure || question.section !== 'math') return question;
  validateDataShape(question);
  const fingerprint = getFigureOriginalityFingerprint(question);
  if (!fingerprint) {
    throw new Error(`Figure originality validation failed ${question.questionId}: figure fingerprint is empty.`);
  }
  return {
    ...question,
    metadata: {
      ...(question.metadata || {}),
      figureOriginalityFingerprint: fingerprint,
    },
  };
}

export function validateFigureOriginalityBatch(questions) {
  if (!Array.isArray(questions)) throw new Error('Figure originality validation expected an array.');
  return questions.map(validateFigureOriginality);
}

export default validateFigureOriginalityBatch;
