import tw, { cs } from '@/styles';

type Props = {
  className?: string;
};

export default function Body({
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
    flex-1
    overflow-y-auto
    p-4
  `,
});
