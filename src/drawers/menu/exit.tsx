import { logout } from '@/actions/auth/logout';
import Ui from '@/ui';

export default function Exit() {
  return (
    <form action={logout}>
      <Ui.Components.Button isGhost>
        Sign Out
      </Ui.Components.Button>
    </form>
  );
};
