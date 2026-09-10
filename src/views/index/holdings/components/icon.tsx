import { ChevronRight, Pen, Plus } from 'lucide-react';

import tw from '@/styles';

type Props = {
  name: string;
};

export default function Icon({ name }: Props) {
  if (name === 'pen') {
    return <Pen className={styles.small} />;
  }

  if (name === 'plus') {
    return <Plus className={styles.icon} />;
  }

  if (name === 'right') {
    return <ChevronRight className={styles.icon} />;
  }

  return null;
};

const styles = tw({
  icon: `
    w-2.5 h-2.5
    stroke-3
  `,
  small: `
    w-2 h-2
    stroke-3
  `,
});
