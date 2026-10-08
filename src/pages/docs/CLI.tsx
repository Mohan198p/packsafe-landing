import type { FC } from 'react'
import {
  Prose, H1, H2, H3, P, Lead, Code, CodeBlock, Callout, SectionLabel, FlagRow, Hr, Badge,
  Table, THead, TBody, TR, TH, TD, UL, OL, LI,
} from '@/components/Markdown'
import { useParams, Link } from 'react-router'

// ─── Command Tabs Navigation ──────────────────────────────────────────────────

const CLI_TABS = [
  { id: 'overview', label: 'Overview', path: '/docs/cli' },
  { id: 'init', label: 'init', path: '/docs/cli/init' },
  { id: 'analyze', label: 'analyze', path: '/docs/cli/analyze' },
  { id: 'inspect', label: 'inspect', path: '/docs/cli/inspect' },
  { id: 'install', label: 'install', path: '/docs/cli/install' },
  { id: 'audit', label: 'audit', path: '/docs/cli/audit' },
  { id: 'exit-codes', label: 'Exit codes', path: '/docs/cli/exit-codes' },
  { id: 'troubleshooting', label: 'Troubleshooting', path: '/docs/cli/troubleshooting' },
]

function CommandTabs({ current }: { current: string }) {
  return (
    <div style={{ marginBottom: '32px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px' }}>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {CLI_TABS.map((tab) => {
          const isActive = tab.id === current
          return (
            <Link
              key={tab.id}
              to={tab.path}
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '11px',
                padding: '5px 10px',
                borderRadius: '2px',
                textDecoration: 'none',
                background: isActive ? 'rgba(255,58,0,0.12)' : 'rgba(255,255,255,0.03)',
                color: isActive ? '#ff3a00' : 'rgba(240,237,232,0.5)',
                border: isActive ? '1px solid rgba(255,58,0,0.3)' : '1px solid rgba(255,255,255,0.06)',
                transition: 'all 0.15s ease',
              }}
            >
              {tab.label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

// ─── 1. CLI Overview & Global Options ─────────────────────────────────────────

function CLIOverview() {
  return (
    <>
      <CommandTabs current="overview" />
      <SectionLabel>CLI REFERENCE · OVERVIEW</SectionLabel>
      <H1>PackSafe CLI Reference</H1>
      <Lead>
        Complete documentation for the <Code>packsafe</Code> command line tool — installation,
        every command, every option, exit codes, configuration and troubleshooting.
      </Lead>

      <H2 id="what-packsafe-is">What PackSafe is</H2>
      <P>
        PackSafe is a security gatekeeper for the open-source software supply chain. It evaluates a
        package <strong>before</strong> installation, gives it a safety score out of 100, explains
        exactly which checks fired, and then either installs the package or refuses to.
      </P>
      <P>
        It is a single command line tool. Nothing is uploaded, no account is required, and no
        credentials are needed for any read-only command.
      </P>

      <H2 id="prerequisites">Prerequisites</H2>
      <Table>
        <THead>
          <TR>
            <TH>Requirement</TH>
            <TH>Details</TH>
          </TR>
        </THead>
        <TBody>
          {[
            ['Python', '3.11 or newer. Tested against 3.11, 3.12, 3.13 and 3.14'],
            ['Package manager', 'pip or uv on your PATH — required only for packsafe install'],
            ['pip version', '22.3 or newer, in the rare case PackSafe falls back to your PATH pip (see install reference)'],
            ['Python environment', 'An activated virtualenv or a ./.venv in the current directory — required only for packsafe install'],
            ['Network access', 'PackSafe queries PyPI, OSV.dev, GitHub, deps.dev, CISA KEV and FIRST EPSS over HTTPS'],
            ['Operating system', 'Linux, macOS and Windows (Windows virtualenv layouts are detected)'],
            ['Credentials', 'None required. A GITHUB_TOKEN is optional and only raises the GitHub API rate limit'],
          ].map(([req, detail]) => (
            <TR key={req}>
              <TD><strong style={{ color: '#f0ede8' }}>{req}</strong></TD>
              <TD>{detail}</TD>
            </TR>
          ))}
        </TBody>
      </Table>
      <Callout type="warning">
        PackSafe never installs into a global Python environment. This is deliberate — installs must target an activated virtualenv, <Code>./.venv</Code>, or an environment passed via <Code>--python</Code>.
      </Callout>

      <H2 id="global-options">Global options</H2>
      <P>
        These apply to every command and <strong>must be placed before the subcommand</strong>.
      </P>
      <CodeBlock lang="bash">
{`packsafe --verbose analyze requests     # correct
packsafe analyze --verbose requests     # error: no such option`}
      </CodeBlock>

      <div style={{ border: '1px solid rgba(255,255,255,0.08)', background: '#0e0e0e', marginBottom: '24px' }}>
        <FlagRow flag="--version" type="flag" defaultVal="off">
          Print the installed PackSafe version and exit.
        </FlagRow>
        <FlagRow flag="--verbose / -v" type="flag" defaultVal="off">
          Log DEBUG detail — every metric's raw-to-normalized math, HTTP calls and retries.
        </FlagRow>
        <FlagRow flag="--log-level" type="string" defaultVal="none">
          Explicit log level: <Code>DEBUG</Code>, <Code>INFO</Code>, <Code>WARNING</Code> or <Code>ERROR</Code>. Overrides <Code>--verbose</Code>.
        </FlagRow>
        <FlagRow flag="--log-file" type="path" defaultVal="./.packsafe/logs/packsafe.log">
          Where to write the trace log.
        </FlagRow>
        <FlagRow flag="--install-completion" type="flag" defaultVal="off">
          Install shell tab-completion for the current shell (zsh, bash, fish, PowerShell).
        </FlagRow>
        <FlagRow flag="--show-completion" type="flag" defaultVal="off">
          Print the completion script so you can install it yourself.
        </FlagRow>
        <FlagRow flag="--help / -h" type="flag" defaultVal="off">
          Show help and exit.
        </FlagRow>
      </div>

      <H3 id="note-on-version">A note on --version</H3>
      <P>
        The flag is overloaded, and the position matters:
      </P>
      <CodeBlock lang="bash">
{`packsafe --version                 # PackSafe's own version  -> "packsafe 0.1.2"
packsafe analyze --version 2.32.3 # the *package* version   -> analyzes requests 2.32.3`}
      </CodeBlock>
      <P>
        The global form takes no value and exits immediately. The per-command form (<Code>-V</Code> on <Code>analyze</Code>, <Code>inspect</Code> and <Code>install</Code>) takes the package version you want to target.
      </P>

      <H3 id="shell-completion">Shell completion</H3>
      <CodeBlock lang="bash">
{`packsafe --install-completion          # zsh, bash, fish or PowerShell, detected automatically
packsafe --show-completion > ~/.packsafe/completion.sh`}
      </CodeBlock>

      <H2 id="commands-at-a-glance">Commands at a glance</H2>
      <Table>
        <THead>
          <TR>
            <TH>Command</TH>
            <TH>What it does</TH>
          </TR>
        </THead>
        <TBody>
          {[
            ['init', 'Create the PackSafe config directory, SQLite cache and KEV catalog', '/docs/cli/init'],
            ['analyze', 'Score a package and report its supply-chain risk', '/docs/cli/analyze'],
            ['inspect', 'Show every piece of evidence PackSafe has on a package', '/docs/cli/inspect'],
            ['install', 'Analyze a package, then install it only if it is safe', '/docs/cli/install'],
            ['audit', 'Reserved. Not implemented yet', '/docs/cli/audit'],
          ].map(([cmd, desc, link]) => (
            <TR key={cmd}>
              <TD>
                <Link to={link} style={{ color: '#ff3a00', textDecoration: 'none' }}>
                  <Code>packsafe {cmd}</Code>
                </Link>
              </TD>
              <TD>{desc}</TD>
            </TR>
          ))}
        </TBody>
      </Table>

      <H2 id="evidence-sources">Evidence sources</H2>
      <Table>
        <THead>
          <TR>
            <TH>Source</TH>
            <TH>What it contributes</TH>
          </TR>
        </THead>
        <TBody>
          {[
            ['PyPI', 'Release metadata, maintainers, dependencies, license, download counts'],
            ['OSV.dev', 'Vulnerability advisories across ecosystems'],
            ['CISA KEV', 'Confirmed, actively exploited vulnerabilities'],
            ['FIRST EPSS', 'Exploit Prediction Scoring System — probability of exploitation'],
            ['GitHub', 'Repository activity, issues, releases, ownership'],
            ['deps.dev', 'Dependency graph and OpenSSF Scorecard data'],
            ['Source archive', 'Static analysis of the downloaded package source'],
          ].map(([source, contrib]) => (
            <TR key={source}>
              <TD><strong style={{ color: '#f0ede8' }}>{source}</strong></TD>
              <TD>{contrib}</TD>
            </TR>
          ))}
        </TBody>
      </Table>

      <H2 id="score-categories">Score categories & weights</H2>
      <Table>
        <THead>
          <TR>
            <TH>Category</TH>
            <TH>Weight</TH>
            <TH>Focus</TH>
          </TR>
        </THead>
        <TBody>
          {[
            ['Security', '0.40', 'Known vulnerabilities, exploitability, malicious code patterns'],
            ['Integrity', '0.25', 'Reproducibility, signature and hash consistency, provenance'],
            ['Supply chain', '0.20', 'Maintainer behaviour, account takeover signals, dependency risk'],
            ['Maintenance', '0.10', 'Release cadence, responsiveness, project health'],
            ['Adoption', '0.05', 'Download volume, dependents, ecosystem presence'],
          ].map(([cat, weight, focus]) => (
            <TR key={cat}>
              <TD><strong style={{ color: '#f0ede8' }}>{cat}</strong></TD>
              <TD><Code>{weight}</Code></TD>
              <TD>{focus}</TD>
            </TR>
          ))}
        </TBody>
      </Table>
      <P>Weights must sum to <Code>1.00</Code>; the scoring engine validates this at load time.</P>

      <H2 id="policy-gates">Policy gates</H2>
      <P>
        Gates are evaluated in order, and a triggered critical gate can force the score down to a
        floor and block outright:
      </P>
      <Table>
        <THead>
          <TR>
            <TH>Gate</TH>
            <TH>Severity</TH>
            <TH>Action</TH>
          </TR>
        </THead>
        <TBody>
          {[
            ['GATE-MALWARE', 'critical', 'Block, score floored at 5'],
            ['GATE-ACTIVE-CRITICAL', 'critical', 'Block'],
            ['GATE-CREDENTIAL-THEFT', 'critical', 'Block, at ≥ 0.85 confidence'],
            ['GATE-REMOTE-EXEC', 'critical', 'Block'],
            ['GATE-INSTALL-MALWARE', 'critical', 'Block'],
            ['GATE-SUSPICIOUS-WARN', 'warning', 'Warn, at ≥ 0.50 confidence'],
          ].map(([gate, sev, action]) => (
            <TR key={gate}>
              <TD><Code>{gate}</Code></TD>
              <TD>
                <Badge variant={sev === 'critical' ? 'red' : 'amber'}>{sev}</Badge>
              </TD>
              <TD>{action}</TD>
            </TR>
          ))}
        </TBody>
      </Table>
    </>
  )
}

// ─── 2. packsafe init ─────────────────────────────────────────────────────────

function CLIInit() {
  return (
    <>
      <CommandTabs current="init" />
      <SectionLabel>CLI REFERENCE · INIT</SectionLabel>
      <H1>packsafe init</H1>
      <Lead>
        Initializes PackSafe configuration and local storage. Takes no arguments and no options.
      </Lead>

      <H2 id="synopsis">Synopsis</H2>
      <CodeBlock lang="bash">
{`packsafe init`}
      </CodeBlock>

      <H2 id="what-it-creates">What it creates</H2>
      <Table>
        <THead>
          <TR>
            <TH>Path</TH>
            <TH>Purpose</TH>
          </TR>
        </THead>
        <TBody>
          {[
            ['~/.packsafe/', "PackSafe's application root directory"],
            ['~/.packsafe/config.toml', 'User configuration file'],
            ['~/.packsafe/cache.db', 'SQLite cache of registry and advisory data'],
            ['~/.packsafe/kev_catalog.json', 'Pre-cached CISA KEV exploit catalog (24 hour TTL)'],
          ].map(([path, purpose]) => (
            <TR key={path}>
              <TD><Code>{path}</Code></TD>
              <TD>{purpose}</TD>
            </TR>
          ))}
        </TBody>
      </Table>

      <H2 id="what-it-prints">What it prints</H2>
      <CodeBlock lang="text" title="TERMINAL OUTPUT">
{`PACKSAFE
Initializing PackSafe

Preparing PackSafe...
Cached 1842 CISA KEV entries for offline use.
Config: /home/you/.packsafe/config.toml
Cache: /home/you/.packsafe/cache.db
✓ PackSafe initialized successfully`}
      </CodeBlock>

      <H2 id="notes">Notes</H2>
      <UL>
        <LI>
          If everything already exists, it prints <Code>PackSafe is already initialized.</Code> and exits with code <Code>0</Code>.
        </LI>
        <LI>
          If the KEV catalog cannot be pre-fetched, it warns you and continues — it will be fetched on first use instead.
        </LI>
        <LI>
          Nothing here is required to run <Code>analyze</Code> or <Code>inspect</Code>. Those commands create what they need on demand.
        </LI>
        <LI>
          <Code>packsafe init</Code> never overwrites an existing <Code>config.toml</Code>.
        </LI>
        <LI>
          Add <Code>~/.packsafe</Code> to your backup or dotfiles if you want the config to travel with you.
        </LI>
      </UL>
    </>
  )
}

// ─── 3. packsafe analyze ──────────────────────────────────────────────────────

function CLIAnalyze() {
  return (
    <>
      <CommandTabs current="analyze" />
      <SectionLabel>CLI REFERENCE · ANALYZE</SectionLabel>
      <H1>packsafe analyze</H1>
      <Lead>
        Analyze a package and report its supply-chain risk. This is the main command — it
        produces the score, the checks that fired, the risk factors, the policy gates and a
        recommendation.
      </Lead>

      <H2 id="synopsis">Synopsis</H2>
      <CodeBlock lang="bash">
{`packsafe analyze PACKAGE_NAME [flags]`}
      </CodeBlock>

      <H2 id="options">Options</H2>
      <div style={{ border: '1px solid rgba(255,255,255,0.08)', background: '#0e0e0e', marginBottom: '24px' }}>
        <FlagRow flag="PACKAGE_NAME" type="argument">
          Name of the package to analyze. <strong>Required</strong>.
        </FlagRow>
        <FlagRow flag="--version / -V" type="string" defaultVal="latest">
          Target a specific package version (e.g., <Code>-V 5.2.8</Code>).
        </FlagRow>
        <FlagRow flag="--ecosystem / -e" type="string" defaultVal="pypi">
          Registry to look the package up in. Currently <Code>pypi</Code> is supported.
        </FlagRow>
        <FlagRow flag="--all / -a" type="flag" defaultVal="off">
          List every risk factor and full gate reason instead of the collapsed summary.
        </FlagRow>
        <FlagRow flag="--help / -h" type="flag" defaultVal="off">
          Show help and exit.
        </FlagRow>
      </div>

      <H2 id="examples">Examples</H2>
      <CodeBlock lang="bash">
{`# Analyze latest version from PyPI
packsafe analyze requests

# Target a specific version
packsafe analyze django -V 5.2.8

# List every risk factor without collapsing
packsafe analyze urllib3 --all

# Explicit ecosystem
packsafe analyze some-package -e pypi`}
      </CodeBlock>

      <H2 id="output-structure">Output structure</H2>
      <P>An analysis report contains seven structured sections:</P>
      <OL>
        <LI ordered><strong>Header</strong> — package name and resolved version</LI>
        <LI ordered><strong>Verdict</strong> — <Code>SAFE TO INSTALL</Code>, <Code>REVIEW BEFORE INSTALLING</Code>, <Code>INSTALL WITH CAUTION</Code>, or <Code>DO NOT INSTALL</Code></LI>
        <LI ordered><strong>Checks</strong> — the individual checks that passed and failed</LI>
        <LI ordered><strong>Risk Factors (N)</strong> — up to 10 by default; remainder withheld with a hint to re-run with <Code>--all</Code></LI>
        <LI ordered><strong>Policy Gates</strong> — which gates evaluated, which triggered, and why</LI>
        <LI ordered><strong>Recommendation</strong> — a plain-language headline</LI>
        <LI ordered><strong>Footer</strong> — evidence coverage, coverage tier, engine version, UTC timestamp, and archive hash</LI>
      </OL>

      <Callout type="note">
        If the analysis confidence is below 60, an extra line warns you that the verdict is provisional and that evidence was thin. In an interactive terminal, a collapsed report offers to expand in place. In CI and non-interactive contexts, nothing is prompted.
      </Callout>

      <H2 id="score-bands">Score and risk bands</H2>
      <Table>
        <THead>
          <TR>
            <TH>Score</TH>
            <TH>Risk Level</TH>
            <TH>Verdict</TH>
          </TR>
        </THead>
        <TBody>
          {[
            ['90–100', 'SAFE', 'green', 'SAFE TO INSTALL'],
            ['75–89', 'LOW', 'green', 'REVIEW BEFORE INSTALLING'],
            ['60–74', 'MODERATE', 'amber', 'INSTALL WITH CAUTION'],
            ['40–59', 'HIGH', 'amber', 'INSTALL WITH CAUTION / BLOCKED'],
            ['0–39', 'CRITICAL', 'red', 'DO NOT INSTALL'],
          ].map(([score, risk, variant, verdict]) => (
            <TR key={score}>
              <TD><Code>{score}</Code></TD>
              <TD><Badge variant={variant as any}>{risk}</Badge></TD>
              <TD>{verdict}</TD>
            </TR>
          ))}
        </TBody>
      </Table>

      <H2 id="all-flag">--all versus the default</H2>
      <P>
        By default the report is bounded and readable: at most 10 risk factors, with a{' '}
        <Code>Detail withheld · re-run with --all</Code> marker where the rest were cut.
      </P>
      <P>
        <Code>--all</Code> prints the complete set, including full gate reasoning. Use the default for
        scanning, <Code>--all</Code> when you are investigating a specific package or writing an audit report.
      </P>
    </>
  )
}

// ─── 4. packsafe inspect ──────────────────────────────────────────────────────

function CLIInspect() {
  return (
    <>
      <CommandTabs current="inspect" />
      <SectionLabel>CLI REFERENCE · INSPECT</SectionLabel>
      <H1>packsafe inspect</H1>
      <Lead>
        Show everything PackSafe knows about a package. Same analysis pipeline as <Code>analyze</Code>,
        but renders the raw evidence instead of a verdict. Use this when you want to audit
        PackSafe's reasoning, or when debugging a score.
      </Lead>

      <H2 id="synopsis">Synopsis</H2>
      <CodeBlock lang="bash">
{`packsafe inspect PACKAGE_NAME [flags]`}
      </CodeBlock>

      <H2 id="options">Options</H2>
      <div style={{ border: '1px solid rgba(255,255,255,0.08)', background: '#0e0e0e', marginBottom: '24px' }}>
        <FlagRow flag="PACKAGE_NAME" type="argument">
          Name of the package to inspect. <strong>Required</strong>.
        </FlagRow>
        <FlagRow flag="--version / -V" type="string" defaultVal="latest">
          Target a specific package version.
        </FlagRow>
        <FlagRow flag="--ecosystem / -e" type="string" defaultVal="pypi">
          Registry to look the package up in.
        </FlagRow>
        <FlagRow flag="--all / -a" type="flag" defaultVal="off">
          List every advisory and static finding instead of the bounded default.
        </FlagRow>
        <FlagRow flag="--help / -h" type="flag" defaultVal="off">
          Show help and exit.
        </FlagRow>
      </div>

      <H2 id="examples">Examples</H2>
      <CodeBlock lang="bash">
{`packsafe inspect requests
packsafe inspect django -V 5.2.8
packsafe inspect some-package --all`}
      </CodeBlock>

      <H2 id="output-sections">Output sections</H2>
      <OL>
        <LI ordered><strong>Request</strong> — what was asked for</LI>
        <LI ordered><strong>Package</strong> — resolved name, version and summary</LI>
        <LI ordered><strong>Registry</strong> — PyPI metadata</LI>
        <LI ordered><strong>Repository</strong> — source repository and links</LI>
        <LI ordered><strong>Identity</strong> — maintainer and namespace signals</LI>
        <LI ordered><strong>Vulnerabilities (N)</strong> — split into <em>Affects version X</em>, <em>Does not affect this version</em>, and <em>Could not be evaluated</em></LI>
        <LI ordered><strong>Dependencies</strong> — declared dependency count and samples</LI>
        <LI ordered><strong>Static analysis</strong> — findings from the source archive, if downloaded</LI>
        <LI ordered><strong>License</strong> — declared license and any policy conflict</LI>
        <LI ordered><strong>Sources (provenance)</strong> — which source, which URL, when it was fetched</LI>
        <LI ordered><strong>Coverage</strong> — which evidence tiers were reached</LI>
      </OL>

      <H2 id="bounds">Bounds</H2>
      <P>
        Advisories and static findings are capped at 20 each by default. Overflow is reported as{' '}
        <Code>… N more; re-run with --all</Code>.
      </P>

      <H2 id="split-matters">Why the vulnerability split matters</H2>
      <P>
        Advisories that <em>do not affect</em> the resolved version are listed separately from ones that
        do. This is the difference between "this package has 14 known CVEs" and "this version has
        14 known CVEs" — a distinction that matters enormously when deciding whether to install.
      </P>
    </>
  )
}

// ─── 5. packsafe install ──────────────────────────────────────────────────────

function CLIInstall() {
  return (
    <>
      <CommandTabs current="install" />
      <SectionLabel>CLI REFERENCE · INSTALL</SectionLabel>
      <H1>packsafe install</H1>
      <Lead>
        Analyze a package, then install it only if it is safe to. This is the primary gatekeeper
        command the rest of the tool exists for.
      </Lead>

      <Callout type="danger">
        <strong>Exactly one of <Code>--pip</Code> or <Code>--uv</Code> is required.</strong> There is no default. Passing both, or neither, exits with code <Code>2</Code>.
      </Callout>

      <H2 id="synopsis">Synopsis</H2>
      <CodeBlock lang="bash">
{`packsafe install PACKAGE_NAME [flags]`}
      </CodeBlock>

      <H2 id="options">Options</H2>
      <div style={{ border: '1px solid rgba(255,255,255,0.08)', background: '#0e0e0e', marginBottom: '24px' }}>
        <FlagRow flag="PACKAGE_NAME" type="argument">
          Name of the package to install. <strong>Required</strong>.
        </FlagRow>
        <FlagRow flag="--pip" type="flag" defaultVal="off">
          Install with pip. Mutually exclusive with <Code>--uv</Code>.
        </FlagRow>
        <FlagRow flag="--uv" type="flag" defaultVal="off">
          Install with uv. Mutually exclusive with <Code>--pip</Code>.
        </FlagRow>
        <FlagRow flag="--version / -V" type="string" defaultVal="latest">
          Target a specific package version.
        </FlagRow>
        <FlagRow flag="--ecosystem / -e" type="string" defaultVal="pypi">
          Registry to look the package up in.
        </FlagRow>
        <FlagRow flag="--yes / -y" type="flag" defaultVal="off">
          Install without asking, even when the analysis reports warnings.
        </FlagRow>
        <FlagRow flag="--min-score" type="float" defaultVal="none">
          Refuse to install below this safety score (0–100). Tightens the policy.
        </FlagRow>
        <FlagRow flag="--python" type="string" defaultVal="see resolution">
          Environment directory or interpreter to install into.
        </FlagRow>
        <FlagRow flag="--add" type="flag" defaultVal="off">
          Record the dependency in <Code>pyproject.toml</Code> and <Code>uv.lock</Code> as well as installing it (uv only).
        </FlagRow>
        <FlagRow flag="--help / -h" type="flag" defaultVal="off">
          Show help and exit.
        </FlagRow>
      </div>

      <H2 id="examples">Examples</H2>
      <CodeBlock lang="bash">
{`# The three everyday forms
packsafe install --pip requests
packsafe install --uv requests
packsafe install --pip "requests==2.32.3"

# Policy tightening (exit code 4 if score < 90)
packsafe install --uv django --min-score 90

# Unattended / CI (auto-accept warnings)
packsafe install --uv requests --yes

# Explicit environment
packsafe install --uv requests --python /path/to/.venv

# Declare the dependency so \`uv sync\` does not remove it
packsafe install --uv requests --add

# Flags PackSafe does not know are forwarded to pip / uv verbatim
packsafe install --pip requests --no-cache-dir

# Explicit flag separation
packsafe install --uv requests -- --index-url https://my.private.index/simple`}
      </CodeBlock>

      <H2 id="gate-behavior">How the gate behaves</H2>
      <Table>
        <THead>
          <TR>
            <TH>Result</TH>
            <TH>What happens</TH>
          </TR>
        </THead>
        <TBody>
          {[
            ['No blocking signals', 'Installed immediately'],
            ['Warnings found', 'Prompts first, defaulting to No. --yes accepts them'],
            ['Blocked by policy', 'Refused, exit code 4'],
          ].map(([res, what]) => (
            <TR key={res}>
              <TD><strong style={{ color: '#f0ede8' }}>{res}</strong></TD>
              <TD>{what}</TD>
            </TR>
          ))}
        </TBody>
      </Table>
      <P>A block is triggered by any of:</P>
      <UL>
        <LI>a <Code>CRITICAL</Code> risk level</LI>
        <LI>any triggered policy gate with <Code>critical</Code> severity</LI>
        <LI>a final score below <Code>--min-score</Code></LI>
        <LI>a <Code>BLOCK</Code> decision from the scoring engine</LI>
      </UL>
      <Callout type="note">
        <Code>--min-score</Code> can only ever <strong>tighten</strong> the policy. It cannot loosen a built-in block.
      </Callout>

      <H2 id="confirmation-prompt">The confirmation prompt</H2>
      <CodeBlock lang="text" title="PROMPT">
{`Install requests anyway (safety score 64/100, MODERATE)?`}
      </CodeBlock>
      <P>
        The default answer is <strong>No</strong>. In a non-interactive context (CI, a cron job, a piped command)
        PackSafe cannot ask, so it refuses with exit code <Code>4</Code> and tells you to pass <Code>--yes</Code> or set <Code>--min-score</Code>.
      </P>

      <H2 id="install-target">Where an install lands</H2>
      <P>
        Never a global environment. PackSafe resolves the target in this order of precedence:
      </P>
      <OL>
        <LI ordered><Code>--python /path/to/env</Code> — an environment directory or a direct interpreter path</LI>
        <LI ordered>the active virtualenv (<Code>$VIRTUAL_ENV</Code>)</LI>
        <LI ordered><Code>./.venv</Code></LI>
      </OL>
      <P>
        If none of those exist, PackSafe stops with exit code <Code>5</Code> and prompts:
      </P>
      <CodeBlock lang="text">
{`No Python environment found for /your/project. Create one with \`uv venv\` (or
\`python -m venv .venv\`), activate one, or point at it with \`--python\`.`}
      </CodeBlock>

      <H2 id="execution-details">What command actually runs</H2>
      <Table>
        <THead>
          <TR>
            <TH>Your invocation</TH>
            <TH>Command executed</TH>
          </TR>
        </THead>
        <TBody>
          {[
            ['--uv --add <pkg>', 'uv add <spec> — requires a pyproject.toml with a [project] table'],
            ['--uv <pkg>', 'uv pip install --python <target>/python <spec>'],
            ['--pip <pkg>', "the target environment's own pip install <spec>"],
            ['--pip <pkg>, target env has no pip', 'pip --python <target>/python install <spec> — needs pip ≥ 22.3'],
          ].map(([inv, execCmd]) => (
            <TR key={inv}>
              <TD><Code>{inv}</Code></TD>
              <TD><Code>{execCmd}</Code></TD>
            </TR>
          ))}
        </TBody>
      </Table>
      <P>
        Everything is executed as an argv list, never through a shell, so package names cannot be used to inject commands.
      </P>

      <H2 id="add-flag">--add</H2>
      <P>
        Without <Code>--add</Code>, <Code>packsafe install --uv</Code> installs into the environment only. The dependency
        is not recorded in <Code>pyproject.toml</Code>, so the next <Code>uv sync</Code> will remove it. PackSafe warns
        you after a successful install:
      </P>
      <CodeBlock lang="text">
{`requests is installed but not declared in pyproject.toml, so \`uv sync\` will remove it.
Declare it with: packsafe install --uv --add requests`}
      </CodeBlock>
      <Callout type="warning">
        <Code>--add</Code> is a uv feature. Using it with <Code>--pip</Code> is an error (exit code <Code>5</Code>) — pip has no equivalent.
      </Callout>

      <H2 id="forwarded-flags">Unknown flags are forwarded</H2>
      <P>
        <Code>packsafe install</Code> passes any flag it does not recognise straight through to pip or uv.
        This means a typo like <Code>--yess</Code> goes to the package manager rather than being caught by PackSafe.
        Use <Code>--</Code> to separate explicitly when in doubt:
      </P>
      <CodeBlock lang="bash">
{`packsafe install --uv requests -- --index-url https://my.private.index/simple`}
      </CodeBlock>
    </>
  )
}

// ─── 6. packsafe audit ────────────────────────────────────────────────────────

function CLIAudit() {
  return (
    <>
      <CommandTabs current="audit" />
      <SectionLabel>CLI REFERENCE · AUDIT</SectionLabel>
      <H1>packsafe audit</H1>
      <Lead>
        Reserved for scanning an entire dependency folder or lockfile at once.
      </Lead>

      <H2 id="synopsis">Synopsis</H2>
      <CodeBlock lang="bash">
{`packsafe audit`}
      </CodeBlock>

      <H2 id="status">Status & Implementation</H2>
      <Callout type="warning">
        <strong>Not implemented yet.</strong> The command is registered and exits <Code>0</Code>, but performs no analysis and prints only a placeholder line. Do not rely on it today.
      </Callout>
      <P>
        This command is reserved for auditing existing project manifests (<Code>pyproject.toml</Code>, <Code>requirements.txt</Code>, <Code>uv.lock</Code>) in batch mode.
      </P>
    </>
  )
}

// ─── 7. Exit codes ────────────────────────────────────────────────────────────

function CLIExitCodes() {
  return (
    <>
      <CommandTabs current="exit-codes" />
      <SectionLabel>CLI REFERENCE · EXIT CODES</SectionLabel>
      <H1>Exit codes</H1>
      <Lead>
        One predictable contract across all commands — designed for scripts and CI pipelines.
      </Lead>

      <H2 id="exit-codes-table">Exit codes contract</H2>
      <Table>
        <THead>
          <TR>
            <TH>Code</TH>
            <TH>Meaning</TH>
            <TH>Typical trigger</TH>
          </TR>
        </THead>
        <TBody>
          {[
            ['0', 'Success', 'Analysis passed, package installed, or init completed'],
            ['1', 'Package not found or internal error', 'Misspelled package name, non-existent package on PyPI, or init failed'],
            ['2', 'Registry unreachable / network error', 'PyPI or advisory API down. Also: install given both or neither of --pip and --uv'],
            ['3', 'Invalid or unparseable package data', 'Corrupted manifest or malformed registry response'],
            ['4', 'Blocked by policy', 'Gate block, declined confirmation prompt, or unattended run with warnings'],
            ['5', 'No install target / manager failure', 'No virtualenv found, pip missing, or package manager subprocess failed'],
            ['130', 'Cancelled by user', 'Ctrl-C interrupted execution'],
          ].map(([code, meaning, trig]) => (
            <TR key={code}>
              <TD><Code>{code}</Code></TD>
              <TD><strong style={{ color: '#f0ede8' }}>{meaning}</strong></TD>
              <TD>{trig}</TD>
            </TR>
          ))}
        </TBody>
      </Table>

      <H2 id="ci-usage">Using exit codes in CI</H2>
      <P>
        Because <Code>4</Code> is a policy decision rather than an unexpected crash, a CI script can distinguish "this package is unsafe" from "the network is down":
      </P>
      <CodeBlock lang="bash">
{`packsafe install --uv requests --min-score 70 --yes || exit $?`}
      </CodeBlock>
      <Callout type="tip">
        Remember that <Code>1</Code>, <Code>2</Code> and <Code>3</Code> are lookup and data failures, while <Code>4</Code> and <Code>5</Code> are PackSafe's own policy decisions and execution failures. In scripts, branch on the numerical exit code rather than stderr text.
      </Callout>
    </>
  )
}

// ─── 8. Troubleshooting & Limitations ─────────────────────────────────────────

function CLITroubleshooting() {
  return (
    <>
      <CommandTabs current="troubleshooting" />
      <SectionLabel>CLI REFERENCE · TROUBLESHOOTING</SectionLabel>
      <H1>Troubleshooting & Limitations</H1>
      <Lead>
        Common error messages, architectural limitations, and instructions for building from source.
      </Lead>

      <H2 id="errors">Common errors & solutions</H2>

      <H3>Error: package not found</H3>
      <P>
        The name does not exist in the registry, or it was misspelled. PackSafe normalizes names,
        but a renamed or private package will not resolve. Exit code <Code>1</Code>.
      </P>

      <H3>Network Error</H3>
      <P>
        One of the evidence sources could not be reached. Exit code <Code>2</Code>. PackSafe degrades
        gracefully where it can — a missing source lowers coverage and therefore confidence — but
        a total failure of the registry is fatal.
      </P>

      <H3>No Install Target</H3>
      <P>
        No <Code>$VIRTUAL_ENV</Code> and no <Code>./.venv</Code>. Exit code <Code>5</Code>.
      </P>
      <CodeBlock lang="bash">
{`uv venv                                   # or: python -m venv .venv
packsafe install --uv requests`}
      </CodeBlock>

      <H3>Conflicting Options: Choose one package manager</H3>
      <P>
        You passed both <Code>--pip</Code> and <Code>--uv</Code>. Exit code <Code>2</Code>. Select exactly one.
      </P>

      <H3>Missing Option: Say how to install</H3>
      <P>
        You passed neither <Code>--pip</Code> nor <Code>--uv</Code>. Exit code <Code>2</Code>. Specify one explicitly.
      </P>

      <H3>Confirmation Required in a script</H3>
      <P>
        There is no terminal to ask. Add <Code>--yes</Code> to accept the risk, or <Code>--min-score</Code> to change
        the safety bar. Exit code <Code>4</Code>.
      </P>

      <H3>The target environment has no pip of its own</H3>
      <P>
        PackSafe fell back to your <Code>PATH</Code> pip with <Code>--python</Code>, which needs pip 22.3 or newer.
        Either upgrade pip, or use <Code>--uv</Code> instead.
      </P>

      <H3>A score is lower than expected</H3>
      <P>
        Run with <Code>--verbose</Code> and read the log, then re-check the same package with{' '}
        <Code>packsafe inspect --all</Code>. The report footer tells you the coverage tier and the evidence
        count — a <Code>registry_osv</Code> score is not comparable to a <Code>deep_static</Code> one.
      </P>

      <H3>Getting a lower exit code than expected</H3>
      <P>
        Remember that <Code>1</Code>, <Code>2</Code> and <Code>3</Code> are lookup and data failures, while <Code>4</Code> and <Code>5</Code> are
        PackSafe's own decisions and execution failures. Branch on the code rather than parsing stderr text.
      </P>

      <H2 id="limitations">Limitations</H2>
      <UL>
        <LI>
          <strong>PyPI only.</strong> <Code>--ecosystem</Code> exists and accepts <Code>npm</Code>, but npm analysis is not implemented yet. Passing <Code>-e npm</Code> will fail.
        </LI>
        <LI>
          <strong>audit does nothing.</strong> The command exists but performs no analysis.
        </LI>
        <LI>
          <strong>Download statistics need the optional backend.</strong> 30-day download counts come from a local PackSafe backend service on <Code>http://localhost:8000</Code>. Without it, download counts are simply omitted — nothing else is affected.
        </LI>
        <LI>
          <strong>Source archives are capped at 50 MB.</strong> Larger packages are not downloaded for static analysis, which lowers the coverage tier.
        </LI>
        <LI>
          <strong>Config keys in config.toml are not yet read.</strong> Use <Code>--min-score</Code> today.
        </LI>
      </UL>

      <H2 id="building-from-source">Building from source</H2>
      <P>For contributors working on PackSafe itself:</P>
      <P><strong>Requirements:</strong> <Code>uv</Code>, a git clone of the repository.</P>
      <CodeBlock lang="bash">
{`git clone https://github.com/rahulpedapudi/packsafe.git
cd packsafe

uv sync --all-packages              # install all three workspace members
uv run packsafe inspect fastapi     # run the CLI from the workspace`}
      </CodeBlock>

      <P>Run the test suite and the packaging smoke test:</P>
      <CodeBlock lang="bash">
{`uv run pytest
uv run --package packsafe-core pytest packages/packsafe_core/packsafe_core/tests/

./scripts/test-build.sh            # build, install into a sandbox, smoke test
./scripts/test-build.sh --matrix   # also import-check 3.11, 3.12, 3.13, 3.14`}
      </CodeBlock>

      <P>Build distributions:</P>
      <CodeBlock lang="bash">
{`uv build --all-packages --out-dir dist`}
      </CodeBlock>

      <Table>
        <THead>
          <TR>
            <TH>Package</TH>
            <TH>Distribution name</TH>
            <TH>Role</TH>
          </TR>
        </THead>
        <TBody>
          {[
            ['packages/packsafe_core', 'packsafe-core', 'Evidence collection and scoring engine'],
            ['packages/packsafe_cli', 'packsafe', 'The CLI you install'],
            ['packages/backend', 'packsafe-backend', 'Optional service for download statistics. Not published'],
          ].map(([pkg, dist, role]) => (
            <TR key={pkg}>
              <TD><Code>{pkg}</Code></TD>
              <TD><strong style={{ color: '#f0ede8' }}>{dist}</strong></TD>
              <TD>{role}</TD>
            </TR>
          ))}
        </TBody>
      </Table>

      <Hr />
      <H3 id="license">License</H3>
      <P>Apache-2.0.</P>
    </>
  )
}

// ─── Router Dispatcher ────────────────────────────────────────────────────────

const pages: Record<string, FC> = {
  overview: CLIOverview,
  init: CLIInit,
  analyze: CLIAnalyze,
  inspect: CLIInspect,
  install: CLIInstall,
  audit: CLIAudit,
  'exit-codes': CLIExitCodes,
  troubleshooting: CLITroubleshooting,
}

export default function CLI() {
  const { command } = useParams()
  const activeKey = command && pages[command] ? command : 'overview'
  const Page = pages[activeKey]

  return (
    <Prose>
      <Page />
    </Prose>
  )
}
