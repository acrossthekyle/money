'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { invalidate } from '@/algorithms/calendar';

export async function logout() {
  const cookieStore = await cookies();

  cookieStore.delete('app_session');
  cookieStore.set('alert', JSON.stringify({ text: 'Successfully logged out', type: 'success' }), {
    maxAge: 60,
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  });

  await invalidate();

  revalidatePath('/');

  redirect('/login');
};
