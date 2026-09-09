import tw from '@/styles';

export default function Name({ children }: React.PropsWithChildren) {
  return (
    <span className={styles.container}>
      {children}
    </span>
  );
};

const styles = tw({
  container: `
    pl-4
    ml-2
    h-2
    whitespace-nowrap
    truncate
    bg-(--foreground)
    rounded-full

    md:bg-transparent
    md:h-auto
    md:ml-0
    xl:pr-4
    xl:pl-0
  `,
});
