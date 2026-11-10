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
      <Flag className={styles.icon} />
      <div>
        <h3>
          Attention required
        </h3>
        <p className={styles.text}>
          This was last updated {days === null ? 'too long' : `${days} days`} ago. Please update the balance now in order to ensure accurate forecasting.
        </p>
      </div>
    </div>
  );
};

const styles = tw({
  container: `
    flex gap-3 items-start
    mt-4
    bg-amber-950
    border border-amber-900
    rounded-lg
    p-3

    sm:text-sm
  `,
  icon: `
    shrink-0
    mt-1
    size-3
    stroke-2
  `,
  text: `
    text-current/62.5
  `,
})
