import tw from '@/styles';

type Props = {
  action: (data: FormData) => void;
  id: string;
};

export default function Container({
  action,
  children,
  id,
}: React.PropsWithChildren<Props>) {
  return (
    <form action={action} className={styles.container} id={id}>
      {children}
    </form>
  );
};

const styles = tw({
  container: `
    w-full
  `,
});
