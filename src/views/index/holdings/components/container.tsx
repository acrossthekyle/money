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
    flex flex-col justify-between
    w-full
    rounded-lg
    border border-current/12.5
    bg-(--background)
    overflow-hidden
  `,
});
