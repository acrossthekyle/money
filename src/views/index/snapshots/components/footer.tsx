import tw from '@/styles';

export default function Footer({ children }: React.PropsWithChildren) {
  return (
    <nav
      aria-label="supplementary navigation"
      className={styles.container}
    >
      {children}
    </nav>
  );
};

const styles = tw({
  container: `
    flex flex-row justify-end gap-4
    p-2
    border-t border-current/12.5
    bg-(--foreground)/5
  `,
});
