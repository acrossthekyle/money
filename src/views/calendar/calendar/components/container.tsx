import tw from '@/styles';

export default function Container({ children }: React.PropsWithChildren) {
  return (
    <section aria-label="calendar" className={styles.container}>
      <ul className={styles.content}>{children}</ul>
    </section>
  );
};

const styles = tw({
  container: `
    h-full
    w-full
    pt-4

    md:h-[calc(100svh-7.75rem)]
  `,
  content: `
    grid grid-cols-7
    h-auto
    w-full
    bg-(--foreground)/2.5 dark:bg-(--foreground)/5.5
    border border-current/7.5
    rounded-lg

    md:h-full

    *:nth-[7n]:border-r-0
    [&>li:nth-last-child(-n+7)]:border-b-0
  `,
});
