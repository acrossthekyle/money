import tw from '@/styles';

export default function Items({ children }: React.PropsWithChildren) {
  return (
    <ul className={styles.container}>
      {children}
    </ul>
  );
};

const styles = tw({
  container: `
    flex items-center gap-2
  `,
});
