'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { db } from '@/db';

export async function logout() {
  const cookieStore = await cookies();

  await db.erase('calendar', 'calendar');

  cookieStore.delete('app_session');
  cookieStore.set('alert', JSON.stringify({ text: 'Successfully logged out', type: 'success' }), {
    maxAge: 60,
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  });

  redirect('/login');
};
