import tw, { cs } from '@/styles';

type Props = {
  className?: string;
  isMenu?: boolean;
};

export default function Inner({
  children,
  className = '',
  isMenu,
}: React.PropsWithChildren<Props>) {
  return (
    <div
      className={
        cs(
          styles.container,
          className,
          !isMenu && styles.modal,
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
    flex
    w-full
    h-dvh
    pointer-events-none
  `,
  modal: `
    p-2
  `,
});
