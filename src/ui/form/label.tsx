import tw from '@/styles';

type Props = {
  id: string;
  isNormal?: boolean;
};

export default function Label({ children, id, isNormal }: React.PropsWithChildren<Props>) {
  return (
    <label className={styles.container(isNormal)} htmlFor={id}>
      {children}
    </label>
  );
};

const styles = {
  container: (isNormal?: boolean) => tw(`
    text-tiny
    uppercase
    ${isNormal ? 'font-medium' : 'font-black'}
  `),
};
