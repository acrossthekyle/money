import tw from '@/styles';

export default function Heading({ children }: React.PropsWithChildren) {
  return (
    <h2 className={styles.container}>
      {children}
    </h2>
  );
};

const styles = tw({
  container: `
    flex flex-col gap-1
    text-center

    sm:text-sm
  `,
});
