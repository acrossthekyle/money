import tw from '@/styles';

export default function Container({ children }: React.PropsWithChildren) {
  return (
    <form className={styles.container}>{children}</form>
  );
};

const styles = tw({
  container: `
    flex flex-col gap-4
  `,
});
