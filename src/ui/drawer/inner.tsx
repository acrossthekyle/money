import tw, { cs } from '@/styles';

type Props = {
  className?: string;
  isCard?: boolean;
  isModal?: boolean;
};

export default function Inner({
  children,
  className = '',
  isCard,
  isModal,
}: React.PropsWithChildren<Props>) {
  return (
    <div
      className={
        cs(
          styles.container,
          className,
          isCard && styles.card,
          isModal && styles.modal,
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
    h-dvh
    w-full
    pointer-events-none
  `,
  card: `
    items-end
    px-2

    sm:p-2
  `,
  modal: `
    px-2

    sm:p-2
  `,
});
