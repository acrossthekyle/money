import { Stone } from 'lucide-react';

import tw from '@/styles';

export default function Header() {
  return (
    <h2 className={styles.container} id="drawer-header">
      <span aria-hidden="true" className={styles.logo}>
        <Stone className={styles.stone} />
      </span>
      <span className={styles.branding}>
        <span className={styles.name}>Basalt</span>
        <span className={styles.slogan}>Version 4.0.1</span>
      </span>
    </h2>
  );
};

const styles = tw({
  container: `
    flex items-start gap-3
  `,
  logo: `
    flex items-center justify-center
    size-9
    rounded-xl
    text-(--background)
    bg-(--foreground)/90
  `,
  stone: `
    size-5
    stroke-2
  `,
  branding: `
    flex flex-col justify-between
    h-full
    leading-[1]
  `,
  name: `
    font-medium
  `,
  slogan: `
    text-xs text-current/62.5
    font-roboto
  `,
});
