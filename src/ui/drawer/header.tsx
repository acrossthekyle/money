import tw, { cs } from '@/styles';

type Props = {
  className?: string;
};

export default function Header({
  children,
  className,
}: React.PropsWithChildren<Props>) {
  return (
    <header className={cs(styles.container, className)}>
      {children}
    </header>
  );
};

const styles = tw({
  container: `
    flex flex-col
    mb-6
  `,
});
