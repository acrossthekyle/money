'use client';

import Link from 'next/link';

import tw, { cs } from '@/styles';
import Ui from '@/ui';
import { currency } from '@/utils';

import Avatar from './avatar';
import Exit from './exit';
import { useModel } from './model';

export default function Menu() {
  const {
    active,
    handleOnAdd,
    handleOnToggle,
    holdings,
    isActive,
    worth,
  } = useModel();

  return (
    <aside
      aria-label="menu"
      className={cs(styles.container, isActive && 'is-active')}
    >
      <div className={styles.inner(isActive)}>
        <div className={styles.content}>
          <h2 className={styles.header}>
            <span>Portfolio</span>
            <span className={styles.lid}>Net worth: ${currency(worth, true)}</span>
          </h2>
          <nav aria-label="primary navigation">
            <ul className={styles.links}>
              {holdings.map((holding) => (
                <li key={holding.id}>
                  <Link
                    className={styles.link}
                    href={`/${holding.id}`}
                    onClick={handleOnToggle}
                  >
                    <Avatar type={holding.type} />
                    <span className={styles.details}>
                      <span className={styles.name}>{holding.name}</span>
                      <span className={styles.lid}>
                        ${currency(holding.balance, true)} Balance
                      </span>
                    </span>
                    {active === holding.id && (
                      <span className={styles.circle} />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <footer className={styles.footer}>
            <Ui.Components.Button isGhost onClick={handleOnAdd}>
              Add to Portfolio
            </Ui.Components.Button>
            <Exit />
          </footer>
        </div>
      </div>
      <button className={styles.backdrop} onClick={handleOnToggle} type="button" />
    </aside>
  );
};

const styles = tw({
  container: `
    fixed inset-0 z-10000
    flex justify-start
    w-full max-w-full
    h-full max-h-none
    bg-(--background)/32.5
    outline-none
    overflow-hidden
    backdrop-blur-sm
  `,
  backdrop: `
    absolute inset-0 z-0
    !cursor-default
  `,
  inner: (isActive: boolean) => tw(`
    relative z-10
    flex flex-col justify-between
    w-full max-w-sm
    h-svh
    p-2
    overflow-y-auto

    motion-safe:duration-300

    ${isActive
      ? `opacity-100 translate-x-0`
      : `opacity-0 -translate-x-24`}
  `),
  content: `
    flex-1
    flex flex-col justify-between
    bg-zinc-50 dark:bg-neutral-950
    text-(--foreground)
    border border-current/12.5
    rounded-3xl
    p-4
  `,
  header: `
    flex flex-col
    mb-6
    font-medium
    text-sm
  `,
  links: `
    flex flex-col gap-3
    w-full
    mb-4
  `,
  link: `
    relative
    flex items-start gap-1
    w-full
    text-sm
  `,
  details: `
    flex flex-col gap-1
  `,
  name: `
    leading-[1]
  `,
  lid: `
    text-current/62.5
  `,
  circle: `
    absolute top-1/2 right-0
    -translate-y-1/2
    bg-(--background)
    rounded-full
    size-3
    border
  `,
  footer: `
    flex flex-col gap-3
    w-full
    mt-auto
  `,
});
