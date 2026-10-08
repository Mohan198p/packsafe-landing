import {
  Prose, H1, H2, H3, P, Lead, Code, CodeBlock, Callout, UL, LI, SectionLabel, Hr, Badge,
  Table, THead, TBody, TR, TH, TD,
} from '@/components/Markdown'
import { Link } from 'react-router'

export default function Quickstart() {
  return (
    <Prose>
      <SectionLabel>GETTING STARTED · 02</SectionLabel>
      <H1>Quick start</H1>
      <Lead>
        Run your first package analysis and guarded installation in under a minute.
        This guide walks through the primary PackSafe CLI workflows.
      </Lead>

      <Callout type="note">
        This guide assumes PackSafe is installed. If not, see the{' '}
        <Link to="/docs/installation" style={{ color: '#ff3a00', textDecoration: 'none' }}>
          Installation guide
        </Link>{' '}
        first.
      </Callout>

      <H2 id="first-run">1. Initialize local cache</H2>
      <P>
        Run <Code>packsafe init</Code> to set up the local configuration, SQLite cache, and pre-cache the CISA KEV catalog for offline operation:
      </P>
      <CodeBlock lang="bash" title="TERMINAL">
{`$ packsafe init

PACKSAFE
Initializing PackSafe

Preparing PackSafe...
Cached 1842 CISA KEV entries for offline use.
Config: ~/.packsafe/config.toml
Cache: ~/.packsafe/cache.db
✓ PackSafe initialized successfully`}
      </CodeBlock>

      <H2 id="analyze-before-install">2. Analyze before installing</H2>
      <P>
        To evaluate a package's supply-chain security without installing it, use <Code>packsafe analyze</Code>:
      </P>
      <CodeBlock lang="bash" title="TERMINAL">
{`$ packsafe analyze requests

============================================================
PACKSAFE ANALYSIS: requests @ 2.32.3
============================================================

VERDICT: SAFE TO INSTALL (Safety Score: 96/100 · LOW RISK)

CHECKS:
  ✓ Known vulnerabilities: 0 affecting v2.32.3
  ✓ Integrity check: Consistent wheel signatures & hashes
  ✓ Provenance: Verified PyPI publisher & git repository
  ✓ Typosquatting: High-entropy canonical name

POLICY GATES:
  ✓ GATE-MALWARE: Passed
  ✓ GATE-ACTIVE-CRITICAL: Passed
  ✓ GATE-CREDENTIAL-THEFT: Passed

RECOMMENDATION: Package is safe for standard development environments.
------------------------------------------------------------
Coverage: 94% (tier: deep_static) · Engine: 0.1.2 · SHA-256: e3b0c44...`}
      </CodeBlock>

      <H2 id="blocking-scenario">3. What a blocked install looks like</H2>
      <P>
        When you attempt to install a package that violates security policy or triggers a critical gate,
        PackSafe refuses the installation with exit code <Code>4</Code>:
      </P>
      <CodeBlock lang="bash" title="TERMINAL">
{`$ packsafe install --uv malicious-typosquat

============================================================
PACKSAFE ANALYSIS: malicious-typosquat @ 0.1.0
============================================================

VERDICT: DO NOT INSTALL (Safety Score: 12/100 · CRITICAL)

POLICY GATES:
  ✗ GATE-MALWARE: Blocked (score floored at 5)
    Reason: Suspicious base64 execution in setup.py

RECOMMENDATION: DO NOT INSTALL. Active malware pattern detected.

Refusing to install. Blocked by policy.
Exited with code 4.`}
      </CodeBlock>

      <H2 id="inspect-evidence">4. Inspect raw evidence</H2>
      <P>
        Want to see the underlying telemetry rather than a verdict? Use <Code>packsafe inspect</Code> to view
        all 11 evidence sections — including vulnerabilities split by affected versus non-affected versions:
      </P>
      <CodeBlock lang="bash">
{`# Inspect raw evidence for a package
packsafe inspect requests

# Inspect a specific version with all findings displayed
packsafe inspect django -V 5.2.8 --all`}
      </CodeBlock>

      <H2 id="safe-install">5. Safe installation with uv or pip</H2>
      <P>
        When installing packages, you must explicitly choose either <Code>--uv</Code> or <Code>--pip</Code>.
        PackSafe evaluates the package and then safely invokes your package manager inside your active virtual environment:
      </P>
      <CodeBlock lang="bash">
{`# Standard install with uv
packsafe install --uv requests

# Standard install with pip
packsafe install --pip requests

# Tighten policy: refuse any package scoring under 90
packsafe install --uv django --min-score 90

# Non-interactive / CI (auto-accept warnings)
packsafe install --uv requests --yes

# Add to pyproject.toml & uv.lock (uv only)
packsafe install --uv requests --add`}
      </CodeBlock>

      <H2 id="reading-output">Reading the output: score & risk bands</H2>
      <Table>
        <THead>
          <TR>
            <TH>Score</TH>
            <TH>Risk Level</TH>
            <TH>Action</TH>
          </TR>
        </THead>
        <TBody>
          {[
            ['90–100', 'SAFE', 'green', 'Installs immediately without warnings.'],
            ['75–89', 'LOW', 'green', 'Installs immediately; review advisory notes.'],
            ['60–74', 'MODERATE', 'amber', 'Prompts confirmation before installation (default: No).'],
            ['40–59', 'HIGH', 'amber', 'Requires explicit confirmation or --yes.'],
            ['0–39', 'CRITICAL', 'red', 'Refused by default. Exit code 4.'],
          ].map(([score, risk, variant, action]) => (
            <TR key={score}>
              <TD><Code>{score}</Code></TD>
              <TD><Badge variant={variant as any}>{risk}</Badge></TD>
              <TD>{action}</TD>
            </TR>
          ))}
        </TBody>
      </Table>

      <Hr />

      <H2 id="next-steps">Next steps</H2>
      <UL>
        <LI>
          <Link to="/docs/cli/install" style={{ color: '#ff3a00', textDecoration: 'none' }}>
            packsafe install Reference →
          </Link>
        </LI>
        <LI>
          <Link to="/docs/cli/analyze" style={{ color: '#ff3a00', textDecoration: 'none' }}>
            packsafe analyze Reference →
          </Link>
        </LI>
        <LI>
          <Link to="/docs/cli/inspect" style={{ color: '#ff3a00', textDecoration: 'none' }}>
            packsafe inspect Reference →
          </Link>
        </LI>
        <LI>
          <Link to="/docs/cli/exit-codes" style={{ color: '#ff3a00', textDecoration: 'none' }}>
            Exit Codes & CI Usage →
          </Link>
        </LI>
        <LI>
          <Link to="/docs/configuration" style={{ color: '#ff3a00', textDecoration: 'none' }}>
            Configuration & Logging →
          </Link>
        </LI>
      </UL>
    </Prose>
  )
}
