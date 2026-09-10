import type { Metric } from '@/types';

import * as Components from './components';

type Props = {
  date: string;
  metrics: Metric[];
};

export default function Credit({ date, metrics }: Props) {
  const filtered = metrics.filter(metric => metric.holding.type === 'credit_card');

  if (filtered.length === 0) {
    return null;
  }

  const current = filtered.reduce((accumulator, metric) => {
    return accumulator - Number(metric.months.current.balance.today);
  }, 0);

  const next = filtered.reduce((accumulator, metric) => {
    return accumulator - Number(metric.months.next.balance.today);
  }, 0);

  return (
    <Components.Item>
      <Components.ItemHeading>Credit Cards</Components.ItemHeading>
      <Components.ItemContent>
        <Components.ItemContentAmount isNegative>{current}</Components.ItemContentAmount>
        <Components.ItemContentDate>{date}</Components.ItemContentDate>
        <Components.ItemContentChange current={current} next={next} />
      </Components.ItemContent>
    </Components.Item>
  );
};
