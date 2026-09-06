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
  return (
    <ContainerSectionItem>
      <ContainerSectionButton
        isDisabled={view.includes('overview')}
        onClick={onClick}
      >
        <ContainerSectionIcon icon="edit" />
        <ContainerSectionText>Edit Holding</ContainerSectionText>
      </ContainerSectionButton>
    </ContainerSectionItem>
  );
};
