import tw, { cs } from '@/styles';

type Props = {
  className?: string;
  level?: 1 | 2;
  lid?: string;
  title: string;
};

export default function Header({
  className = '',
  level = 1,
  lid,
  title,
}: Props) {
  if (level === 1) {
    return (
      <h1 className={styles.header}>
        <span className={cs(styles.title, className)}>{title}</span>
        {!!lid && (
          <span className={cs(styles.lid, className)}>{lid}</span>
        )}
      </h1>
    );
  }

  return (
    <h2 className={styles.header}>
      <span className={cs(styles.title, className)}>{title}</span>
      {!!lid && (
        <span className={cs(styles.lid, className)}>{lid}</span>
      )}
    </h2>
  );
};

const styles = tw({
  header: `
    flex flex-col gap-1
    uppercase
  `,
  title: `
    font-bold
    text-base

    md:text-sm
  `,
  lid: `
    text-sm

    md:text-xs
  `,
});
