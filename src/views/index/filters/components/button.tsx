import tw from '@/styles';

type Props = {
  isActive?: boolean;
  onClick: () => void;
};

export default function Button({ children, isActive, onClick }: React.PropsWithChildren<Props>) {
  return (
    <button
      className={`${styles.container} ${isActive ? styles.active : ''}`.trim()}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
};

const styles = tw({
  container: `
    flex items-center gap-1
    rounded-full
    bg-(--background)
    border border-current/22.5
    p-1.25 px-2

    motion-safe:duration-300
    motion-safe:hover:border-current/62.5
  `,
  active: `
    bg-(--background)
    text-(--foreground)
  `,
});
