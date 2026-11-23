import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { get as getPinned } from '@/getters/pinned';

export default async function Page() {
  const cookieStore = await cookies();
  const session = cookieStore.get('app_session')?.value;

  if (session === process.env.AUTH_COOKIE_VALUE) {
    const { holding } = await getPinned();

    if (holding === null) {
      redirect('/onboarding');
    } else {
      redirect(`/${holding.id}`);
    }
  } else {
    redirect('/login');
  }

  return null;
};
