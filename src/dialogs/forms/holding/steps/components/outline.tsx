'use client';

import { currency } from '@/utils';

import {
  Outline,
  OutlineItem,
  OutlineItemHeading,
  OutlineItemText,
  OutlineItemAction,
} from '../../../components';
import type { Data } from '../../types';

type Props = {
  data: Data;
  onEdit: (step: string) => void;
};

export default function Block({
  data,
  onEdit,
}: Props) {
  return (
    <Outline>
      <OutlineItem>
        <OutlineItemHeading>Type</OutlineItemHeading>
        <OutlineItemText capitalize>
          {data.type.replace(/_/g, ' ')}
        </OutlineItemText>
        <OutlineItemAction onClick={() => onEdit('type')} />
      </OutlineItem>
      <OutlineItem>
        <OutlineItemHeading>Name</OutlineItemHeading>
        <OutlineItemText>{data.name}</OutlineItemText>
        <OutlineItemAction onClick={() => onEdit('name')} />
      </OutlineItem>
      {!!data.number && (
        <OutlineItem>
          <OutlineItemHeading>Number</OutlineItemHeading>
          <OutlineItemText>**** {data.number}</OutlineItemText>
          <OutlineItemAction onClick={() => onEdit('number')} />
        </OutlineItem>
      )}
      <OutlineItem>
        <OutlineItemHeading>Balance</OutlineItemHeading>
        <OutlineItemText>
          {Number(data.balance) < 0 ? '-' : ''}${currency(data.balance)}
        </OutlineItemText>
        <OutlineItemAction onClick={() => onEdit('balance')} />
      </OutlineItem>
      {!!data.interest && (
        <OutlineItem>
          <OutlineItemHeading>Rate</OutlineItemHeading>
          <OutlineItemText>{data.interest}</OutlineItemText>
          <OutlineItemAction onClick={() => onEdit('rate')} />
        </OutlineItem>
      )}
    </Outline>
  );
};
