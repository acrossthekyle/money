import tw from '@/styles';

export default function Date({ children }: React.PropsWithChildren) {
  return (
    <span className={styles.container}>As of Today: {children}</span>
  );
};

const styles = tw({
  container: `
    text-xtiny text-current/50
    uppercase
  `,
});
