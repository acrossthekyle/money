import tw from '@/styles';

export default function Label({ children }: React.PropsWithChildren) {
  return (
    <span className={styles.container}>
      {children}
    </span>
  );
};

const styles = tw({
  container: `
    sm:text-sm
  `,
});
