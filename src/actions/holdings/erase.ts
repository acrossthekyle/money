'use server';

import { revalidatePath } from 'next/cache';

import { db } from '@/db';
import type { Holding, HoldingFormState } from '@/types';

export async function erase(
  holding: Holding,
  state: HoldingFormState,
  formData: FormData,
): Promise<HoldingFormState> {
  if (formData.get('purge') === 'true') {
    await db.erase('holdings', holding.id);

    revalidatePath('/');

    return {
      data: holding,
      hasFailed: false,
      isSuccessful: true,
      message: 'Holding successfully deleted',
    };
  }

  return {
    data: holding,
    hasFailed: false,
    isSuccessful: true,
    message: 'No action taken',
  };
};
