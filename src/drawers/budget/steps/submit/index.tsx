'use client';

import { format, parseISO } from 'date-fns';

import { DATE_DISPLAY } from '@/constants';
import type { Dateable, Holding } from '@/types';
import Ui from '@/ui';
import { currency } from '@/utils';

import { CATEGORIES, SCHEDULES } from '../../constants';
import type { Data } from '../../types';

type Props = {
  data: Data;
  date?: Dateable;
  holdings: Holding[];
  isActive: boolean;
  isEditing: boolean;
  onSubmit: () => void;
  update: string;
};

export default function Section({
  children,
  data,
  date,
  holdings,
  isActive,
  isEditing,
  onSubmit,
  update,
}: React.PropsWithChildren<Props>) {
  return (
    <Ui.Form.Container isActive={isActive}>
      <Ui.Form.Header>Review</Ui.Form.Header>
      <Ui.Form.Paragraph>
        Make sure everything is correct before submitting. Once you click {isEditing ? '"update"' : '"add"'} it's finalized and can't be changed.
      </Ui.Form.Paragraph>
      <Ui.Form.Outline>
        <Ui.Form.OutlineItem>
          <Ui.Form.OutlineItemHeading>Amount</Ui.Form.OutlineItemHeading>
          <Ui.Form.OutlineItemText>
            {data.type === 'debit' ? '-' : ''}${currency(data.amount)}
          </Ui.Form.OutlineItemText>
        </Ui.Form.OutlineItem>
        <Ui.Form.OutlineItem>
          <Ui.Form.OutlineItemHeading>Name</Ui.Form.OutlineItemHeading>
          <Ui.Form.OutlineItemText>
            {data.name}
          </Ui.Form.OutlineItemText>
        </Ui.Form.OutlineItem>
        {!!data.transferee && (
          <Ui.Form.OutlineItem>
            <Ui.Form.OutlineItemHeading>Transfers as</Ui.Form.OutlineItemHeading>
            <Ui.Form.OutlineItemText>
              {data.type === 'debit' && 'Income to '}
              {data.type === 'credit' && 'Expense from '}
              {holdings.find(item => item.id === data.transferee)?.name}
            </Ui.Form.OutlineItemText>
          </Ui.Form.OutlineItem>
        )}
        {!!data.start && (
          <Ui.Form.OutlineItem>
            <Ui.Form.OutlineItemHeading>Starts on</Ui.Form.OutlineItemHeading>
            <Ui.Form.OutlineItemText>
              {format(parseISO(String(data.start)), DATE_DISPLAY)}
            </Ui.Form.OutlineItemText>
          </Ui.Form.OutlineItem>
        )}
        <Ui.Form.OutlineItem>
          <Ui.Form.OutlineItemHeading>Repeats</Ui.Form.OutlineItemHeading>
          <Ui.Form.OutlineItemText>
            {SCHEDULES.find(item => item.value === data.schedule)?.name}
          </Ui.Form.OutlineItemText>
        </Ui.Form.OutlineItem>
        {!!data.end && (
          <Ui.Form.OutlineItem>
            <Ui.Form.OutlineItemHeading>Ends on</Ui.Form.OutlineItemHeading>
            <Ui.Form.OutlineItemText>
              {format(parseISO(data.end), DATE_DISPLAY)}
            </Ui.Form.OutlineItemText>
          </Ui.Form.OutlineItem>
        )}
        <Ui.Form.OutlineItem>
          <Ui.Form.OutlineItemHeading>Categorized as</Ui.Form.OutlineItemHeading>
          <Ui.Form.OutlineItemText>
            {CATEGORIES.find(item => item.value === data.category)?.name}
          </Ui.Form.OutlineItemText>
        </Ui.Form.OutlineItem>
        {isEditing && date && (
          <Ui.Form.OutlineItem>
            <Ui.Form.OutlineItemHeading>Changes apply to</Ui.Form.OutlineItemHeading>
            <Ui.Form.OutlineItemText>
              {update === 'all' && <>All past, present, and future dates</>}
              {update === 'this' && <>Only {format(date?.date, DATE_DISPLAY)}</>}
              {update === 'prospective' && <>From {format(date?.date, DATE_DISPLAY)} onwards</>}
              {update === 'future' && <>After {format(date?.date, DATE_DISPLAY)}</>}
            </Ui.Form.OutlineItemText>
          </Ui.Form.OutlineItem>
        )}
      </Ui.Form.Outline>
      <Ui.Form.Actions>
        <Ui.Components.Button
          isPrimary
          onClick={onSubmit}
        >
          {isEditing ? 'Update' : 'Add'}
        </Ui.Components.Button>
        {children}
      </Ui.Form.Actions>
    </Ui.Form.Container>
  );
};
