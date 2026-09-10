import { ChevronDown } from 'lucide-react';

import tw from '@/styles';

type Props = {
  className?: string;
  name: string;
  defaultValue: string;
  display: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export default function Select({
  children,
  className,
  name,
  defaultValue,
  display,
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
      <span className={styles.cta}>
        <span>{display}</span>
        <ChevronDown className={styles.icon} />
      </span>
    </div>
  );
};

const styles = tw({
  container: `
    group
    relative
  `,
  select: `
    absolute inset-0 z-2
    opacity-0
    cursor-pointer
    text-base
  `,
  cta: `
    relative z-1
    flex items-center justify-between gap-2
    px-3 py-2 pr-2
    border border-current/22.5
    bg-(--background)
    rounded-full
    text-tiny
    font-medium dark:font-normal
    uppercase

    motion-safe:duration-300
    motion-safe:group-hover:border-current/62.5

    md:py-1
  `,
  icon: `
    w-3.5 h-3.5
    stroke-2
  `,
});
