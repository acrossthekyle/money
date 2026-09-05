'use server';

import { v4 as uuidv4 } from 'uuid';
import * as z from 'zod';

import { db } from '@/db';
import type { Holding, HoldingFormState } from '@/types';

import { balancize, interestize } from '../utils';

const Form = z.object({
  name: z.string(),
  balance: z.string(),
  institution: z.string().nullable().optional(),
  number: z.string().nullable().optional(),
  type: z.enum([
    'credit_card',
    'checking',
    'savings',
    'retirement',
    'taxable',
    'health',
    'property',
    'other',
  ]),
  interest: z.string().nullable().optional(),
});

export async function put(
  holding: Holding | null,
  state: HoldingFormState,
  formData: FormData,
): Promise<HoldingFormState> {
  const validated = Form.safeParse({
    name: formData.get('name'),
    balance: formData.get('balance'),
    institution: formData.get('institution'),
    number: formData.get('number'),
    type: formData.get('type'),
    interest: formData.get('interest'),
  });

  if (!validated.success) {
    const rawInput = Object.fromEntries(formData.entries());

    const errors = z.flattenError(validated.error).fieldErrors;

    return {
      data: {
        ...state?.data,
        ...rawInput,
      } as Holding,
      errors: [
        {
          field: 'name',
          error: errors?.name?.[0] || '',
        },
        {
          field: 'balance',
          error: errors?.balance?.[0] || '',
        },
        {
          field: 'type',
          error: errors?.type?.[0] || '',
        },
        {
          field: 'institution',
          error: errors?.institution?.[0] || '',
        },
        {
          field: 'number',
          error: errors?.number?.[0] || '',
        },
        {
          field: 'interest',
          error: errors?.interest?.[0] || '',
        },
      ].filter(item => !!item.error),
      hasFailed: true,
      isSuccessful: false,
      message: 'Validation failed',
    };
  }

  const computed = {
    id: holding === null ? '' : holding.id,
    balance: balancize(validated.data.balance),
    institution: validated.data.institution === null ? '' : (validated.data.institution || ''),
    number: validated.data.number === null ? '' : (validated.data?.number || '').slice(-4),
    interest: interestize(validated.data.interest === null ? '' : (validated.data.interest || '')),
  };

  const writeable = {
    ...validated.data,
    ...computed,
  };

  const returnable = {
    ...validated.data,
    ...computed,
  };

  if (holding === null) {
    const identifier = uuidv4();

    await db.write('holdings', {
      ...writeable,
      id: identifier,
    });

    return {
      data: {
        ...returnable,
        id: identifier,
      },
      hasFailed: false,
      isSuccessful: true,
      message: 'Holding successfully created',
    };
  }

  if (formData.get('purge') === 'true' && holding !== null) {
    await db.erase('holdings', holding.id);

    return {
      data: returnable,
      hasFailed: false,
      isSuccessful: true,
      message: 'Holding successfully deleted',
    };
  }

  await db.write('holdings', writeable);

  return {
    data: returnable,
    hasFailed: false,
    isSuccessful: true,
    message: 'Holding successfully updated',
  };
};
