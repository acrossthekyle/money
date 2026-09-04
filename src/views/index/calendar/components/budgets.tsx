import tw from '@/styles';

export default function Container({ children }: React.PropsWithChildren) {
  return (
    <ul className={styles.container}>{children}</ul>
  );
};

const styles = tw({
  container: `
    absolute bottom-2 left-2 right-2
    flex flex-col gap-2
  `,
});
