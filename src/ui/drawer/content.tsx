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
    bg-(--background)
    text-(--foreground)
    border-current/12.5
    overflow-hidden
    overscroll-contain
    pointer-events-auto

    motion-safe:duration-300

    sm:max-w-sm
    sm:bg-zinc-50
    sm:dark:bg-neutral-900
  `,
  menu: (isActive: boolean) => tw(`
    ${isActive
      ? `translate-x-0`
      : `-translate-x-full`}

    sm:border-r
  `),
  modal: (isActive: boolean) => tw(`
    rounded-3xl
    ml-auto

    ${isActive
      ? `opacity-100 translate-y-0 sm:translate-y-0 sm:translate-x-0`
      : `opacity-0 translate-y-24 sm:translate-y-0 sm:translate-x-24`}

    border
  `),
});
