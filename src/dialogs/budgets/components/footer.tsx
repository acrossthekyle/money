import tw from '@/styles';

export default function Footer({ children }: React.PropsWithChildren) {
  return (
    <span className={styles.container}>
      {children}
    </span>
  );
};

const styles = tw({
  container: `
    text-tiny text-center text-current/80
    uppercase
    tracking-wide
    font-roboto
    px-16

    md:text-xtiny
  `,
});
