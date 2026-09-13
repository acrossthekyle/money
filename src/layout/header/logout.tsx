import { LogOut } from 'lucide-react';
import { logout } from '@/actions/auth/logout';
import tw from '@/styles';

type Props = {
  isAuthenticated: boolean;
};

export default function Logout({ isAuthenticated }: Props) {
  if (!isAuthenticated || process.env.AUTH_SESSION_MODE === 'guest') {
    return null;
  }

  return (
    <form action={logout}>
      <button className={styles.container} type="submit">
        <span className={styles.text}>Logout</span>
        <LogOut className={styles.icon} />
      </button>
    </form>
  );
};

const styles = tw({
  container: `
    absolute right-2 top-0.5
    p-2
    uppercase
    text-tiny
    font-medium

    md:right-10
    md:top-2.5
  `,
  text: `
    hidden

    md:block
  `,
  icon: `
    block
    w-4 h-4

    md:hidden
  `,
});
