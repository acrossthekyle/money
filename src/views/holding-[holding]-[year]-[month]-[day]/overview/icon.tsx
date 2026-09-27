import { CreditCard, HandCoins, Landmark, LandPlot, Receipt } from 'lucide-react';

import tw from '@/styles';
import type { Holding } from '@/types'

type Props = {
  holding: Holding;
};

export default function Icon({ holding }: Props) {
  if (holding.type === 'credit_card') {
    return (
      <CreditCard className={styles.icon} />
    );
  }

  if (holding.type === 'savings') {
    return (
      <HandCoins className={styles.icon} />
    );
  }

  if (holding.type === 'property') {
    return (
      <LandPlot className={styles.icon} />
    );
  }

  if (holding.type === 'retirement') {
    return (
      <Receipt className={styles.icon} />
    );
  }

  return (
    <Landmark className={styles.icon} />
  );
};

const styles = tw({
  icon: `
    w-4.25 h-4.25
    stroke-2
  `,
});
