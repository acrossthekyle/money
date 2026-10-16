import tw from '@/styles';

export default function Subheader({ children }: React.PropsWithChildren) {
  return (
    <span className={styles.container}>
      {children}
    </span>
  );
};

const styles = tw({
  container: `
    font-roboto
    text-xs
    uppercase
    tracking-wider

    md:text-tiny
  `,
});
