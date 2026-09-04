import tw from '@/styles';

type Props = {
  isFaded: boolean;
};

export default function More({ children, isFaded }: React.PropsWithChildren<Props>) {
  return (
    <li className={`${styles.container} ${isFaded ? styles.faded : ''}`.trim()}>
      {children}
    </li>
  );
};

const styles = tw({
  container: `
    flex items-center justify-between
    text-sm
    p-1.5 py-0.75
    leading-[1]
  `,
  faded: `
    opacity-33
    pointer-events-none
  `,
});
