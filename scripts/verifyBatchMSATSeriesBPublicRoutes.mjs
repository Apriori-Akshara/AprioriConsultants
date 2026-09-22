const BASE_URL = (process.env.BATCH_M_PUBLIC_BASE_URL || 'https://www.aprioriconsultants.org').replace(/\/$/, '');

const routes = [
  '/SATMocks',
  '/PSATMocks',
  '/SATMocksSeriesB',
  ...Array.from({ length: 10 }, (_, index) => `/SATMocks/SAT${index + 1}`),
  ...Array.from({ length: 10 }, (_, index) => `/SATMocks/PSAT${index + 1}`),
  ...Array.from({ length: 10 }, (_, index) => `/SATMocks/SAT${index + 11}`),
];

const MAX_ATTEMPTS = 10;
const RETRY_DELAY_MS = 30_000;

async function checkRoute(route) {
  const url = `${BASE_URL}${route}`;
  const response = await fetch(url, {
    redirect: 'manual',
    headers: { 'user-agent': 'Apriori-SAT-PSAT-Public-Smoke/1.0' },
  });

  const location = response.headers.get('location') || '';
  const returnTo = location.startsWith('/Auth?returnTo=')
    ? decodeURIComponent(location.split('returnTo=')[1] || '')
    : '';

  const passed = response.status >= 300 && response.status < 400
    && returnTo === route;

  return {
    route,
    status: response.status,
    location,
    returnTo,
    passed,
  };
}

async function sleep(ms) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

let results = [];

for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
  results = [];
  for (const route of routes) results.push(await checkRoute(route));

  const failures = results.filter((result) => !result.passed);
  console.log(JSON.stringify({
    attempt,
    maxAttempts: MAX_ATTEMPTS,
    failures: failures.map(({ route, status, location, returnTo }) => ({
      route,
      status,
      location,
      returnTo,
    })),
  }, null, 2));

  if (failures.length === 0) break;

  if (attempt < MAX_ATTEMPTS) {
    console.log(`Live deployment has not converged yet; retrying in ${RETRY_DELAY_MS / 1000}s.`);
    await sleep(RETRY_DELAY_MS);
  }
}

const failures = results.filter((result) => !result.passed);

console.log(JSON.stringify({
  baseUrl: BASE_URL,
  scope: 'SAT/PSAT mock public unauthenticated route smoke verification',
  routesChecked: routes.length,
  results,
  passed: failures.length === 0,
  limitation: 'This verifies live route deployment and protected-route login redirects. It does not replace authenticated student acceptance of the full 30-mock test experience or interactive calculator embedding.',
}, null, 2));

if (failures.length) {
  throw new Error(`SAT/PSAT public route smoke verification failed for ${failures.length} route(s) after ${MAX_ATTEMPTS} attempts.`);
}
