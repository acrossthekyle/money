import tw from '@/styles';

export default function Text({ children }: React.PropsWithChildren) {
  return (
    <span className={styles.container}>
      {children}
    </span>
  );
};

const styles = tw({
  container: `
    block
    pl-1
    text-tiny
    whitespace-nowrap
    uppercase
    leading-[1]
    tracking-wide
  `,
});
