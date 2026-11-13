import tw from '@/styles';

export default function field({ children }: React.PropsWithChildren) {
  return (
    <div className={styles.container}>{children}</div>
  );
};

const styles = tw({
  container: `
    flex flex-col gap-1.5
  `,
});
