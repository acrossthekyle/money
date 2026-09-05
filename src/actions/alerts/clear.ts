'use server';

import { cookies } from 'next/headers';

export async function clear() {
  const cookieStore = await cookies();
  cookieStore.delete('alert');
}
