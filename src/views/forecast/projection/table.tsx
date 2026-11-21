import { MONTHS } from '@/constants';
import Ui from '@/ui';
import { currency } from '@/utils';

import type { Balances } from './types';
import { summarize } from './utils';

type Props = {
  balances: Balances[];
};

export default function Table({ balances }: Props) {
  const result = summarize(balances);

  const first = balances[0];
  const last = balances[balances.length - 1];

  return (
    <Ui.Components.List.Container>
      <Ui.Components.List.Item>
        <Ui.Components.List.Heading>
          <Ui.Components.List.Title>
            Est. Ending Balance
          </Ui.Components.List.Title>
          <Ui.Components.List.Lid>
            {MONTHS[result.end.month]} {result.end.year}
          </Ui.Components.List.Lid>
        </Ui.Components.List.Heading>
        <Ui.Components.Badge.Container>
          <Ui.Components.Badge.Content isDanger={result.end.value < 0}>
            ${currency(result.end.value, true)}
          </Ui.Components.Badge.Content>
        </Ui.Components.Badge.Container>
      </Ui.Components.List.Item>
      <Ui.Components.List.Item>
        <Ui.Components.List.Heading>
          <Ui.Components.List.Title>
            Avg. Rolling Balance
          </Ui.Components.List.Title>
          <Ui.Components.List.Lid>
            {MONTHS[first.month]} {first.year} - {MONTHS[last.month]} {last.year}
          </Ui.Components.List.Lid>
        </Ui.Components.List.Heading>
        <Ui.Components.Badge.Container>
          <Ui.Components.Badge.Content isDanger={result.average < 0}>
            ${currency(result.average, true)}
          </Ui.Components.Badge.Content>
        </Ui.Components.Badge.Container>
      </Ui.Components.List.Item>
      <Ui.Components.List.Item>
        <Ui.Components.List.Heading>
          <Ui.Components.List.Title>
            Lowest Balance
          </Ui.Components.List.Title>
          <Ui.Components.List.Lid>
            {MONTHS[result.lowest.month]} {result.lowest.year}
          </Ui.Components.List.Lid>
        </Ui.Components.List.Heading>
        <Ui.Components.Badge.Container>
          <Ui.Components.Badge.Content isDanger={result.lowest.value < 0}>
            ${currency(result.lowest.value, true)}
          </Ui.Components.Badge.Content>
        </Ui.Components.Badge.Container>
      </Ui.Components.List.Item>
      <Ui.Components.List.Item>
        <Ui.Components.List.Heading>
          <Ui.Components.List.Title>
            Highest Balance
          </Ui.Components.List.Title>
          <Ui.Components.List.Lid>
            {MONTHS[result.highest.month]} {result.highest.year}
          </Ui.Components.List.Lid>
        </Ui.Components.List.Heading>
        <Ui.Components.Badge.Container>
          <Ui.Components.Badge.Content isDanger={result.highest.value < 0}>
            ${currency(result.highest.value, true)}
          </Ui.Components.Badge.Content>
        </Ui.Components.Badge.Container>
      </Ui.Components.List.Item>
    </Ui.Components.List.Container>
  );
};
