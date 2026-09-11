# SAT Public Domain and Authentication State — September 11, 2026

This document records infrastructure/authentication changes completed on September 11, 2026 that were not previously captured in the project-state documentation.

## 1. Production login implementation

Commit:

`01f43e3eee96d4fb23e45ebc9d92d36f54cc97f9`

Message:

`Isolate production login authentication`

File changed:

`src/pages/api/login.js`

The production login endpoint was made self-contained so it no longer imports the shared authentication helpers. It now locally performs password verification, session creation, and HTTP-only session-cookie creation while retaining the existing PostgreSQL-backed user lookup, email-verification check, login logging, and six-hour session duration.

The change was deployed to the Render `AprioriConsultants` service and confirmed live there.

No further login-code change was required after the public-domain routing issue was identified.

## 2. Public-domain routing diagnosis

The public website is:

`https://www.aprioriconsultants.org`

The Render service is:

`https://aprioriconsultants.onrender.com`

During diagnosis, the Render service showed no `/api/login` requests while the public-domain login was being tested. This established that the public-domain request was not reaching the current Render service and that changing the working login code again would not address the underlying issue.

The required production path is:

**public domain → AprioriConsultants Render service → `/api/login` → PostgreSQL/session**

## 3. Render custom-domain configuration

The custom domains were added to the Render service `AprioriConsultants`.

The two public hostnames configured are:

- `aprioriconsultants.org`
- `www.aprioriconsultants.org`

Render subsequently verified both domains.

## 4. GoDaddy DNS changes

The domain DNS is managed through GoDaddy.

The old Vercel web-routing records were identified as conflicting with the Render configuration and were replaced for the website hostnames.

### Root domain

The old A record:

`@ → 76.76.21.21`

was removed.

The Render A record is now:

`@ → 216.24.57.1`

### WWW hostname

The `www` CNAME is now:

`www → aprioriconsultants.onrender.com`

The previous Vercel CNAME using `cname.vercel-dns.com` was removed because it conflicted with the Render CNAME for the same hostname.

Do not delete unrelated NS/SOA/email records.

## 5. Current certificate state

Render reports both custom domains as DNS-verified, but certificate status is currently shown as a certificate error while TLS certificate provisioning/activation completes.

The DNS records should not be changed again merely because the certificate is temporarily in error. The next state to confirm is successful Render-managed TLS certificate issuance for both domains.

## 6. Current verification rule

The permanent working rule remains documented separately in:

`docs/SAT-LIVE-DEPLOYMENT-RULE.md`

The public website is the primary student-facing verification environment. The Render URL remains an infrastructure/diagnostic environment rather than the normal user testing URL.

## 7. Next checkpoint

After Render TLS certificates become active:

1. Verify `https://www.aprioriconsultants.org/Auth`.
2. Verify the same-domain `/api/login` request reaches the current application.
3. Confirm successful verified-student login and session creation on the public website.
4. Only then continue with the next SAT product milestone.

Password recovery remains intentionally deferred until direct public-domain authentication/login is confirmed end-to-end.
