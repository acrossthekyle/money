import tw from '@/styles';

export default function Empty() {
  return (
    <li className={styles.item}>
      <span className={styles.square}>
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
  square: `
    flex items-center justify-center
    w-9 h-9
    bg-(--foreground)
    text-(--background)
    rounded-md
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
