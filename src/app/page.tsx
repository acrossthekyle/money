import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { db } from '@/db';

export default async function Page() {
  const cookieStore = await cookies();
  const session = cookieStore.get('app_session')?.value;

  if (session === process.env.AUTH_COOKIE_VALUE) {
    const { holding } = await db.queries.getPinned();

    if (holding === null) {
      redirect('/onboarding');
    } else {
      redirect(`/${holding}`);
    }
  } else {
    redirect('/login');
  }

  return null;
};
