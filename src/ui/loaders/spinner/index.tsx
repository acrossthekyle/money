import tw from '@/styles';

import Icon from './icon';

export default function Spinner() {
  return (
    <div aria-live="assertive" aria-busy="true" className={styles.container}>
      <span className="sr-only">Loading, please wait</span>
      <Icon />
    </div>
  );
};

const styles = tw({
  container: `
    fixed inset-0 z-1000
    flex items-center justify-center
    bg-(--background)
  `,
});
