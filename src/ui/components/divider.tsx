import tw from '@/styles';

export default function Divider() {
  return (
    <div className={styles.container} />
  );
};

const styles = tw({
  container: `
    shrink-0
    relative
    w-full
    mt-8
    h-px
    border-t border-dashed
    opacity-50
  `,
});
