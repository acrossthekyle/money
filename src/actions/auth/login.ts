'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { get as getHolding } from '@/getters/holding';
import { set as setCalendar } from '@/setters/calendar';
import { db } from '@/db';
import type { LoginFormState } from '@/types';

export async function login(
  state: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;
  const timezone = formData.get('timezone') as string;

  if (
    username !== process.env.APP_USERNAME ||
    password !== process.env.APP_PASSWORD
  ) {
    return {
      data: {
        username,
        password: '',
      },
      error: 'Invalid username or password',
      success: false,
    };
  }

  const { id } = await getHolding();

  await db.write('settings', {
    id: 'timezone',
    value: timezone,
  });

  await setCalendar(id);

  const cookieStore = await cookies();
  cookieStore.set('app_session', process.env.AUTH_COOKIE_VALUE!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: Number(process.env.AUTH_SESSION_TIME || 60 * 60),
    path: '/',
  });

  redirect('/holdings');
};
