'use client';

import Link from 'next/link';

import tw, { cs } from '@/styles';
import Ui from '@/ui';
import { currency } from '@/utils';

import Avatar from './avatar';
import Exit from './exit';
import { useModel } from './model';

export default function Menu() {
  const { handleOnToggle, holdings, isActive, worth } = useModel();

  return (
    <>
      <aside
        aria-label="menu"
        className={
          cs(
            styles.container,
            isActive ? styles.expanded : styles.collapsed,
          )
        }
      >
        <h2 className={styles.header}>
          <span>Portfolio</span>
          <span className={styles.lid}>Net worth: ${currency(worth, true)}</span>
        </h2>
        <Ui.Components.Theme />
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
                  <span className={styles.content}>
                    <span className={styles.name}>{holding.name}</span>
                    <span className={styles.lid}>
                      ${currency(holding.balance, true)} Balance
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Ui.Components.Button isGhost>
          Add to Portfolio
        </Ui.Components.Button>
        <Exit />
        {/*<Ui.Components.Branding />*/}
      </aside>
      <div className={styles.backdrop(isActive)} />
    </>
  );
};

const styles = tw({
  container: `
    fixed top-2 left-2 z-10000
    flex flex-col gap-0
    h-full min-h-svh
    bg-(--background)
    overflow-y-auto

    motion-safe:duration-300
  `,
  backdrop: (isActive: boolean) => tw(`
    hidden
    fixed inset-0

    motion-safe:duration-300

    ${
      isActive
        ? `backdrop-blur-lg bg-(--background)/90 z-9000`
        : `backdrop-blur-none bg-transparent -z-1 delay-100`
    }

    sm:block
  `),
  expanded: `
    w-svw
    rounded-3xl

    sm:border
    sm:border-current/12.5
    sm:w-96
  `,
  collapsed: `
    w-0
  `,
  header: `
    flex flex-col
    p-6 pb-0
    font-medium
    text-sm
  `,
  links: `
    flex flex-col gap-3
    w-svw
    p-6

    sm:w-96
  `,
  link: `
    relative
    flex items-start gap-1
    w-full
    text-sm
  `,
  content: `
    flex flex-col gap-1
  `,
  name: `
  `,
  lid: `
    text-current/62.5
  `,
});
