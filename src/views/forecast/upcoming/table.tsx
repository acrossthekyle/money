'use client';

import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';

import tw, { cs } from '@/styles';
import type { Dateable } from '@/types';
import Ui from '@/ui';
import { currency } from '@/utils';

import type { Filtered } from './types';

type Props = {
  items: Filtered[];
  onClick: (id: string, dateable: Dateable) => void;
};

export default function Table({ items, onClick }: Props) {
  return (
    <Ui.Components.List.Container>
      {items.map((item, index) => (
        <Ui.Components.List.Item key={index}>
          <Ui.Components.Card.Content
            isInline
            onClick={!!item.id ? () => onClick(item.id, item.dateable) : undefined}
          >
            <Ui.Components.List.Heading>
              <Ui.Components.List.Title>
                {item.name}
              </Ui.Components.List.Title>
              <Ui.Components.List.Lid>
                {item.dateable.display} • {item.category}
              </Ui.Components.List.Lid>
            </Ui.Components.List.Heading>
            <Ui.Components.Badge.Container>
              <Ui.Components.Badge.Content>
                ${currency(item.amount, true)}
              </Ui.Components.Badge.Content>
              {item.isNegative ? (
                <ArrowUpRight className={cs(styles.arrow, styles.negative)} />
              ) : (
                <ArrowDownLeft className={cs(styles.arrow, styles.positive)} />
              )}
            </Ui.Components.Badge.Container>
          </Ui.Components.Card.Content >
        </Ui.Components.List.Item>
      ))}
    </Ui.Components.List.Container>
  );
};

const styles = tw({
  arrow: `
    size-4.5
    stroke-1

    sm:size-4
  `,
  negative: `
    text-red-400

    dark:text-rose-400
  `,
  positive: `
    text-green-700

    dark:text-lime-500
  `,
});
