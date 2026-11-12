'use server';

import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import * as z from 'zod';

import { DATE_ISO } from '@/constants';
import { db } from '@/db';
import { get as getSettings } from '@/getters/settings';
import type { Holding } from '@/types';
import { date } from '@/utils';

import { balancize, interestize } from '../utils';

const Form = z.object({
  name: z.string(),
  balance: z.string(),
  type: z.enum([
    'credit_card',
    'checking',
    'savings',
    'retirement',
    'property',
  ]),
  interest: z.string().nullable().optional(),
});

export async function put(
  formData: {
    id: string | null;
    data: {
      type: string;
      name: string;
      balance: string;
      interest: string;
    };
  },
): Promise<Holding | null> {
  const validated = Form.safeParse({
    name: formData.data.name,
    balance: formData.data.balance,
    type: formData.data.type,
    interest: formData.data.interest,
  });

  if (!validated.success) {
    return null;
  }

  const { zone } = await getSettings();

  const now = date(zone);

  const computed = {
    balance: balancize(validated.data.balance),
    id: formData.id === null ? uuidv4() : formData.id,
    interest: interestize(validated.data.interest === null ? '' : (validated.data.interest || '')),
    updated: format(now, DATE_ISO),
  };

  const result = {
    ...validated.data,
    ...computed,
  };

  await db.write('holdings', result);

  return result;
};
