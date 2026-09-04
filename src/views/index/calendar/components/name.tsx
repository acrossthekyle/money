import tw from '@/styles';

export default function Name({ children }: React.PropsWithChildren) {
  return (
    <span className={styles.container}>
      {children}
    </span>
  );
};

const styles = tw({
  container: `
    block
    pr-4
    whitespace-nowrap
    truncate
  `,
});
