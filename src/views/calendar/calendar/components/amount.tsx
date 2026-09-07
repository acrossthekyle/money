import tw from '@/styles';

type Props = {
  type: string;
};

export default function Amount({ children, type }: React.PropsWithChildren<Props>) {
  return (
    <span className={`${styles.container} ${type === 'credit' ? styles.credit : styles.debit}`}>
      ${children}
    </span>
  );
};

const styles = tw({
  container: `
    font-mono
    text-xs
  `,
  credit: `
    text-teal-400
  `,
  debit: `
    text-red-400
  `,
});
