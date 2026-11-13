import tw from '@/styles';

export default function Title({ children }: React.PropsWithChildren) {
  return (
    <h3 className={styles.container}>
      {children}
    </h3>
  );
};

const styles = tw({
  container: `
    flex items-center gap-3

    [&_svg]:shrink-0
    [&_svg]:size-3
    [&_svg]:stroke-2
  `,
})
