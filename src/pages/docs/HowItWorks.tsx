import {
  Prose, H1, H2, H3, P, Lead, Code, CodeBlock, Callout, UL, LI, SectionLabel,
} from '@/components/Markdown'

const pipeline = [
  { step: '01', title: 'Input resolution', desc: 'PackSafe parses the package name and optional version constraint from the install command. Version ranges are resolved against the registry index to a pinned version.' },
  { step: '02', title: 'Existence check', desc: 'The package name is looked up against npm, PyPI, and any configured private registries. If no match is found, hallucination scoring begins and similar names are surfaced.' },
  { step: '03', title: 'Similarity analysis', desc: 'The package name is fuzzy-matched against the top 100k packages by download volume. Edit distance, phonetic similarity, and visual glyph similarity are all evaluated to detect typosquatting.' },
  { step: '04', title: 'Provenance verification', desc: 'Maintainer PGP keys are verified against the registry. Source maps are cross-referenced with the declared source repository. Publish timestamps are compared to git tag history.' },
  { step: '05', title: 'Vulnerability evaluation', desc: 'The exact pinned version is checked against NVD, OSV, GitHub Advisory Database, and Snyk\'s database. The full dependency tree is evaluated recursively.' },
  { step: '06', title: 'Behavior analysis', desc: 'Install lifecycle scripts are extracted and statically analyzed. Network calls in preinstall and postinstall scripts are flagged. Dependency count anomalies are scored.' },
  { step: '07', title: 'Score aggregation', desc: 'Each signal category produces an independent 0–100 score. A weighted harmonic mean is computed. The category breakdown is always exposed alongside the aggregate.' },
  { step: '08', title: 'Decision output', desc: 'The safety verdict (INSTALL / WARN / BLOCK) is presented with full signal breakdown. In non-interactive mode, a non-zero exit code is emitted on BLOCK.' },
]

export default function HowItWorks() {
  return (
    <Prose>
      <SectionLabel>OVERVIEW · 02</SectionLabel>
      <H1>How it works</H1>
      <Lead>
        Every PackSafe analysis runs eight sequential evaluation stages before a verdict is issued.
        No stage is skipped, even when earlier stages already indicate risk.
      </Lead>

      <Callout type="note">
        All evaluation is performed against registry APIs and static package metadata.
        PackSafe never installs or executes the package code itself during analysis.
      </Callout>

      <H2 id="analysis-pipeline">The analysis pipeline</H2>

      <div style={{ marginBottom: '32px' }}>
        {pipeline.map((stage, i) => (
          <div
            key={stage.step}
            style={{
              display: 'flex',
              gap: '20px',
              paddingBottom: '24px',
              marginBottom: '0',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '2px' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  border: '1px solid rgba(255,58,0,0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#ff3a00' }}>
                  {stage.step}
                </span>
              </div>
              {i < pipeline.length - 1 && (
                <div style={{ width: '1px', flex: 1, background: 'rgba(255,255,255,0.06)', minHeight: '24px' }} />
              )}
            </div>
            <div style={{ paddingBottom: '8px' }}>
              <h3
                style={{
                  fontFamily: 'Barlow Condensed, sans-serif',
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#f0ede8',
                  margin: '2px 0 6px',
                  letterSpacing: '-0.01em',
                }}
              >
                {stage.title}
              </h3>
              <p style={{ fontSize: '13px', color: 'rgba(240,237,232,0.5)', lineHeight: 1.7, margin: 0 }}>
                {stage.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <H2 id="scoring-model">Scoring model</H2>
      <P>
        Signal categories are scored independently before aggregation. The aggregate score is a
        weighted harmonic mean that penalizes low-scoring categories more harshly than a simple average would.
      </P>
      <CodeBlock lang="text" title="SCORE WEIGHTS">
{`Maintenance Health      0.20
Vulnerability Exposure  0.25
Authenticity            0.25
Community Trust         0.15
Install Behavior        0.15`}
      </CodeBlock>

      <Callout type="warning">
        A package can score 100 on four categories and still be blocked if <Code>Vulnerability Exposure</Code>{' '}
        or <Code>Authenticity</Code> drops below the configured block threshold.
        The harmonic mean amplifies dangerous low scores.
      </Callout>

      <H2 id="decision-thresholds">Decision thresholds</H2>
      <P>
        The default thresholds can be overridden in <Code>.packsafe.json</Code>. See the{' '}
        <a href="/docs/configuration" style={{ color: '#ff3a00', textDecoration: 'none' }}>Configuration</a> reference.
      </P>

      <div style={{ border: '1px solid rgba(255,255,255,0.08)', background: '#0e0e0e', marginBottom: '24px' }}>
        {[
          { range: '90–100', verdict: 'INSTALL', color: '#00cc55', desc: 'Low risk. Installation proceeds automatically.' },
          { range: '70–89', verdict: 'WARN', color: '#ffaa00', desc: 'Moderate risk. Interactive prompt asks for confirmation.' },
          { range: '0–69', verdict: 'BLOCK', color: '#ff3a00', desc: 'High risk. Installation is blocked. Non-zero exit code.' },
        ].map(row => (
          <div
            key={row.verdict}
            style={{
              display: 'grid',
              gridTemplateColumns: '80px 90px 1fr',
              gap: '16px',
              padding: '14px 18px',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              alignItems: 'center',
            }}
          >
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: 'rgba(240,237,232,0.4)' }}>
              {row.range}
            </span>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: row.color, letterSpacing: '0.1em' }}>
              {row.verdict}
            </span>
            <span style={{ fontSize: '13px', color: 'rgba(240,237,232,0.45)' }}>{row.desc}</span>
          </div>
        ))}
      </div>

      <H2 id="data-sources">Data sources</H2>
      <UL>
        <LI><strong>npm registry</strong> — package metadata, maintainer records, publish history, and dependency manifests.</LI>
        <LI><strong>PyPI</strong> — same set of signals for Python packages.</LI>
        <LI><strong>NVD / NIST</strong> — National Vulnerability Database CVE records.</LI>
        <LI><strong>OSV</strong> — Open Source Vulnerabilities database across all major ecosystems.</LI>
        <LI><strong>GitHub Advisory Database</strong> — maintainer-reported and community-reported security advisories.</LI>
        <LI><strong>Snyk Advisor</strong> — maintenance health and popularity signals.</LI>
        <LI><strong>Libraries.io</strong> — SourceRank, dependent repository count, and release history.</LI>
      </UL>

      <H3>Update frequency</H3>
      <P>
        Vulnerability databases are synchronized every 4 hours. Registry metadata is fetched live on
        each analysis request and is not cached beyond the current session. Safety Scores are
        deterministic for a given package version and database snapshot.
      </P>
    </Prose>
  )
}
