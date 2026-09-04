'use server';

import { v4 as uuidv4 } from 'uuid';
import * as z from 'zod';

import { db } from '@/db';
import type { Holding, HoldingFormState } from '@/types';

function balancize(raw: string) {
  const cleaned = raw.replace(/,/g, '').replace('$', '');
  const number = parseFloat(cleaned);

  return number.toFixed(2);
};

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
  });

  if (!validated.success) {
    const rawInput = Object.fromEntries(formData.entries());

    const errors = z.flattenError(validated.error).fieldErrors;

    return {
      data: {
        ...state?.data,
        ...rawInput,
      } as any,
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
      ].filter(item => !!item.error),
      hasFailed: true,
      isSuccessful: false,
      message: 'Validation failed',
    };
  }

  const writeable = {
    ...validated.data,
    balance: balancize(validated.data.balance),
    number: validated.data.number === null ? '' : validated.data.number.slice(-4),
    purge: undefined,
  };

  const returnable = {
    ...validated.data,
    balance: balancize(validated.data.balance),
    institution: validated.data.institution === null ? '' : validated.data.institution,
    number: validated.data.number === null ? '' : validated.data.number.slice(-4),
  };

  if (holding === null) {
    await db.write('holdings', {
      ...writeable,
      id: uuidv4(),
    });

    return {
      data: returnable,
      hasFailed: false,
      isSuccessful: true,
      message: 'Holding successfully created',
    };
  }

  if (validated.data.purge === 'true') {
    await db.erase('holdings', holding.id);

    return {
      data: returnable,
      hasFailed: false,
      isSuccessful: true,
      message: 'Holding successfully deleted',
    };
  }

  writeable.id = holding.id;

  await db.write('holdings', writeable);

  return {
    data: returnable,
    hasFailed: false,
    isSuccessful: true,
    message: 'Holding successfully updated',
  };
};
