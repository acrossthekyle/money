import tw from '@/styles';

export default function View() {
  return (
    <>
      <h3>
        Privacy Policy
      </h3>
      <p>
        <strong>Application:</strong> Basalt<br />
        <strong>Operator:</strong> Kyle<br />
        <strong>Contact:</strong> hello@acrossthekyle.com<br />
        <strong>Last Updated:</strong> November 25, 2026
      </p>
      <h4>
        1. Overview & Private Use
      </h4>
      <p>
        Basalt is a private, single-user personal budgeting and financial forecasting application operated exclusively by Kyle for personal use.
      </p>
      <p>
        This application is not open to the public, does not offer user registration, and does not collect, process, or store personal or financial data belonging to any third parties or members of the general public.
      </p>
      <h4>
        2. How Information Is Used & Shared
      </h4>
      <ul className={styles.list}>
        <li>
          <strong>Personal Use Only:</strong> Data is used strictly by the sole operator to track personal budgets and cash-flow projections.
        </li>
        <li>
          <strong>No Third-Party Sharing:</strong> Data is never sold, rented, monetized, or shared with third parties, advertisers, or analytics providers.
        </li>
      </ul>
      <h4>
        3. Data Security & Retention
      </h4>
      <ul className={styles.list}>
        <li>
          All data is transmitted over encrypted connections (TLS/HTTPS) and stored in encrypted, access-controlled cloud storage accessible only to the operator.
        </li>
        <li>
          Financial data is retained only as long as necessary for personal record-keeping. If an account connection is removed or the application is discontinued, associated access tokens are revoked and stored records are permanently deleted.
        </li>
      </ul>
      <h4>
        4. Contact
      </h4>
      <p>
        For any inquiries regarding this application or privacy notice, contact Kyle at hello@acrossthekyle.com.
      </p>
    </>
  );
};

const styles = tw({
  list: `
    flex flex-col gap-4
  `,
});
