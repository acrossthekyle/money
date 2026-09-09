import tw from '@/styles';

export default function Footnote({ children }: React.PropsWithChildren) {
  return (
    <p className={styles.container}>
      {children}
    </p>
  );
};

const styles = tw({
  container: `
    text-current/60
    text-xtiny
    uppercase
    capitalize
  `,
});
