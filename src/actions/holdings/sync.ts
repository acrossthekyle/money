'use server';

import { format } from 'date-fns';

import { DATE_ISO } from '@/constants';
import { db } from '@/db';
import type {
  Holding,
  HoldingSyncActionInput,
  HoldingSyncActionResponse,
  SyncableSelection,
} from '@/types';
import { date } from '@/utils';

import { balancize } from '../utils';

export async function sync(
  state: HoldingSyncActionResponse | null,
  input: HoldingSyncActionInput,
): Promise<HoldingSyncActionResponse> {
  const { holdings } = await db.tables.holdings();
  const { zone } = await db.tables.settings();

  const result: Holding[] = [];

  input.data.forEach((selection: SyncableSelection) => {
    const found = holdings.find((holding: Holding) => holding.id === selection.linked);

    if (found) {
      result.push({
        ...found,
        balance: balancize(
          String(
            found.type === 'credit_card' ? -selection.balance : selection.balance
          )
        ),
        plaid: selection.syncable,
        updated: format(date(zone), DATE_ISO),
      });
    }
  });

  await db.writeAll('holdings', result);

  return {
    result,
    isSuccess: true,
    message: 'Success',
  };
};
