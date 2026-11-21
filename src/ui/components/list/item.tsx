import tw from '@/styles';

export default function Item({ children }: React.PropsWithChildren) {
  return (
    <li className={styles.container}>
      {children}
    </li>
  );
};

const styles = tw({
  container: `
    relative
    flex items-center justify-between
  `,
});
