'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function useModel() {
  const pathname = usePathname();
  const router = useRouter();

  const [isMenuActive, setIsMenuActive] = useState(false);

  const canClose = pathname.includes('add') ||
    pathname.includes('edit') ||
    pathname.includes('transactions') ||
    pathname.includes('year');

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuActive(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-active', isMenuActive);
  }, [isMenuActive]);

  const handleOnToggle = () => {
    if (canClose) {
      router.back();
    } else {
      setIsMenuActive(previous => !previous);
    }
  };

  return {
    canClose,
    handleOnToggle,
    isMenuActive,
  };
}
