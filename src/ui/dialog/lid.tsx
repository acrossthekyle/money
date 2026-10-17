import tw from '@/styles';

export default function Lid({ children }: React.PropsWithChildren) {
  return (
    <span className={styles.container}>
      {children}
    </span>
  );
};

const styles = tw({
  container: `
    mt-0.25
    text-xs text-center
    uppercase
    tracking-wide
    font-roboto

    md:text-tiny
  `,
});
