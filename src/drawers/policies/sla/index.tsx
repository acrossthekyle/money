export default function View() {
  return (
    <>
      <h3>
        Vulnerability Management & Patching SLA
      </h3>
      <p>
        <strong>Application:</strong> Basalt<br />
        <strong>Scope:</strong> Application dependencies (npm packages), runtime environments (Node.js/Next.js on Vercel), and infrastructure configurations.
      </p>
      <h4>
        1. Vulnerability Detection & Monitoring
      </h4>
      <ul>
        <li>
          <strong>Scheduled Reviews:</strong> Manual dependency audits (npm audit / npm outdated) are performed at least once per month, as well as prior to any major feature deployment.
        </li>
      </ul>
      <h4>
        2. Remediation Service Level Agreements (SLAs)
      </h4>
      <p>
        Identified vulnerabilities are triaged using the Common Vulnerability Scoring System (CVSS v3.1/v4.0) and patched within the following maximum timeframes from the date of discovery or vendor patch availability:
      </p>
      <ul>
        <li>
          <strong>Severity Level:</strong> Critical<br />
          <strong>CVSS Score:</strong>9.0 – 10.0<br />
          <strong>Remediation:</strong>Within 48 hours Immediate triage. Apply security patch, upgrade npm package, or deploy mitigation/workaround and redeploy to Vercel immediately.
        </li>
        <li>
          <strong>Severity Level:</strong> High<br />
          <strong>CVSS Score:</strong>7.0 – 8.9<br />
          <strong>Remediation:</strong>Within 7 days Prioritize dependency update, verify compatibility in a Vercel Preview environment, and deploy to Production within 7 calendar days.
        </li>
        <li>
          <strong>Severity Level:</strong> Medium<br />
          <strong>CVSS Score:</strong>4.0 – 6.9<br />
          <strong>Remediation:</strong>Within 30 days Remediate during the next scheduled monthly maintenance cycle via npm update or version bump.
        </li>
        <li>
          <strong>Severity Level:</strong> Low<br />
          <strong>CVSS Score:</strong>0.1 – 3.9<br />
          <strong>Remediation:</strong>Within 90 days Address during routine dependency maintenance or major framework upgrades.
        </li>
      </ul>
      <h4>
        3. Exception & Mitigation Handling
      </h4>
      <ul>
        <li>
          <strong>Transitive Dependencies & Breaking Changes:</strong> If an upstream npm package does not yet have a patch available, or if upgrading introduces breaking changes that require refactoring:
          <ol>
            <li>
              Assess whether the vulnerable code path is actually reachable in the application (e.g., build-time dev dependency vs. production runtime).
            </li>
            <li>
              Implement compensating controls (such as stricter input validation, WAF rules via Vercel Firewall, or disabling the affected feature) until a stable patch is released.
            </li>
          </ol>
        </li>
        <li>
          <strong>Runtime Upgrades:</strong> Node.js runtime versions configured in Vercel are kept on an active Long-Term Support (LTS) release and upgraded prior to End-of-Life (EOL) dates.
        </li>
      </ul>
    </>
  );
};
