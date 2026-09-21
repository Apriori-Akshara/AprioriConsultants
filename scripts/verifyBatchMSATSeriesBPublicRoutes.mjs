const BASE_URL = (process.env.BATCH_M_PUBLIC_BASE_URL || 'https://www.aprioriconsultants.org').replace(/\/$/, '');

const routes = [
  '/SATMocksSeriesB',
  ...Array.from({ length: 10 }, (_, index) => `/SATMocks/SAT${index + 11}`),
];

async function checkRoute(route) {
  const url = `${BASE_URL}${route}`;
  const response = await fetch(url, {
    redirect: 'manual',
    headers: { 'user-agent': 'Apriori-Batch-M-Series-B-Public-Smoke/1.0' },
  });

  const location = response.headers.get('location') || '';
  const passed = response.status >= 300 && response.status < 400
    && location.startsWith('/Auth?returnTo=')
    && decodeURIComponent(location.split('returnTo=')[1] || '') === route;

  return {
    route,
    status: response.status,
    location,
    passed,
  };
}

const results = [];
for (const route of routes) results.push(await checkRoute(route));

const failures = results.filter((result) => !result.passed);
console.log(JSON.stringify({
  baseUrl: BASE_URL,
  scope: 'SAT Series B public unauthenticated route smoke verification',
  routesChecked: routes.length,
  results,
  passed: failures.length === 0,
  limitation: 'This verifies live route deployment and the protected-route login redirect. It does not replace authenticated student acceptance of the full SAT11-SAT20 test experience.',
}, null, 2));

if (failures.length) {
  throw new Error(`SAT11-SAT20 public route smoke verification failed for ${failures.length} route(s).`);
}
