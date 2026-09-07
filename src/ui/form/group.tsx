import tw from '@/styles';

export default function Group({ children }: React.PropsWithChildren) {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
};

const styles = tw({
  container: `
    flex flex-col justify-between gap-4
    w-full

    sm:flex-row
  `,
});
