import tw, { cs } from '@/styles';

type Props = {
  isActive: boolean;
  isCard?: boolean;
  isDecked?: boolean;
  isMenu?: boolean;
  isModal?: boolean;
};

export default function Content({
  children,
  isActive,
  isCard,
  isDecked = false,
  isMenu,
  isModal,
}: React.PropsWithChildren<Props>) {
  return (
    <div
      className={cs(
        styles.container,
        isMenu && styles.menu(isActive, isDecked),
        isModal && styles.modal(isActive, isDecked),
        isCard && styles.card(isActive, isDecked),
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

    motion-safe:transition-all

    dark:bg-neutral-900
  `,
  card: (isActive: boolean, isDecked: boolean) => tw(`
    relative left-1/2
    -translate-x-1/2
    rounded-2xl
    border
    origin-bottom

    motion-safe:duration-300

    ${!isActive && `opacity-0 scale-95 translate-y-24`}
    ${isActive && !isDecked && `opacity-100 scale-100 translate-y-0`}
    ${isActive && isDecked && `opacity-0 scale-95 translate-y-24`}

    sm:max-w-sm
  `),
  menu: (isActive: boolean, isDecked: boolean) => tw(`
    origin-left

    motion-safe:duration-200

    ${!isActive && `-translate-x-full`}
    ${isActive && !isDecked && `translate-x-0`}
    ${isActive && isDecked && `-translate-x-full`}

    sm:border-r
    sm:max-w-sm
  `),
  modal: (isActive: boolean, isDecked: boolean) => tw(`
    rounded-2xl
    ml-auto
    border
    origin-right

    motion-safe:duration-200

    ${!isActive && `opacity-0 translate-x-24 scale-100`}
    ${isActive && !isDecked && `opacity-100 translate-x-0 scale-100`}
    ${isActive && isDecked && `opacity-100 -translate-x-13 scale-90`}

    sm:max-w-sm
  `),
});
