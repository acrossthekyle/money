import tw from '@/styles';

export default function Footer({ children }: React.PropsWithChildren) {
  return (
    <footer className={styles.container}>
      {children}
    </footer>
  );
};

const styles = tw({
  container: `
    w-full
    px-6 pb-6
  `,
});
