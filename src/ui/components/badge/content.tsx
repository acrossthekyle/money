import tw, { cs } from '@/styles';

type Props = {
  isDanger?: boolean;
};

export default function Content({
  children,
  isDanger = false,
}: React.PropsWithChildren<Props>) {
  return (
    <span className={cs(isDanger && styles.danger)}>{children}</span>
  );
};

const styles = tw({
  danger: `
    text-red-500

    dark:text-rose-400
  `,
});
