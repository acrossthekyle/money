'use client';

import { format } from 'date-fns';

import {
  OptionsSectionItem,
  OptionsSectionIcon,
  OptionsSectionButton,
  OptionsSectionText,
} from '../components';

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
    <OptionsSectionItem>
      <OptionsSectionButton isActive onClick={handleOnClick}>
        <OptionsSectionIcon icon="plus" />
        <OptionsSectionText>
          Add {type === 'budget' ? 'Budget' : 'Forecast'}
        </OptionsSectionText>
      </OptionsSectionButton>
    </OptionsSectionItem>
  );
};
