import tw from '@/styles';

export default function Container({ children }: React.PropsWithChildren) {
  return (
    <span className={styles.container}>
      {children}
    </span>
  );
};

const styles = tw({
  container: `
    flex items-center gap-2 shrink-0
    px-3 py-1.25
    rounded-full
    text-sm
    font-medium
    bg-neutral-300/62.5

    dark:bg-neutral-900/62.5

    lg:text-xs
  `,
});
