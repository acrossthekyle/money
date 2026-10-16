import tw from '@/styles';

export default function Container({ children }: React.PropsWithChildren) {
  return (
    <ul className={styles.container}>
      {children}
    </ul>
  );
};

const styles = tw({
  container: `
    flex flex-col gap-4
    w-full
  `,
});
