import {
  Banknote,
  CreditCard,
  Egg,
  LandPlot,
  PiggyBank,
  Plus,
} from 'lucide-react';

import tw from '@/styles';

type Props = {
  type: string;
};

function Icon({ type }: Props) {
  if (type === 'credit_card') {
    return <CreditCard className={styles.icon} />
  }

  if (type === 'checking') {
    return <Banknote className={styles.icon} />
  }

  if (type === 'savings') {
    return <PiggyBank className={styles.icon} />
  }

  if (type === 'property') {
    return <LandPlot className={styles.icon} />
  }

  if (type === 'retirement') {
    return <Egg className={styles.icon} />
  }

  if (type === 'plus') {
    return <Plus className={styles.icon} />
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
    w-6 h-10
  `,
  icon: `
    size-4
    stroke-2
  `,
});
