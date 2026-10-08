import {
  Prose, H1, H2, H3, P, Lead, Code, CodeBlock, Callout, UL, LI, SectionLabel, Hr,
} from '@/components/Markdown'

export default function Quickstart() {
  return (
    <Prose>
      <SectionLabel>GETTING STARTED · 02</SectionLabel>
      <H1>Quick start</H1>
      <Lead>
        Run your first package analysis in under a minute. This guide walks through the three most
        common PackSafe workflows.
      </Lead>

      <Callout type="note">
        This guide assumes PackSafe is installed. If not, see the{' '}
        <a href="/docs/installation" style={{ color: '#ff3a00', textDecoration: 'none' }}>Installation</a> page first.
      </Callout>

      <H2 id="analyze-before-install">Analyze before installing</H2>
      <P>
        Use <Code>packsafe install</Code> as a drop-in replacement for <Code>npm install</Code>.
        PackSafe runs the full analysis pipeline and presents the verdict before installation proceeds.
      </P>
      <CodeBlock lang="bash" title="TERMINAL">
{`$ packsafe install express

Analyzing express@5.1.0...

Safety Score       96/100
Maintenance         98
Vulnerabilities    100
Authenticity         99
Community Trust      94
Install Behavior     92

✓  Low risk

Continue? [Y/n] Y

+ express@5.1.0
added 31 packages in 1.8s`}
      </CodeBlock>

      <H2 id="blocking-scenario">What a blocked install looks like</H2>
      <P>
        If PackSafe detects a hallucinated, typosquatted, or high-risk package, the installation is blocked
        and alternatives are surfaced.
      </P>
      <CodeBlock lang="bash" title="TERMINAL">
{`$ packsafe install fastapi-security-utils

Analyzing package...

✗  PACKAGE NOT FOUND

This package does not exist in the npm or PyPI registry.
Possible AI-hallucinated dependency.

Did you mean?
→  fastapi-utils      (94/100)
→  fastapi            (97/100)

Recommended alternative: fastapi-utils

Installation blocked. Exit code 1.`}
      </CodeBlock>

      <H2 id="analyze-only">Analyze without installing</H2>
      <P>
        To inspect a package without installing it, use <Code>packsafe analyze</Code>.
        Useful for auditing dependencies listed in a manifest file.
      </P>
      <CodeBlock lang="bash">
{`# Analyze a single package
packsafe analyze lodash

# Analyze a specific version
packsafe analyze lodash@4.17.21

# Analyze all packages in package.json
packsafe analyze --manifest package.json

# Output as JSON for scripting
packsafe analyze express --format json`}
      </CodeBlock>

      <H2 id="semantic-search">Find a package by description</H2>
      <P>
        Don't know the exact package name? Use <Code>packsafe search</Code> to find packages by
        describing what you need. Results are ranked by relevance and Safety Score.
      </P>
      <CodeBlock lang="bash" title="TERMINAL">
{`$ packsafe search "python package for building an http server"

SEMANTIC PACKAGE SEARCH

01  fastapi         97/100  Modern, fast web framework for Python APIs
02  starlette       95/100  Lightweight ASGI framework
03  flask           93/100  Lightweight WSGI web framework
04  aiohttp         88/100  Async HTTP client/server for asyncio
05  tornado         85/100  Web framework and async networking library

Run 'packsafe analyze <name>' for the full signal breakdown.`}
      </CodeBlock>

      <H2 id="reading-output">Reading the output</H2>
      <H3>Score interpretation</H3>
      <div style={{ border: '1px solid rgba(255,255,255,0.08)', background: '#0e0e0e', marginBottom: '24px' }}>
        {[
          { score: '90–100', label: 'LOW RISK', color: '#00cc55', desc: 'Install proceeds. No known threats.' },
          { score: '70–89', label: 'MODERATE', color: '#ffaa00', desc: 'Confirm before installing. Read the breakdown.' },
          { score: '0–69', label: 'HIGH RISK', color: '#ff3a00', desc: 'Installation blocked by default.' },
        ].map(row => (
          <div
            key={row.score}
            style={{
              display: 'grid',
              gridTemplateColumns: '70px 100px 1fr',
              gap: '16px',
              padding: '12px 16px',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              alignItems: 'center',
            }}
          >
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: 'rgba(240,237,232,0.35)' }}>{row.score}</span>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: row.color }}>{row.label}</span>
            <span style={{ fontSize: '13px', color: 'rgba(240,237,232,0.45)' }}>{row.desc}</span>
          </div>
        ))}
      </div>

      <H3>Signal categories</H3>
      <UL>
        <LI><Code>Maintenance</Code> — recency of commits, release frequency, issue resolution rate.</LI>
        <LI><Code>Vulnerabilities</Code> — CVE count and severity in this version and dependency tree.</LI>
        <LI><Code>Authenticity</Code> — registry provenance, key verification, source consistency.</LI>
        <LI><Code>Community Trust</Code> — download volume, dependent count, SourceRank.</LI>
        <LI><Code>Install Behavior</Code> — lifecycle script risk, network calls, anomalies.</LI>
      </UL>

      <Hr />

      <H2 id="next-steps">Next steps</H2>
      <UL>
        <LI><a href="/docs/cli/install" style={{ color: '#ff3a00', textDecoration: 'none' }}>CLI Reference — packsafe install</a></LI>
        <LI><a href="/docs/cli/analyze" style={{ color: '#ff3a00', textDecoration: 'none' }}>CLI Reference — packsafe analyze</a></LI>
        <LI><a href="/docs/configuration" style={{ color: '#ff3a00', textDecoration: 'none' }}>Configuration</a> — customize thresholds and behavior</LI>
        <LI><a href="/docs/integrations" style={{ color: '#ff3a00', textDecoration: 'none' }}>Integrations</a> — add PackSafe to GitHub Actions or pre-commit</LI>
      </UL>
    </Prose>
  )
}
