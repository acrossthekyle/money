import tw, { cs } from '@/styles';

type Props = {
  className?: string;
};

export default function Header({
  children,
  className,
}: React.PropsWithChildren<Props>) {
  return (
    <h3 className={cs(styles.container, className)}>
      {children}
    </h3>
  );
};

const styles = tw({
  container: `
    mb-1

    sm:text-sm
  `,
});
