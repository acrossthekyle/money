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
    hidden
    whitespace-nowrap
    truncate

    md:block
  `,
});
