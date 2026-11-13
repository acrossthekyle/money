'use client';

import { format, parseISO } from 'date-fns';

import { DATE_DISPLAY } from '@/constants';
import type { Budget, Holding } from '@/types';
import Ui from '@/ui';
import { currency } from '@/utils';

import { CATEGORIES, SCHEDULES } from '../../constants';
import type { Data } from '../../types';

type Props = {
  budget?: Budget;
  data: Data;
  holdings: Holding[];
  isActive: boolean;
  onContinue: () => void;
  onEdit: (section: string) => void;
};

export default function Section({
  budget,
  children,
  data,
  holdings,
  isActive,
  onContinue,
  onEdit,
}: React.PropsWithChildren<Props>) {
  if (!isActive) {
    return null;
  }

  return (
    <>
      <Ui.Drawer.Body>
        <Ui.Form.Outline>
          <Ui.Form.OutlineItem>
            <Ui.Form.OutlineItemHeading>Amount</Ui.Form.OutlineItemHeading>
            <Ui.Form.OutlineItemText>
              {data.type === 'debit' ? '-' : ''}${currency(data.amount)}
            </Ui.Form.OutlineItemText>
            <Ui.Form.OutlineAction onClick={() => onEdit('amount')}>
              Update
            </Ui.Form.OutlineAction>
          </Ui.Form.OutlineItem>
          <Ui.Form.OutlineItem>
            <Ui.Form.OutlineItemHeading>Name</Ui.Form.OutlineItemHeading>
            <Ui.Form.OutlineItemText>
              {data.name}
            </Ui.Form.OutlineItemText>
            <Ui.Form.OutlineAction onClick={() => onEdit('name')}>
              Update
            </Ui.Form.OutlineAction>
          </Ui.Form.OutlineItem>
          <Ui.Form.OutlineItem>
            <Ui.Form.OutlineItemHeading>Transfer</Ui.Form.OutlineItemHeading>
            <Ui.Form.OutlineItemText>
              {data.transferee ? (
                <>
                  {data.type === 'debit' && 'As income to '}
                  {data.type === 'credit' && 'As expense from '}
                  {holdings.find(item => item.id === data.transferee)?.name}
                </>
              ) : (
                <>--</>
              )}
            </Ui.Form.OutlineItemText>
            <Ui.Form.OutlineAction onClick={() => onEdit('type')}>
              Update
            </Ui.Form.OutlineAction>
          </Ui.Form.OutlineItem>
          <Ui.Form.OutlineItem>
            <Ui.Form.OutlineItemHeading>Starts on</Ui.Form.OutlineItemHeading>
            <Ui.Form.OutlineItemText>
              {!!data.start ? format(parseISO(String(data.start)), DATE_DISPLAY) : '--'}
            </Ui.Form.OutlineItemText>
            <Ui.Form.OutlineAction onClick={() => onEdit('start')}>
              Update
            </Ui.Form.OutlineAction>
          </Ui.Form.OutlineItem>
          <Ui.Form.OutlineItem>
            <Ui.Form.OutlineItemHeading>Repeats</Ui.Form.OutlineItemHeading>
            <Ui.Form.OutlineItemText>
              {SCHEDULES.find(item => item.value === data.schedule)?.name}
            </Ui.Form.OutlineItemText>
            <Ui.Form.OutlineAction onClick={() => onEdit('schedule')}>
              Update
            </Ui.Form.OutlineAction>
          </Ui.Form.OutlineItem>
          <Ui.Form.OutlineItem>
            <Ui.Form.OutlineItemHeading>Ends on</Ui.Form.OutlineItemHeading>
            <Ui.Form.OutlineItemText>
              {!!data.end ? format(parseISO(data.end), DATE_DISPLAY) : '--'}
            </Ui.Form.OutlineItemText>
            <Ui.Form.OutlineAction onClick={() => onEdit('end')}>
              Update
            </Ui.Form.OutlineAction>
          </Ui.Form.OutlineItem>
          <Ui.Form.OutlineItem>
            <Ui.Form.OutlineItemHeading>Categorized as</Ui.Form.OutlineItemHeading>
            <Ui.Form.OutlineItemText>
              {CATEGORIES.find(item => item.value === data.category)?.name}
            </Ui.Form.OutlineItemText>
            <Ui.Form.OutlineAction onClick={() => onEdit('category')}>
              Update
            </Ui.Form.OutlineAction>
          </Ui.Form.OutlineItem>
        </Ui.Form.Outline>
      </Ui.Drawer.Body>
      <Ui.Drawer.Footer>
        <Ui.Components.Button
          isPrimary
          onClick={onContinue}
        >
          {budget?.schedule === 'once' ? 'Update' : 'Proceed'}
        </Ui.Components.Button>
        {children}
      </Ui.Drawer.Footer>
    </>
  );
};
