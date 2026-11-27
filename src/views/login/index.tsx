'use client';

import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import tw from '@/styles';
import Ui from '@/ui';

import {
  Branding,
  Footer,
  Form,
  Heading,
  Inner,
  Lid,
  Main,
  Title,
} from './components';
import { useModel } from './model';

export default function View() {
  const {
    action,
    data,
    handleOnPassword,
    handleOnPrivacy,
    handleOnUsername,
    isBlocked,
    isPending,
  } = useModel();

  return (
    <Main>
      <Branding />
      <Inner>
        <Ui.Components.Card.Container>
          <Heading>
            <Title>Welcome</Title>
            <Lid>Enter sign-in credentials</Lid>
          </Heading>
          <Form action={action}>
            <Ui.Form.Field>
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
            </Ui.Form.Field>
            <Ui.Form.Field>
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
            </Ui.Form.Field>
            <Ui.Components.Button
              isDisabled={isBlocked || isPending}
              isPrimary
              isSquared
            >
              {isPending ? 'Processing...' : 'Login'}
            </Ui.Components.Button>
            <Footer>
              Want to see how it works? <Link
                className={styles.demo}
                href="https://project-basalt.demos.acrossthekyle.com"
                target="_blank"
              >
                View demo <ArrowUpRight className={styles.arrow} />
              </Link>
            </Footer>
            <p className={styles.links}>
              <button
                className={styles.link}
                onClick={handleOnPrivacy}
                type="button"
              >
                Privacy Policy
              </button>
              <Link
                className={styles.link}
                href="https://acrossthekyle.com"
              >
                About the developer
              </Link>
            </p>
          </Form>
        </Ui.Components.Card.Container>
      </Inner>
    </Main>
  );
};

const styles = tw({
  demo: `
    inline-flex items-center gap-0.5
    underline
    underline-offset-4
  `,
  links: `
    flex justify-center gap-6
  `,
  link: `
    text-current/82.5 text-center

    sm:text-sm
  `,
  arrow: `
    size-4
    stroke-2

    sm:size-3.5
  `,
});
