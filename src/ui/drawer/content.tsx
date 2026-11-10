import tw, { cs } from '@/styles';

type Props = {
  isMenu?: boolean;
};

export default function Content({
  children,
  isMenu,
}: React.PropsWithChildren<Props>) {
  return (
    <div className={cs(styles.container, isMenu ? styles.menu : styles.modal)}>
      {children}
    </div>
  );
};

const styles = tw({
  container: `
    flex flex-col
    bg-zinc-50 dark:bg-neutral-950
    text-(--foreground)
    h-full
    p-4
    border-current/12.5
  `,
  menu: `
    sm:border-r
  `,
  modal: `
    sm:border
    rounded-3xl
  `,
});
