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
        <OutlineItemAction onClick={() => onEdit('amount')}>
          <OutlineItemHeading>Amount</OutlineItemHeading>
          <OutlineItemText>
            {data.type === 'debit' ? '-' : ''}${currency(data.amount)}
          </OutlineItemText>
        </OutlineItemAction>
      </OutlineItem>
      <OutlineItem>
        <OutlineItemAction onClick={() => onEdit('name')}>
          <OutlineItemHeading>Name</OutlineItemHeading>
          <OutlineItemText>
            {data.name}
          </OutlineItemText>
        </OutlineItemAction>
      </OutlineItem>
      {!!data.transferee && (
        <OutlineItem>
          <OutlineItemAction onClick={() => onEdit('transferee')}>
            <OutlineItemHeading>Transfers as</OutlineItemHeading>
            <OutlineItemText>
              {data.type === 'debit' && 'Income to '}
              {data.type === 'credit' && 'Expense from '}
              {holdings.find(item => item.id === data.transferee)?.name}
            </OutlineItemText>
          </OutlineItemAction>
        </OutlineItem>
      )}
      {!!data.start && (
        <OutlineItem>
          <OutlineItemAction onClick={() => onEdit('start')}>
            <OutlineItemHeading>Starts On</OutlineItemHeading>
            <OutlineItemText>
              {format(parseISO(String(data.start)), DATE_DISPLAY)}
            </OutlineItemText>
          </OutlineItemAction>
        </OutlineItem>
      )}
      <OutlineItem>
        <OutlineItemAction onClick={() => onEdit('schedule')}>
          <OutlineItemHeading>Repeats</OutlineItemHeading>
          <OutlineItemText>
            {SCHEDULES.find(item => item.value === data.schedule)?.name}
          </OutlineItemText>
        </OutlineItemAction>
      </OutlineItem>
      {!!data.end && (
        <OutlineItem>
          <OutlineItemAction onClick={() => onEdit('end')}>
            <OutlineItemHeading>Ends On</OutlineItemHeading>
            <OutlineItemText>
              {format(parseISO(data.end), DATE_DISPLAY)}
            </OutlineItemText>
          </OutlineItemAction>
        </OutlineItem>
      )}
      <OutlineItem>
        <OutlineItemAction onClick={() => onEdit('category')}>
          <OutlineItemHeading>Categorized As</OutlineItemHeading>
          <OutlineItemText>
            {CATEGORIES.find(item => item.value === data.category)?.name}
          </OutlineItemText>
        </OutlineItemAction>
      </OutlineItem>
      {isEditing && date && (
        <OutlineItem>
          <OutlineItemAction onClick={() => onEdit('update')}>
            <OutlineItemHeading>Changes apply to</OutlineItemHeading>
            <OutlineItemText>
              {update === 'all' && <>All past, present, and future dates</>}
              {update === 'this' && <>Only {format(date?.date, DATE_DISPLAY)}</>}
              {update === 'prospective' && <>From {format(date?.date, DATE_DISPLAY)} onwards</>}
              {update === 'future' && <>After {format(date?.date, DATE_DISPLAY)}</>}
            </OutlineItemText>
          </OutlineItemAction>
        </OutlineItem>
      )}
    </Outline>
  );
};
