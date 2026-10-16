import tw, { cs } from '@/styles';

type Props = {
  isActive: boolean;
};

export default function Container({
  children,
  isActive,
}: React.PropsWithChildren<Props>) {
  return (
    <section className={cs(styles.section, isActive && styles.visible)}>
      {children}
    </section>
  );
};

const styles = tw({
  section: `
    flex-col items-center gap-4
    hidden
  `,
  visible: `
    !flex
  `,
});
