'use client';

import Link from 'next/link';

import tw, { cs } from '@/styles';
import Ui from '@/ui';
import { currency } from '@/utils';

import Avatar from './avatar';
import Exit from './exit';
import { useModel } from './model';

export default function Menu() {
  const { handleOnToggle, holdings, isActive } = useModel();

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
        <h2 className={styles.header}>Portfolio</h2>
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
                  </span>
                </Link>
              </li>
            ))}
            <li>
              <Link
                className={styles.link}
                href={`/add`}
                onClick={handleOnToggle}
              >
                <Avatar type="plus" />
                <span className={styles.content}>
                  <span className={styles.name}>Add</span>
                </span>
              </Link>
            </li>
          </ul>
        </nav>
        <Exit />
        <Ui.Components.Branding />
      </aside>
      <div className={styles.backdrop(isActive)} />
    </>
  );
};

const styles = tw({
  container: `
    fixed top-0 left-0 z-10000
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

    sm:border-r
    sm:border-current/22.5
    sm:w-100
  `,
  collapsed: `
    w-0
  `,
  header: `
    p-6
    uppercase
    font-black
    border-b border-dashed border-current/32.5
  `,
  links: `
    flex flex-col gap-2
    w-svw
    p-6 pb-6
    mb-6
    border-b border-dashed border-current/32.5

    sm:w-100
  `,
  link: `
    relative
    flex items-center gap-4
    w-full
  `,
  content: `
    flex flex-col gap-1
    text-sm
  `,
  name: `
    font-bold
    leading-[1]
    text-base
  `,
  lid: `
    capitalize
    text-sm text-current/62.5
  `,
});
