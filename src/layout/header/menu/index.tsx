'use client';

import { Plus } from 'lucide-react';
import NextJsLink from 'next/link';
import FocusLock, { AutoFocusInside } from 'react-focus-lock';

import tw from '@/styles';
import Ui from '@/ui';
import { currency } from '@/utils';

import Close from './close';
import Exit from './exit';
import Link from './link';
import { useModel } from './model';

type Props = {
  isActive: boolean;
  onToggle: () => void;
};

export default function Menu({
  isActive,
  onToggle,
}: Props) {
  const {
    active,
    handleOnSwipe,
    holdings,
    swiped,
    worth,
  } = useModel();

  return (
    <FocusLock
      as="aside"
      className={styles.container}
      disabled={!isActive}
    >
      <header className={styles.header}>
        <AutoFocusInside>
          <Close onClick={onToggle} />
        </AutoFocusInside>
        <Ui.Components.Theme />
      </header>
      <nav className={styles.navigation}>
        <ul className={styles.links}>
          {holdings.map((holding) => (
            <Link
              isActive={active === holding.id}
              isSwiped={swiped === holding.id}
              holding={holding}
              key={holding.id}
              onClick={onToggle}
              onSwipe={handleOnSwipe}
            />
          ))}
          <li>
            <NextJsLink
              className={styles.link}
              href="/add"
              onClick={onToggle}
            >
              <Plus className={styles.plus} />
            </NextJsLink>
          </li>
        </ul>
      </nav>
      <Ui.Components.Divider />
      <footer className={styles.padded}>
        <section className={styles.footer}>
          <p className={styles.worth}>
            <span className={styles.currency}>
              ${currency(worth)}
            </span>
            <span>Net worth</span>
          </p>
          <Exit />
        </section>
        <Ui.Components.Branding />
      </footer>
    </FocusLock>
  );
};

const styles = tw({
  container: `
    top-0 bottom-0
    flex flex-col justify-between
    w-full
    py-6
    overflow-y-auto

    sm:pt-18
  `,
  padded: `
    px-6
  `,
  header: `
    relative
    flex items-center justify-between
    px-6
  `,
  navigation: `
    mt-8
    w-full
  `,
  links: `
    flex flex-col gap-4
    w-full
    overflow-x-hidden
  `,
  link: `
    block
    ml-5
    py-2
  `,
  plus: `
    size-6
    stroke-2
  `,
  footer: `
    flex items-start justify-between
    pt-8
  `,
  worth: `
    flex flex-col
    leading-4
    uppercase
    text-xs
    font-semibold
  `,
  currency: `
    font-roboto
    text-sm
  `,
});
