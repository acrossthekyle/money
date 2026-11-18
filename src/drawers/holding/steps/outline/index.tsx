'use client';

import { upperFirst } from 'lodash';

import type { Holding } from '@/types';
import Ui from '@/ui';
import { currency } from '@/utils';

import type { Data } from '../../types';
import { getInterestName } from '../utils';

import Updated from './updated';

type Props = {
  data: Data;
  holding?: Holding;
  isActive: boolean;
  onEdit: (section: string) => void;
  onSubmit: () => void;
  zone: string;
};

export default function Section({
  children,
  data,
  holding,
  isActive,
  onEdit,
  onSubmit,
  zone,
}: React.PropsWithChildren<Props>) {
  if (!isActive) {
    return null;
  }

  return (
    <>
      <Ui.Drawer.Body>
        <Updated updated={holding?.updated} zone={zone} />
        <Ui.Form.Outline>
          <Ui.Form.OutlineItem>
            <Ui.Form.OutlineAction onClick={() => onEdit('type')}>
              <Ui.Form.OutlineItemHeading>Type</Ui.Form.OutlineItemHeading>
              <Ui.Form.OutlineItemText>
                {upperFirst(data.type.replace(/_/g, ' '))}
              </Ui.Form.OutlineItemText>
            </Ui.Form.OutlineAction>
          </Ui.Form.OutlineItem>
          <Ui.Form.OutlineItem>
            <Ui.Form.OutlineAction onClick={() => onEdit('name')}>
              <Ui.Form.OutlineItemHeading>Name</Ui.Form.OutlineItemHeading>
              <Ui.Form.OutlineItemText>{data.name}</Ui.Form.OutlineItemText>
            </Ui.Form.OutlineAction>
          </Ui.Form.OutlineItem>
          <Ui.Form.OutlineItem>
            <Ui.Form.OutlineAction onClick={() => onEdit('balance')}>
              <Ui.Form.OutlineItemHeading>
                Current balance
              </Ui.Form.OutlineItemHeading>
              <Ui.Form.OutlineItemText>
                {Number(data.balance) < 0 ? '-' : ''}${currency(data.balance)}
              </Ui.Form.OutlineItemText>
            </Ui.Form.OutlineAction>
          </Ui.Form.OutlineItem>
          {data.type === 'credit_card' && (
            <Ui.Form.OutlineItem>
              <Ui.Form.OutlineAction onClick={() => onEdit('limit')}>
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
              <Ui.Form.OutlineAction onClick={() => onEdit('interest')}>
                <Ui.Form.OutlineItemHeading>
                  {getInterestName(data.type)}
                </Ui.Form.OutlineItemHeading>
                <Ui.Form.OutlineItemText>
                  {!!data.interest ? currency(data.interest) : '0.00'} %
                </Ui.Form.OutlineItemText>
              </Ui.Form.OutlineAction>
            </Ui.Form.OutlineItem>
          )}
        </Ui.Form.Outline>
      </Ui.Drawer.Body>
      <Ui.Drawer.Footer>
        <Ui.Components.Button
          isPrimary
          onClick={onSubmit}
        >
          Confirm & Update
        </Ui.Components.Button>
        {children}
      </Ui.Drawer.Footer>
    </>
  );
};
