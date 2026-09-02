import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function SATDiagnosticTest() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/');
  }, [router]);

  return null;
}
