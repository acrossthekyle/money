import tw from '@/styles';

export default function Content({ children }: React.PropsWithChildren) {
  return (
    <span className={styles.container}>
      {children}
    </span>
  );
};

const styles = tw({
  container: `
    flex-1
    flex flex-col gap-1
    min-w-0
    text-base text-left

    md:text-sm
  `,
});
