import { logout } from '@/actions/auth/logout';
import tw from '@/styles';
import { authentication } from '@/utils/authentication';

export default async function Logout() {
  const { isAuthenticated } = await authentication();

  if (!isAuthenticated) {
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
    flex items-center gap-2
    uppercase
    text-xs
    font-black
    p-2

    md:text-tiny
  `,
  icon: `
    w-3 h-3
    stroke-3
  `,
});
