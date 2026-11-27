import tw from '@/styles';

export default function Footer({ children }: React.PropsWithChildren) {
  return (
    <p className={styles.container}>
      {children}
    </p>
  );
};

const styles = tw({
  container: `
    text-center text-current/62.5

    sm:text-sm
  `,
});
