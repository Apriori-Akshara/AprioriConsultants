/**
 * Temporary Day 1 placeholder for the future authenticated SAT program.
 *
 * IMPORTANT:
 * This intentionally returns a 404 during the architecture phase.
 * Day 2 will replace this with the authenticated SAT entry point/dashboard.
 *
 * Do not add this route to the public navbar yet.
 */

export async function getServerSideProps() {
  return {
    notFound: true,
  };
}

export default function SATMocksPlaceholder() {
  return null;
}
