'use client';

import Ui from '@/ui';
import { currency } from '@/utils';

import type { Data } from '../../types';

type Props = {
  data: Data;
  isActive: boolean;
  isPending: boolean;
  onEdit: (section: string) => void;
  onSubmit: () => void;
};

export default function Section({
  children,
  data,
  isActive,
  isPending,
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
            <Ui.Form.OutlineItemHeading>Type</Ui.Form.OutlineItemHeading>
            <Ui.Form.OutlineItemText capitalize>
              {data.type.replace(/_/g, ' ')}
            </Ui.Form.OutlineItemText>
            <Ui.Form.OutlineAction onClick={() => onEdit('type')}>
              Edit
            </Ui.Form.OutlineAction>
          </Ui.Form.OutlineItem>
          <Ui.Form.OutlineItem>
            <Ui.Form.OutlineItemHeading>Name</Ui.Form.OutlineItemHeading>
            <Ui.Form.OutlineItemText>{data.name}</Ui.Form.OutlineItemText>
            <Ui.Form.OutlineAction onClick={() => onEdit('name')}>
              Edit
            </Ui.Form.OutlineAction>
          </Ui.Form.OutlineItem>
          <Ui.Form.OutlineItem>
            <Ui.Form.OutlineItemHeading>Balance</Ui.Form.OutlineItemHeading>
            <Ui.Form.OutlineItemText>
              {Number(data.balance) < 0 ? '-' : ''}${currency(data.balance)}
            </Ui.Form.OutlineItemText>
            <Ui.Form.OutlineAction onClick={() => onEdit('balance')}>
              Edit
            </Ui.Form.OutlineAction>
          </Ui.Form.OutlineItem>
          {data.type !== 'credit_card' && (
            <Ui.Form.OutlineItem>
              <Ui.Form.OutlineItemHeading>Interest</Ui.Form.OutlineItemHeading>
              <Ui.Form.OutlineItemText>
                {!!data.interest ? currency(data.interest) : '0.00'} %
              </Ui.Form.OutlineItemText>
              <Ui.Form.OutlineAction onClick={() => onEdit('interest')}>
                Edit
              </Ui.Form.OutlineAction>
            </Ui.Form.OutlineItem>
          )}
        </Ui.Form.Outline>
      </Ui.Drawer.Body>
      <Ui.Drawer.Footer>
        <Ui.Components.Button
          isDisabled={isPending}
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
