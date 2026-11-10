import {
  Ban,
  CalendarSync,
  CreditCard,
  DollarSign,
  HandCoins,
  Percent,
  Repeat,
  ShoppingCart,
  Stethoscope,
  Umbrella,
  Utensils,
  Zap,
} from 'lucide-react';

import tw from '@/styles';

type Props = {
  type: string;
};

export default function Icon({ type }: Props) {
  if (type === 'subscription') {
    return <CalendarSync className={styles.icon} />
  }

  if (type === 'food') {
    return <Utensils className={styles.icon} />
  }

  if (type === 'income') {
    return <DollarSign className={styles.icon} />
  }

  if (type === 'transfer') {
    return <Repeat className={styles.icon} />
  }

  if (type === 'utility') {
    return <Zap className={styles.icon} />
  }

  if (type === 'health') {
    return <Stethoscope className={styles.icon} />
  }

  if (type === 'insurance') {
    return <Umbrella className={styles.icon} />
  }

  if (type === 'taxes') {
    return <HandCoins className={styles.icon} />
  }

  if (type === 'payment') {
    return <CreditCard className={styles.icon} />
  }

  if (type === 'shopping') {
    return <ShoppingCart className={styles.icon} />
  }

  if (type === 'return') {
    return <Percent className={styles.icon} />
  }

  if (type === 'none') {
    return <Ban className={styles.icon} />
  }

  return null;
};

const styles = tw({
  icon: `
    size-4
    stroke-2

    sm:size-3.5
  `,
});
