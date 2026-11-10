import tw from '@/styles';

export default function Hint({ children }: React.PropsWithChildren) {
  return (
    <span className={styles.container}>{children}</span>
  );
};

const styles = tw({
  container: `
    text-current/62.5

    sm:text-sm
  `,
});
