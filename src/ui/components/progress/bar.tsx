import tw from '@/styles';

export default function Bar({
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
    relative
    flex items-center
    w-full
    h-1
    bg-(--foreground)/5.5
    rounded-full
    overflow-hidden
  `,
})
