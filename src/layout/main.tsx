import tw, { cs } from '@/styles';

type Props = {
  className?: string;
};

export default function Main({ children, className }: React.PropsWithChildren<Props>) {
  return (
    <main className={cs(styles.container, className)}>
      {children}
    </main>
  );
};

const styles = tw({
  container: `
    relative
    flex flex-col gap-6
    w-full max-w-sm
    mx-auto
    p-3 pb-6

    md:p-6
    md:pt-0
  `,
});
