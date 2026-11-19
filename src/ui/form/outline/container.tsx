import tw from '@/styles';

export default function Container({ children }: React.PropsWithChildren) {
  return (
    <ul className={styles.container}>
      {children}
    </ul>
  );
};

const styles = tw({
  container: `
    flex flex-col gap-0
    mt-1
    divide-y-2 divide-zinc-50
    w-full
    rounded-xl
    bg-neutral-200/62.5

    dark:divide-neutral-900
    dark:bg-neutral-800/62.5
  `,
});
