import tw from '@/styles';

export default function Title({ children }: React.PropsWithChildren) {
  return (
    <span className={styles.container}>
      {children}
    </span>
  );
};

const styles = tw({
  container: `
    relative
    text-xs text-center
    uppercase
    font-roboto

    md:text-tiny
  `,
});
