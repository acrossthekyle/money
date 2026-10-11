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

function Icon({ type }: Props) {
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

export default function Avatar({ type }: Props) {
  return (
    <span className={styles.container}>
      <Icon type={type} />
    </span>
  );
};

const styles = tw({
  container: `
    relative
    w-10 h-10
    border border-current/12
    bg-(--background)
    rounded-md
  `,
  icon: `
    absolute top-1/2 left-1/2
    -translate-y-1/2 -translate-x-1/2
    stroke-1
    w-5 h-5
  `,
});
