import { Lock } from 'lucide-react';
import { cookies } from 'next/headers';

import { logout } from '@/actions/auth/logout';
import tw from '@/styles';

export default async function Logout() {
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.has('app_session');

  if (!isLoggedIn) {
    return null;
  }

  return (
    <form action={logout}>
      <button className={styles.container} type="submit">
        <Lock className={styles.icon} />
        Logout
      </button>
    </form>
  );
};

const styles = tw({
  container: `
    flex items-center gap-2
    uppercase
    text-tiny
    font-bold
    p-2
  `,
  icon: `
    w-3 h-3
  `,
});
