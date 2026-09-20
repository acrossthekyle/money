'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function useInvalidate() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const invalidate = () => {
    const current = new URLSearchParams(searchParams.toString());

    current.set('ts', Date.now().toString());

    router.refresh();

    router.push(`${pathname}?${current.toString()}`);
  };

  return invalidate;
};
