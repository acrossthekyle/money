import tw from '@/styles';

export default function Exchanges({ children }: React.PropsWithChildren) {
  return (
    <ul className={styles.container}>
      {children}
    </ul>
  );
};

const styles = tw({
  container: `
    absolute bottom-3 right-4
    flex flex-col gap-1.5
    text-right
  `,
});
