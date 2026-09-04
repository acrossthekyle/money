import { DollarSign } from 'lucide-react';

import tw from '@/styles';

type Props = {
  icon: string;
};

export default function Prefix({ icon }: Props) {
  if (icon === 'money') {
    return (
      <DollarSign className={styles.icon} />
    );
  }

  return null;
};

const styles = tw({
  icon: `
    absolute top-8.75 left-2
    w-3.5 h-3.5
    stroke-2
    pointer-events-none
  `,
});
