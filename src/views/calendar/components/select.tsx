import { ChevronDown } from 'lucide-react';

import tw from '@/styles';

type Props = {
  className?: string;
  name: string;
  defaultValue: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export default function Select({
  children,
  className,
  name,
  defaultValue,
  onChange,
}: React.PropsWithChildren<Props>) {
  return (
    <div className={`${styles.container} ${className || ''}`.trim()}>
      <select
        className={styles.select}
        name={name}
        value={defaultValue}
        onChange={onChange}
      >
        {children}
      </select>
      <ChevronDown className={styles.icon} />
    </div>
  );
};

const styles = tw({
  container: `
    relative
  `,
  select: `
    appearance-none
    w-full
    px-3 py-1.5 pr-2
    bg-(--background)
    border border-current/17.5
    rounded-full
    text-base

    motion-safe:duration-300

    hover:border-current/62.5

    md:py-1
    md:text-sm
  `,
  icon: `
    absolute top-1/2 right-3
    -translate-y-1/2
    w-4 h-4
    stroke-2
    pointer-events-none
  `,
});
