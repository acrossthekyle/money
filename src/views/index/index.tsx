import type { Calendar, Holding } from '@/types';

import Calendar from './calendar';
import Filters from './filters';

type Props = {
  data: {
    holdings: Holding[];
    days: Array<Calendar[]>;
    view: string;
  };
};

export default function View({ data }: Props) {
  return (
    <>
      <Filters
        holdings={data.holdings}
        view={data.view}
      />
      <Calendar
        days={data.days}
        holdings={data.holdings}
        parent={data.view}
      />
    </>
  );
};
