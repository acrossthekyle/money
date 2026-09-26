'use client';

import { LoaderCircle } from 'lucide-react';

import { useLoading } from '@/hooks';
import tw, { cs } from '@/styles';

export default function Loading() {
  const { isLoading } = useLoading();

  return (
    <div
      aria-live="polite"
      className={
        cs(
          styles.container,
          isLoading && styles.visible,
          !isLoading && styles.hidden,
        )
      }
    >
      <span className="sr-only">Processing/loading request</span>
      <LoaderCircle className={styles.icon} />
    </div>
  );
};

const styles = tw({
  container: `
    fixed top-0 right-0 bottom-0 z-2000
    flex items-center justify-center
    w-[100svw]
    bg-(--background)/90
    backdrop-blur-md
  `,
  hidden: `
    -left-[100svw]
    opacity-0

    motion-safe:[transition:opacity_.2s_linear_0s,left_0s_linear_.25s]
  `,
  visible: `
    left-0
    opacity-100

    motion-safe:[transition:opacity_.2s_linear_0s,left_0s_linear_0s]
  `,
  icon: `
    animate-spin
    w-6 h-6
    stroke-2
  `,
});
