import tw from '@/styles';

export default function Days() {
  return (
    <ul className={styles.items}>
      <li className={styles.item}>
        <span className={styles.abbreviated}>Sun</span>
        <span className={styles.full}>Sunday</span>
      </li>
      <li className={styles.item}>
        <span className={styles.abbreviated}>Mon</span>
        <span className={styles.full}>Monday</span>
      </li>
      <li className={styles.item}>
        <span className={styles.abbreviated}>Tues</span>
        <span className={styles.full}>Tuesday</span>
      </li>
      <li className={styles.item}>
        <span className={styles.abbreviated}>Wed</span>
        <span className={styles.full}>Wednesday</span>
      </li>
      <li className={styles.item}>
        <span className={styles.abbreviated}>Thu</span>
        <span className={styles.full}>Thursday</span>
      </li>
      <li className={styles.item}>
        <span className={styles.abbreviated}>Fri</span>
        <span className={styles.full}>Friday</span>
      </li>
      <li className={styles.item}>
        <span className={styles.abbreviated}>Sat</span>
        <span className={styles.full}>Saturday</span>
      </li>
    </ul>
  );
};

const styles = tw({
  items: `
    grid grid-cols-7
    h-0
    mt-4
    uppercase
    text-xtiny

    md:mb-1
    md:text-tiny
  `,
  item: `
    text-center
  `,
  abbreviated: `
    sm:hidden
  `,
  full: `
    hidden

    sm:block
  `,
});
