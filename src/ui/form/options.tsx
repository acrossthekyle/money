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
    flex flex-col gap-2
  `,
});
