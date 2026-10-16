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
        <OutlineItemAction onClick={() => onEdit('type')}>
          <OutlineItemHeading>Type</OutlineItemHeading>
          <OutlineItemText capitalize>
            {data.type.replace(/_/g, ' ')}
          </OutlineItemText>
        </OutlineItemAction>
      </OutlineItem>
      <OutlineItem>
        <OutlineItemAction onClick={() => onEdit('name')}>
          <OutlineItemHeading>Name</OutlineItemHeading>
          <OutlineItemText>{data.name}</OutlineItemText>
        </OutlineItemAction>
      </OutlineItem>
      {!!data.number && (
        <OutlineItem>
          <OutlineItemAction onClick={() => onEdit('number')}>
            <OutlineItemHeading>Number</OutlineItemHeading>
            <OutlineItemText>**** {data.number}</OutlineItemText>
          </OutlineItemAction>
        </OutlineItem>
      )}
      <OutlineItem>
        <OutlineItemAction onClick={() => onEdit('balance')}>
          <OutlineItemHeading>Balance</OutlineItemHeading>
          <OutlineItemText>
            {Number(data.balance) < 0 ? '-' : ''}${currency(data.balance)}
          </OutlineItemText>
        </OutlineItemAction>
      </OutlineItem>
      {!!data.interest && (
        <OutlineItem>
          <OutlineItemAction onClick={() => onEdit('rate')}>
            <OutlineItemHeading>Rate</OutlineItemHeading>
            <OutlineItemText>{data.interest}</OutlineItemText>
          </OutlineItemAction>
        </OutlineItem>
      )}
    </Outline>
  );
};
