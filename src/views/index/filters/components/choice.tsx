import tw from '@/styles';

type Props = {
  isActive?: boolean;
  onClick: () => void;
};

export default function Button({ children, isActive, onClick }: React.PropsWithChildren) {
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
    border border-current/22.5
    py-1.25 px-1.25

    motion-safe:duration-300
    motion-safe:hover:border-current/62.5
  `,
  active: `
    bg-(--background)
    text-(--foreground)
  `,
});
