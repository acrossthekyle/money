export default function View() {
  return (
    <>
      <h3>
        Data Retention and Deletion Policy
      </h3>
      <p>
        <strong>Application:</strong> Basalt<br />
        <strong>Owner & Sole User</strong> Kyle<br />
        <strong>Infrastructure</strong> Vercel & Redis<br />
        <strong>Effective Date</strong> November 25, 2026<br />
        <strong>Review Cycle</strong> Annual
      </p>
      <h4>
        1. Purpose and Scope
      </h4>
      <p>
        This Data Retention and Deletion Policy defines how data is stored, minimized, retained, and permanently destroyed within Basalt.
      </p>
      <p>
        This policy applies strictly to the sole owner/operator and governs all data processed in Vercel serverless functions and persisted in Redis.
      </p>
      <h4>
        2. Data Minimization & Non-Storage of Raw Banking Records
      </h4>
      <p>
        In accordance with the principle of data minimization:
      </p>
      <ul>
        <li>
          <strong>No Raw Transaction or PII Storage:</strong> The application does not persist individual bank transactions, merchant descriptions, account numbers, routing numbers, or personally identifiable banking information (PII) in Redis or application logs.
        </li>
        <li>
          <strong>Ephemeral Sync Processing:</strong> When syncing balances via Plaid, account balances are retrieved in memory within ephemeral Vercel serverless functions solely to update aggregate budget or forecast calculations, after which raw API responses are immediately discarded.
        </li>
        <li>
          <strong>Persisted Data Scope:</strong> Data stored in Redis is strictly limited to:
          <ol>
            <li>
              User-defined budget schedules
            </li>
            <li>
              Encrypted Plaid access_token values required to maintain active balance synchronization.
            </li>
          </ol>
        </li>
      </ul>
      <h4>
        3. Data Retention Schedule
      </h4>
      <p>
        Data is retained only for as long as it remains actively useful for personal budgeting and financial forecasting:
      </p>
      <ul>
        <li>
          <strong>Data Category:</strong> Scheduled Budgets & Forecast Models<br />
          <strong>Storage Location:</strong> Redis<br />
          <strong>Retention Period:</strong> Retained while active for personal financial planning.<br />
          <strong>Deletion Trigger:</strong> Manually deleted by owner or purged upon app decommissioning.
        </li>
        <li>
          <strong>Data Category:</strong> Aggregated Account Balance Snapshots<br />
          <strong>Storage Location:</strong> Redis<br />
          <strong>Retention Period:</strong> Retained for active forecast horizon (up to 24 months rolling, or until manually cleared).<br />
          <strong>Deletion Trigger:</strong> Automatic expiration (TTL), manual deletion, or account unlink.
        </li>
        <li>
          <strong>Data Category:</strong> Encrypted Plaid access_tokens<br />
          <strong>Storage Location:</strong> Redis (AES-256-GCM encrypted)<br />
          <strong>Retention Period:</strong> Retained only while the linked institution connection is active.<br />
          <strong>Deletion Trigger:</strong> Immediately revoked and deleted upon unlinking an institution or decommissioning the app.
        </li>
        <li>
          <strong>Data Category:</strong> Ephemeral Plaid API Payloads<br />
          <strong>Storage Location:</strong> Vercel Serverless Memory<br />
          <strong>Retention Period:</strong> 0 seconds post-execution (in-memory only; never written to disk).<br />
          <strong>Deletion Trigger:</strong> Automatically destroyed upon serverless function termination.
        </li>
        <li>
          <strong>Data Category:</strong> Application & Access Logs<br />
          <strong>Storage Location:</strong> Vercel Runtime Logs<br />
          <strong>Retention Period:</strong> Retained per platform log window (up to 30 days), scrubbed of all financial data and tokens.<br />
          <strong>Deletion Trigger:</strong> Automatically purged by Vercel upon log window expiration.
        </li>
      </ul>
      <h4>
        4. Data Deletion & Token Revocation Procedures
      </h4>
      <p>
        When data is no longer needed, a financial institution is unlinked, or the application is retired, the following irreversible deletion procedures are executed:
      </p>
      <ol>
        <li>
          <strong>Plaid Token Invalidation:</strong> Before deleting local keys, the application calls Plaid’s /item/remove API endpoint to permanently invalidate the access_token on Plaid’s servers.
        </li>
        <li>
          <strong>Primary Database Purge (Redis):</strong> Associated keys, hashes, and encrypted tokens are permanently removed from Redis using explicit deletion commands (DEL or UNLINK), or a full database flush (FLUSHDB) upon application decommissioning.
        </li>
        <li>
          <strong>Backup & Snapshot Purge:</strong> Any automated Redis backups or snapshots containing encrypted tokens are manually deleted or allowed to expire within a maximum of 30 days, with underlying encryption keys destroyed immediately to render backup data cryptographically unrecoverable (crypto-shredding).
        </li>
      </ol>
      <h4>
        5. Policy Attestation
      </h4>
      <p>
        As the sole developer, administrator, and end-user of Basalt, I attest that these data minimization, retention, and deletion controls are actively enforced.
      </p>
      <p>
        Signature: Kyle
      </p>
      <p>
        Date: November 25, 2026
      </p>
    </>
  );
};
