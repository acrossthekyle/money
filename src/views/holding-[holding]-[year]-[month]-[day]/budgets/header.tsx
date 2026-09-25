'use client';

import { Plus } from 'lucide-react';
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
        <span className={styles.title}>Budgets</span>
        <Ui.Components.Action
          href={`/holding/${holding.id}/budget?ref=${pathname.split('/').slice(3).join('/')}`}
        >
          <Ui.Components.Icon>
            <Plus className={styles.icon} />
          </Ui.Components.Icon>
          <Ui.Components.Text right>
            Add
          </Ui.Components.Text>
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
  `,
  title: `
    font-roboto font-bold
    text-base
    uppercase

    md:text-sm
  `,
  divider: `
    h-px w-full
    my-4
    border-b border-dashed border-current/62.5
  `,
  icon: `
    w-3 h-3
    stroke-2
  `,
});
