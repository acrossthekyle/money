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
    flex flex-col

    sm:text-sm
  `,
});
