import { LoaderCircle } from 'lucide-react';

import tw from '@/styles';

type Props = {
  value: string;
};

export default function Message({ value }: Props) {
  return (
    <>
      <div className={styles.backdrop(!!value)} role="presentation" />
      <p aria-live="polite" className={styles.container(!!value)}>
        <LoaderCircle className={styles.icon} />
        <span>{value}...</span>
      </p>
    </>
  );
};

const styles = tw({
  container: (canRender: boolean) => tw(`
    absolute bottom-4 z-100
    flex items-center gap-2
    text-tiny
    font-bold
    tracking-wide
    uppercase
    border border-green-300/22.5
    bg-green-900
    rounded-md
    p-2.5

    motion-safe:duration-300

    ${canRender
      ? `left-4 opacity-100 scale-100`
      : `-left-40 opacity-0 scale-90`
    }
  `),
  icon: `
    animate-spin
    w-3 h-3
  `,
  backdrop: (canRender: boolean) => tw(`
    absolute top-0 left-0 right-0
    h-svh
    bg-(--background)/32
    backdrop-blur-xs

    motion-safe:duration-300

    ${canRender ? 'opacity-100 z-40' : 'opacity-0 -z-1'}
  `),
});
