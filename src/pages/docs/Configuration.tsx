import {
  Prose, H1, H2, H3, P, Lead, Code, CodeBlock, Callout, UL, LI, SectionLabel, FlagRow,
  Table, THead, TBody, TR, TH, TD,
} from '@/components/Markdown'

export default function Configuration() {
  return (
    <Prose>
      <SectionLabel>CONFIGURATION</SectionLabel>
      <H1>Config file</H1>
      <Lead>
        PackSafe reads configuration from <Code>.packsafe.json</Code> in the project root, or from
        <Code>~/.config/packsafe/config.json</Code> for user-wide defaults. Project config takes
        precedence.
      </Lead>

      <H2 id="config-file">Config file location</H2>
      <P>
        PackSafe searches for a config file in the following order, stopping at the first match:
      </P>
      <UL>
        <LI><Code>.packsafe.json</Code> in the current working directory</LI>
        <LI><Code>.packsafe.json</Code> in any parent directory up to the git root</LI>
        <LI><Code>~/.config/packsafe/config.json</Code> (user-wide default)</LI>
      </UL>

      <H2 id="full-schema">Full configuration schema</H2>
      <CodeBlock lang="json" title=".packsafe.json">
{`{
  "version": 1,

  "thresholds": {
    "block": 70,
    "warn": 85
  },

  "registries": {
    "npm": "https://registry.npmjs.org",
    "pypi": "https://pypi.org/pypi",
    "private": "https://npm.internal.example.com"
  },

  "allowlist": [
    "internal-package-a",
    "internal-package-b@1.2.3"
  ],

  "blocklist": [
    "known-malicious-package"
  ],

  "signals": {
    "maintenance":   { "weight": 0.20, "enabled": true },
    "vulnerabilities": { "weight": 0.25, "enabled": true },
    "authenticity":  { "weight": 0.25, "enabled": true },
    "community_trust": { "weight": 0.15, "enabled": true },
    "install_behavior": { "weight": 0.15, "enabled": true }
  },

  "output": {
    "format": "text",
    "color": true,
    "verbose": false
  },

  "ci": {
    "fail_on": "block",
    "silent": false,
    "exit_zero_on_warn": false
  }
}`}
      </CodeBlock>

      <H2 id="thresholds">Thresholds</H2>
      <div style={{ border: '1px solid rgba(255,255,255,0.08)', background: '#0e0e0e', marginBottom: '24px' }}>
        <FlagRow flag="thresholds.block" type="number" defaultVal="70">
          Packages scoring below this value are blocked. Installation does not proceed.
          Non-zero exit code emitted.
        </FlagRow>
        <FlagRow flag="thresholds.warn" type="number" defaultVal="85">
          Packages scoring between <Code>block</Code> and <Code>warn</Code> trigger an
          interactive confirmation prompt. Packages above <Code>warn</Code> install silently.
        </FlagRow>
      </div>

      <Callout type="warning">
        Raising <Code>thresholds.block</Code> above 85 will cause many legitimate packages to be
        blocked. The default of 70 is chosen to block clear threats while allowing packages with minor
        signals like low community trust to still install with a warning.
      </Callout>

      <H2 id="allowlist-blocklist">Allowlist and blocklist</H2>
      <P>
        Packages in the allowlist bypass all analysis and install unconditionally. This is intended
        for internal or private packages that are not in any public registry.
      </P>
      <P>
        Packages in the blocklist are always rejected regardless of their Safety Score. Use this to
        enforce organization-wide bans on specific packages.
      </P>
      <CodeBlock lang="json">
{`{
  "allowlist": [
    "my-internal-ui-lib",
    "company-auth-sdk@2.x"
  ],
  "blocklist": [
    "event-stream@3.3.6",
    "eslint-scope@3.7.2"
  ]
}`}
      </CodeBlock>

      <H2 id="environment-variables">Environment variables</H2>
      <Table>
        <THead>
          <TR><TH>Variable</TH><TH>Description</TH><TH>Default</TH></TR>
        </THead>
        <TBody>
          {[
            ['PACKSAFE_TOKEN', 'API authentication token', 'none'],
            ['PACKSAFE_CONFIG_DIR', 'Override config directory path', '~/.config/packsafe'],
            ['PACKSAFE_THRESHOLD', 'Override block threshold', '70'],
            ['PACKSAFE_FORMAT', 'Output format: text | json', 'text'],
            ['PACKSAFE_NO_COLOR', 'Disable color output', 'false'],
            ['PACKSAFE_SILENT', 'Suppress non-error output', 'false'],
            ['PACKSAFE_REGISTRY', 'Default registry: npm | pypi', 'npm'],
          ].map(([env, desc, def]) => (
            <TR key={env}>
              <TD><Code>{env}</Code></TD>
              <TD>{desc}</TD>
              <TD>{def}</TD>
            </TR>
          ))}
        </TBody>
      </Table>

      <H2 id="signal-weights">Customizing signal weights</H2>
      <P>
        Signal weights must sum to exactly <Code>1.0</Code>. PackSafe validates the config file on
        startup and emits an error if weights are invalid.
      </P>
      <CodeBlock lang="json">
{`{
  "signals": {
    "maintenance":     { "weight": 0.15, "enabled": true },
    "vulnerabilities": { "weight": 0.35, "enabled": true },
    "authenticity":    { "weight": 0.30, "enabled": true },
    "community_trust": { "weight": 0.10, "enabled": true },
    "install_behavior":{ "weight": 0.10, "enabled": true }
  }
}`}
      </CodeBlock>

      <Callout type="tip">
        For security-focused environments, consider increasing the weight of{' '}
        <Code>vulnerabilities</Code> and <Code>authenticity</Code> at the expense of{' '}
        <Code>community_trust</Code>, which can penalize legitimate but niche packages.
      </Callout>

      <H2 id="validate">Validating your config</H2>
      <CodeBlock lang="bash">
{`packsafe config validate
# → ✓ .packsafe.json is valid

packsafe config show
# → Prints the merged effective config (project + user defaults)`}
      </CodeBlock>
    </Prose>
  )
}
