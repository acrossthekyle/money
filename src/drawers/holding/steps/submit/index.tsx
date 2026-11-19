'use client';

import Ui from '@/ui';
import { currency } from '@/utils';

import type { Data } from '../../types';
import { getInterestName } from '../utils';

type Props = {
  data: Data;
  isActive: boolean;
  isPending: boolean;
  onSubmit: () => void;
};

export default function Section({
  children,
  data,
  isActive,
  isPending,
  onSubmit,
}: React.PropsWithChildren<Props>) {
  if (!isActive) {
    return null;
  }

  return (
    <>
      <Ui.Drawer.Body>
        <Ui.Form.Paragraph>
          Review the following before submitting.
        </Ui.Form.Paragraph>
        <Ui.Form.Outline>
          <Ui.Form.OutlineItem>
            <Ui.Form.OutlineAction>
              <Ui.Form.OutlineItemHeading>Type</Ui.Form.OutlineItemHeading>
              <Ui.Form.OutlineItemText capitalize>
                {data.type.replace(/_/g, ' ')}
              </Ui.Form.OutlineItemText>
            </Ui.Form.OutlineAction>
          </Ui.Form.OutlineItem>
          <Ui.Form.OutlineItem>
            <Ui.Form.OutlineAction>
              <Ui.Form.OutlineItemHeading>Name</Ui.Form.OutlineItemHeading>
              <Ui.Form.OutlineItemText>{data.name}</Ui.Form.OutlineItemText>
            </Ui.Form.OutlineAction>
          </Ui.Form.OutlineItem>
          <Ui.Form.OutlineItem>
            <Ui.Form.OutlineAction>
              <Ui.Form.OutlineItemHeading>Balance</Ui.Form.OutlineItemHeading>
              <Ui.Form.OutlineItemText>
                {Number(data.balance) < 0 ? '-' : ''}${currency(data.balance)}
              </Ui.Form.OutlineItemText>
            </Ui.Form.OutlineAction>
          </Ui.Form.OutlineItem>
          {data.type === 'credit_card' && (
            <Ui.Form.OutlineItem>
              <Ui.Form.OutlineAction>
                <Ui.Form.OutlineItemHeading>
                  Balance limit
                </Ui.Form.OutlineItemHeading>
                <Ui.Form.OutlineItemText>
                  ${currency(data.limit)}
                </Ui.Form.OutlineItemText>
              </Ui.Form.OutlineAction>
            </Ui.Form.OutlineItem>
          )}
          {data.type !== 'credit_card' && (
            <Ui.Form.OutlineItem>
              <Ui.Form.OutlineAction>
                <Ui.Form.OutlineItemHeading>
                  {getInterestName(data.type)}
                </Ui.Form.OutlineItemHeading>
                <Ui.Form.OutlineItemText>
                  {!!data.interest ? `${Number(data.interest) < 0 ? '-' : ''}${currency(data.interest)}` : '0.00'} %
                </Ui.Form.OutlineItemText>
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
