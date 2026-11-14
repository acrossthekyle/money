'use server';

import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

import { DATE_ISO } from '@/constants';
import { db } from '@/db';
import { get as getHoldings } from '@/getters/holdings';
import { get as getSettings } from '@/getters/settings';
import type {
  Holding,
  HoldingPutActionInput,
  HoldingPutActionResponse,
} from '@/types';
import { date } from '@/utils';

import { balancize, interestize } from '../../utils';

import { validator } from './validator';

export async function put(
  state: HoldingPutActionResponse | null,
  input: HoldingPutActionInput,
): Promise<HoldingPutActionResponse> {
  const validated = validator.safeParse({
    name: input.data.name,
    balance: input.data.balance,
    type: input.data.type,
    interest: input.data.interest,
  });

  if (!validated.success) {
    return {
      holding: {} as Holding,
      isSuccess: false,
    };
  }

  const { holdings } = await getHoldings();
  const { zone } = await getSettings();

  const holding = holdings.find((item: Holding) => item.id === input.id);

  if (!holding) {
    return {
      holding: {} as Holding,
      isSuccess: false,
    };
  }

  const result: Holding = {
    ...validated.data,
    ...{
      balance: balancize(validated.data.balance),
      id: input.id || uuidv4(),
      interest: interestize(validated.data.interest === null ? '' : (validated.data.interest || '')),
      updated: format(date(zone), DATE_ISO),
    },
  };

  await db.write('holdings', result);

  return {
    holding: result,
    isSuccess: true,
  };
};
