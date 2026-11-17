import tw, { cs } from '@/styles';

type Props = {
  isActive: boolean;
  isMenu?: boolean;
  isDecked?: boolean;
};

export default function Content({
  children,
  isActive,
  isDecked = false,
  isMenu,
}: React.PropsWithChildren<Props>) {
  return (
    <div
      className={cs(
        styles.container,
        isMenu ? styles.menu(isActive) : styles.modal(isActive, isDecked),
      )}
    >
      {children}
    </div>
  );
}

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
    origin-right

    motion-safe:transition-all motion-safe:duration-200

    dark:bg-neutral-900

    sm:max-w-sm
  `,
  menu: (isActive: boolean) => tw(`
    ${isActive
      ? `translate-x-0`
      : `-translate-x-full`}

    sm:border-r
  `),
  modal: (isActive: boolean, isDecked: boolean) => tw(`
    rounded-2xl
    ml-auto
    border

    ${!isActive && `opacity-0 translate-x-24 scale-100`}
    ${isActive && !isDecked && `opacity-100 translate-x-0 scale-100`}
    ${isActive && isDecked && `opacity-100 -translate-x-13 scale-90`}
  `),
});
