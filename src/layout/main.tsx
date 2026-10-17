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
    flex flex-col gap-4
    w-full
    mx-auto
    p-4 pt-5

    sm:max-w-sm
    md:p-6
    md:pt-4
    md:gap-4
  `,
});
