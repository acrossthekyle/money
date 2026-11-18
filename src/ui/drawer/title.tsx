import tw from '@/styles';

export default function Title({ children }: React.PropsWithChildren) {
  return (
    <h2 className={styles.container} id="drawer-header">
      {children}
    </h2>
  );
};

const styles = tw({
  container: `
    pt-0.25 px-4 pb-4.25
    -mx-4
    border-b border-current/7.5
  `,
});
