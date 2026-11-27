'use client';

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
} from '../components';

import { useModel } from './model';

export default function View() {
  const {
    action,
    digits,
    form,
    handleOnChange,
    handleOnKeyDown,
    handleOnPaste,
    isBlocked,
    isPending,
    refs,
  } = useModel();

  return (
    <Main>
      <Branding />
      <Inner>
        <Ui.Components.Card.Container>
          <Heading>
            <Title>One-Time Password</Title>
            <Lid>Enter the verification code</Lid>
          </Heading>
          <Form action={action} ref={form}>
            <Ui.Form.Field>
              <div className={styles.fields}>
                {digits.map((digit, index) => (
                  <Ui.Form.Otp
                    index={index}
                    key={index}
                    onChange={(event) => handleOnChange(event, index)}
                    onKeyDown={(event) => handleOnKeyDown(event, index)}
                    onPaste={(event) => handleOnPaste(event, index)}
                    onRef={(element) => { refs.current[index] = element }}
                    value={digit}
                  />
                ))}
              </div>
            </Ui.Form.Field>
            <Ui.Components.Button
              isDisabled={isBlocked || isPending}
              isPrimary
              isSquared
            >
              {isPending ? 'Processing...' : 'Submit'}
            </Ui.Components.Button>
            <Footer>
              Back to <Link
                className={styles.back}
                href="/login"
              >
                Login
              </Link>
            </Footer>
          </Form>
        </Ui.Components.Card.Container>
      </Inner>
    </Main>
  );
};

const styles = tw({
  fields: `
    flex justify-center space-x-2
  `,
  back: `
    inline-flex items-center gap-0.5
    text-current/82.5
    underline
    underline-offset-4

    sm:text-sm
  `,
});
