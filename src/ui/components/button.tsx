import tw from '@/styles';

type Props = {
  isDisabled?: boolean;
};

export default function Button({
  children,
  isDisabled,
}: React.PropsWithChildren<Props>) {
  return (
    <button className={styles.container} disabled={isDisabled} type="submit">
      {children}
    </button>
  );
};

const styles = tw({
  container: `
    relative
    px-5 py-3
    bg-(--foreground)
    text-(--background)
    rounded-full
    uppercase
    text-xs
    font-black

    motion-safe:duration-300

    hover:bg-(--foreground)/95
  `,
});
