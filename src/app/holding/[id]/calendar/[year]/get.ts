import { get as getCalendar } from '@/getters/calendar';
import { get as getHoldings } from '@/getters/holdings';

export async function get(id: string, year: string) {
  const { holdings } = await getHoldings();
  const { calendar } = await getCalendar();

  const holding = holdings.find(holding => holding.id === id);

  return {
    calendar,
    holding,
    year,
  };
};
