import tw from '@/styles';

export default function Footer({ children }: React.PropsWithChildren) {
  return (
    <nav
      aria-label="account/asset supplementary actions"
      className={styles.container}
    >
      {children}
    </nav>
  );
};

const styles = tw({
  container: `
    flex flex-row justify-between gap-4
    p-3
    border-t border-current/7.5
    bg-(--foreground)/5
  `,
});
