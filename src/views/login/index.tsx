'use client';

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
      <h1 className={styles.header}>BASALT</h1>
      <p className={styles.paragraph}>
        Sign in and starting planning.
      </p>
      <form action={action} className={styles.form} id="login-form">
        <div className={styles.field}>
          <Ui.Form.Label htmlFor="username">Username</Ui.Form.Label>
          <Ui.Form.Input
            id="username"
            name="username"
            placeholder=""
            type="text"
            defaultValue={data.username}
            required
            disabled={isPending}
            onChange={handleOnUsername}
          />
          <Ui.Form.Hint></Ui.Form.Hint>
        </div>
        <div className={styles.field}>
          <Ui.Form.Label htmlFor="password">Password</Ui.Form.Label>
          <Ui.Form.Input
            id="password"
            name="password"
            type="password"
            placeholder=""
            required
            disabled={isPending}
            onChange={handleOnPassword}
          />
          <Ui.Form.Hint></Ui.Form.Hint>
        </div>
        <Ui.Components.Button isPrimary isDisabled={isPending}>
          {isPending ? 'Processing...' : 'Sign In'}
        </Ui.Components.Button>
      </form>
    </>
  );
};

const styles = tw({
  header: `
    mb-2
    font-bold
    text-center
  `,
  paragraph: `
    pb-6
    text-center
    text-sm
  `,
  form: `
    flex flex-col gap-4
    mt-4
  `,
  field: `
    flex flex-col
  `,
});
