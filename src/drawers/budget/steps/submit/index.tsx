'use client';

import { format, parseISO } from 'date-fns';

import { DATE_DISPLAY } from '@/constants';
import type { Holding } from '@/types';
import Ui from '@/ui';
import { currency } from '@/utils';

import { CATEGORIES, SCHEDULES } from '../../constants';
import type { Data } from '../../types';

type Props = {
  data: Data;
  holdings: Holding[];
  isActive: boolean;
  onEdit: (section: string) => void;
  onSubmit: () => void;
};

export default function Section({
  children,
  data,
  holdings,
  isActive,
  onEdit,
  onSubmit,
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
              Edit
            </Ui.Form.OutlineAction>
          </Ui.Form.OutlineItem>
          <Ui.Form.OutlineItem>
            <Ui.Form.OutlineItemHeading>Name</Ui.Form.OutlineItemHeading>
            <Ui.Form.OutlineItemText>
              {data.name}
            </Ui.Form.OutlineItemText>
            <Ui.Form.OutlineAction onClick={() => onEdit('name')}>
              Edit
            </Ui.Form.OutlineAction>
          </Ui.Form.OutlineItem>
          <Ui.Form.OutlineItem>
            <Ui.Form.OutlineItemHeading>Transfer</Ui.Form.OutlineItemHeading>
            <Ui.Form.OutlineItemText>
              {!!data.transferee ? (
                <>
                  {data.type === 'debit' && 'As income to '}
                  {data.type === 'credit' && 'As expense from '}
                  {holdings.find(item => item.id === data.transferee)?.name}
                </>
              ) : (
                <>--</>
              )}
            </Ui.Form.OutlineItemText>
            <Ui.Form.OutlineAction onClick={() => onEdit('transferee')}>
              Edit
            </Ui.Form.OutlineAction>
          </Ui.Form.OutlineItem>
          <Ui.Form.OutlineItem>
            <Ui.Form.OutlineItemHeading>Starts on</Ui.Form.OutlineItemHeading>
            <Ui.Form.OutlineItemText>
              {format(parseISO(String(data.start)), DATE_DISPLAY)}
            </Ui.Form.OutlineItemText>
            <Ui.Form.OutlineAction onClick={() => onEdit('start')}>
              Edit
            </Ui.Form.OutlineAction>
          </Ui.Form.OutlineItem>
          <Ui.Form.OutlineItem>
            <Ui.Form.OutlineItemHeading>Repeats</Ui.Form.OutlineItemHeading>
            <Ui.Form.OutlineItemText>
              {SCHEDULES.find(item => item.value === data.schedule)?.name}
            </Ui.Form.OutlineItemText>
            <Ui.Form.OutlineAction onClick={() => onEdit('schedule')}>
              Edit
            </Ui.Form.OutlineAction>
          </Ui.Form.OutlineItem>
          <Ui.Form.OutlineItem>
            <Ui.Form.OutlineItemHeading>Ends on</Ui.Form.OutlineItemHeading>
            <Ui.Form.OutlineItemText>
              {!!data.end ? format(parseISO(data.end), DATE_DISPLAY) : '--'}
            </Ui.Form.OutlineItemText>
            <Ui.Form.OutlineAction onClick={() => onEdit('end')}>
              Edit
            </Ui.Form.OutlineAction>
          </Ui.Form.OutlineItem>
          <Ui.Form.OutlineItem>
            <Ui.Form.OutlineItemHeading>Categorized as</Ui.Form.OutlineItemHeading>
            <Ui.Form.OutlineItemText>
              {CATEGORIES.find(item => item.value === data.category)?.name}
            </Ui.Form.OutlineItemText>
            <Ui.Form.OutlineAction onClick={() => onEdit('category')}>
              Edit
            </Ui.Form.OutlineAction>
          </Ui.Form.OutlineItem>
        </Ui.Form.Outline>
      </Ui.Drawer.Body>
      <Ui.Drawer.Footer>
        <Ui.Components.Button
          isPrimary
          onClick={onSubmit}
        >
          Confirm & Submit
        </Ui.Components.Button>
        {children}
      </Ui.Drawer.Footer>
    </>
  );
};
