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
    h-[calc(100svh-10.75rem)]
    w-full
    p-4
    overflow-x-auto

    md:h-[calc(100svh-5.75rem)]
  `,
  content: `
    grid grid-cols-7
    h-auto
    w-full
    bg-(--background)
    border border-current/22.5
    rounded-lg

    md:h-full

    *:nth-[7n]:border-r-0
    [&>li:nth-last-child(-n+7)]:border-b-0
  `,
});
