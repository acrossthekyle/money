import tw, { cs } from '@/styles';

type Props = {
  className?: string;
};

export default function Header({
  children,
  className,
}: React.PropsWithChildren<Props>) {
  return (
    <h2 className={cs(styles.container, className)}>
      {children}
    </h2>
  );
};

const styles = tw({
  container: `
    block
    mb-1
    text-center text-base
    w-full

    md:text-sm
  `,
});
