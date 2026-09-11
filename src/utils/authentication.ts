'use server';

import { cookies } from 'next/headers';

export async function authentication(): Promise<{ isAuthenticated: boolean; }> {
  const cookieStore = await cookies();

  const isAuthenticated = process.env.AUTH_SESSION_MODE !== 'guest'
    ? cookieStore.has('app_session')
    : true;

  return {
    isAuthenticated,
  };
};
