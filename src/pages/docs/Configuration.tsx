import {
  Prose, H1, H2, H3, P, Lead, Code, CodeBlock, Callout, UL, OL, LI, SectionLabel,
  Table, THead, TBody, TR, TH, TD, Hr,
} from '@/components/Markdown'

export default function Configuration() {
  return (
    <Prose>
      <SectionLabel>CONFIGURATION</SectionLabel>
      <H1>Configuration & Logging</H1>
      <Lead>
        Configuration file specifications, diagnostics logging hierarchy, and environment variable controls.
      </Lead>

      <H2 id="config-file">~/.packsafe/config.toml</H2>
      <P>
        When you run <Code>packsafe init</Code>, PackSafe writes an initial configuration file to{' '}
        <Code>~/.packsafe/config.toml</Code>:
      </P>
      <CodeBlock lang="toml" title="~/.packsafe/config.toml">
{`[security]
minimum_score = 85
policy = "block"

[cache]
enabled = true
ttl_hours = 24`}
      </CodeBlock>

      <Callout type="note">
        <strong>Current behaviour:</strong> These keys are written during initialization but are not yet
        consumed by the CLI. The effective score floor comes from the built-in YAML engine
        configuration plus the <Code>--min-score</Code> flag you pass. Use <Code>--min-score</Code> today;
        this configuration file is reserved for future user-level defaults.
      </Callout>

      <H2 id="logging">Logging configuration</H2>
      <P>
        Diagnostics and trace logs are written to <Code>./.packsafe/logs/packsafe.log</Code>, never directly
        into the working directory root.
      </P>

      <H3>Log level precedence</H3>
      <P>The logging level is determined by the first match in this order:</P>
      <OL>
        <LI ordered><Code>--log-level LEVEL</Code> (explicit flag: DEBUG, INFO, WARNING, or ERROR)</LI>
        <LI ordered><Code>--verbose / -v</Code> (flag; sets level to DEBUG)</LI>
        <LI ordered><Code>PACKSAFE_LOG_LEVEL</Code> environment variable</LI>
        <LI ordered><Code>INFO</Code> (default)</LI>
      </OL>

      <H3>Log file destination precedence</H3>
      <P>The destination path is resolved in this order:</P>
      <OL>
        <LI ordered><Code>--log-file PATH</Code> (command flag)</LI>
        <LI ordered><Code>PACKSAFE_LOG_FILE</Code> environment variable</LI>
        <LI ordered><Code>./.packsafe/logs/packsafe.log</Code> (default)</LI>
      </OL>

      <H3>Logging examples</H3>
      <CodeBlock lang="bash">
{`# Custom log destination
packsafe --log-file /tmp/packsafe.log analyze requests

# Explicit DEBUG logging
packsafe --log-level DEBUG analyze requests

# Using environment variables
PACKSAFE_LOG_FILE=/tmp/p.log PACKSAFE_LOG_LEVEL=DEBUG packsafe analyze requests`}
      </CodeBlock>

      <Callout type="tip">
        Setting <Code>DEBUG</Code> level records each metric's raw value, its normalized value, and the
        arithmetic in between, plus every HTTP call and retry — enough information to audit any score by hand.
      </Callout>

      <H2 id="environment-variables">Environment variables</H2>
      <Table>
        <THead>
          <TR>
            <TH>Variable</TH>
            <TH>Purpose</TH>
            <TH>Default</TH>
          </TR>
        </THead>
        <TBody>
          {[
            ['VIRTUAL_ENV', 'The active virtualenv; takes precedence over ./.venv for installs', 'Detected from environment'],
            ['PACKSAFE_LOG_LEVEL', 'Log level: DEBUG, INFO, WARNING, or ERROR. Unrecognised values fall back to INFO', 'INFO'],
            ['PACKSAFE_LOG_FILE', 'Destination path for trace logs', './.packsafe/logs/packsafe.log'],
            ['GITHUB_TOKEN', 'Optional personal access token; raises GitHub API rate limit from 60 req/hr', 'None'],
            ['PACKSAFE_EXPLAIN_URL', 'Which PackSafe service --explain calls', 'http://localhost:8000'],
            ['PACKSAFE_EXPLAIN_TOKEN', 'Optional shared secret sent to explain service as a bearer token', 'None'],
            ['PACKSAFE_EXPLAIN_TIMEOUT', 'Seconds to wait for an explanation', '60'],
          ].map(([env, purp, def]) => (
            <TR key={env}>
              <TD><Code>{env}</Code></TD>
              <TD>{purp}</TD>
              <TD><span style={{ color: 'rgba(240,237,232,0.45)' }}>{def}</span></TD>
            </TR>
          ))}
        </TBody>
      </Table>

      <Callout type="important">
        <strong>You never supply a model provider key to the CLI.</strong> The provider key lives on the machine running the PackSafe service (<Code>PACKSAFE_LLM_API_KEY</Code> and <Code>PACKSAFE_LLM_PROVIDER</Code> there), which is why <Code>--explain</Code> is a call to a service rather than directly calling a model from your terminal.
      </Callout>

      <H2 id="reproducibility">Reproducibility & Config Digest</H2>
      <P>
        The PackSafe scoring engine is deterministic and configuration-driven. Every weight, metric,
        gate, normalization rule, and freshness TTL lives in <Code>scoring/config/*.yaml</Code> inside the
        package.
      </P>
      <P>
        Each run prints a <strong>SHA-256 digest</strong> over that configuration set in the report footer,
        alongside the engine version and a UTC timestamp:
      </P>
      <CodeBlock lang="text">
{`evidence 28/30 metrics measured · coverage deep_static · engine 0.1.2
config 7f3c9a21 · 2026-02-11T09:14:22Z · archive a1b2c3d4e5f6`}
      </CodeBlock>
      <P>
        This guarantees that any score can be reproduced, verified, or challenged months later by anyone
        possessing the same PackSafe version and configuration digest.
      </P>
    </Prose>
  )
}
