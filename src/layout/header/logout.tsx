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
        Logout
      </button>
    </form>
  );
};

const styles = tw({
  container: `
    relative -top-0.5
    uppercase
    text-xs
    font-medium
    border-b border-transparent

    motion-safe:duration-200

    hover:border-current/62.5

    md:text-tiny
  `,
});
