'use client';

import Link from 'next/link';

import tw, { cs } from '@/styles';
import Ui from '@/ui';
import { currency } from '@/utils';

import Avatar from './avatar';
import Exit from './exit';
import { useModel } from './model';

export default function Drawer() {
  const {
    active,
    handleOnAdd,
    holdings,
    instance,
    isActive,
    onBackdrop,
    onCancel,
    onClose,
    worth,
  } = useModel();

  return (
    <Ui.Drawer.Container
      id="menu-drawer"
      instance={instance}
      isActive={isActive}
      onBackdrop={onBackdrop}
      onCancel={onCancel}
    >
      <Ui.Drawer.Inner isActive={isActive} isMenu>
        <Ui.Drawer.Content isMenu>
          <Ui.Drawer.Header onClose={onClose}>
            <span className={styles.header}>Portfolio</span>
            <span className={styles.lid}>Net worth: ${currency(worth, true)}</span>
          </Ui.Drawer.Header>
          <nav aria-label="primary navigation" className={styles.container}>
            <ul className={styles.links}>
              {holdings.map((holding) => (
                <li key={holding.id}>
                  <Link
                    className={styles.link}
                    href={`/${holding.id}`}
                    onClick={onClose}
                  >
                    <Avatar type={holding.type} />
                    <span className={styles.details}>
                      <span className={styles.name}>{holding.name}</span>
                      <span
                        className={
                          cs(
                            styles.lid,
                            Number(holding.balance) < 0 && styles.negative,
                          )
                        }
                      >
                        ${currency(holding.balance, true)}
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
          <Ui.Drawer.Footer>
              <Ui.Components.Button isGhost onClick={handleOnAdd}>
                Add to Portfolio
              </Ui.Components.Button>
              <Exit />
            </Ui.Drawer.Footer>
        </Ui.Drawer.Content>
      </Ui.Drawer.Inner>
    </Ui.Drawer.Container>
  );
};

const styles = tw({
  container: `
    relative
    flex flex-col
    h-[calc(100%-9rem)]
    pt-6
    overflow-y-auto

    after:fixed
    after:left-0
    after:right-0
    after:bottom-27
    after:z-100
    after:h-6
    after:bg-linear-to-t
    after:from-zinc-50
    dark:after:from-zinc-950
    after:to-transparent
    after:pointer-events-none

    sm:after:left-6
    sm:after:right-6
  `,
  links: `
    flex flex-col gap-3
    pb-6
  `,
  link: `
    relative
    flex items-start gap-1
    w-full

    sm:text-sm
  `,
  details: `
    flex flex-col gap-1
  `,
  name: `
    leading-[1]
  `,
  header: `
    sm:text-sm
  `,
  lid: `
    text-current/62.5

    sm:text-sm
  `,
  circle: `
    absolute top-1/2 right-0
    -translate-y-1/2
    bg-(--background)
    rounded-full
    size-4
    border-2

    sm:size-3
  `,
  footer: `
    flex flex-col gap-3
    w-full
    mt-auto
  `,
  negative: `
    text-red-400
  `,
});
