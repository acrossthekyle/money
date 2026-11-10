import tw from '@/styles';

export default function Heading({ children }: React.PropsWithChildren) {
  return (
    <h3 className={styles.container}>{children}</h3>
  );
};

const styles = tw({
  container: `
    sm:text-sm
  `,
});
