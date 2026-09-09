import tw from '@/styles';

export default function Faded({ children }: React.PropsWithChildren) {
  return (
    <span className={styles.faded}>{children}</span>
  );
};

const styles = tw({
  faded: `
    text-current/50
  `,
});
