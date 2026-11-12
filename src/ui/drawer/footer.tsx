import tw from '@/styles';

export default function Content({
  children,
}: React.PropsWithChildren) {
  return (
    <footer className={styles.container}>
      {children}
    </footer>
  );
};

const styles = tw({
  container: `
    relative
    flex flex-col gap-3
    shrink-0
    p-4 pt-0
    mt-auto

    before:absolute
    before:left-0
    before:right-0
    before:-top-6
    before:z-100
    before:h-6
    before:bg-linear-to-t
    before:from-zinc-50
    before:to-transparent
    before:pointer-events-none

    dark:before:from-neutral-900
  `,
});
