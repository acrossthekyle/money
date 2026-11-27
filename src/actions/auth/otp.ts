'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import * as z from 'zod';

import { db } from '@/db';

import { verify } from './utils';

const Form = z.object({
  otp: z.string(),
});

export async function otp(
  formData: {
    data: {
      otp: string;
    };
  },
): Promise<void> {
  const validated = Form.safeParse({
    otp: formData.data.otp,
  });

  if (!validated.success) {
    return;
  }

  const { otp, otp_expires } = await db.tables.settings();

  if (otp === null || otp_expires === null) {
    redirect('/login');

    return;
  }

  if (new Date() > new Date(otp_expires)) {
    await db.erase('settings', 'otp');

    redirect('/login');

    return;
  }

  const isValid = verify(validated.data.otp, otp);

  if (!isValid) {
    await db.erase('settings', 'otp');

    redirect('/login');

    return;
  }

  await db.erase('settings', 'otp');

  const cookieStore = await cookies();

  cookieStore.set('app_session', process.env.AUTH_COOKIE_VALUE!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: Number(process.env.AUTH_SESSION_TIME || 60 * 60),
    path: '/',
  });

  const { holding } = await db.queries.getPinned();

  if (holding === null) {
    redirect('/onboarding');
  } else {
    redirect(`/${holding}`);
  }
};
