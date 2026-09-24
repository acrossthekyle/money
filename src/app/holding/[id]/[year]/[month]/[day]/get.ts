import { get as getCalendar } from '@/getters/calendar';
import { get as getHoldings } from '@/getters/holdings';
import { pad } from '@/utils';

export async function get(
  id: string,
  year: string,
  month: string,
  day: string,
) {
  const { holdings } = await getHoldings();
  const { calendar } = await getCalendar();

  const key = `${year}-${pad(Number(month) - 1)}`;

  const current = calendar
    .find(year => year.months.find(month => `${pad(month.year)}-${pad(month.month)}` === key))
    ?.months
    ?.find(month => `${pad(month.year)}-${pad(month.month)}` === key);

  const holding = holdings.find(holding => holding.id === id);

  return {
    calendar: current,
    date: `${year}-${month}-${day}`,
    holding,
  };
};
