import { Calendar, ChevronLeft, ChevronRight, Plus, Undo } from 'lucide-react';

import tw from '@/styles';

type Props = {
  icon: string;
};

export default function Icon({ icon }: Props) {
  if (icon === 'plus') {
    return (
      <Plus className={styles.icon} />
    );
  }

  if (icon === 'undo') {
    return (
      <Undo className={styles.icon} />
    );
  }

  if (icon === 'calendar') {
    return (
      <Calendar className={styles.icon} />
    );
  }

  if (icon === 'right') {
    return (
      <ChevronRight className={styles.icon} />
    );
  }

  return (
    <ChevronLeft className={styles.icon} />
  );
};

const styles = tw({
  icon: `
    w-3 h-3
    stroke-3
    mx-0.25
  `,
});
