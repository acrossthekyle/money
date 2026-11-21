import type { Dateable } from '@/types';
import Ui from '@/ui';
import { currency } from '@/utils';

type Balance = {
  date: Dateable;
  balance: number;
};

type Props = {
  start: Balance;
  lowest: Balance;
  highest: Balance;
  end: Balance;
};

export default function Table({ start, lowest, highest, end }: Props) {
  return (
    <Ui.Components.List.Container>
      <Ui.Components.List.Item>
        <Ui.Components.List.Heading>
          <Ui.Components.List.Title>
            Starting Balance
          </Ui.Components.List.Title>
          <Ui.Components.List.Lid>
            {start.date.display}
          </Ui.Components.List.Lid>
        </Ui.Components.List.Heading>
        <Ui.Components.Badge.Container>
          <Ui.Components.Badge.Content isDanger={start.balance < 0}>
            ${currency(start.balance, true)}
          </Ui.Components.Badge.Content>
        </Ui.Components.Badge.Container>
      </Ui.Components.List.Item>
      <Ui.Components.List.Item>
        <Ui.Components.List.Heading>
          <Ui.Components.List.Title>
            Lowest
          </Ui.Components.List.Title>
          <Ui.Components.List.Lid>
            {lowest.date.display}
          </Ui.Components.List.Lid>
        </Ui.Components.List.Heading>
        <Ui.Components.Badge.Container>
          <Ui.Components.Badge.Content isDanger={lowest.balance < 0}>
            ${currency(lowest.balance, true)}
          </Ui.Components.Badge.Content>
        </Ui.Components.Badge.Container>
      </Ui.Components.List.Item>
      <Ui.Components.List.Item>
        <Ui.Components.List.Heading>
          <Ui.Components.List.Title>
            Highest
          </Ui.Components.List.Title>
          <Ui.Components.List.Lid>
            {highest.date.display}
          </Ui.Components.List.Lid>
        </Ui.Components.List.Heading>
        <Ui.Components.Badge.Container>
          <Ui.Components.Badge.Content isDanger={highest.balance < 0}>
            ${currency(highest.balance, true)}
          </Ui.Components.Badge.Content>
        </Ui.Components.Badge.Container>
      </Ui.Components.List.Item>
      <Ui.Components.List.Item>
        <Ui.Components.List.Heading>
          <Ui.Components.List.Title>
            Ending Balance
          </Ui.Components.List.Title>
          <Ui.Components.List.Lid>
            {end.date.display}
          </Ui.Components.List.Lid>
        </Ui.Components.List.Heading>
        <Ui.Components.Badge.Container>
          <Ui.Components.Badge.Content isDanger={end.balance < 0}>
            ${currency(end.balance, true)}
          </Ui.Components.Badge.Content>
        </Ui.Components.Badge.Container>
      </Ui.Components.List.Item>
    </Ui.Components.List.Container>
  );
};
