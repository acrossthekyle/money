import tw from '@/styles';

export default function Container({ children }: React.PropsWithChildren) {
  return (
    <nav aria-label="calendar filters" className={styles.container}>
      {children}
    </nav>
  );
};

const styles = tw({
  container: `
    flex flex-col justify-between gap-4

    md:flex-row
    md:gap-1
  `,
});
