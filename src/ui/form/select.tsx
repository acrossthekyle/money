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
    peer
    appearance-none
    border border-current/22.5
    rounded-md
    py-2.25 pt-2.75 pl-3.25 pr-8
    truncate
  `,
  icon: `
    absolute top-4 right-2
    w-4.5 h-4.5
    stroke-2 stroke-current/50
    pointer-events-none
  `,
});
