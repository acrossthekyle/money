'use client';

import { LockOpen } from 'lucide-react';

import { logout } from '@/actions/auth/logout';
import tw from '@/styles';

export default function Exit() {
  const handleOnClick = () => {
    localStorage.setItem('portfolio', 'credit_card');
  };

  return (
    <form action={logout}>
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
    p-2
  `,
  icon: `
    w-4.5 h-4.5
    stroke-2

    md:w-3.5
    md:h-3.5
  `,
});
