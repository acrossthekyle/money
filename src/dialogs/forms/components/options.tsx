import tw, { cs } from '@/styles';

type Props = {
  className?: string;
};

export default function Options({
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
    flex justify-center gap-1
    flex-wrap
    px-4 mb-2

    md:gap-2.5
  `,
});
