'use client';

import { useDisclaimer } from '@/hooks/useDisclaimer';
import tw from '@/styles';
import Ui from '@/ui';

export default function Dialog() {
  const { instance, isActive, onBackdrop, onCancel, onClose } = useDisclaimer();

  return (
    <Ui.Dialog.Dialog
      id="disclaimer-dialog"
      instance={instance}
      isActive={isActive}
      onBackdrop={onBackdrop}
      onCancel={onCancel}
    >
      <Ui.Dialog.DialogInner isActive={isActive}>
        <Ui.Dialog.DialogHeader onClose={onClose}>
          Important Disclaimer & Terms of Use
        </Ui.Dialog.DialogHeader>
        <p className={styles.paragraph}>
          By logging into this demonstration application, you acknowledge and agree to the following terms:
        </p>
        <ul className={styles.items}>
          <li>
            <h3 className={styles.heading}>
              For Estimation Purposes Only
            </h3>
            <p className={styles.paragraph}>
              This application is a tool for general forecasting and budgeting of potential incomes and expenses. All outputs are strictly estimates, do not constitute financial or professional advice, and should not be relied upon as absolute fact.
            </p>
          </li>
          <li>
            <h3 className={styles.heading}>
              Manual Entry & No Integrations
            </h3>
            <p className={styles.paragraph}>
              This application does not connect to any live financial platforms or bank accounts. All balances and budget amounts must be manually entered.
            </p>
          </li>
          <li>
            <h3 className={styles.heading}>
              Data Privacy & Local Storage
            </h3>
            <p className={`${styles.paragraph} ${styles.indent}`}>
              <span className={styles.emphasis}>No Persistent Storage</span> No data is saved to a server or external database. All information you enter is stored temporarily in your browser's sessionStorage and is automatically permanently deleted when you close the browser tab or window.
            </p>
            <p className={`${styles.paragraph} ${styles.indent}`}>
              <span className={styles.emphasis}>Do Not Enter Sensitive PII</span>  Even though data is stored locally, never enter real passwords, usernames, full account numbers, or personally identifiable information (PII).
            </p>
            <p className={`${styles.paragraph} ${styles.indent}`}>
              <span className={styles.emphasis}>Optional Fields</span> Any fields requesting an institution name or the last four digits of an account number are purely optional and used strictly for visual labeling during your active session.
            </p>
          </li>
          <li>
            <h3 className={styles.heading}>
              Shared Demo Credentials
            </h3>
            <p className={styles.paragraph}>
              The login credentials provided (username "demo" / password "password") are public and shared. Do not attempt to change these credentials or use them for any purpose outside of testing the interface.
            </p>
          </li>
          <li>
            <h3 className={styles.heading}>
              Limitation of Liability
            </h3>
            <p className={styles.paragraph}>
              This application is provided "as-is" for testing and portfolio demonstration purposes only. The developer assumes no responsibility or liability for any errors, data loss, financial decisions, or misuse of this platform.
            </p>
          </li>
        </ul>
      </Ui.Dialog.DialogInner>
    </Ui.Dialog.Dialog>
  );
};

const styles = tw({
  paragraph: `
    px-4
    text-sm
    leading-[1.6]
  `,
  indent: `
    ml-4
  `,
  items: `
    flex flex-col gap-4
    my-4
  `,
  heading: `
    px-4 mb-2
    font-black
    text-sm
  `,
  emphasis: `
    block
    mt-4 mb-2
    font-semibold
    text-sm
  `,
});
