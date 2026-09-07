import { Plus } from 'lucide-react';

import tw from '@/styles';

type Props = {
  onClick: () => void;
};

export default function Add({ onClick }: Props) {
  return (
    <button className={styles.container} onClick={onClick} type="button">
      <Plus className={styles.icon} />
    </button>
  );
};

const styles = tw({
  container: `
    absolute top-2 right-10
    bg-(--background)
    border border-(--foreground)/22.5
    p-1.25
    rounded-sm
    opacity-0
    invisible

    motion-safe:duration-300
    motion-safe:group-hover:opacity-100
    motion-safe:group-hover:visible
    motion-safe:hover:border-current/62.5
  `,
  icon: `
    w-3 h-3
  `,
});
