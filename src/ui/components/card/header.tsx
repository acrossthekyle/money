import tw, { cs } from '@/styles';

type Props = {
  level?: number;
};

export default function Header({
  children,
  level = 2,
}: React.PropsWithChildren<Props>) {
  if (level === 1) {
    return (
      <h1 className={cs(styles.container, styles.one)}>
        {children}
      </h1>
    );
  }

  return (
    <h2 className={cs(styles.container, styles.two)}>
      {children}
    </h2>
  );
};

const styles = tw({
  container: `
    flex flex-col
  `,
  one: `
    gap-1
    text-lg
    font-medium
    leading-[1]

    sm:text-base
  `,
  two: `
    sm:text-sm
  `,
});
