import tw from '@/styles';

type Props = {
  percent: number;
};

export default function Bar({
  percent,
}: Props) {
  return (
    <div className={styles.container} style={{ width: `${percent}%`}} />
  );
};

const styles = tw({
  container: `
    bg-(--foreground)/82.5
    h-1

    motion-safe:duration-300
  `,
})
