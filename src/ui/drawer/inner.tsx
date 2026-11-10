import tw, { cs } from '@/styles';

type Props = {
  className?: string;
  isActive?: boolean;
  isMenu?: boolean;
};

export default function Inner({
  children,
  className = '',
  isActive,
  isMenu,
}: React.PropsWithChildren<Props>) {
  return (
    <div
      className={
        cs(
          styles.container,
          className,
          isMenu ? styles.menu(isActive) : styles.modal(isActive),
        )
      }
    >
      {children}
    </div>
  );
}

const styles = tw({
  container: `
    relative
    flex flex-col justify-between
    w-full
    h-svh

    motion-safe:duration-300
  `,
  menu: (isActive: boolean) => tw(`
    sm:max-w-sm

    ${isActive
      ? `opacity-100 translate-x-0`
      : `opacity-0 -translate-x-24`}
  `),
  modal: (isActive: boolean) => tw(`
    left-1/2 -translate-x-1/2

    sm:p-2
    sm:max-w-100

    ${isActive
      ? `opacity-100 translate-y-0`
      : `opacity-0 translate-y-24`}
  `),
});
