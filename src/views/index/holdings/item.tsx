'use client';

import type { Holding, MetricPeriod } from '@/types';
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
  current?: MetricPeriod;
  holding: Holding;
  onBudget: (holding: Holding) => void;
  onEdit: (holding: Holding) => void;
};

export default function Holding({ current, holding, onBudget, onEdit }: Props) {
  const isNegative = holding.type === 'credit_card'
    ? Number(holding.balance) > 0 ? true : false
    : Number(holding.balance) < 0;

  return (
    <Item>
      <ItemContent>
        <ItemContentHeader>
          {holding.name}
        </ItemContentHeader>
        <ItemContentFootnote>
          {holding.type.replace('_', ' ')} {holding.number && '...'} {holding.number}
        </ItemContentFootnote>
        <ItemContentBalance isNegative={isNegative}>
          ${formatNumber(Number(holding.balance))}
        </ItemContentBalance>
        <ItemContentFootnote>
          Current Balance
        </ItemContentFootnote>
        <ItemContentBudgets>
          {current?.budgets.next ? (
            <span>
              Next Budget:
              <ItemFaded>{' '}{current.budgets.next.name}</ItemFaded>
            </span>
          ) : (
            <span>0 Budgets</span>
          )}
        </ItemContentBudgets>
        <ItemAction isAbsolute onClick={() => onEdit(holding)}>
          Edit <ItemActionIcon name="pen" />
        </ItemAction>
        <ItemContentExchanges>
          <ItemContentExchangesItem>
            <ItemContentExchangesItemHeading isPositive>
              Income <ItemFaded>this month</ItemFaded>
            </ItemContentExchangesItemHeading>
            <ItemContentExchangesItemAmount>
              {current?.income ? formatNumber(Number(current.income)) : '0.00'}
            </ItemContentExchangesItemAmount>
          </ItemContentExchangesItem>
          <ItemContentExchangesItem>
            <ItemContentExchangesItemHeading isNegative>
              Expenses <ItemFaded>this month</ItemFaded>
            </ItemContentExchangesItemHeading>
            <ItemContentExchangesItemAmount>
              {current?.expenses ? formatNumber(Number(current.expenses)) : '0.00'}
            </ItemContentExchangesItemAmount>
          </ItemContentExchangesItem>
        </ItemContentExchanges>
      </ItemContent>
      <ItemFooter>
        <ItemAction onClick={() => onBudget(holding)}>
          Add Budget
          <ItemActionIcon name="plus" />
        </ItemAction>
        <ItemAction uri={`/calendar?view=${holding.id}`}>
          View calendar
          <ItemActionIcon name="right" />
        </ItemAction>
      </ItemFooter>
    </Item>
  );
};
