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
    relative
    flex flex-col

    after:absolute
    after:left-0
    after:right-0
    after:top-full
    after:z-100
    after:h-6
    after:bg-linear-to-b
    after:from-zinc-50
    dark:after:from-zinc-950
    after:to-transparent
    after:pointer-events-none
  `,
});
