import tw from '@/styles';

export default function Heading({ children }: React.PropsWithChildren) {
  return (
    <h3 className={styles.container}>
      {children}
    </h3>
  );
};

const styles = tw({
  container: `
    flex flex-col gap-1
    min-w-0
    pr-4
  `,
});
