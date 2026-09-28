'use server';

import { revalidatePath } from 'next/cache';
import * as z from 'zod';

import { IS_CALENDAR_V2_ENABLED } from '@/features';
import { set as setCalendar } from '@/setters/calendar';

const Form = z.object({
  id: z.string(),
});

export async function bust(
  state: { isSuccessful?: boolean; },
  formData: FormData,
): Promise<{ isSuccessful?: boolean; }> {
  if (IS_CALENDAR_V2_ENABLED) {
    return {
      isSuccessful: true,
    };
  }

  const validated = Form.safeParse({
    id: formData.get('id'),
  });

  if (!validated.success) {
    return {
      isSuccessful: false,
    };
  }

  await setCalendar(validated.data.id);

  revalidatePath('/');

  return {
    isSuccessful: true,
  };
};
