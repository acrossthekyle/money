import { ChevronDown } from 'lucide-react';

import tw from '@/styles';

type Props = React.SelectHTMLAttributes<HTMLSelectElement>;

export default function Select({ children, ...props }: React.PropsWithChildren<Props>) {
  return (
    <>
      <select
        className={styles.container}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className={styles.icon} />
    </>
  );
};

const styles = tw({
  container: `
    appearance-none
    border border-current/20.5
    rounded-md
    p-2 pr-8
    truncate
    text-sm
  `,
  icon: `
    absolute top-8.25 right-2
    w-4.5 h-4.5
    stroke-2
    pointer-events-none
  `,
});
