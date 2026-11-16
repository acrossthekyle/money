import tw from '@/styles';

export default function Container({ children }: React.PropsWithChildren) {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
};

const styles = tw({
  container: `
    relative
    flex flex-col gap-4
    p-4
    rounded-xl
    bg-zinc-50
    border border-current/7.5

    dark:bg-neutral-900
  `,
});
