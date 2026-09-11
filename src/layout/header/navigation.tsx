import Link from 'next/link';

import tw from '@/styles';

type Props = {
  current: string;
  isAuthenticated: boolean;
};

export default function Navigation({ current, isAuthenticated }: Props) {
  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <Link
        className={
          [
            styles.link,
            current === '/' && styles.active,
          ].filter(Boolean).join(' ')
        }
        href="/"
      >
        Home
      </Link>
      <Link
        className={
          [
            styles.link,
            current === '/calendar' && styles.active,
          ].filter(Boolean).join(' ')
        }
        href="/calendar"
      >
        Calendar
      </Link>
    </>
  );
};

const styles = tw({
  link: `
    py-0.5
    text-xs
    uppercase
    font-medium
    border-b border-transparent

    motion-safe:duration-200

    hover:border-current/62.5

    md:text-tiny
  `,
  active: `
    !border-current/62.5
  `,
});
