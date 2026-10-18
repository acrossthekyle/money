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
    text-xl text-center
    uppercase
    font-light

    md:text-sm
    md:font-normal
  `,
});
