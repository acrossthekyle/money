import tw from '@/styles';

export default function Container({ children }: React.PropsWithChildren) {
  return (
    <li className={styles.container}>
      {children}
    </li>
  );
};

const styles = tw({
  container: `
    relative
    col-span-1
    rounded-2xl
    bg-(--foreground)/2.5 dark:bg-(--foreground)/5.5
    border border-current/7.5
    overflow-hidden
  `,
});
