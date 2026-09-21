import tw from '@/styles';

export default function Empty() {
  return (
    <li className={styles.item}>
      <span className={styles.date}>
        --
      </span>
      <p className={styles.content}>
        <span className={styles.name}>---</span>
      </p>
    </li>
  );
};

const styles = tw({
  item: `
    relative
    flex gap-4
    w-full
    text-left
  `,
  date: `
    flex items-center justify-center shrink-0
    w-9 h-9
    bg-(--foreground)
    text-(--background) text-sm
    rounded-full
  `,
  content: `
    flex flex-col justify-center gap-2
  `,
  name: `
    leading-[1]
    text-sm
    font-medium
  `,
});
