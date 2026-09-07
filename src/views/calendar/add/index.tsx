'use client';

import { format } from 'date-fns';

import {
  ContainerSectionItem,
  ContainerSectionIcon,
  ContainerSectionButton,
  ContainerSectionText,
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
    <ContainerSectionItem>
      <ContainerSectionButton isActive onClick={handleOnClick}>
        <ContainerSectionIcon icon="plus" />
        <ContainerSectionText>
          Add {type === 'budget' ? 'Budget' : 'Forecast'}
        </ContainerSectionText>
      </ContainerSectionButton>
    </ContainerSectionItem>
  );
};
