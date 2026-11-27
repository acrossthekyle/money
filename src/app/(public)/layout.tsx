import { Privacy } from '@/drawers';

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <>
      {children}
      <Privacy />
    </>
  );
}
