'use client';

import { format, parseISO } from 'date-fns';

import { DATE_DISPLAY } from '@/constants';
import type { Dateable, Holding } from '@/types';
import { currency } from '@/utils';

import {
  Outline,
  OutlineItem,
  OutlineItemHeading,
  OutlineItemText,
  OutlineItemAction,
} from '../../../components';
import { CATEGORIES, SCHEDULES } from '../../constants';
import type { Data } from '../../types';

type Props = {
  data: Data;
  date?: Dateable;
  holdings: Holding[];
  isEditing: boolean;
  onEdit: (step: string) => void;
  update: string;
};

export default function Block({
  data,
  date,
  holdings,
  isEditing,
  onEdit,
  update,
}: Props) {
  return (
    <Outline>
      <OutlineItem>
        <OutlineItemHeading>Amount</OutlineItemHeading>
        <OutlineItemText>
          {Number(data.amount) < 0 ? '-' : ''}${currency(data.amount)}
        </OutlineItemText>
        <OutlineItemAction onClick={() => onEdit('amount')} />
      </OutlineItem>
      <OutlineItem>
        <OutlineItemHeading>Name</OutlineItemHeading>
        <OutlineItemText>
          {data.name}
        </OutlineItemText>
        <OutlineItemAction onClick={() => onEdit('name')} />
      </OutlineItem>
      <OutlineItem>
        <OutlineItemHeading>Type</OutlineItemHeading>
        <OutlineItemText>
          {data.type === 'debit' && 'Expense'}
          {data.type === 'credit' && 'Income'}
        </OutlineItemText>
        <OutlineItemAction onClick={() => onEdit('type')} />
      </OutlineItem>
      {!!data.transferee && (
        <OutlineItem>
          <OutlineItemHeading>Transfers as</OutlineItemHeading>
          <OutlineItemText>
            {data.type === 'debit' && 'Income to '}
            {data.type === 'credit' && 'Expense from '}
            {holdings.find(item => item.id === data.transferee)?.name}
          </OutlineItemText>
          <OutlineItemAction onClick={() => onEdit('transferee')} />
        </OutlineItem>
      )}
      {!!data.start && (
        <OutlineItem>
          <OutlineItemHeading>Starts On</OutlineItemHeading>
          <OutlineItemText>
            {format(parseISO(String(data.start)), DATE_DISPLAY)}
          </OutlineItemText>
          <OutlineItemAction onClick={() => onEdit('start')} />
        </OutlineItem>
      )}
      <OutlineItem>
        <OutlineItemHeading>Repeats</OutlineItemHeading>
        <OutlineItemText>
          {SCHEDULES.find(item => item.value === data.schedule)?.name}
        </OutlineItemText>
        <OutlineItemAction onClick={() => onEdit('schedule')} />
      </OutlineItem>
      {!!data.end && (
        <OutlineItem>
          <OutlineItemHeading>Ends On</OutlineItemHeading>
          <OutlineItemText>
            {format(parseISO(data.end), DATE_DISPLAY)}
          </OutlineItemText>
          <OutlineItemAction onClick={() => onEdit('end')} />
        </OutlineItem>
      )}
      <OutlineItem>
        <OutlineItemHeading>Categorized As</OutlineItemHeading>
        <OutlineItemText>
          {CATEGORIES.find(item => item.value === data.category)?.name}
        </OutlineItemText>
        <OutlineItemAction onClick={() => onEdit('category')} />
      </OutlineItem>
      {isEditing && date && (
        <OutlineItem>
          <OutlineItemHeading>Changes apply to</OutlineItemHeading>
          <OutlineItemText>
            {update === 'all' && <>All past, present, and future dates</>}
            {update === 'this' && <>Only {format(date?.date, DATE_DISPLAY)}</>}
            {update === 'prospective' && <>From {format(date?.date, DATE_DISPLAY)} onwards</>}
            {update === 'future' && <>After {format(date?.date, DATE_DISPLAY)}</>}
          </OutlineItemText>
          <OutlineItemAction onClick={() => onEdit('update')} />
        </OutlineItem>
      )}
    </Outline>
  );
};
