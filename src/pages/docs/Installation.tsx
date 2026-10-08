import {
  Prose, H1, H2, H3, P, Lead, Code, CodeBlock, Callout, UL, LI, Badge, SectionLabel,
  Table, THead, TBody, TR, TH, TD,
} from '@/components/Markdown'
import { Link } from 'react-router'

export default function Installation() {
  return (
    <Prose>
      <SectionLabel>GETTING STARTED · 01</SectionLabel>
      <H1>Installation</H1>
      <Lead>
        PackSafe is a standalone Python CLI tool designed to run in isolated tool environments
        using modern package managers like <Code>uv</Code> or <Code>pipx</Code>.
      </Lead>

      <H2 id="requirements">System requirements & prerequisites</H2>
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
            ['pip version', '22.3 or newer, in the rare case PackSafe falls back to your PATH pip'],
            ['Python environment', 'An activated virtualenv or a ./.venv in the current directory — required only for packsafe install'],
            ['Network access', 'Outbound HTTPS to PyPI, OSV.dev, GitHub, deps.dev, CISA KEV, and FIRST EPSS'],
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
        PackSafe never installs into a global Python environment. This is deliberate — package installations are strictly guarded inside isolated virtualenvs to prevent global contamination.
      </Callout>

      <H2 id="uv-tool">Recommended — uv tool</H2>
      <P>
        Installs <Code>packsafe</Code> into its own isolated environment and puts a single <Code>packsafe</Code> executable on your <Code>PATH</Code>. This is the fastest and most robust method.
      </P>
      <CodeBlock lang="bash">
{`uv tool install packsafe`}
      </CodeBlock>

      <H2 id="pipx">Alternative — pipx</H2>
      <P>
        If you manage command-line Python tools using <Code>pipx</Code>, the same isolation model applies:
      </P>
      <CodeBlock lang="bash">
{`pipx install packsafe`}
      </CodeBlock>

      <H2 id="uvx">One-off runs — uvx</H2>
      <P>
        Run PackSafe instantly without installing it. Useful for a quick one-time check or on a machine you do not want to modify:
      </P>
      <CodeBlock lang="bash">
{`uvx packsafe analyze requests`}
      </CodeBlock>

      <H2 id="pip">With pip into an existing environment</H2>
      <P>
        If you already have a tool environment and manage it with pip:
      </P>
      <CodeBlock lang="bash">
{`pip install packsafe`}
      </CodeBlock>

      <H2 id="upgrade-uninstall">Upgrade and uninstall</H2>
      <CodeBlock lang="bash">
{`# Upgrade
uv tool upgrade packsafe      # uv tool
pipx upgrade packsafe         # pipx

# Uninstall
uv tool uninstall packsafe    # uv tool
pipx uninstall packsafe       # pipx
pip uninstall packsafe        # plain pip`}
      </CodeBlock>

      <H2 id="verify">Verify the installation</H2>
      <CodeBlock lang="bash">
{`packsafe --version
packsafe --help`}
      </CodeBlock>
      <P>Expected output:</P>
      <CodeBlock lang="text">
{`packsafe 0.1.2`}
      </CodeBlock>

      <H2 id="first-run">First run — packsafe init</H2>
      <P>
        After installing, run <Code>init</Code> to create local configuration directories, set up the SQLite cache, and pre-cache the CISA KEV catalog for offline operation:
      </P>
      <CodeBlock lang="bash">
{`packsafe init`}
      </CodeBlock>
      <P>
        It is safe to run repeatedly — existing files and configurations are left untouched. Learn more in the{' '}
        <Link to="/docs/cli/init" style={{ color: '#ff3a00', textDecoration: 'none' }}>
          packsafe init reference →
        </Link>
      </P>

      <div style={{ marginTop: '40px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <Badge variant="green">v0.1.2</Badge>
        <Badge>uv tool</Badge>
        <Badge>pipx</Badge>
        <Badge>Python 3.11+</Badge>
      </div>
    </Prose>
  )
}
