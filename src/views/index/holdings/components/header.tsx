import tw from '@/styles';

export default function Header({ children }: React.PropsWithChildren) {
  return (
    <h2 className={styles.container}>
      {children}
    </h2>
  );
};

const styles = tw({
  container: `
    pr-18
    mb-0.5
    font-black
    text-xl
    truncate
    leading-[1]

    md:text-lg
  `,
});
