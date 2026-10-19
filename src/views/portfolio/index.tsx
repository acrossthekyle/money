'use client';

import { Eye, Pen } from 'lucide-react';
import Link from 'next/link';

import { CARD_RADIUS } from '@/constants';
import { Dialogs } from '@/dialogs';
import { Main } from '@/layout';
import tw from '@/styles';
import type { Holding } from '@/types';
import { Ui } from '@/ui';

import Filters from './filters';
import Header from './header';

import { useModel } from './model';

type Props = {
  data: {
    holdings: Holding[];
    zone: string;
  };
};

export default function View({ data }: Props) {
  const {
    handleOnEdit,
    handleOnFilter,
    portfolio,
  } = useModel();

  if (portfolio === null) {
    return null;
  }

  const filtered = data.holdings.filter(item => item.type === portfolio);

  return (
    <>
      <Main>
        <Header holdings={data.holdings} zone={data.zone} />
        <Filters current={portfolio} onClick={handleOnFilter} />
        <ul className={styles.items}>
          {filtered.map((item) => (
            <Ui.Components.Card holding={item} key={item.id} zone={data.zone}>
              <nav
                aria-label="supplementary navigation"
                className={styles.options}
              >
                <Link className={styles.option} href={`/portfolio/${item.id}`}>
                  <Eye className={styles.icon} /> Manage
                </Link>
                <button
                  className={styles.option}
                  onClick={() => handleOnEdit(item)}
                  type="button"
                >
                  <Pen className={styles.icon} /> Update
                </button>
              </nav>
            </Ui.Components.Card>
          ))}
        </ul>
      </Main>
      <Dialogs.Holding />
    </>
  );
};

const styles = tw({
  items: `
    flex flex-col gap-4

    md:gap-4
  `,
  options: `
    flex gap-4
    w-full
  `,
  option: `
    border border-current/12
    bg-white dark:bg-(--foreground)/6
    text-black dark:text-white
    flex items-center justify-center gap-4
    uppercase
    text-sm
    p-2 px-4
    w-full

    motion-safe:duration-300

    hover:bg-(--foreground)/100
    hover:text-(--background)

    md:text-tiny

    ${CARD_RADIUS}
  `,
  icon: `
    size-4

    md:size-3
  `,
})
