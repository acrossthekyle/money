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
    limit: input.data.limit,
    type: input.data.type,
    interest: input.data.interest,
  });

  if (!validated.success) {
    return {
      holding: {} as Holding,
      isSuccess: false,
      message: 'One or more fields are incorrect or missing',
    };
  }

  const { holdings } = await getHoldings();
  const { zone } = await getSettings();

  if (input.id !== null) {
    const found = holdings.find((item: Holding) => item.id === input.id);

    if (!found) {
      return {
        holding: {} as Holding,
        isSuccess: false,
        message: 'Portfolio item does not exist',
      };
    }
  }

  const result: Holding = {
    ...validated.data,
    ...{
      balance: balancize(validated.data.balance),
      limit: validated.data.limit === null ? '' : balancize(validated.data.limit || ''),
      id: input.id || uuidv4(),
      interest: interestize(validated.data.interest === null ? '' : (validated.data.interest || '')),
      updated: format(date(zone), DATE_ISO),
    },
  };

  await db.write('holdings', result);

  return {
    holding: result,
    isSuccess: true,
    message: 'Success',
  };
};
