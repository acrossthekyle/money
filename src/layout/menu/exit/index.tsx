import { logout } from '@/actions/auth/logout';
import Ui from '@/ui';

export default function Exit() {
  return (
    <form action={logout} className="px-6 w-full">
      <Ui.Components.Button isPrimary>
        Sign Out
      </Ui.Components.Button>
    </form>
  );
};
