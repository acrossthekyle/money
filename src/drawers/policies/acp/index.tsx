export default function View() {
  return (
    <>
      <h3>
        Access Control Policy
      </h3>
      <p>
        <strong>Application:</strong> Basalt<br />
        <strong>Owner & Sole User:</strong> Kyle<br />
        <strong>Effective Date:</strong> November 25, 2026<br />
        <strong>Review Cycle:</strong> Quarterly
      </p>
      <h4>
        1. Purpose and Scope
      </h4>
      <p>
        This Access Control Policy defines the rules, technical controls, and administrative procedures governing authentication, authorization, and access privileges across Basalt and its supporting infrastructure—including Vercel, Redis, source control, DNS/domain management, and the Plaid Developer Dashboard.
      </p>
      <h4>
        2. Core Access Control Principles
      </h4>
      <ul>
        <li>
          <strong>Default Deny (Zero Public Access):</strong> All application pages, UI views, and backend API routes (/api/*) are closed to unauthenticated traffic by default. Access is granted only after explicit authentication verification.
        </li>
        <li>
          <strong>Single-User Identity Restriction:</strong> This system operates strictly as a single-user application. Public user registration, self-service sign-ups, and multi-user role sharing are permanently disabled.
        </li>
        <li>
          <strong>Principle of Least Privilege (PoLP):</strong> Every user identity, API key, and service credential is restricted to the minimum permissions required to perform its intended function.
        </li>
      </ul>
      <h4>
        3. Application Authentication & Session Controls
      </h4>
      <ul>
        <li>
          <strong>Strong Authentication:</strong> Access to the web application requires strong authentication verified via Edge/server middleware prior to rendering protected pages or executing API handlers.
        </li>
        <li>
          <strong>Multi-Factor Authentication (MFA):</strong> Phishing-resistant MFA (WebAuthn/Passkeys or TOTP) is enforced for application login.
        </li>
        <li>
          <strong>Session Lifecycle:</strong>
          <ul>
            <li>
              Authenticated sessions use cryptographically signed tokens stored in HttpOnly, Secure, and SameSite=Strict cookies.
            </li>
            <li>
              Sessions enforce a maximum lifetime (e.g., 24 hours) and an inactivity timeout (e.g., 30 minutes), requiring re-authentication upon expiration.
            </li>
          </ul>
        </li>
        <li>
          <strong>Brute-Force Protection:</strong> Authentication endpoints enforce strict rate limiting and automatic lockouts/throttling after repeated failed login attempts.
        </li>
      </ul>
      <h4>
        4. Infrastructure & Third-Party Service Access
      </h4>
      <p>
        Access to underlying cloud platforms and external APIs is restricted to the sole owner and governed by the following controls:
      </p>
      <ul>
        <li>
          <strong>System / Service:</strong> Vercel (Hosting & Edge)<br />
          <strong>Authentication & MFA Requirement:</strong> SSO/Email + Phishing-Resistant MFA<br />
          <strong>Privilege & Access Scope:</strong> Owner-only access. Production environment variables are restricted from Preview deployments.
        </li>
        <li>
          <strong>System / Service:</strong> Redis (Database)<br />
          <strong>Authentication & MFA Requirement:</strong> Strong High-Entropy Auth Token + TLS (rediss://)<br />
          <strong>Privilege & Access Scope:</strong> Application service user restricted via ACLs (where supported) to standard data operations (GET, SET, HSET, DEL); administrative commands (FLUSHALL, CONFIG) disabled.
        </li>
        <li>
          <strong>System / Service:</strong> Plaid Developer Dashboard<br />
          <strong>Authentication & MFA Requirement:</strong> Password + Phishing-Resistant MFA<br />
          <strong>Privilege & Access Scope:</strong> Owner-only access. API keys scoped strictly to required products (e.g., transactions, balance).
        </li>
        <li>
          <strong>System / Service:</strong> Source Code Repository<br />
          <strong>Authentication & MFA Requirement:</strong> Password/SSH Key + Phishing-Resistant MFA<br />
          <strong>Privilege & Access Scope:</strong> Private repository accessible only to the owner. Direct pushes to main require verified commits.
        </li>
        <li>
          <strong>System / Service:</strong> Domain Registrar & DNS<br />
          <strong>Authentication & MFA Requirement:</strong> Password + Phishing-Resistant MFA<br />
          <strong>Privilege & Access Scope:</strong> Registrar lock enabled; DNS management restricted solely to the owner.
        </li>
      </ul>
      <h4>
        5. Secrets & Credential Management
      </h4>
      <ul>
        <li>
          <strong>Zero Hardcoded Secrets:</strong> Passwords, PLAID_SECRET, REDIS_URL, session signing keys, and application-layer encryption keys are never stored in source code, client-side bundles, or logs.
        </li>
        <li>
          <strong>Secret Rotation:</strong>
          <ul>
            <li>
              Application-layer encryption keys, session secrets, and Redis credentials are rotated at least annually, or immediately upon suspected compromise.
            </li>
            <li>
              Plaid API secrets are rotated immediately via the Plaid Dashboard if exposure is suspected.
            </li>
          </ul>
        </li>
      </ul>
      <h4>
        6. Access Reviews & Offboarding / Revocation
      </h4>
      <ul>
        <li>
          <strong>Quarterly Access Review:</strong> Every 90 days, the owner conducts a review of:
          <ul>
            <li>
              Active application sessions and authentication logs.
            </li>
            <li>
              Active Plaid item connections and API keys.
            </li>
            <li>
              Connected OAuth apps, SSH keys, and personal access tokens on GitHub and Vercel.
            </li>
          </ul>
        </li>
        <li>
          <strong>Revocation:</strong> Any unused API tokens, stale sessions, or unlinked financial institution access_tokens (via Plaid’s /item/remove endpoint) are revoked immediately upon discovery or decommissioning.
        </li>
      </ul>
      <h4>
        7. Policy Attestation
      </h4>
      <p>
        As the sole administrator and authorized user of Basalt, I attest that these access controls are implemented, enforced, and reviewed on a quarterly basis.
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
