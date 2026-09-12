import tw from '@/styles';

type Props = {
  className?: string;
};

export default function Field({
  children,
  className = '',
}: React.PropsWithChildren<Props>) {
  return (
    <div
      className={
        [
          styles.container,
          className,
        ].filter(Boolean).join(' ')
      }
    >
      {children}
    </div>
  );
};

const styles = tw({
  container: `
    relative
    flex flex-col
  `,
});
