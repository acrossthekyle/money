import { Dialogs } from '@/dialogs';
import tw from '@/styles';

type Props = {
  data: {
    netWorth: number;
  };
};

export default function Main({
  children,
  data,
}: React.PropsWithChildren<Props>) {
  return (
    <>
      <main className={styles.container}>
        {children}
      </main>
      <Dialogs.Menu netWorth={data.netWorth} />
      <Dialogs.Info />
    </>
  );
};

const styles = tw({
  container: `
    relative
    flex flex-col gap-4
    w-full max-w-sm
    mx-auto
    px-6 pb-8
    font-roboto

    lg:pb-6
  `,
});
