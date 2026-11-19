'use client';

import { format, isBefore, parseISO } from 'date-fns';

import { DATE_DISPLAY } from '@/constants';
import type { Budget, Dateable, Holding } from '@/types';
import Ui from '@/ui';
import { currency } from '@/utils';

import { CATEGORIES, SCHEDULES } from '../../constants';
import type { Data } from '../../types';

type Props = {
  budget?: Budget;
  data: Data;
  date: Dateable | null;
  hasChanged: boolean;
  holdings: Holding[];
  isActive: boolean;
  onContinue: () => void;
  onDelete: () => void;
  onEdit: (section: string) => void;
};

export default function Section({
  budget,
  children,
  data,
  date,
  hasChanged,
  holdings,
  isActive,
  onContinue,
  onDelete,
  onEdit,
}: React.PropsWithChildren<Props>) {
  if (!isActive) {
    return null;
  }

  const hasStarted = !!data.start && date ? isBefore(parseISO(String(data.start)), date.today.date) : false;
  const start = !!data.start ? format(parseISO(String(data.start)), DATE_DISPLAY) : '';

  return (
    <>
      <Ui.Drawer.Body>
        <Ui.Form.Outline>
          <Ui.Form.OutlineItem>
            <Ui.Form.OutlineAction onClick={() => onEdit('amount')}>
              <Ui.Form.OutlineItemHeading>Amount</Ui.Form.OutlineItemHeading>
              <Ui.Form.OutlineItemText>
                {data.type === 'debit' ? '-' : ''}${currency(data.amount)}
              </Ui.Form.OutlineItemText>
            </Ui.Form.OutlineAction>
          </Ui.Form.OutlineItem>
          <Ui.Form.OutlineItem>
            <Ui.Form.OutlineAction onClick={() => onEdit('name')}>
              <Ui.Form.OutlineItemHeading>Name</Ui.Form.OutlineItemHeading>
              <Ui.Form.OutlineItemText>
                {data.name}
              </Ui.Form.OutlineItemText>
            </Ui.Form.OutlineAction>
          </Ui.Form.OutlineItem>
          <Ui.Form.OutlineItem>
            <Ui.Form.OutlineAction onClick={() => onEdit('transferee')}>
              <Ui.Form.OutlineItemHeading>Transfer</Ui.Form.OutlineItemHeading>
              <Ui.Form.OutlineItemText>
                {data.transferee ? (
                  <>
                    {data.type === 'debit' && 'As income to '}
                    {data.type === 'credit' && 'As expense from '}
                    {holdings.find(item => item.id === data.transferee)?.name}
                  </>
                ) : (
                  <>No transfer specified</>
                )}
              </Ui.Form.OutlineItemText>
            </Ui.Form.OutlineAction>
          </Ui.Form.OutlineItem>
          <Ui.Form.OutlineItem>
            <Ui.Form.OutlineAction
              isDisabled={hasStarted}
              onClick={() => onEdit('start')}
              title={hasStarted ? `Transaction started on ${start}` : undefined}
            >
              <Ui.Form.OutlineItemHeading>
                {hasStarted ? 'Started' : 'Starts'} on
              </Ui.Form.OutlineItemHeading>
              <Ui.Form.OutlineItemText>
                {!!data.start ? start : 'No date specified'}
              </Ui.Form.OutlineItemText>
            </Ui.Form.OutlineAction>
          </Ui.Form.OutlineItem>
          <Ui.Form.OutlineItem>
            <Ui.Form.OutlineAction onClick={() => onEdit('schedule')}>
              <Ui.Form.OutlineItemHeading>Repeats</Ui.Form.OutlineItemHeading>
              <Ui.Form.OutlineItemText>
                {SCHEDULES.find(item => item.value === data.schedule)?.name}
              </Ui.Form.OutlineItemText>
            </Ui.Form.OutlineAction>
          </Ui.Form.OutlineItem>
          <Ui.Form.OutlineItem>
            <Ui.Form.OutlineAction onClick={() => onEdit('end')}>
              <Ui.Form.OutlineItemHeading>Ends on</Ui.Form.OutlineItemHeading>
              <Ui.Form.OutlineItemText>
                {!!data.end ? format(parseISO(data.end), DATE_DISPLAY) : 'No date specified'}
              </Ui.Form.OutlineItemText>
            </Ui.Form.OutlineAction>
          </Ui.Form.OutlineItem>
          <Ui.Form.OutlineItem>
            <Ui.Form.OutlineAction onClick={() => onEdit('category')}>
              <Ui.Form.OutlineItemHeading>Categorized as</Ui.Form.OutlineItemHeading>
              <Ui.Form.OutlineItemText>
                {CATEGORIES.find(item => item.value === data.category)?.name}
              </Ui.Form.OutlineItemText>
            </Ui.Form.OutlineAction>
          </Ui.Form.OutlineItem>
        </Ui.Form.Outline>
        <div className="mt-4">
          <Ui.Form.Delete onClick={onDelete}>
            Delete transaction and update forecast
          </Ui.Form.Delete>
        </div>
      </Ui.Drawer.Body>
      <Ui.Drawer.Footer>
        <Ui.Components.Button
          isDisabled={!hasChanged}
          isPrimary
          onClick={onContinue}
        >
          {budget?.schedule === 'once' ? 'Confirm & Update' : 'Next'}
        </Ui.Components.Button>
        {children}
      </Ui.Drawer.Footer>
    </>
  );
};
