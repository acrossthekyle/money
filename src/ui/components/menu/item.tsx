'use client';

import tw, { cs } from '@/styles';

import { useModel } from './model';

type Props = {
  isDestructive?: boolean;
  isLast?: boolean;
  onClick: () => void;
};

export default function Item({
  children,
  isDestructive,
  isLast,
  onClick,
}: React.PropsWithChildren<Props>) {
  const { onToggle } = useModel();

  const handleOnClick = () => {
    onToggle();

    onClick();
  };

  return (
    <li className={cs(isLast && styles.divider)}>
      <button
        className={
          cs(
            styles.container,
            isDestructive && styles.destructive,
          )
        }
        onClick={handleOnClick}
        type="button"
      >
        {children}
      </button>
    </li>
  );
};

const styles = tw({
  divider: `
    border-t border-current/12.5
  `,
  container: `
    flex items-center gap-2
    w-full
    p-2
    text-current/92.5
    rounded-s-lg

    motion-safe:duration-300

    hover:bg-(--foreground)/2.5

    [&_svg]:size-3
    [&_svg]:stroke-2
  `,
  destructive: `
    text-red-400
  `,
});
