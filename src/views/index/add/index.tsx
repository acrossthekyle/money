import {
  ContainerSectionItem,
  ContainerSectionIcon,
  ContainerSectionButton,
  ContainerSectionText,
} from '../components';

type Props = {
  onClick: () => void;
};

export default function Add({ onClick }: Props) {
  return (
    <ContainerSectionItem>
      <ContainerSectionButton onClick={onClick}>
        <ContainerSectionIcon icon="plus" />
        <ContainerSectionText>Add Holding</ContainerSectionText>
      </ContainerSectionButton>
    </ContainerSectionItem>
  );
};
