import {
  Prose, H1, H2, H3, P, Lead, Code, CodeBlock, Callout, UL, LI, SectionLabel,
  Table, THead, TBody, TR, TH, TD, Badge,
} from '@/components/Markdown'

const pipeline = [
  { step: '01', title: 'Input resolution', desc: 'PackSafe parses the package name and optional target version from the command. Pinned versions or latest releases are resolved directly against the registry index.' },
  { step: '02', title: 'Existence & registry check', desc: 'The package name is looked up against PyPI. If no match is found, hallucination scoring begins and typosquatting signals are triggered.' },
  { step: '03', title: 'Similarity & typosquat analysis', desc: 'The package name is fuzzy-matched against high-reputation packages to catch transposed letters, punctuation variations, and known malicious impersonation patterns.' },
  { step: '04', title: 'Provenance & integrity verification', desc: 'Maintainer identity signals, wheel and sdist hashes, git repository links, and publish histories are collected and validated for tampering or account-takeover indicators.' },
  { step: '05', title: 'Multi-source vulnerability scanning', desc: 'OSV.dev, GitHub Advisories, CISA KEV (known exploited catalog), and FIRST EPSS (exploit probability) are queried concurrently to gauge vulnerability danger.' },
  { step: '06', title: 'Static source analysis', desc: 'If the package archive is under 50 MB, PackSafe downloads the source into a temporary sandbox and performs AST and pattern-based static analysis for suspicious constructs.' },
  { step: '07', title: 'Score aggregation', desc: 'Evidence is normalized into five weighted categories (Security, Integrity, Supply chain, Maintenance, Adoption). An objective, reproducible Safety Score (0–100) is computed.' },
  { step: '08', title: 'Security gates & policy verdict', desc: 'Non-compensable policy gates (e.g. GATE-MALWARE) evaluate hard limits. A final verdict (SAFE, LOW, MODERATE, HIGH, CRITICAL) and installation decision are rendered.' },
]

export default function HowItWorks() {
  return (
    <Prose>
      <SectionLabel>OVERVIEW · 02</SectionLabel>
      <H1>How it works</H1>
      <Lead>
        Every PackSafe analysis runs eight sequential evaluation stages before an installation verdict is issued.
        No stage is skipped, even when earlier stages already indicate risk.
      </Lead>

      <Callout type="note">
        All evaluation is performed against external evidence APIs and isolated static analysis.
        PackSafe never installs or executes package code directly in your active project environment during analysis.
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
        PackSafe evaluates packages across five weighted categories. Category weights are deterministic,
        configured in the scoring engine, and must sum to exactly <Code>1.00</Code>:
      </P>
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

      <H2 id="decision-thresholds">Score & risk bands</H2>
      <Table>
        <THead>
          <TR>
            <TH>Score</TH>
            <TH>Risk Level</TH>
            <TH>Action</TH>
          </TR>
        </THead>
        <TBody>
          {[
            ['90–100', 'SAFE', 'green', 'SAFE TO INSTALL — No blocking signals found'],
            ['75–89', 'LOW', 'green', 'REVIEW BEFORE INSTALLING — Minor advisories noted'],
            ['60–74', 'MODERATE', 'amber', 'INSTALL WITH CAUTION — Confirmation prompt required (default: No)'],
            ['40–59', 'HIGH', 'amber', 'INSTALL WITH CAUTION / BLOCKED — Requires explicit approval or --yes'],
            ['0–39', 'CRITICAL', 'red', 'DO NOT INSTALL — Installation refused, exit code 4'],
          ].map(([score, risk, variant, action]) => (
            <TR key={score}>
              <TD><Code>{score}</Code></TD>
              <TD><Badge variant={variant as any}>{risk}</Badge></TD>
              <TD>{action}</TD>
            </TR>
          ))}
        </TBody>
      </Table>

      <H2 id="data-sources">Data sources</H2>
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
            ['CISA KEV', 'Confirmed, actively exploited vulnerabilities (pre-cached via packsafe init)'],
            ['FIRST EPSS', 'Exploit Prediction Scoring System — probability of active exploitation'],
            ['GitHub', 'Repository activity, issues, releases, ownership'],
            ['deps.dev', 'Dependency graph and OpenSSF Scorecard data'],
            ['Source archive', 'Static analysis of downloaded source archive (capped at 50 MB)'],
          ].map(([source, contrib]) => (
            <TR key={source}>
              <TD><strong style={{ color: '#f0ede8' }}>{source}</strong></TD>
              <TD>{contrib}</TD>
            </TR>
          ))}
        </TBody>
      </Table>

      <Callout type="tip">
        Learn more about each formula and invariant in the{' '}
        <a href="/docs/score-engine" style={{ color: '#ff3a00', textDecoration: 'none' }}>
          Score Engine technical specification →
        </a>
      </Callout>
    </Prose>
  )
}
