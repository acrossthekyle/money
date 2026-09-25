import tw, { cs } from '@/styles';
import type { CalendarDay } from '@/types';

type Props = {
  day: CalendarDay;
};

export default function Day({ day }: Props) {
  return (
    <span
      className={
        cs(
          styles.day,
          (day.isBeforeToday || !day.isInMonth) && styles.faded,
          day.isToday && styles.hollow,
          !day.isBeforeToday && day.isInMonth && day.balance < 0 && styles.negative,
        )
      }
    />
  );
};

const styles = tw({
  day: `
    block
    w-1.5 h-1.5
    rounded-full
    bg-(--background)/75

    motion-safe:duration-300

    group-hover:bg-(--foreground)
  `,
  faded: `
    !bg-(--background)/22.5

    motion-safe:duration-300

    group-hover:!bg-(--foreground)/22.5
  `,
  hollow: `
    !bg-transparent
    border
  `,
  negative: `
    !bg-red-500
  `,
})
