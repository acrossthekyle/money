'use server';

import { revalidatePath } from 'next/cache';
import * as z from 'zod';

import { db } from '@/db';
import { set as setCalendar } from '@/setters/calendar';

const Form = z.object({
  id: z.string(),
});

export async function bust(
  state: { isSuccessful?: boolean; },
  formData: FormData,
): Promise<{ isSuccessful?: boolean; }> {
  const validated = Form.safeParse({
    id: formData.get('id'),
  });

  if (!validated.success) {
    return {
      isSuccessful: false,
    };
  }

  await db.write('preferences', {
    id: 'holding',
    value: validated.data.id,
  });

  await setCalendar(validated.data.id);

  revalidatePath('/');

  return {
    isSuccessful: true,
  };
};
