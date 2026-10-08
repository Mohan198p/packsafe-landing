import {
  Prose, H1, H2, H3, P, Lead, Code, CodeBlock, Callout, UL, LI, Badge, SectionLabel, Hr,
} from '@/components/Markdown'
import { Link } from 'react-router'

export default function Introduction() {
  return (
    <Prose>
      <SectionLabel>OVERVIEW · 01</SectionLabel>
      <H1>Introduction</H1>
      <Lead>
        PackSafe is a developer-first safety layer between AI-generated code and package installation.
        It analyzes open-source dependencies before they reach your system.
      </Lead>

      <H2 id="what-is-packsafe">What is PackSafe?</H2>
      <P>
        When you or an AI assistant writes code that references an external package, that package name
        is assumed to be safe, real, and correct. It often isn't. AI models hallucinate package names.
        Attackers register look-alike names. Legitimate packages accumulate silent vulnerabilities.
      </P>
      <P>
        PackSafe intercepts the install command, fetches all available signals about the package, evaluates
        them independently, and presents a safety verdict — before a single byte of package code executes
        on your machine.
      </P>

      <Callout type="tip">
        PackSafe does not replace your package manager. It wraps it. Running{' '}
        <Code>packsafe install express</Code> behaves identically to{' '}
        <Code>npm install express</Code> — with a mandatory safety gate before installation proceeds.
      </Callout>

      <H2 id="key-features">Key features</H2>
      <UL>
        <LI><strong>Hallucination detection</strong> — identifies packages that do not exist in any known registry.</LI>
        <LI><strong>Typosquatting detection</strong> — fuzzy-matches against the intended package to surface look-alike names.</LI>
        <LI><strong>Vulnerability scanning</strong> — checks all known CVE databases against the exact version you are installing.</LI>
        <LI><strong>Behavior analysis</strong> — inspects install lifecycle scripts, outbound network calls, and dependency anomalies.</LI>
        <LI><strong>Safety Score</strong> — a fully explainable, multi-signal score across five independent categories.</LI>
        <LI><strong>Semantic search</strong> — find packages by describing what you need rather than knowing the exact name.</LI>
        <LI><strong>API access</strong> — integrate safety analysis into your own pipelines, CI systems, and tooling.</LI>
      </UL>

      <H2 id="signal-categories">Signal categories</H2>
      <P>
        The PackSafe Safety Score is composed of five independently evaluated signal categories.
        Each category is scored 0–100 and combined into an overall assessment.
      </P>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
        {[
          { name: 'Maintenance Health', desc: 'Recent commits, release cadence, open issue ratio, abandoned signal detection.' },
          { name: 'Vulnerability Exposure', desc: 'Known CVEs across all NVD, OSV, and GitHub Advisory databases.' },
          { name: 'Authenticity', desc: 'Registry provenance, maintainer key verification, source map consistency.' },
          { name: 'Community Trust', desc: 'Download volume, dependent count, SourceRank, GitHub stars and fork ratio.' },
          { name: 'Install Behavior', desc: 'Preinstall/postinstall script analysis, network calls, dependency anomalies.' },
        ].map(s => (
          <div
            key={s.name}
            style={{
              border: '1px solid rgba(255,255,255,0.08)',
              background: '#0e0e0e',
              padding: '16px',
            }}
          >
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#ff3a00', marginBottom: '6px' }}>
              {s.name.toUpperCase()}
            </div>
            <p style={{ fontSize: '12px', color: 'rgba(240,237,232,0.45)', lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
          </div>
        ))}
      </div>

      <H2 id="design-principles">Design principles</H2>
      <H3>Explainability over opacity</H3>
      <P>
        Every score is decomposed into its constituent signals. You always know <em>why</em> a package
        scored the way it did, not just that it did.
      </P>
      <H3>Analysis before execution</H3>
      <P>
        No package code runs before the safety gate clears. PackSafe fetches and evaluates metadata
        entirely from registry APIs and static analysis — your machine is never the test environment.
      </P>
      <H3>Developer-native interface</H3>
      <P>
        PackSafe is built around the CLI. The web UI and API are extensions of the same interface, not
        replacements for it. Every workflow is completable from the terminal.
      </P>

      <Hr />

      <H2 id="next-steps">Next steps</H2>
      <UL>
        <LI>
          <Link to="/docs/how-it-works" style={{ color: '#ff3a00', textDecoration: 'none' }}>
            How it works
          </Link>{' '}
          — understand the full analysis pipeline.
        </LI>
        <LI>
          <Link to="/docs/installation" style={{ color: '#ff3a00', textDecoration: 'none' }}>
            Install PackSafe
          </Link>{' '}
          — get the CLI running in under 30 seconds.
        </LI>
        <LI>
          <Link to="/docs/quickstart" style={{ color: '#ff3a00', textDecoration: 'none' }}>
            Quick start
          </Link>{' '}
          — run your first package analysis.
        </LI>
      </UL>

      <div style={{ marginTop: '40px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <Badge variant="green">Stable</Badge>
        <Badge>v0.9.2</Badge>
        <Badge variant="blue">MIT License</Badge>
      </div>
    </Prose>
  )
}
