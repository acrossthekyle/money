import tw from '@/styles';

type Props = {
  action: React.ComponentProps<'form'>['action'];
  ref?: React.Ref<HTMLFormElement>;
};

export default function Form({
  action,
  children,
  ref,
}: React.PropsWithChildren<Props>) {
  return (
    <form action={action} className={styles.container} ref={ref}>
      {children}
    </form>
  );
};

const styles = tw({
  container: `
    flex flex-col gap-5
  `,
});
