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
    h-23
    border-r border-b border-current/7.5

    md:h-full
  `,
  hover: `
    motion-safe:duration-300

    hover:bg-(--foreground)/2.5
    dark:hover:bg-(--foreground)/7.5
  `,
  highlighted: `
    !bg-(--foreground)/7.5 dark:!bg-(--foreground)/10.5
  `,
});
