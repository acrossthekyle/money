import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import tw from '@/styles';
import Ui from '@/ui';

export default function View() {
  return (
    <main className={styles.container}>
      <div className={styles.inner}>
        <Ui.Components.Card.Container>
          <Link className={styles.link} href="/">
            <ArrowLeft className={styles.arrow} /> Back to Login
          </Link>
          <h1>
            Privacy Policy
          </h1>
          <p>
            <strong>Application:</strong> Basalt<br />
            <strong>Operator:</strong> Kyle<br />
            <strong>Contact:</strong> hello@acrossthekyle.com<br />
            <strong>Last Updated:</strong> November 25, 2026
          </p>
          <h2>
            1. Overview & Private Use
          </h2>
          <p>
            Basalt is a private, single-user personal budgeting and financial forecasting application operated exclusively by Kyle for personal use.
          </p>
          <p>
            This application is not open to the public, does not offer user registration, and does not collect, process, or store personal or financial data belonging to any third parties or members of the general public.
          </p>
          <h2>
            2. How Information Is Used & Shared
          </h2>
          <ul className={styles.list}>
            <li>
              <strong>Personal Use Only:</strong> Data is used strictly by the sole operator to track personal budgets and cash-flow projections.
            </li>
            <li>
              <strong>No Third-Party Sharing:</strong> Data is never sold, rented, monetized, or shared with third parties, advertisers, or analytics providers.
            </li>
          </ul>
          <h2>
            3. Data Security & Retention
          </h2>
          <ul className={styles.list}>
            <li>
              All data is transmitted over encrypted connections (TLS/HTTPS) and stored in encrypted, access-controlled cloud storage accessible only to the operator.
            </li>
            <li>
              Financial data is retained only as long as necessary for personal record-keeping. If an account connection is removed or the application is discontinued, associated access tokens are revoked and stored records are permanently deleted.
            </li>
          </ul>
          <h2>
            4. Contact
          </h2>
          <p>
            For any inquiries regarding this application or privacy notice, contact Kyle at hello@acrossthekyle.com.
          </p>
        </Ui.Components.Card.Container>
      </div>
    </main>
  );
};

const styles = tw({
  container: `
    relative left-1/2
    -translate-x-1/2
    w-full

    xs:max-w-104
    xs:px-4
  `,
  inner: `
    flex flex-col gap-4
    p-4

    xs:px-0
  `,
  link: `
    flex items-center gap-2

    sm:text-sm
  `,
  arrow: `
    size-4.5
    stroke-2

    sm:size-4
  `,
  list: `
    flex flex-col gap-4
  `,
});
