import tw from '@/styles';

export default function Alert({ children }: React.PropsWithChildren) {
  return (
    <span className={styles.container}>
      {children}
    </span>
  );
};

const styles = tw({
  container: `
    mt-3
    px-8
    text-xs text-center
    leading-[1.5]
    uppercase
    font-roboto

    md:text-tiny
  `,
});
