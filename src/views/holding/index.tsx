import { Forms } from '@/forms';
import Ui from '@/ui';

export default function View() {
  return (
    <>
      <Ui.Components.Divider />
      <Ui.Components.Header title="Create Account/Asset" />
      <Forms.Holding />
    </>
  );
};
