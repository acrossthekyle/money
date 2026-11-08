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
    flex-1
    flex flex-col justify-between
    bg-(--foreground)/7.5
    text-(--foreground)
    overflow-y-auto
    border border-current/12.5
    rounded-3xl
    p-4
  `,
});
