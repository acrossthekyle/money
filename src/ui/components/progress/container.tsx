import tw from '@/styles';

export default function Container({
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
    mt-4 mb-1
    w-full
    h-1
    bg-(--foreground)/5.5
    rounded-full
    overflow-hidden
  `,
})
