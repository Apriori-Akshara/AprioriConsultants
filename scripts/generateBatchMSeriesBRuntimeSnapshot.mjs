import fs from 'node:fs';
import path from 'node:path';
import { BATCH_M_ACCEPTED_PRODUCTION_CORPUS } from '../src/data/sat/mockContent/batchMProductionStore';

const SERIES_B_TEST_IDS = new Set(
  Array.from({ length: 10 }, (_, index) => `sat-series-b-mock-${String(index + 11).padStart(2, '0')}`)
);

const sourceMocks = BATCH_M_ACCEPTED_PRODUCTION_CORPUS.filter((mock) =>
  SERIES_B_TEST_IDS.has(String(mock?.testId || '').trim())
);

if (sourceMocks.length !== 10) {
  throw new Error(`Expected 10 accepted Series B mocks, found ${sourceMocks.length}`);
}

const mocks = sourceMocks.map((mock) => {
  const readingWriting = Array.isArray(mock?.readingWriting) ? mock.readingWriting : [];
  const math = Array.isArray(mock?.math) ? mock.math : [];

  if (readingWriting.length + math.length !== 196) {
    throw new Error(`Expected 196 records for ${mock?.testId || 'unknown'}`);
  }

  const { storageRecords, ...runtimeMock } = mock;

  return {
    testKey: String(mock.testId || '').replace(/^sat-series-b-mock-/i, 'SAT'),
    ...runtimeMock,
  };
});

const snapshot = {
  schemaVersion: 1,
  source: 'BATCH_M_ACCEPTED_PRODUCTION_CORPUS',
  purpose: 'server-runtime-only Series B corpus; no production gates execute on request',
  mocks,
};

const outputPath = path.resolve(
  process.cwd(),
  'src/data/sat/mockContent/batchMSeriesBRuntimeSnapshot.json'
);

fs.writeFileSync(outputPath, `${JSON.stringify(snapshot, null, 2)}\n`, 'utf8');

console.log(
  JSON.stringify(
    {
      outputPath,
      mockCount: mocks.length,
      testKeys: mocks.map((mock) => mock.testKey),
      totalRecords: mocks.reduce(
        (sum, mock) => sum + (mock.readingWriting?.length || 0) + (mock.math?.length || 0),
        0
      ),
    },
    null,
    2
  )
);
