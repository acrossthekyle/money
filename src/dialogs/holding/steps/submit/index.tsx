'use client';

import tw, { cs } from '@/styles';
import Ui from '@/ui';
import { currency } from '@/utils';

import type { Data } from '../../types';

type Props = {
  data: Data;
  isActive: boolean;
  isEditing: boolean;
  onEdit: (step: string) => void;
  onSubmit: () => void;
};

export default function Section({
  data,
  isActive,
  isEditing,
  onEdit,
  onSubmit,
}: Props) {
  return (
    <section className={cs(styles.section, isActive && styles.visible)}>
      <ul className={styles.items}>
        <li className={styles.item}>
          <h3 className={styles.heading}>Type</h3>
          <p className={styles.text}>{data.type.replace(/_/g, ' ')}</p>
          <button className={styles.edit} onClick={() => onEdit('type')} type="button">
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
        {!!data.number && (
          <li className={styles.item}>
            <h3 className={styles.heading}>Number</h3>
            <p className={styles.text}>**** {data.number}</p>
            <button className={styles.edit} onClick={() => onEdit('number')} type="button">
              Edit
            </button>
          </li>
        )}
        <li className={styles.item}>
          <h3 className={styles.heading}>Balance</h3>
          <p className={styles.text}>
            {data.balance < 0 ? '-' : ''}${currency(data.balance)}
          </p>
          <button className={styles.edit} onClick={() => onEdit('balance')} type="button">
            Edit
          </button>
        </li>
        {!!data.interest && (
          <li className={styles.item}>
            <h3 className={styles.heading}>Rate</h3>
            <p className={styles.text}>{data.interest}</p>
            <button className={styles.edit} onClick={() => onEdit('rate')} type="button">
              Edit
            </button>
          </li>
        )}
      </ul>
      <button
        className={styles.cta}
        onClick={onSubmit}
        type="button"
      >
        Looks Good, {isEditing ? 'update' : 'add'} it!
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
    bg-lime-300
    rounded-lg
    px-4 py-2
    text-tiny text-black
    uppercase
    font-medium
    tracking-wide
  `,
});
