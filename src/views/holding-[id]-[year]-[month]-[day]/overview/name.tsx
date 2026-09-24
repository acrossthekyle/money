'use client';

import { usePathname } from 'next/navigation';

import tw from '@/styles';
import type { Holding } from '@/types'
import Ui from '@/ui';

type Props = {
  holding: Holding;
};

export default function Name({ holding }: Props) {
  const pathname = usePathname();

  const ref = pathname.split('/').slice(3).join('/');

  return (
    <>
      <h1 className={styles.header}>
        <span className={styles.title}>
          {holding.name}
        </span>
        <span className={styles.lid}>
          {!!holding.institution && `${holding.institution} • `}
          {holding.type.replace(/_/g, ' ')}
          {holding.number && ` ... ${holding.number}`}
        </span>
      </h1>
      <Ui.Components.Action className={styles.update} href={`/?ref=${ref}`}>
        Edit
      </Ui.Components.Action>
    </>
  );
};

const styles = tw({
  header: `
    flex flex-col gap-1
    uppercase
    text-base
  `,
  title: `
    pr-8
    font-bold
    truncate
  `,
  lid: `
    text-xs
  `,
  update: `
    absolute top-12 right-6 z-10
  `,
});
