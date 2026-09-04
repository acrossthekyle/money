import tw from '@/styles';

type Props = {
  isFaded: boolean;
  isHighlighted: boolean;
};

export default function Cell({
  children,
  isFaded,
  isHighlighted,
}: React.PropsWithChildren<Props>) {
  return (
    <li
      className={[
        styles.container,
        !isFaded && styles.hover,
        isHighlighted && styles.highlighted,
      ].filter(Boolean).join(' ')}
    >
      {children}
    </li>
  );
};

const styles = tw({
  container: `
    group
    relative
    border-r border-b border-current/22.5
  `,
  hover: `
    motion-safe:duration-300
    motion-safe:hover:bg-(--foreground)/2.5
    motion-safe:dark:hover:bg-(--foreground)/7.5
  `,
  highlighted: `
    !bg-(--foreground)/7.5 dark:!bg-(--foreground)/10.5
  `,
});
