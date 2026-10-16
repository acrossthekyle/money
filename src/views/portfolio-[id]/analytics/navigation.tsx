'use client';

import tw from '@/styles';
import type { Dateable } from '@/types';

import { CalendarNavigation } from '../components';

type Props = {
  date: Dateable;
  onClick: (dateable: Dateable, view: string) => void;
};

export default function Navigation({
  date,
  onClick,
}: Props) {
  return (
    <div className={styles.container}>
      <CalendarNavigation date={date} onClick={onClick} view="analytics" />
    </div>
  );
};

const styles = tw({
  container: `
    relative
    border-b border-current/12
  `,
});
