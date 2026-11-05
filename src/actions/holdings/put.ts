'use server';

import { format } from 'date-fns';
import { revalidatePath } from 'next/cache';
import { v4 as uuidv4 } from 'uuid';
import * as z from 'zod';

import { DATE_ISO } from '@/constants';
import { db } from '@/db';
import { get as getSettings } from '@/getters/settings';
import { date } from '@/utils';

import { balancize, interestize } from '../utils';

const Form = z.object({
  name: z.string(),
  balance: z.string(),
  number: z.string().nullable().optional(),
  type: z.enum([
    'credit_card',
    'checking',
    'savings',
    'retirement',
    'property',
  ]),
  interest: z.string().nullable().optional(),
  pinned: z.boolean().nullable().optional(),
});

export async function put(
  formData: {
    id: string | null;
    data: {
      type: string;
      name: string;
      number: string;
      balance: string;
      interest: string;
      pinned: boolean;
    };
  },
): Promise<void> {
  const validated = Form.safeParse({
    name: formData.data.name,
    balance: formData.data.balance,
    number: formData.data.number,
    type: formData.data.type,
    interest: formData.data.interest,
    pinned: formData.data.pinned,
  });

  if (!validated.success) {
    return;
  }

  const { zone } = await getSettings();

  const now = date(zone);

  const computed = {
    balance: balancize(validated.data.balance),
    id: formData.id === null ? '' : formData.id,
    interest: interestize(validated.data.interest === null ? '' : (validated.data.interest || '')),
    number: validated.data.number === null ? '' : (validated.data?.number || '').slice(-4),
    pinned: validated.data.pinned || false,
    updated: format(now, DATE_ISO),
  };

  const result = {
    ...validated.data,
    ...computed,
  };

  if (formData.id === null) {
    const identifier = uuidv4();

    await db.write('holdings', {
      ...result,
      id: identifier,
    });
  } else {
    await db.write('holdings', result);
  }

  revalidatePath('/');
};
