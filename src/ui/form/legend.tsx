import tw from '@/styles';

export default function Legend({ children }: React.PropsWithChildren) {
  return (
    <p className={styles.container}>{children}</p>
  );
};

const styles = tw({
  container: `
    sm:text-sm
  `,
});
