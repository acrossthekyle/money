'use client';

import { LockOpen } from 'lucide-react';

import { logout } from '@/actions/auth/logout';
import tw from '@/styles';

export default function Exit() {
  const handleOnClick = () => {
    localStorage.setItem('portfolio', 'credit_card');
  };

  return (
    <form action={logout} className="flex">
      <button
        className={styles.container}
        onClick={handleOnClick}
        title="Log out"
        type="submit"
      >
        <LockOpen className={styles.icon} />
      </button>
    </form>
  );
};

const styles = tw({
  container: `
    flex
    p-2
  `,
  icon: `
    w-4 h-4
    stroke-2

    md:w-3.5
    md:h-3.5
  `,
});
