'use client';

import { usePathname } from 'next/navigation';

import tw from '@/styles';
import type { Holding } from '@/types';
import Ui from '@/ui';

type Props = {
  holding: Holding;
};

export default function Header({ holding }: Props) {
  const pathname = usePathname();

  return (
    <>
      <span className={styles.divider} role="presentation" />
      <h3 className={styles.container}>
        <span>Budgets</span>
        <Ui.Components.Action
          href={`/holding/${holding.id}/budget?ref=${pathname.split('/').slice(3).join('/')}`}
        >
          Add
        </Ui.Components.Action>
      </h3>
    </>
  );
};

const styles = tw({
  container: `
    relative
    flex items-center justify-between
    w-full
    font-roboto font-bold
    text-sm
    uppercase
  `,
  divider: `
    h-px w-full
    my-4
    border-b border-dashed border-current/62.5
  `,
});
