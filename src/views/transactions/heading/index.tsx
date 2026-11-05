import { MONTHS_FULL } from '@/constants';
import tw from '@/styles';
import type { CalendarDay } from '@/types'

type Props = {
  day: CalendarDay;
};

export default function Heading({ day }: Props) {
  return (
    <h1 className={styles.container}>
      <span className={styles.eyebrow}>
        {day.dateable.day}
      </span>
      <span className={styles.title}>
        {MONTHS_FULL[Number(day.dateable.month) - 1]}
      </span>
      <span className={styles.lid}>
        {day.dateable.year}
      </span>
    </h1>
  );
};

const styles = tw({
  container: `
    flex flex-col items-end
  `,
  eyebrow: `
    text-8xl
    font-semibold
    leading-[0.9]
  `,
  title: `
    font-bold
    text-5xl
    leading-[1.25]
  `,
  lid: `
    font-bold
    text-2xl
  `,
})
