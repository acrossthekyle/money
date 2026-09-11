import tw from '@/styles';

export default function Header({ children }: React.PropsWithChildren) {
  return (
    <h2 className={styles.container}>
      {children}
    </h2>
  );
};

const styles = tw({
  container: `
    pr-16
    font-black
    text-xl
    truncate

    md:text-lg
  `,
});
