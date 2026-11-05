import tw from '@/styles';
import type { CalendarDay } from '@/types';
import Ui from '@/ui'

type Props = {
  days: CalendarDay[];
};

export default function Days({ days }: Props) {
  return (
    <nav aria-label="monthly calendar navigation" className={styles.container}>
      <Ui.Components.Month days={days} />
    </nav>
  );
};

const styles = tw({
  container: `
    flex items-end
    h-full w-full
    pt-12
  `,
});
