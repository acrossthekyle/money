'use client';

import { format } from 'date-fns';

import tw from '@/styles';

import { OptionsSectionIcon, OptionsSectionButton } from '../components';

type Props = {
  onClick: (date: string) => void;
  type: 'budget' | 'holding';
};

export default function Add({ onClick, type }: Props) {
  const handleOnClick = () => {
    if (type === 'holding') {
      onClick('');

      return;
    }

    onClick(format(new Date(), 'yyyy-MM-dd'));
  };

  return (
    <OptionsSectionButton
      className={styles.container}
      isActive
      onClick={handleOnClick}
    >
      <OptionsSectionIcon icon="plus" />
    </OptionsSectionButton>
  );
};

const styles = tw({
  container: `
    order-1
    !pr-3
  `,
});
