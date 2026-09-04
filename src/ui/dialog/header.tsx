import { X } from 'lucide-react';

import tw from '@/styles';

type Props = {
  onClose: () => void;
};

export default function Header({ children, onClose }: React.PropsWithChildren<Props>) {
  return (
    <header className={styles.container}>
      <h2 className={styles.header} id="dialog-header">
        {children}
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
    px-4 py-2 mb-4
    border-b border-current/12.5
    bg-(--foreground)/5
  `,
  header: `
    font-black
    text-xs
    uppercase
  `,
  close: `
    p-2
  `,
  icon: `
    w-4 h-4
    stroke-2
  `,
});
