import {
  ContainerSectionItem,
  ContainerSectionIcon,
  ContainerSectionButton,
  ContainerSectionText,
} from '../components';

type Props = {
  onClick: () => void;
  view: string;
};

export default function Edit({ onClick, view }: Props) {
  if (view.includes('overview')) {
    return null;
  }

  return (
    <ContainerSectionItem>
      <ContainerSectionButton onClick={onClick}>
        <ContainerSectionIcon icon="edit" />
        <ContainerSectionText>Edit Holding</ContainerSectionText>
      </ContainerSectionButton>
    </ContainerSectionItem>
  );
};
