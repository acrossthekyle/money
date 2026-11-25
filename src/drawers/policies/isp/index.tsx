export default function View() {
  return (
    <>
      <h3>
        Information Security Policy (ISP)
      </h3>
      <p>
        <strong>Application:</strong> Personal Budgeting & Financial Forecast Application<br />
        <strong>Owner & Sole User:</strong> Kyle<br />
        <strong>Infrastructure:</strong> Vercel (Hosting/Compute) & Redis (Database Storage)<br />
        <strong>Effective Date:</strong> November 25, 2026<br />
        <strong>Review Cycle:</strong> Annual
      </p>
      <h4>
        1. Purpose and Scope
      </h4>
      <p>
        This Information Security Policy establishes the administrative, technical, and operational controls governing the Basalt web application hosted on Vercel at https://project-basalt.acrossthekyle.com, utilizing Redis for persistent data storage and Plaid for financial data aggregation.
      </p>
      <p>
        This policy applies exclusively to the single authorized user/operator and covers all serverless functions, edge middleware, Redis data stores, third-party API integrations, and administrative accounts.
      </p>
      <h4>
        2. Access Control and Authentication
      </h4>
      <p>
        Because this is a single-user application processing sensitive personal financial data, strict identity and perimeter controls are enforced:
      </p>
      <ul>
        <li>
          <strong>Middleware & Route Protection:</strong> Edge/server middleware verifies an active, cryptographically signed authentication session before serving any frontend page or executing any serverless API route (/sync/*). Unauthenticated requests are rejected immediately (401 Unauthorized or 403 Forbidden).
        </li>
        <li>
          <strong>Single-User Restriction:</strong> Public user registration is disabled. Authentication is restricted solely to the owner's pre-configured identity.
        </li>
        <li>
          <strong>Multi-Factor Authentication (MFA):</strong> Phishing-resistant MFA (WebAuthn/Passkeys or TOTP) is enforced on the Vercel account, the Redis cloud provider account, the domain registrar, the Git repository, and the Plaid Developer Dashboard.
        </li>
        <li>
          <strong>Session Management:</strong> Sessions utilize short-lived, cryptographically signed tokens stored in HttpOnly, Secure, SameSite=Strict cookies with automatic expiration.
        </li>
        <li>
          <strong>Least Privilege:</strong> Redis database users/ACLs (where supported) are restricted to application-level data commands (GET, SET, HSET, etc.), disabling administrative and dangerous commands (such as FLUSHALL or CONFIG).
        </li>
      </ul>
      <h4>
        3. Data Security and Cryptography
      </h4>
      <p>
        Financial balances, transaction histories, and Plaid API tokens are classified as Restricted / Confidential:
      </p>
      <ul>
        <li>
          <strong>Encryption in Transit:</strong>
          <ul>
            <li>
              All traffic between the user's browser, Vercel's Edge Network, and Plaid's APIs is encrypted using TLS 1.2/1.3 with HSTS enforced.
            </li>
            <li>
              All connections between Vercel serverless functions and the Redis instance are strictly encrypted over TLS (rediss://). Unencrypted Redis connections are prohibited.
            </li>
          </ul>
        </li>
        <li>
          <strong>Encryption at Rest:</strong>
          <ul>
            <li>
              Underlying Redis storage volumes and snapshots are encrypted at rest by the managed Redis provider using AES-256.
            </li>
            <li>
              <strong>Application-Layer Token Encryption:</strong> Plaid access_token values are encrypted using AES-256-GCM within the Vercel serverless backend prior to being written to Redis. The decryption key is stored separately in Vercel's encrypted environment variables—never inside Redis.
            </li>
          </ul>
        </li>
        <li>
          <strong>Secrets Management:</strong> Sensitive credentials (PLAID_CLIENT_ID, PLAID_SECRET, REDIS_URL, and the application encryption key) are stored exclusively within Vercel Encrypted Environment Variables scoped only to the Production environment. No secrets are committed to source control.
        </li>
      </ul>
      <h4>
        4. Infrastructure and Serverless Security (Vercel & Redis)
      </h4>
      <ul>
        <li>
          <strong>Serverless Isolation:</strong> Application logic runs within Vercel's ephemeral, isolated serverless function runtime, eliminating persistent OS-level attack surfaces.
        </li>
        <li>
          <strong>Redis Network & Auth Controls:</strong>
          <ul>
            <li>
              Access to the Redis instance requires a strong, high-entropy authentication token/password.
            </li>
            <li>
              Public access is restricted via TLS authentication and, where supported by the provider, IP allowlisting or private networking.
            </li>
          </ul>
        </li>
        <li>
          <strong>Plaid Webhook Verification:</strong> Any webhook endpoint receiving updates from Plaid verifies Plaid's cryptographic JWT signature (Plaid-Verification header) before parsing or writing data to Redis.
        </li>
        <li>
          <strong>Preview Deployment Protection:</strong> Vercel Preview Deployments are protected by Vercel Authentication (requiring Vercel login) and do not have access to Production Plaid or Redis credentials.
        </li>
      </ul>
      <h4>
        5. Secure Development Lifecycle (SDLC)
      </h4>
      <ul>
        <li>
          <strong>Dependency Management:</strong> Automated dependency scanning (e.g., npm audit, Dependabot) is used to identify and patch vulnerable packages prior to deployment.
        </li>
        <li>
          <strong>Data Validation & Sanitization:</strong> All incoming API payloads and Redis inputs/outputs are strictly validated using schema validation (e.g., Zod) to prevent injection and malformed data states.
        </li>
        <li>
          <strong>Redacted Logging:</strong> Vercel runtime logs are monitored for errors and unauthorized access attempts. All Plaid tokens, Redis connection strings, and financial payloads are explicitly scrubbed from console and error logs.
        </li>
      </ul>
      <h4>
        6. Data Retention and Disposal
      </h4>
      <ul>
        <li>
          <strong>Minimal Persistence:</strong> Only account balances, historical snapshots, and forecast metadata necessary for personal budgeting are stored in Redis.
        </li>
        <li>
          <strong>Revocation & Purging:</strong> Upon unlinking an institution or decommissioning the app, the application calls Plaid's /item/remove endpoint to invalidate the access_token, and the corresponding keys in Redis are permanently deleted (DEL).
        </li>
      </ul>
      <h4>
        7. Incident Response Plan
      </h4>
      <p>
        In the event of suspected unauthorized access, secret exposure, or anomalous behavior:
      </p>
      <ol>
        <li>
          <strong>Containment:</strong> Immediately pause/disable the Vercel deployment, rotate the REDIS_URL password, and rotate/revoke Plaid API secrets and item access_tokens via the Plaid Dashboard.
        </li>
        <li>
          <strong>Investigation:</strong> Inspect Vercel Runtime Logs, Vercel Firewall/Access logs, and Plaid API usage metrics to identify the entry point and affected data.
        </li>
        <li>
          <strong>Recovery:</strong> Rotate all Vercel environment variables, generate a new application-layer encryption key, re-encrypt stored tokens, and redeploy clean code from a verified Git commit.
        </li>
        <li>
          <strong>Notification:</strong> Notify Plaid Support promptly if Plaid credentials or API systems were exposed, in accordance with Plaid's Developer Terms.
        </li>
      </ol>
      <h4>
        8. Policy Attestation
      </h4>
      <p>
        As the sole developer, administrator, and end-user of this application, I attest that the technical and administrative controls described in this policy are actively enforced across my Vercel and Redis environments.
      </p>
      <h4>
        9. End-of-Life (EOL) & Unsupported Software Policy
      </h4>
      <ul>
        <li>
          <strong>Prohibition of EOL Software:</strong> Software, runtimes, frameworks, and managed services that have reached vendor End-of-Life (EOL) or End-of-Support (EOS) and no longer receive security updates are prohibited in production.
        </li>
        <li>
          <strong>Runtime & Framework Lifecycle:</strong> The Node.js runtime on Vercel, core web frameworks (e.g., Next.js), and the managed Redis engine are maintained on actively supported Long-Term Support (LTS) or current stable releases, with upgrades scheduled at least 30 days prior to announced EOL dates.
        </li>
        <li>
          <strong>Deprecated npm Packages:</strong> During monthly dependency audits, any npm package marked as deprecated, archived, or unmaintained is flagged for replacement or removal within 60 days to prevent unpatched security exposure.
        </li>
      </ul>
      <p>
        Signature: Kyle
      </p>
      <p>
        Date: November 25, 2026
      </p>
    </>
  );
};
