import tw, { cs } from '@/styles';

type Props = {
  isActive: boolean;
  isMenu?: boolean;
};

export default function Content({
  children,
  isActive,
  isMenu,
}: React.PropsWithChildren<Props>) {
  return (
    <div
      className={
        cs(
          styles.container,
          isMenu ? styles.menu(isActive) : styles.modal(isActive),
        )
      }
    >
      {children}
    </div>
  );
};

const styles = tw({
  container: `
    flex flex-col
    min-h-0
    w-full
    bg-zinc-50
    text-(--foreground)
    border-current/7.5
    overflow-hidden
    overscroll-contain
    pointer-events-auto

    motion-safe:duration-200

    dark:bg-neutral-900

    sm:max-w-sm
  `,
  menu: (isActive: boolean) => tw(`
    ${isActive
      ? `translate-x-0`
      : `-translate-x-full`}

    sm:border-r
  `),
  modal: (isActive: boolean) => tw(`
    rounded-2xl
    ml-auto

    ${isActive
      ? `opacity-100 translate-x-0`
      : `opacity-0 translate-x-24`}

    border
  `),
});
