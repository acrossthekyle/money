'use client';

import type { Holding, Metric } from '@/types';
import { formatNumber } from '@/utils';

import {
  Item,
  ItemContent,
  ItemContentHeader,
  ItemContentFootnote,
  ItemContentBalance,
  ItemContentBudgets,
  ItemContentExchanges,
  ItemContentExchangesItem,
  ItemContentExchangesItemHeading,
  ItemContentExchangesItemAmount,
  ItemAction,
  ItemActionIcon,
  ItemFaded,
  ItemFooter,
} from './components';

type Props = {
  data?: Metric;
  item: Holding;
  onBudget: (holding: Holding) => void;
  onEdit: (holding: Holding) => void;
};

export default function Holding({ data, item, onBudget, onEdit }: Props) {
  const isNegative = item.type === 'credit_card'
    ? Number(item.balance) > 0 ? true : false
    : Number(item.balance) < 0;

  return (
    <Item>
      <ItemContent>
        <ItemContentHeader>
          {item.name}
        </ItemContentHeader>
        <ItemContentFootnote>
          {item.type.replace('_', ' ')} {item.number && '...'} {item.number}
        </ItemContentFootnote>
        <ItemContentBalance isNegative={isNegative}>
          ${formatNumber(Number(item.balance))}
        </ItemContentBalance>
        <ItemContentFootnote>
          Current Balance
        </ItemContentFootnote>
        <ItemContentBudgets>
          {data?.next ? (
            <span>
              Next Budget:
              <ItemFaded>{' '}{data.next.name}</ItemFaded>
            </span>
          ) : (
            <span>0 Budgets</span>
          )}
        </ItemContentBudgets>
        <ItemAction isAbsolute onClick={() => onEdit(item)}>
          Edit <ItemActionIcon name="pen" />
        </ItemAction>
        <ItemContentExchanges>
          <ItemContentExchangesItem>
            <ItemContentExchangesItemHeading isPositive>
              Income <ItemFaded>this month</ItemFaded>
            </ItemContentExchangesItemHeading>
            <ItemContentExchangesItemAmount>
              {data?.income ? formatNumber(Number(data.income)) : '0.00'}
            </ItemContentExchangesItemAmount>
          </ItemContentExchangesItem>
          <ItemContentExchangesItem>
            <ItemContentExchangesItemHeading isNegative>
              Expenses <ItemFaded>this month</ItemFaded>
            </ItemContentExchangesItemHeading>
            <ItemContentExchangesItemAmount>
              {data?.expenses ? formatNumber(Number(data.expenses)) : '0.00'}
            </ItemContentExchangesItemAmount>
          </ItemContentExchangesItem>
        </ItemContentExchanges>
      </ItemContent>
      <ItemFooter>
        <ItemAction onClick={() => onBudget(item)}>
          Add Budget
          <ItemActionIcon name="plus" />
        </ItemAction>
        <ItemAction uri={`/calendar?view=${item.id}`}>
          View Budgets
          <ItemActionIcon name="right" />
        </ItemAction>
      </ItemFooter>
    </Item>
  );
};
