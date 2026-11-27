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
              <div className={styles.otp}>
                {digits.map((digit, index) => (
                  <div className={styles.field} key={index}>
                    <input
                      aria-label={`character ${index + 1} of 6`}
                      autoComplete="one-time-code"
                      autoCorrect="off"
                      className={styles.input}
                      inputMode="numeric"
                      maxLength={6}
                      onChange={(event) => handleOnChange(event, index)}
                      onKeyDown={(event) => handleOnKeyDown(event, index)}
                      onPaste={(event) => handleOnPaste(event, index)}
                      pattern="\d{1}"
                      ref={(element) => {
                        refs.current[index] = element;
                      }}
                      required
                      spellCheck="false"
                      type="text"
                      value={digit}
                    />
                  </div>
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
  otp: `
    flex justify-center space-x-2
  `,
  field: `
    w-fit
  `,
  input: `
    h-8 w-8
    border border-current/12.5
    text-center
    rounded-lg
  `,
  back: `
    inline-flex items-center gap-0.5
    text-current/82.5
    underline
    underline-offset-4

    sm:text-sm
  `,
});
