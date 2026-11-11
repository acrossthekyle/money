import { differenceInDays, parseISO } from 'date-fns';
import { Flag } from 'lucide-react';

import tw from '@/styles';
import { date } from '@/utils';

type Props = {
  updated?: string | null;
  zone: string;
};

export default function Updated({ updated, zone }: Props) {
  const days = updated
    ? differenceInDays(date(zone), parseISO(updated))
    : null;

  const isUrgent = days === null || (days !== null && days > 4);

  if (!isUrgent) {
    return null;
  }

  return (
    <div
      aria-atomic="true"
      className={styles.container}
      role="alert"
    >
      <h3 className={styles.header}>
        <Flag className={styles.icon} />
        Attention required
      </h3>
      <p className={styles.text}>
        This was last updated {days === null ? 'too long' : `${days} days`} ago. Update the balance now in order to ensure accurate forecasting.
      </p>
    </div>
  );
};

const styles = tw({
  container: `
    flex flex-col gap-3
    mt-4
    bg-amber-800 dark:bg-amber-950
    text-white
    border border-amber-900
    rounded-lg
    p-3

    sm:text-sm
  `,
  header: `
    flex items-center gap-3
  `,
  icon: `
    shrink-0
    size-3
    stroke-2
  `,
  text: `
    pl-6
    text-current/82.5 dark:text-current/62.5
  `,
})
