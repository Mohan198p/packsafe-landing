import {
  Prose, H1, H2, H3, P, Lead, Code, CodeBlock, Callout, UL, LI, Badge, SectionLabel,
  Table, THead, TBody, TR, TH, TD,
} from '@/components/Markdown'

export default function Installation() {
  return (
    <Prose>
      <SectionLabel>GETTING STARTED · 01</SectionLabel>
      <H1>Installation</H1>
      <Lead>
        PackSafe is available as an npm package, a standalone binary, a Homebrew formula, and a
        Python package. Choose the method that matches your stack.
      </Lead>

      <H2 id="requirements">System requirements</H2>
      <Table>
        <THead>
          <TR>
            <TH>Requirement</TH>
            <TH>Minimum</TH>
            <TH>Notes</TH>
          </TR>
        </THead>
        <TBody>
          {[
            ['Node.js', '18.0.0', 'Required for the npm package only'],
            ['Python', '3.9', 'Required for PyPI package analysis'],
            ['OS', 'macOS 12, Linux, Windows 11', 'Windows support via WSL2 is also supported'],
            ['Network', 'Outbound HTTPS (443)', 'PackSafe calls registry and advisory APIs'],
          ].map(([req, min, note]) => (
            <TR key={req}>
              <TD><Code>{req}</Code></TD>
              <TD>{min}</TD>
              <TD>{note}</TD>
            </TR>
          ))}
        </TBody>
      </Table>

      <H2 id="npm">Install via npm</H2>
      <P>The recommended installation method for Node.js developers.</P>
      <CodeBlock lang="bash">
{`npm install -g packsafe`}
      </CodeBlock>
      <CodeBlock lang="bash">
{`# Verify installation
packsafe --version
# → packsafe v0.9.2`}
      </CodeBlock>

      <H2 id="homebrew">Install via Homebrew</H2>
      <P>For macOS and Linux users who prefer Homebrew.</P>
      <CodeBlock lang="bash">
{`brew tap packsafe/tap
brew install packsafe`}
      </CodeBlock>

      <H2 id="binary">Standalone binary</H2>
      <P>
        Download a pre-built binary for your platform. No Node.js or Python required.
        Suitable for CI environments.
      </P>
      <CodeBlock lang="bash">
{`# macOS (Apple Silicon)
curl -fsSL https://get.packsafe.dev/install.sh | sh -s -- --arch arm64

# macOS (Intel)
curl -fsSL https://get.packsafe.dev/install.sh | sh -s -- --arch amd64

# Linux (x86_64)
curl -fsSL https://get.packsafe.dev/install.sh | sh

# Windows (PowerShell)
iwr https://get.packsafe.dev/install.ps1 | iex`}
      </CodeBlock>

      <Callout type="warning">
        Always verify the binary checksum after download. The install script prints the SHA-256 hash
        automatically. Cross-reference it at <Code>packsafe.dev/releases</Code> before running.
      </Callout>

      <H2 id="python">Install for Python projects</H2>
      <P>
        For Python projects, PackSafe integrates directly with pip. Install the companion package
        to enable <Code>packsafe install</Code> as a drop-in for <Code>pip install</Code>.
      </P>
      <CodeBlock lang="bash">
{`pip install packsafe-cli`}
      </CodeBlock>

      <H2 id="auth">Authentication</H2>
      <P>
        PackSafe works without authentication for public packages. To enable private registry support,
        extended API rate limits, and team features, authenticate with your PackSafe account.
      </P>
      <CodeBlock lang="bash">
{`packsafe auth login

# Follow the browser prompt, or pass a token directly:
packsafe auth login --token ps_live_xxxxxxxxxxxxxxxxxxxx`}
      </CodeBlock>
      <P>
        The token is stored in <Code>~/.config/packsafe/credentials</Code> with <Code>600</Code> permissions.
        To use a different location, set the <Code>PACKSAFE_CONFIG_DIR</Code> environment variable.
      </P>

      <H2 id="update">Updating</H2>
      <CodeBlock lang="bash">
{`# npm
npm update -g packsafe

# Homebrew
brew upgrade packsafe

# Binary (re-run install script)
curl -fsSL https://get.packsafe.dev/install.sh | sh`}
      </CodeBlock>

      <H2 id="uninstall">Uninstalling</H2>
      <CodeBlock lang="bash">
{`# npm
npm uninstall -g packsafe

# Homebrew
brew uninstall packsafe

# Remove config and credentials
rm -rf ~/.config/packsafe`}
      </CodeBlock>

      <div style={{ marginTop: '40px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <Badge variant="green">v0.9.2</Badge>
        <Badge>npm</Badge>
        <Badge>Homebrew</Badge>
        <Badge>Binary</Badge>
      </div>
    </Prose>
  )
}
