import tw from '@/styles';

type Props = {
  hasMore?: boolean;
};

export default function Container({
  children,
  hasMore = false,
}: React.PropsWithChildren<Props>) {
  return (
    <ul
      className={[
        styles.container,
        hasMore && styles.more,
      ].filter(Boolean).join(' ')}
    >
      {children}
    </ul>
  );
};

const styles = tw({
  container: `
    absolute bottom-2 left-2 right-2
    flex flex-col gap-2

    md:gap-1
  `,
  more: `
    bottom-6

    md:bottom-7
    xl:bottom-8
  `,
});
