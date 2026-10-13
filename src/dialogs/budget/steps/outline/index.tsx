'use client';

import tw, { cs } from '@/styles';
import Ui from '@/ui';
import { currency } from '@/utils';

import type { Data } from '../../types';

type Props = {
  data: Data;
  isActive: boolean;
  onEdit: (step: string) => void;
  onCancel: () => void;
};

export default function Section({
  data,
  isActive,
  onEdit,
  onCancel,
}: Props) {
  return (
    <section className={cs(styles.section, isActive && styles.visible)}>
      <ul className={styles.items}>
        <li className={styles.item}>
          <h3 className={styles.heading}>Amount</h3>
          <p className={styles.text}>${currency(data.amount)}</p>
          <button className={styles.edit} onClick={() => onEdit('amount')} type="button">
            Edit
          </button>
        </li>
        <li className={styles.item}>
          <h3 className={styles.heading}>Name</h3>
          <p className={styles.text}>{data.name}</p>
          <button className={styles.edit} onClick={() => onEdit('name')} type="button">
            Edit
          </button>
        </li>
        <li className={styles.item}>
          <h3 className={styles.heading}>Type</h3>
          <p className={styles.text}>{data.type}</p>
          <button className={styles.edit} onClick={() => onEdit('type')} type="button">
            Edit
          </button>
        </li>
        {!!data.transferee && (
          <li className={styles.item}>
            <h3 className={styles.heading}>Number</h3>
            <p className={styles.text}>
              {data.type === 'debit' && 'Transfer as income to'}
              {data.type === 'credit' && 'Transfer as expense from'}
            </p>
            <button className={styles.edit} onClick={() => onEdit('transferee')} type="button">
              Edit
            </button>
          </li>
        )}
        <li className={styles.item}>
          <h3 className={styles.heading}>Starts On</h3>
          <p className={styles.text}>{data.start}</p>
          <button className={styles.edit} onClick={() => onEdit('start')} type="button">
            Edit
          </button>
        </li>
        {!!data.end && (
          <li className={styles.item}>
            <h3 className={styles.heading}>Ends On</h3>
            <p className={styles.text}>{data.end}</p>
            <button className={styles.edit} onClick={() => onEdit('end')} type="button">
              Edit
            </button>
          </li>
        )}
        <li className={styles.item}>
          <h3 className={styles.heading}>Category</h3>
          <p className={styles.text}>{data.category}</p>
          <button className={styles.edit} onClick={() => onEdit('category')} type="button">
            Edit
          </button>
        </li>
        <li className={styles.item}>
          <h3 className={styles.heading}>Schedule</h3>
          <p className={styles.text}>
            {data.frequency}
          </p>
          <button className={styles.edit} onClick={() => onEdit('schedule')} type="button">
            Edit
          </button>
        </li>
      </ul>
      <button
        className={styles.cta}
        onClick={onCancel}
        type="button"
      >
        Cancel
      </button>
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
  header: `
    block
    mb-1
    text-center text-sm
    w-full
  `,
  items: `
    flex flex-col gap-4
    w-full
  `,
  item: `
    relative
    flex flex-col gap-1
    capitalize
  `,
  heading: `
    text-tiny
    uppercase
    font-roboto
    tracking-wide
  `,
  text: `
    text-sm
    font-medium
  `,
  edit: `
    absolute -right-2 -top-2
    p-2
    text-tiny
    uppercase
    font-roboto
    tracking-wide
  `,
  cta: `
    flex items-center justify-center gap-2
    w-full
    border border-current/12
    bg-black
    rounded-lg
    px-4 py-2
    text-tiny text-white
    uppercase
    font-medium
    tracking-wide
  `,
});
