'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function useUpdateUrl() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateUrl = (
    key: string | string[],
    value: string | string[] | null,
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    const keys = Array.isArray(key) ? key : [key];
    const values = Array.isArray(value) ? value : [value];

    keys.forEach((item, index) => {
      if (values[index]) {
        params.set(item, values[index]);
      } else {
        params.delete(item);
      }
    });

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return updateUrl;
};
