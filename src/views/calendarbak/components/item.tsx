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
    group
    relative
    flex items-center
  `,
});
