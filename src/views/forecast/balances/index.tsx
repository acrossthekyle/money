import tw, { cs } from '@/styles';
import type { Budget, CalendarDay, Holding } from '@/types';
import { currency } from '@/utils';

type Filtered = {
  budget?: Budget;
  day: CalendarDay;
  type: string;
};

type Props = {
  days: CalendarDay[];
};

export default function Balances({ days }: Props) {
  const filtered = days.filter(({ dateable }) => dateable.isInMonth && !dateable.isBeforeToday);

  const balances = filtered.map((day: CalendarDay) => day.balance);

  const start = balances[0];
  const lowest = Math.min(...balances);
  const highest = Math.max(...balances);
  const end = balances[balances.length - 1];

  const range = highest - lowest;

  let lowPercent = 0;
  let from = range === 0 ? 0 : ((start - lowest) / range) * 100;
  let to = range === 0 ? 100 : ((end - lowest) / range) * 100;
  let highPercent = 100;

  const minPadding = 8;

  if (from - lowPercent < minPadding) {
    from = lowPercent + minPadding;
  }

  if (highPercent - to < minPadding) {
    to = highPercent - minPadding;
  }

  if (to - from < minPadding) {
    const midpoint = (from + to) / 2;

    from = Math.max(lowPercent + minPadding, midpoint - minPadding / 2);
    to = Math.min(highPercent - minPadding, midpoint + minPadding / 2);
  }

  return (
    <section className={styles.container}>
      <h2>Balance Range</h2>
      <div className={styles.range}>
        <div className={styles.bar} />
        <div
          className={styles.highlight}
          style={{
            left: `${Math.min(from, to)}%`,
            width: `${Math.abs(to - from)}%`
          }}
        />
        <div className={styles.start}>
          <div className={styles.endcap} />
          <span className={styles.value}>
            <span>${currency(lowest, true)}</span>
            <span>Low</span>
          </span>
        </div>
        <div
          className={styles.from}
          style={{
            left: `${from}%`
          }}
        >
          <div className={styles.marker} />
        </div>
        <div
          className={styles.to}
          style={{
            right: `${100 - to}%`,
          }}
        >
          <div className={styles.marker} />
        </div>
        <div className={styles.end}>
          <div className={styles.endcap} />
          <span className={cs(styles.value, styles.right)}>
            <span>${currency(highest, true)}</span>
            <span>High</span>
          </span>
        </div>
      </div>
    </section>
  );
};

const styles = tw({
  container: `
    flex flex-col gap-4
    mt-6
    text-sm
  `,
  range: `
    relative
  `,
  bar: `
    h-1
    bg-(--foreground)
    rounded-full
  `,
  highlight: `
    absolute top-0
    h-1
    bg-(--background)
    border
    rounded-full
  `,
  start: `
    absolute -left-0.25 -top-1.5
    flex flex-col items-start
  `,
  end: `
    absolute -right-0.25 -top-1.5
    flex flex-col items-end
  `,
  marker: `
    size-4
    bg-(--foreground)
    border-2
    rounded-full
  `,
  endcap: `
    size-4
    bg-(--background)
    border-2
    rounded-full
  `,
  value: `
    flex flex-col
    mt-3
    text-xs text-current/62.5
  `,
  right: `
    text-right
  `,
  from: `
    absolute -bottom-1.5
    flex flex-col items-start
  `,
  to: `
    absolute -bottom-1.5
    flex flex-col items-end
  `,
});
