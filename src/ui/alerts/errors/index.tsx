import tw from '@/styles';
import type { FormStateError } from '@/types';

type Props = {
  items: FormStateError[];
  message: string;
};

export default function Errors({ items, message }: Props) {
  if (items.length <= 0) {
    return null;
  }

  return (
    <div aria-live="polite" className={styles.container}>
      <p className={styles.heading}>{message}</p>
      <ul>
        {items.map((item) => (
          <li className={styles.item} key={item.field}>
            <span>•</span>
            <span className={styles.field}>{item.field}:</span>
            <span>{item.error}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = tw({
  container: `
    p-2.5
    mx-4 mb-6
    rounded-md
    border border-red-700
    bg-red-200
    text-xs text-red-700
    font-medium
  `,
  heading: `
    mb-2
    font-medium
    uppercase
  `,
  item: `
    flex items-center gap-1
  `,
  field: `
    capitalize
  `,
});
