import tw from '@/styles';
import type { CalendarYear, Holding } from '@/types';
import Ui from '@/ui';
import { getHoldingMetaDataAsString } from '@/utils/holding';

import Month from './month';
import Navigation from './navigation';

type Props = {
  data: {
    calendar: CalendarYear[];
    holding?: Holding;
    year: string;
  };
};

export default function View({ data }: Props) {
  if (!data.holding) {
    return null;
  }

  const index = data.calendar.findIndex(year => year.year === Number(data.year));

  return (
    <>
      <Ui.Components.Divider />
      <Ui.Components.Header
        lid={getHoldingMetaDataAsString(data.holding)}
        title="10-Year Calendar"
      />
      <Navigation
        calendar={data.calendar}
        id={data.holding?.id || ''}
        index={index}
      />
      <ul className={styles.items}>
        {data.calendar[index].months.map((month) => (
          <li key={`${month.month}-${month.year}`}>
            <Month
              id={data.holding?.id || ''}
              month={month}
              year={data.year}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

const styles = tw({
  items: `
    grid grid-cols-4 gap-4
    mt-4
    pb-4
    text-center
  `,
})
