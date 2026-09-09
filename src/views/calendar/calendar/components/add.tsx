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
    hidden
    absolute top-1 right-1 z-10
    bg-(--foreground)
    text-(--background)
    border border-(--foreground)/22.5
    p-1.5 py-1.25
    rounded-sm
    opacity-0
    invisible

    xl:block

    motion-safe:duration-300

    group-hover:opacity-100
    group-hover:visible
    hover:bg-(--background)
    hover:text-(--foreground)
  `,
  icon: `
    w-3 h-3
    stroke-3
  `,
});
