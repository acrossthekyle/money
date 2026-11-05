import tw from '@/styles';

type Props = {
  years: number[];
};

export default function Heading({ years }: Props) {
  return (
    <h1 className={styles.header}>
      {years[0]} &mdash; {years[years.length - 1]}
    </h1>
  );
};

const styles = tw({
  header: `
    font-semibold
    text-lg
    leading-[1]
  `,
})
