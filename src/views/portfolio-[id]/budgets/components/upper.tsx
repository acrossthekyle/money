import tw  from '@/styles';

export default function Upper({ children }: React.PropsWithChildren) {
  return (
    <span className={styles.container}>
      {children}
    </span>
  );
};

const styles = tw({
  container: `
    flex justify-between gap-4
    min-w-0
    font-medium
  `,
});
