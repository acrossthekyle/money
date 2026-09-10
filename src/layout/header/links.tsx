import { Scale } from 'lucide-react';
import Link from 'next/link';

import tw from '@/styles';
import { authentication } from '@/utils/authentication';

export default async function Links() {
  const { isAuthenticated } = await authentication();

  return (
    <nav className={styles.container}>
      <Link className={styles.link} href="/">
        <Scale className={styles.icon} />
      </Link>
      {isAuthenticated && (
        <Link className={styles.link} href="/">
          Dashboard
        </Link>
      )}
    </nav>
  );
};

const styles = tw({
  container: `
    flex items-center

    md:gap-2
  `,
  link: `
    flex items-center gap-2
    p-2
    text-tiny
    uppercase
    font-black
  `,
  icon: `
    w-4 h-4
  `,
});
