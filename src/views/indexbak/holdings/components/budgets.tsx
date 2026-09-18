import tw from '@/styles';

export default function Budgets({ children }: React.PropsWithChildren) {
  return (
    <p className={styles.container}>
      {children}
    </p>
  );
};

const styles = tw({
  container: `
    mt-4 pr-20
    text-tiny
    font-medium
    uppercase
    truncate
    leading-[1]
  `,
});
