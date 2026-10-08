import {
  Prose, H1, H2, H3, P, Lead, Code, CodeBlock, Callout, SectionLabel, FlagRow, Hr, Badge,
} from '@/components/Markdown'
import { useParams, Link } from 'react-router'

// ─── packsafe install ─────────────────────────────────────────────────────────

function CLIInstall() {
  return (
    <>
      <SectionLabel>CLI REFERENCE · 01</SectionLabel>
      <H1>packsafe install</H1>
      <Lead>
        Drop-in replacement for <Code>npm install</Code> and <Code>pip install</Code>. Runs the full
        safety analysis pipeline before any package code is executed.
      </Lead>

      <H2 id="synopsis">Synopsis</H2>
      <CodeBlock lang="bash">
{`packsafe install <package>[@version] [flags]
packsafe i <package>[@version] [flags]   # alias`}
      </CodeBlock>

      <H2 id="flags">Flags</H2>
      <div style={{ border: '1px solid rgba(255,255,255,0.08)', background: '#0e0e0e', marginBottom: '24px' }}>
        <FlagRow flag="--yes / -y" type="boolean" defaultVal="false">
          Skip the interactive confirmation prompt on WARN-level packages. Does not override BLOCK.
        </FlagRow>
        <FlagRow flag="--force" type="boolean" defaultVal="false">
          Force installation even on BLOCK-level packages. Emits a loud warning and requires explicit confirmation.
          Not recommended for production use.
        </FlagRow>
        <FlagRow flag="--registry" type="string" defaultVal="auto">
          Override the target registry. Accepts <Code>npm</Code>, <Code>pypi</Code>, or a private registry URL.
        </FlagRow>
        <FlagRow flag="--threshold" type="number" defaultVal="70">
          Override the block threshold (0–100). Packages scoring below this value are blocked.
        </FlagRow>
        <FlagRow flag="--format" type="json | text" defaultVal="text">
          Output format. Use <Code>json</Code> for machine-readable output in CI pipelines.
        </FlagRow>
        <FlagRow flag="--no-color" type="boolean" defaultVal="false">
          Disable terminal color output.
        </FlagRow>
        <FlagRow flag="--silent" type="boolean" defaultVal="false">
          Suppress all output except errors and the final verdict. BLOCK still emits to stderr.
        </FlagRow>
      </div>

      <H2 id="examples">Examples</H2>
      <CodeBlock lang="bash">
{`# Basic install with interactive prompt
packsafe install express

# Install specific version
packsafe install lodash@4.17.21

# Install multiple packages
packsafe install react react-dom typescript

# Install without prompt (auto-approve WARN)
packsafe install fastapi --yes

# Install with JSON output (for CI)
packsafe install requests --format json | jq '.score'

# Install with custom block threshold
packsafe install axios --threshold 85`}
      </CodeBlock>

      <H2 id="exit-codes">Exit codes</H2>
      <div style={{ border: '1px solid rgba(255,255,255,0.08)', background: '#0e0e0e', marginBottom: '24px' }}>
        {[
          { code: '0', desc: 'Analysis passed. Package installed successfully.' },
          { code: '1', desc: 'Installation blocked. Package scored below threshold or was hallucinated.' },
          { code: '2', desc: 'Analysis error. Network failure or registry unavailable.' },
          { code: '3', desc: 'Aborted by user at the interactive confirmation prompt.' },
        ].map(row => (
          <div
            key={row.code}
            style={{
              display: 'grid',
              gridTemplateColumns: '60px 1fr',
              gap: '16px',
              padding: '12px 16px',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
            }}
          >
            <Code>{row.code}</Code>
            <span style={{ fontSize: '13px', color: 'rgba(240,237,232,0.5)' }}>{row.desc}</span>
          </div>
        ))}
      </div>

      <Callout type="warning">
        In CI environments, always check the exit code. A zero exit means the package passed the
        safety gate at the configured threshold — not that it is unconditionally safe.
      </Callout>
    </>
  )
}

// ─── packsafe analyze ─────────────────────────────────────────────────────────

function CLIAnalyze() {
  return (
    <>
      <SectionLabel>CLI REFERENCE · 02</SectionLabel>
      <H1>packsafe analyze</H1>
      <Lead>
        Inspect a package's full signal breakdown without installing it. Also accepts a manifest
        file to analyze all listed dependencies at once.
      </Lead>

      <H2 id="synopsis">Synopsis</H2>
      <CodeBlock lang="bash">
{`packsafe analyze <package>[@version] [flags]
packsafe analyze --manifest <file> [flags]`}
      </CodeBlock>

      <H2 id="flags">Flags</H2>
      <div style={{ border: '1px solid rgba(255,255,255,0.08)', background: '#0e0e0e', marginBottom: '24px' }}>
        <FlagRow flag="--manifest" type="string">
          Path to a manifest file (<Code>package.json</Code>, <Code>requirements.txt</Code>,
          <Code>pyproject.toml</Code>). All listed dependencies are analyzed.
        </FlagRow>
        <FlagRow flag="--format" type="json | text | table" defaultVal="text">
          Output format. <Code>table</Code> renders a side-by-side comparison for manifest analysis.
        </FlagRow>
        <FlagRow flag="--depth" type="number" defaultVal="0">
          Dependency tree depth to analyze. <Code>0</Code> analyzes only the direct package.
          <Code>-1</Code> recurses the full tree.
        </FlagRow>
        <FlagRow flag="--fail-on" type="warn | block" defaultVal="block">
          Non-zero exit code threshold. Set to <Code>warn</Code> to exit non-zero on any WARN or BLOCK.
        </FlagRow>
      </div>

      <H2 id="examples">Examples</H2>
      <CodeBlock lang="bash">
{`# Analyze a single package
packsafe analyze express

# Analyze with full dependency tree
packsafe analyze express --depth -1

# Analyze all packages in package.json
packsafe analyze --manifest package.json --format table

# Output JSON for scripting
packsafe analyze lodash --format json

# Fail CI on any WARN-level package in manifest
packsafe analyze --manifest requirements.txt --fail-on warn`}
      </CodeBlock>

      <H2 id="json-output">JSON output schema</H2>
      <CodeBlock lang="json">
{`{
  "package": "express",
  "version": "5.1.0",
  "registry": "npm",
  "score": 96,
  "verdict": "INSTALL",
  "signals": {
    "maintenance": 98,
    "vulnerabilities": 100,
    "authenticity": 99,
    "community_trust": 94,
    "install_behavior": 92
  },
  "cves": [],
  "analyzed_at": "2026-08-31T12:00:00Z"
}`}
      </CodeBlock>
    </>
  )
}

// ─── packsafe search ──────────────────────────────────────────────────────────

function CLISearch() {
  return (
    <>
      <SectionLabel>CLI REFERENCE · 03</SectionLabel>
      <H1>packsafe search</H1>
      <Lead>
        Semantic package search. Describe what you need in natural language; PackSafe returns
        ranked matches with Safety Scores.
      </Lead>

      <H2 id="synopsis">Synopsis</H2>
      <CodeBlock lang="bash">
{`packsafe search "<description>" [flags]
packsafe s "<description>" [flags]   # alias`}
      </CodeBlock>

      <H2 id="flags">Flags</H2>
      <div style={{ border: '1px solid rgba(255,255,255,0.08)', background: '#0e0e0e', marginBottom: '24px' }}>
        <FlagRow flag="--registry" type="npm | pypi" defaultVal="npm">
          Registry to search. Defaults to npm. Use <Code>pypi</Code> for Python packages.
        </FlagRow>
        <FlagRow flag="--limit" type="number" defaultVal="10">
          Maximum number of results to return (1–50).
        </FlagRow>
        <FlagRow flag="--min-score" type="number" defaultVal="0">
          Filter results below this Safety Score threshold.
        </FlagRow>
        <FlagRow flag="--format" type="json | text" defaultVal="text">
          Output format.
        </FlagRow>
      </div>

      <H2 id="examples">Examples</H2>
      <CodeBlock lang="bash">
{`# Semantic search
packsafe search "http server for python"

# Search PyPI packages
packsafe search "data validation library" --registry pypi

# Filter by minimum safety score
packsafe search "jwt authentication" --min-score 90

# Limit results
packsafe search "date manipulation" --limit 5`}
      </CodeBlock>
    </>
  )
}

// ─── packsafe hook ────────────────────────────────────────────────────────────

function CLIHook() {
  return (
    <>
      <SectionLabel>CLI REFERENCE · 04</SectionLabel>
      <H1>packsafe hook</H1>
      <Lead>
        Manage git pre-commit hooks that automatically scan manifest file changes before every commit.
      </Lead>

      <H2 id="synopsis">Synopsis</H2>
      <CodeBlock lang="bash">
{`packsafe hook install [flags]
packsafe hook uninstall
packsafe hook status`}
      </CodeBlock>

      <H2 id="install">Installing the hook</H2>
      <CodeBlock lang="bash" title="TERMINAL">
{`$ packsafe hook install

✓  Pre-commit hook installed at .git/hooks/pre-commit
✓  Scanning: package.json, requirements.txt, pyproject.toml

PackSafe will now analyze any new or changed dependency before commit.
Run 'packsafe hook uninstall' to remove.`}
      </CodeBlock>

      <H2 id="flags">Flags</H2>
      <div style={{ border: '1px solid rgba(255,255,255,0.08)', background: '#0e0e0e', marginBottom: '24px' }}>
        <FlagRow flag="--fail-on" type="warn | block" defaultVal="block">
          Commit rejection threshold. Default blocks only BLOCK-level packages.
          Set to <Code>warn</Code> to reject commits that introduce any WARN-level dependency.
        </FlagRow>
        <FlagRow flag="--manifests" type="string[]">
          Comma-separated list of manifest files to watch. Defaults to auto-discovery.
        </FlagRow>
      </div>

      <Callout type="note">
        The hook is installed per-repository in <Code>.git/hooks/pre-commit</Code>. It is not
        committed to the repository. Use the <a href="/docs/integrations" style={{ color: '#ff3a00', textDecoration: 'none' }}>Integrations</a> page
        to set up shared hooks via <Code>pre-commit</Code> config.
      </Callout>
    </>
  )
}

// ─── Router ───────────────────────────────────────────────────────────────────

const pages: Record<string, React.FC> = {
  install: CLIInstall,
  analyze: CLIAnalyze,
  search: CLISearch,
  hook: CLIHook,
}

export default function CLI() {
  const { command } = useParams()
  const Page = command ? pages[command] : CLIInstall
  if (!Page) {
    return (
      <Prose>
        <H1>Command not found</H1>
        <P>No CLI reference for <Code>packsafe {command}</Code>.</P>
        <P><Link to="/docs/cli/install" style={{ color: '#ff3a00', textDecoration: 'none' }}>Back to CLI Reference →</Link></P>
      </Prose>
    )
  }
  return <Prose><Page /></Prose>
}
