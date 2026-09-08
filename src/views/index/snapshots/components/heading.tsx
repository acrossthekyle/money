import tw from '@/styles';

export default function Heading({ children }: React.PropsWithChildren) {
  return (
    <h2 className={styles.container}>{children}</h2>
  );
};

const styles = tw({
  container: `
    p-4 pb-0
    font-black
    uppercase
    text-tiny
  `,
});
