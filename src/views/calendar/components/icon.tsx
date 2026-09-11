import { Calendar, ChevronLeft, ChevronRight, Plus, Undo } from 'lucide-react';

import tw from '@/styles';

type Props = {
  canDim?: boolean;
  icon: string;
};

export default function Icon({ canDim = false, icon }: Props) {
  const classes = [
    styles.icon,
    canDim && styles.dim,
  ].filter(Boolean).join(' ');

  if (icon === 'plus') {
    return (
      <Plus className={classes} />
    );
  }

  if (icon === 'undo') {
    return (
      <Undo className={classes} />
    );
  }

  if (icon === 'calendar') {
    return (
      <Calendar className={`${classes} ${styles.small}`} />
    );
  }

  if (icon === 'right') {
    return (
      <ChevronRight className={classes} />
    );
  }

  return (
    <ChevronLeft className={classes} />
  );
};

const styles = tw({
  icon: `
    w-3 h-3
    stroke-3
    mx-0.25
  `,
  small: `
    !stroke-2
  `,
  dim: `
    stroke-current/30
  `,
});
