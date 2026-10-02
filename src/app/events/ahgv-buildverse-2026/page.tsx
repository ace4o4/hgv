'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AHGVRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/events#ahgv-buildverse');
  }, [router]);

  return null;
}
