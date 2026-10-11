import tw from '@/styles';

export default function Lower({ children }: React.PropsWithChildren) {
  return (
    <span className={styles.container}>
      {children}
    </span>
  );
};

const styles = tw({
  container: `
    flex justify-between
    font-light
    text-xs text-current/50
    capitalize
  `,
});
