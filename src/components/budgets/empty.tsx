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
  spacer: `
    w-9 h-9
  `,
  content: `
    flex flex-col justify-center gap-2
  `,
  name: `
    leading-[1]
    text-sm
    font-medium
  `,
  amount: `
    leading-[1]
    font-roboto
    text-xs
  `,
  pen: `
    absolute top-1/2 right-0
    -translate-y-1/2
    w-4 h-4
    stroke-1
  `,
  add: `
    flex items-center justify-center
    w-9 h-9
    mt-4
    border border-current/22.5
    rounded-md
  `,
  plus: `
    h-4 w-4
    stroke-2
  `,
  negative: `
    text-red-500
  `,
  positive: `
    text-green-500
  `,
});
