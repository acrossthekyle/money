import tw from '@/styles';

export default function Container({ children }: React.PropsWithChildren) {
  return (
    <li className={styles.container}>
      {children}
    </li>
  );
};

const styles = tw({
  container: `
    relative
    col-span-1
    border border-current/12.5
    rounded-lg
    bg-(--background)
    overflow-hidden
  `,
});
