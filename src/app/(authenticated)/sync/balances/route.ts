import { format } from 'date-fns';
import { snakeCase } from 'lodash';
import { NextResponse } from 'next/server';
import type { AccountBase } from 'plaid/legacy';

import { DATE_ISO } from '@/constants';
import { db } from '@/db';
import type { Syncable } from '@/types';
import { date } from '@/utils';

import { client } from '../client';

import { synchronize } from './utils';

export async function POST() {
  try {
    const { holdings } = await db.tables.holdings();
    const { token, zone } = await db.tables.settings();

    if (token === null) {
      return NextResponse.json({}, {
        status: 500,
      });
    }

    // accountsBalanceGet = $$$ real-time data
    const response = await client.accountsGet({
      access_token: token,
    });

    const syncable: Syncable[] = response.data.accounts.map((account: AccountBase) => ({
      id: snakeCase(`${account.name}_${account.official_name}_${account.mask}`),
      name: account.name,
      official: account.official_name || '',
      mask: account.mask || '',
      type: account.subtype || 'unknown',
      balance: account.balances.current || 0,
    }));

    await db.write('settings', {
      id: 'synced',
      value: format(date(zone), DATE_ISO),
    });

    const { unsynced } = await synchronize(syncable, holdings);

    return NextResponse.json({
      unsynced,
    });
  } catch {
    return NextResponse.json({}, {
      status: 500,
    });
  };
};
