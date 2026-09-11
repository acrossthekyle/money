import Link from 'next/link';

import tw from '@/styles';

export default async function Links() {
  return (
    <nav className={styles.container}>
      <Link className={styles.link} href="/">
        [Basalt]
      </Link>
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
    text-xs
    uppercase
    font-black font-mono

    md:text-xs
  `,
});
