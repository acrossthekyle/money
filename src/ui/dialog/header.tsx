import { Pen, Plus, X } from 'lucide-react';

import tw from '@/styles';

type Props = {
  icon: 'edit' | 'add';
  onClose: () => void;
};

export default function Header({
  children,
  icon,
  onClose,
}: React.PropsWithChildren<Props>) {
  return (
    <header className={styles.container}>
      <h2 className={styles.header} id="dialog-header">
        <span className={styles.image}>
          {icon === 'add' && <Plus className="stroke-1" />}
          {icon === 'edit' && <Pen className="stroke-1" />}
        </span>
        <span>{children}</span>
      </h2>
      <button className={styles.close} onClick={onClose} type="button">
        <X className={styles.icon} />
      </button>
    </header>
  );
};

const styles = tw({
  container: `
    relative
    flex items-center justify-between
    px-3 py-4
    border-b border-current/17.5
    bg-(--foreground)/2.5
  `,
  header: `
    flex items-center gap-1
    text-base
    truncate
    leading-[1]

    md:text-sm
  `,
  image: `
    flex items-center justify-center
    w-8 h-8
    p-2.25
  `,
  close: `
    absolute top-1/2 right-0.5
    -translate-y-1/2
    p-2
  `,
  icon: `
    w-6 h-6
    stroke-1

    md:w-5
    md:h-5
  `,
});
