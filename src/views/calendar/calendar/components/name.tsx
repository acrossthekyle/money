import tw from '@/styles';

export default function Name({ children }: React.PropsWithChildren) {
  return (
    <span className={styles.container}>
      {children}
    </span>
  );
};

const styles = tw({
  container: `
    hidden
    pl-4
    whitespace-nowrap
    truncate

    md:block
    md:h-auto
    lg:pl-0
    lg:pr-2
  `,
});
