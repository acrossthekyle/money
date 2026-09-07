import Link from 'next/link';

import tw from '@/styles';

export default async function Credit() {
  return (
    <Link
      className={styles.container}
      href="https://acrossthekyle.com"
      target="_blank"
    >
      <span>About the Developer</span>
    </Link>
  );
};

const styles = tw({
  container: `
    p-2
    text-tiny
    uppercase
    font-bold
  `,
});
