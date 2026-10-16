import tw, { cs } from '@/styles';

type Props = {
  className?: string;
};

export default function Content({
  children,
  className,
}: React.PropsWithChildren<Props>) {
  return (
    <div className={cs(styles.container, className)}>
      {children}
    </div>
  );
};

const styles = tw({
  container: `
    relative
    flex flex-col items-center
    px-4
  `,
});
