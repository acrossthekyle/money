import type { Metric } from '@/types';

import * as Components from './components';

type Props = {
  date: string;
  metrics: Metric[];
};

export default function NetWorth({ date, metrics }: Props) {
  if (metrics.length === 0) {
    return null;
  }

  const current = metrics.reduce((accumulator, metric) => {
    if (metric.holding.type === 'credit_card') {
      return accumulator - Number(metric.months.current.balance.today);
    }

    return accumulator + Number(metric.months.current.balance.today);
  }, 0);

  const next = metrics.reduce((accumulator, metric) => {
    if (metric.holding.type === 'credit_card') {
      return accumulator - Number(metric.months.next.balance.today);
    }

    return accumulator + Number(metric.months.next.balance.today);
  }, 0);

  return (
    <Components.Item>
      <Components.ItemHeading>Net Worth</Components.ItemHeading>
      <Components.ItemContent>
        <Components.ItemContentAmount>{current}</Components.ItemContentAmount>
        <Components.ItemContentDate>{date}</Components.ItemContentDate>
        <Components.ItemContentChange current={current} next={next} />
      </Components.ItemContent>
    </Components.Item>
  );
};
