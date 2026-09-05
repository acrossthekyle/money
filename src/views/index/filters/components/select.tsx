import { ChevronDown } from 'lucide-react';

import tw from '@/styles';

type Props = {
  className?: string;
  name: string;
  value: string;
  defaultValue: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export default function Select({
  children,
  className,
  name,
  value,
  defaultValue,
  onChange,
}: React.PropsWithChildren<Props>) {
  return (
    <>
      <select
        className={styles.select}
        name={name}
        defaultValue={defaultValue}
        onChange={onChange}
      >
        {children}
      </select>
      <span className={`${styles.cta} ${className || ''}`.trim()}>
        <span>{value}</span>
        <ChevronDown className={styles.icon} />
      </span>
    </>
  );
};

const styles = tw({
  select: `
    absolute inset-0 z-2
    opacity-0
    cursor-pointer
  `,
  cta: `
    relative z-1
    flex items-center justify-between gap-2
    px-3 py-1 pr-2
    border border-current/22.5
    bg-(--background)
    rounded-full
    text-tiny
    font-medium dark:font-normal
    uppercase

    motion-safe:duration-300
    motion-safe:group-hover:border-current/62.5
  `,
  icon: `
    w-3.5 h-3.5
    stroke-2
  `,
});
