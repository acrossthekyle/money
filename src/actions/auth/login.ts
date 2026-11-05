'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import * as z from 'zod';

import { db } from '@/db';
import { get as getPinned } from '@/getters/pinned';

const Form = z.object({
  username: z.string(),
  password: z.string(),
  zone: z.string(),
});

export async function login(
  formData: {
    data: {
      username: string;
      password: string;
      zone: string;
    };
  },
): Promise<void> {
  const validated = Form.safeParse({
    username: formData.data.username,
    password: formData.data.password,
    zone: formData.data.zone,
  });

  if (!validated.success) {
    return;
  }

  if (
    validated.data.username.toLowerCase() !== process.env.APP_USERNAME ||
    validated.data.password !== process.env.APP_PASSWORD
  ) {
    return;
  }

  const { holding } = await getPinned();

  await db.write('settings', {
    id: 'timezone',
    value: validated.data.zone,
  });

  const cookieStore = await cookies();

  cookieStore.set('app_session', process.env.AUTH_COOKIE_VALUE!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: Number(process.env.AUTH_SESSION_TIME || 60 * 60),
    path: '/',
  });

  redirect(holding.id);
};
