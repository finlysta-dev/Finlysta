// app/AmplitudeProvider.tsx
'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { initAmplitude, trackPageView } from '@/lib/amplitude'; // <- Note: .ts extension not needed

export default function AmplitudeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    initAmplitude();
    if (pathname) {
      trackPageView(pathname);
    }
  }, []);

  useEffect(() => {
    if (pathname) {
      trackPageView(pathname);
    }
  }, [pathname]);

  return <>{children}</>;
}