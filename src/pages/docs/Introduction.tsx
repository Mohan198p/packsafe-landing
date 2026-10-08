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
        PackSafe is a security gatekeeper for the open-source software supply chain.
        It evaluates a package before installation, gives it a safety score out of 100, explains exactly which checks fired, and then either installs the package or refuses to.
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
        <Code>packsafe install --uv requests</Code> (or <Code>--pip</Code>) evaluates the package against
        all evidence sources first, requiring explicit confirmation on warnings, and refusing outright on critical policy violations.
      </Callout>

      <H2 id="key-features">Key features</H2>
      <UL>
        <LI><strong>Pre-execution gatekeeping</strong> — inspects package metadata and source code before any install command runs.</LI>
        <LI><strong>Hallucination & typosquatting detection</strong> — catches made-up packages and impersonation attempts.</LI>
        <LI><strong>Multi-source vulnerability scanning</strong> — aggregates OSV.dev, GitHub Advisories, CISA KEV, and FIRST EPSS.</LI>
        <LI><strong>Static source analysis</strong> — unpacks source archives (up to 50 MB) in a temporary sandbox to inspect setup scripts and code.</LI>
        <LI><strong>Explainable Safety Score</strong> — deterministic 0–100 score across five weighted categories, signed with a configuration digest.</LI>
        <LI><strong>Hard policy gates</strong> — critical gates (e.g., malware or active exploits) block installation regardless of popularity.</LI>
        <LI><strong>Privacy-first & self-contained</strong> — nothing uploaded, no account needed, and no credentials required for read-only operations.</LI>
      </UL>

      <H2 id="signal-categories">Signal categories & weights</H2>
      <P>
        The PackSafe Safety Score is composed of five independently evaluated signal categories.
        Weights sum to exactly <Code>1.00</Code> and are validated by the engine at load time:
      </P>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
        {[
          { name: 'Security (40%)', desc: 'Known vulnerabilities, exploitability (EPSS), active KEV catalog listings, and malicious patterns.' },
          { name: 'Integrity (25%)', desc: 'Reproducibility, wheel and sdist hash consistency, signature verification, and provenance.' },
          { name: 'Supply Chain (20%)', desc: 'Maintainer behavior, account takeover signals, release anomalies, and dependency tree risk.' },
          { name: 'Maintenance (10%)', desc: 'Release cadence, responsiveness to issues, commit activity, and repository health.' },
          { name: 'Adoption (5%)', desc: 'Download volume, dependent projects, and presence across the ecosystem.' },
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
        Every score is decomposed into its constituent signals and policy gates. You always know <em>why</em> a package
        scored the way it did, not just the final number.
      </P>
      <H3>Analysis before execution</H3>
      <P>
        No package code runs before the safety gate clears. PackSafe fetches and evaluates metadata
        entirely from registry APIs and isolated static analysis — your machine is never the test environment.
      </P>
      <H3>Developer-native interface</H3>
      <P>
        PackSafe is built around the CLI. It fits directly into workflows using <Code>uv</Code> and <Code>pip</Code> inside Python virtual environments.
      </P>

      <Hr />

      <H2 id="next-steps">Next steps</H2>
      <UL>
        <LI>
          <Link to="/docs/installation" style={{ color: '#ff3a00', textDecoration: 'none' }}>
            Installation
          </Link>{' '}
          — install PackSafe via <Code>uv tool</Code> or <Code>pipx</Code>.
        </LI>
        <LI>
          <Link to="/docs/quickstart" style={{ color: '#ff3a00', textDecoration: 'none' }}>
            Quick start
          </Link>{' '}
          — analyze and install your first package.
        </LI>
        <LI>
          <Link to="/docs/how-it-works" style={{ color: '#ff3a00', textDecoration: 'none' }}>
            How it works
          </Link>{' '}
          — understand the full eight-stage analysis pipeline.
        </LI>
        <LI>
          <Link to="/docs/cli" style={{ color: '#ff3a00', textDecoration: 'none' }}>
            CLI Reference
          </Link>{' '}
          — complete reference for every command, option, and exit code.
        </LI>
      </UL>
    </Prose>
  )
}
