'use client';

import Ui from '@/ui';
import { currency } from '@/utils';

import type { Data } from '../../types';

type Props = {
  data: Data;
  isActive: boolean;
  isEditing: boolean;
  isPending: boolean;
  onSubmit: () => void;
};

export default function Section({
  children,
  data,
  isActive,
  isEditing,
  isPending,
  onSubmit,
}: React.PropsWithChildren<Props>) {
  if (!isActive) {
    return null;
  }

  return (
    <>
      <Ui.Drawer.Body>
        <Ui.Form.Header>Review</Ui.Form.Header>
        <Ui.Form.Paragraph>
          Make sure everything is correct before submitting. Once you click {isEditing ? '"update"' : '"add"'} it's finalized and can't be changed.
        </Ui.Form.Paragraph>
        <Ui.Form.Outline>
          <Ui.Form.OutlineItem>
            <Ui.Form.OutlineItemHeading>Type</Ui.Form.OutlineItemHeading>
            <Ui.Form.OutlineItemText capitalize>
              {data.type.replace(/_/g, ' ')}
            </Ui.Form.OutlineItemText>
          </Ui.Form.OutlineItem>
          <Ui.Form.OutlineItem>
            <Ui.Form.OutlineItemHeading>Name</Ui.Form.OutlineItemHeading>
            <Ui.Form.OutlineItemText>{data.name}</Ui.Form.OutlineItemText>
          </Ui.Form.OutlineItem>
          <Ui.Form.OutlineItem>
            <Ui.Form.OutlineItemHeading>Balance</Ui.Form.OutlineItemHeading>
            <Ui.Form.OutlineItemText>
              {Number(data.balance) < 0 ? '-' : ''}${currency(data.balance)}
            </Ui.Form.OutlineItemText>
          </Ui.Form.OutlineItem>
          {!!data.interest && (
            <Ui.Form.OutlineItem>
              <Ui.Form.OutlineItemHeading>Rate</Ui.Form.OutlineItemHeading>
              <Ui.Form.OutlineItemText>{currency(data.interest)} %</Ui.Form.OutlineItemText>
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
          {isEditing ? 'Update' : 'Add'}
        </Ui.Components.Button>
        {children}
      </Ui.Drawer.Footer>
    </>
  );
};
