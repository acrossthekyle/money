'use client';

import { Footer, Header, Main } from '@/layout';
import tw from '@/styles';
import Ui from '@/ui';

import { useModel } from './model';

export default function View() {
  const {
    action,
    data,
    handleOnPassword,
    handleOnUsername,
    isPending,
  } = useModel();

  return (
    <>
      <Header isAuthenticated={false}>
        <Ui.Components.Theme />
      </Header>
      <Main>
        <form action={action} className={styles.form} id="login-form">
          <div className={styles.field}>
            <input
              className={styles.input}
              id="username"
              name="username"
              type="text"
              placeholder=" "
              defaultValue={data.username}
              required
              disabled={isPending}
              onChange={handleOnUsername}
            />
            <label className={styles.label} htmlFor="username">
              Username
            </label>
          </div>
          <div className={styles.field}>
            <input
              className={styles.input}
              id="password"
              name="password"
              type="password"
              placeholder=" "
              required
              disabled={isPending}
              onChange={handleOnPassword}
            />
            <label className={styles.label} htmlFor="password">
              Password
            </label>
          </div>
          <Ui.Components.Button isDisabled={isPending}>
            {isPending ? 'Processing...' : 'Sign In'}
          </Ui.Components.Button>
        </form>
      </Main>
      <Ui.Components.Divider />
      <Footer>
        <Ui.Components.Branding />
      </Footer>
    </>
  );
};

const styles = tw({
  form: `
    relative top-1/2
    -translate-y-1/2
    flex flex-col justify-center gap-8
  `,
  field: `
    relative
    flex flex-col
  `,
  input: `
    peer
    appearance-none
    relative
    border-b
    py-2
    outline-0
  `,
  label: `
    absolute -top-5 z-2
    font-normal

    motion-safe:duration-100

    peer-focus:absolute
    peer-focus:-top-5
    peer-focus:translate-y-0

    peer-placeholder-shown:top-1/2
    peer-placeholder-shown:-translate-y-1/2

    md:peer-focus:-top-5
  `,
  footer: `
    absolute bottom-0
  `,
});
