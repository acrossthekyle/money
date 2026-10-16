import tw from '@/styles';

export default function Logo() {
  return (
    <span className={styles.container}>
      Basalt
    </span>
  );
};

const styles = tw({
  container: `
    absolute left-1/2
    -translate-x-1/2
    text-2xl
    font-lobster
    tracking-wide

    md:text-lg
  `,
  icon: `
    w-4 h-4
    stroke-2
  `,
});
