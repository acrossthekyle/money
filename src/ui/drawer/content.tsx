import tw from '@/styles';

export default function Content({
  children,
}: React.PropsWithChildren) {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
};

const styles = tw({
  container: `
    flex flex-col
    bg-zinc-50 dark:bg-neutral-950
    text-(--foreground)
    border border-current/12.5
    rounded-3xl
    overflow-y-auto
    h-full
    p-4
  `,
});
