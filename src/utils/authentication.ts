'use server';

import { cookies } from 'next/headers';

export async function authentication(): Promise<{ isAuthenticated: boolean; }> {
  const cookieStore = await cookies();

  const isAuthenticated = cookieStore.has('app_session');

  return {
    isAuthenticated,
  };
};
