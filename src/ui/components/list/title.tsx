import tw from '@/styles';

export default function Title({ children }: React.PropsWithChildren) {
  return (
    <span className={styles.container}>
      {children}
    </span>
  );
};

const styles = tw({
  container: `
    font-medium
    truncate
  `,
});
