import tw from '@/styles';

export default function Content({ children }: React.PropsWithChildren) {
  return (
    <p className={styles.container}>
      {children}
    </p>
  );
};

const styles = tw({
  container: `
    pl-6
    text-current/82.5

    dark:text-current/62.5
  `,
})
