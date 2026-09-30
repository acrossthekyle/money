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
    mt-3 pb-2
  `,
  header: `
    text-base
    uppercase
    truncate

    md:text-sm
  `,
  close: `
    absolute top-1/2 -right-3
    -translate-y-1/2
    -mt-1
    p-2
  `,
  icon: `
    w-6 h-6
    stroke-1

    md:w-5
    md:h-5
    md:stroke-2
  `,
});
