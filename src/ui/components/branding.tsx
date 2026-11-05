import Link from 'next/link';

import tw from '@/styles';

export default function Branding() {
  return (
    <article className={styles.container}>
      <h2 className={styles.heading}>
        <span>Personal Financial</span>
        <span>Planning Tool</span>
        <span>Version 4.0.0</span>
      </h2>
      <p className={styles.credit}>
        <Link href="https://acrossthekyle.com" target="_blank">
          © acrossthekyle.com
        </Link>
      </p>
      <div aria-label="logo" className={styles.logo}>
        <span>Bas</span>
        <span>Alt</span>
        <span className={styles.bar} role="presentation" />
      </div>
    </article>
  );
};

const styles = tw({
  container: `
    relative
    mt-10
  `,
  heading: `
    flex flex-col gap-0
    uppercase
    leading-3
    text-tiny
    font-semibold
  `,
  credit: `
    mt-6
    uppercase
    text-xtiny
    font-semibold
  `,
  logo: `
    absolute bottom-0 right-0
    flex flex-col
    leading-[1]
    uppercase
    font-medium
    text-2xl
  `,
  bar: `
    absolute right-full bottom-2.75
    w-7 h-0.5
    mr-3
    bg-(--foreground)
  `,
});
