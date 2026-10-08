import {
  Prose, H1, H2, H3, P, Lead, Code, CodeBlock, Callout, SectionLabel,
  Table, THead, TBody, TR, TH, TD, UL, LI, Badge
} from '@/components/Markdown'

function FormulaBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ border: '1px solid rgba(255,255,255,0.08)', background: '#0a0f0a', marginBottom: '24px', marginTop: '8px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)', background: '#0d120d' }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(255,58,0,0.5)' }} />
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(255,170,0,0.35)' }} />
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(0,204,85,0.35)' }} />
        </div>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#4a4a4a', letterSpacing: '0.1em' }}>
          {title}
        </span>
        <div style={{ width: '48px' }} />
      </div>
      <div style={{ padding: '24px', textAlign: 'center', fontFamily: 'Cambria Math, Georgia, serif', fontSize: '18px', color: '#f0ede8', overflowX: 'auto' }}>
        {children}
      </div>
    </div>
  )
}

export default function ScoreEngine() {
  return (
    <Prose>
      <SectionLabel>OVERVIEW</SectionLabel>
      <H1>Score Engine</H1>
      <Lead>
        The deterministic scoring component of PackSafe. It converts raw package evidence into an objective, reproducible safety score, confidence rating, and security gate evaluation.
      </Lead>

      <H2 id="score-engine-overview">Architecture & Scoring Flow</H2>
      <P>
        PackSafe separates evidence collection from deterministic scoring. The ScoreEngine calculates the objective deterministic result, while the PolicyEngine applies your organization's permissive, balanced, strict, or enterprise decision rules based on that result.
      </P>
      <P>
        The scoring pipeline operates entirely on collected evidence. It does not call PyPI, npm, GitHub, OSV, or other services directly. This guarantees that scoring is fast, reproducible, and verifiable.
      </P>

      <div style={{ marginBottom: '32px', marginTop: '32px' }}>
        {[
          { title: 'PackageEvidence', sub: 'Input data (metadata, static analysis, OSV)' },
          { title: 'MetricRegistry', sub: 'Extracts and normalizes raw values' },
          { title: 'Category Scores', sub: 'Aggregates metrics into 5 core dimensions' },
          { title: 'BaseScore', sub: 'Weighted average of available categories' },
          { title: 'Security Gates', sub: 'Evaluates hard limits (malware, critical CVEs)' },
          { title: 'Risk + Confidence', sub: 'Calculates vulnerability risk and evidence trust' },
          { title: 'ScoreResult', sub: 'Produces the final immutable audit trail' },
          { title: 'PolicyEngine', sub: 'Applies organization rules (ALLOW/WARN/BLOCK)' },
        ].map((step, i, arr) => (
          <div key={step.title} style={{ display: 'flex', gap: '20px', paddingBottom: '24px', marginBottom: '0' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '2px' }}>
              <div style={{
                width: '28px',
                height: '28px',
                border: '1px solid rgba(255,58,0,0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#ff3a00' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              {i < arr.length - 1 && (
                <div style={{
                  width: '1px',
                  flex: 1,
                  background: 'rgba(255,255,255,0.06)',
                  minHeight: '24px'
                }} />
              )}
            </div>
            <div style={{ paddingBottom: '8px' }}>
              <h3 style={{
                fontFamily: 'Barlow Condensed, sans-serif',
                fontSize: '18px',
                fontWeight: 700,
                color: '#f0ede8',
                margin: '2px 0 6px',
                letterSpacing: '-0.01em'
              }}>
                {step.title}
              </h3>
              <p style={{
                fontSize: '13px',
                color: 'rgba(240,237,232,0.5)',
                lineHeight: 1.7,
                margin: 0
              }}>
                {step.sub}
              </p>
            </div>
          </div>
        ))}
      </div>

      <H3>The Five Scoring Categories</H3>
      <P>Metrics are grouped into five distinct categories, each representing a critical dimension of package health and safety.</P>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        {[
          { name: 'Security', weight: '40%', desc: 'Vulnerability danger and exploitation.', color: '#ff3a00' },
          { name: 'Integrity', weight: '25%', desc: 'Malicious and suspicious behavior.', color: '#ffaa00' },
          { name: 'Supply Chain', weight: '20%', desc: 'Dependency and ecosystem risk.', color: '#00cc55' },
          { name: 'Maintenance', weight: '10%', desc: 'Project health and lifecycle.', color: '#7eb8f7' },
          { name: 'Adoption', weight: '5%', desc: 'Usage and ecosystem adoption.', color: '#a0a0a0' }
        ].map(cat => (
          <div key={cat.name} style={{ background: '#0e0e0e', border: '1px solid rgba(255,255,255,0.08)', padding: '16px' }}>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#f0ede8', fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, letterSpacing: '0.02em' }}>
              {cat.name}
            </h3>
            <div style={{ fontSize: '24px', fontWeight: 800, color: cat.color, marginBottom: '8px', fontFamily: 'JetBrains Mono, monospace' }}>
              {cat.weight}
            </div>
            <div style={{ fontSize: '12px', color: 'rgba(240,237,232,0.5)', lineHeight: 1.4 }}>
              {cat.desc}
            </div>
          </div>
        ))}
      </div>

      <H2 id="core-formulas">Core Formulas</H2>

      <H3>Category Score</H3>
      <P>
        Because raw metrics range from boolean flags to millions of downloads, they cannot be directly combined. PackSafe converts all raw evidence into a common <Code>0.0</Code> (riskiest/worst) to <Code>1.0</Code> (safest/best) scale using normalization functions.
      </P>
      <FormulaBox title="CATEGORY SCORE">
        CategoryScore(c) = 100 × [ Σ (w<sub>m</sub> × N<sub>m</sub>(x<sub>m</sub>)) / Σ w<sub>m</sub> ]
      </FormulaBox>
      <UL>
        <LI><b>w<sub>m</sub>:</b> The weight of the specific metric.</LI>
        <LI><b>N<sub>m</sub>(x<sub>m</sub>):</b> The normalized metric value (between 0.0 and 1.0).</LI>
      </UL>
      <P>
        Only metrics with usable evidence participate in the category denominator. For example, if a metric has a weight of 5, but its evidence is <Code>MISSING</Code>, that weight is excluded from the denominator. This ensures that missing evidence does not drag the score to zero.
      </P>

      <H3>Overall Base Score</H3>
      <FormulaBox title="BASE SCORE">
        BaseScore = Σ (W<sub>c</sub> × S<sub>c</sub>) / Σ W<sub>c</sub>
      </FormulaBox>
      <P>
        The Base Score is the weighted average of all available category scores. Like metrics, unavailable categories are excluded from the denominator.
      </P>
      <Callout type="warning">
        <b>Missing Evidence Policy:</b> Missing evidence is not converted into a zero score. Instead, missing evidence <b>decreases Confidence</b>. A package with perfectly safe code but missing ecosystem metadata might receive a 100 BaseScore, but only a 50% Confidence rating.
      </Callout>

      <H2 id="normalization">Normalization Functions</H2>
      <P>Normalization transforms raw values into the standard 0–1 range based on the metric's characteristics.</P>
      <Table>
        <THead>
          <TR><TH>Normalizer</TH><TH>Purpose</TH><TH>Representative behavior</TH></TR>
        </THead>
        <TBody>
          <TR><TD><Code>linear_bad</Code></TD><TD>Higher value is worse</TD><TD>Bounded linear decrease</TD></TR>
          <TR><TD><Code>linear_good</Code></TD><TD>Higher value is better</TD><TD>Bounded linear increase</TD></TR>
          <TR><TD><Code>exponential_bad</Code></TD><TD>Harmful counts / events</TD><TD><Code>exp(-max(0,x)/scale)</Code></TD></TR>
          <TR><TD><Code>log_positive</Code></TD><TD>Diminishing returns</TD><TD>Log-shaped normalization</TD></TR>
          <TR><TD><Code>adoption</Code></TD><TD>Popularity/adoption</TD><TD>Saturating adoption curve</TD></TR>
          <TR><TD><Code>recency</Code></TD><TD>Age / recency</TD><TD>Exponential decay by age</TD></TR>
          <TR><TD><Code>boolean_bad</Code></TD><TD>Boolean risk flag</TD><TD><Code>False → 1</Code>, <Code>True → 0</Code></TD></TR>
          <TR><TD><Code>boolean_good</Code></TD><TD>Boolean positive flag</TD><TD><Code>False → 0</Code>, <Code>True → 1</Code></TD></TR>
          <TR><TD><Code>sigmoid</Code></TD><TD>Nonlinear bounded transition</TD><TD>Logistic curve, positive direction</TD></TR>
        </TBody>
      </Table>

      <H2 id="metric-matrix">PackSafe 36-Metric Matrix</H2>
      <P>The system calculates 36 individual metrics. Metric weights are <b>relative within their category</b>, not global percentages.</P>

      <H3>Security (1 metric)</H3>
      <Table>
        <THead><TR><TH>Metric</TH><TH>Wt.</TH><TH>Dir.</TH><TH>Normalizer</TH><TH>Evidence</TH></TR></THead>
        <TBody>
          <TR><TD><Code>vulnerability_combined_risk</Code></TD><TD>40</TD><TD>Negative</TD><TD><Code>vulnerability_risk</Code></TD><TD>OSV/advisories</TD></TR>
        </TBody>
      </Table>

      <H3>Integrity (11 metrics)</H3>
      <Table>
        <THead><TR><TH>Metric</TH><TH>Wt.</TH><TH>Dir.</TH><TH>Normalizer</TH><TH>Evidence</TH></TR></THead>
        <TBody>
          <TR><TD><Code>confirmed_malicious_behavior</Code></TD><TD>15</TD><TD>Negative</TD><TD><Code>boolean_bad</Code></TD><TD>Static/advisory</TD></TR>
          <TR><TD><Code>credential_secret_access</Code></TD><TD>10</TD><TD>Negative</TD><TD><Code>linear_bad</Code></TD><TD>Static analysis</TD></TR>
          <TR><TD><Code>suspicious_install_behavior</Code></TD><TD>8</TD><TD>Negative</TD><TD><Code>linear_bad</Code></TD><TD>Static analysis</TD></TR>
          <TR><TD><Code>remote_code_download</Code></TD><TD>8</TD><TD>Negative</TD><TD><Code>linear_bad</Code></TD><TD>Static analysis</TD></TR>
          <TR><TD><Code>typosquatting_risk</Code></TD><TD>8</TD><TD>Negative</TD><TD><Code>linear_bad</Code></TD><TD>Identity/context</TD></TR>
          <TR><TD><Code>package_repo_mismatch</Code></TD><TD>5</TD><TD>Negative</TD><TD><Code>boolean_bad</Code></TD><TD>Registry + GitHub</TD></TR>
          <TR><TD><Code>shell_process_execution</Code></TD><TD>5</TD><TD>Negative</TD><TD><Code>linear_bad</Code></TD><TD>Static analysis</TD></TR>
          <TR><TD><Code>dynamic_code_execution</Code></TD><TD>4</TD><TD>Negative</TD><TD><Code>linear_bad</Code></TD><TD>Static analysis</TD></TR>
          <TR><TD><Code>obfuscation_patterns</Code></TD><TD>4</TD><TD>Negative</TD><TD><Code>linear_bad</Code></TD><TD>Static analysis</TD></TR>
          <TR><TD><Code>suspicious_network_behavior</Code></TD><TD>4</TD><TD>Negative</TD><TD><Code>linear_bad</Code></TD><TD>Static analysis</TD></TR>
          <TR><TD><Code>publisher_anomaly</Code></TD><TD>3</TD><TD>Negative</TD><TD><Code>linear_bad</Code></TD><TD>Identity</TD></TR>
        </TBody>
      </Table>

      <H3>Supply Chain (10 metrics)</H3>
      <Table>
        <THead><TR><TH>Metric</TH><TH>Wt.</TH><TH>Dir.</TH><TH>Normalizer</TH><TH>Evidence</TH></TR></THead>
        <TBody>
          <TR><TD><Code>direct_dependency_count</Code></TD><TD>4</TD><TD>Negative</TD><TD><Code>log_positive</Code></TD><TD>Registry/graph</TD></TR>
          <TR><TD><Code>transitive_dependency_count</Code></TD><TD>5</TD><TD>Negative</TD><TD><Code>log_positive</Code></TD><TD>deps.dev</TD></TR>
          <TR><TD><Code>dependency_depth</Code></TD><TD>3</TD><TD>Negative</TD><TD><Code>linear_bad</Code></TD><TD>Dependency graph</TD></TR>
          <TR><TD><Code>dependency_vulnerability_exposure</Code></TD><TD>7</TD><TD>Negative</TD><TD><Code>linear_bad</Code></TD><TD>OSV/deps.dev</TD></TR>
          <TR><TD><Code>direct_vulnerable_deps</Code></TD><TD>4</TD><TD>Negative</TD><TD><Code>linear_bad</Code></TD><TD>OSV/graph</TD></TR>
          <TR><TD><Code>transitive_vulnerable_deps</Code></TD><TD>2</TD><TD>Negative</TD><TD><Code>linear_bad</Code></TD><TD>OSV/graph</TD></TR>
          <TR><TD><Code>abandoned_dependencies</Code></TD><TD>4</TD><TD>Negative</TD><TD><Code>linear_bad</Code></TD><TD>Registry/GitHub</TD></TR>
          <TR><TD><Code>new_dependencies</Code></TD><TD>2</TD><TD>Negative</TD><TD><Code>linear_bad</Code></TD><TD>Dependency history</TD></TR>
          <TR><TD><Code>dependency_churn</Code></TD><TD>2</TD><TD>Negative</TD><TD><Code>linear_bad</Code></TD><TD>Dependency history</TD></TR>
          <TR><TD><Code>typosquatting_context</Code></TD><TD>5</TD><TD>Negative</TD><TD><Code>linear_bad</Code></TD><TD>Identity/context</TD></TR>
        </TBody>
      </Table>

      <H3>Maintenance (8 metrics)</H3>
      <Table>
        <THead><TR><TH>Metric</TH><TH>Wt.</TH><TH>Dir.</TH><TH>Normalizer</TH><TH>Evidence</TH></TR></THead>
        <TBody>
          <TR><TD><Code>days_since_last_release</Code></TD><TD>6</TD><TD>Negative</TD><TD><Code>recency</Code></TD><TD>Registry</TD></TR>
          <TR><TD><Code>releases_last_year</Code></TD><TD>4</TD><TD>Positive</TD><TD><Code>linear_good</Code></TD><TD>Registry</TD></TR>
          <TR><TD><Code>releases_last_3_months</Code></TD><TD>3</TD><TD>Positive</TD><TD><Code>linear_good</Code></TD><TD>Registry</TD></TR>
          <TR><TD><Code>recent_commits</Code></TD><TD>4</TD><TD>Positive</TD><TD><Code>log_positive</Code></TD><TD>GitHub</TD></TR>
          <TR><TD><Code>recent_issue_activity</Code></TD><TD>2</TD><TD>Positive</TD><TD><Code>log_positive</Code></TD><TD>GitHub</TD></TR>
          <TR><TD><Code>maintainer_count</Code></TD><TD>2</TD><TD>Positive</TD><TD><Code>log_positive</Code></TD><TD>Registry</TD></TR>
          <TR><TD><Code>repository_archived</Code></TD><TD>8</TD><TD>Negative</TD><TD><Code>boolean_bad</Code></TD><TD>GitHub</TD></TR>
          <TR><TD><Code>project_maturity_days</Code></TD><TD>1</TD><TD>Positive</TD><TD><Code>log_positive</Code></TD><TD>Registry</TD></TR>
        </TBody>
      </Table>

      <H3>Adoption (6 metrics)</H3>
      <Table>
        <THead><TR><TH>Metric</TH><TH>Wt.</TH><TH>Dir.</TH><TH>Normalizer</TH><TH>Evidence</TH></TR></THead>
        <TBody>
          <TR><TD><Code>download_count</Code></TD><TD>7</TD><TD>Positive</TD><TD><Code>adoption</Code></TD><TD>PyPI/npm</TD></TR>
          <TR><TD><Code>download_growth</Code></TD><TD>4</TD><TD>Positive</TD><TD><Code>adoption</Code></TD><TD>PyPI/npm</TD></TR>
          <TR><TD><Code>dependents_count</Code></TD><TD>4</TD><TD>Positive</TD><TD><Code>adoption</Code></TD><TD>deps.dev/fallback</TD></TR>
          <TR><TD><Code>stars_count</Code></TD><TD>1</TD><TD>Positive</TD><TD><Code>adoption</Code></TD><TD>GitHub</TD></TR>
          <TR><TD><Code>forks_count</Code></TD><TD>1</TD><TD>Positive</TD><TD><Code>adoption</Code></TD><TD>GitHub</TD></TR>
          <TR><TD><Code>watchers_count</Code></TD><TD>1</TD><TD>Positive</TD><TD><Code>adoption</Code></TD><TD>GitHub</TD></TR>
        </TBody>
      </Table>

      <H2 id="vulnerability-risk">Vulnerability Risk Engine</H2>
      <P>
        Vulnerabilities are deduplicated across CVE, GHSA, and OSV aliases. They are checked for strict version applicability to the exact package being evaluated. Each applicable vulnerability is scored independently.
      </P>
      <FormulaBox title="VULNERABILITY RISK">
        risk<sub>i</sub> = severity<sub>i</sub> × exploitability<sub>i</sub> × exposure<sub>i</sub> × exploitation<sub>i</sub>
      </FormulaBox>
      <Table>
        <THead><TR><TH>Factor</TH><TH>Values</TH></TR></THead>
        <TBody>
          <TR><TD>Severity</TD><TD>Critical = 1.00; High = 0.70; Medium = 0.35; Low = 0.10</TD></TR>
          <TR><TD>Exploitability</TD><TD>Known = 1.00; Public = 0.90; High = 0.70; Unknown = 0.50; Low = 0.30</TD></TR>
          <TR><TD>Exposure</TD><TD>Direct = 1.00; depth 1 = 0.80; depth 2 = 0.60; depth 3+ = 0.40</TD></TR>
          <TR><TD>Exploitation</TD><TD>Active exploitation = 1.00; not known exploited = 0.25</TD></TR>
        </TBody>
      </Table>
      <FormulaBox title="COMBINED RISK">
        CombinedRisk = 1 - Π<sub>i</sub>(1 - risk<sub>i</sub>)<br />
        SecurityNormalized = 1 - CombinedRisk
      </FormulaBox>
      <Callout type="warning">
        Important: active exploitation is inherently included in the vulnerability risk calculation via the <b>exploitation_i</b> multiplier. It should not be double-counted as another independent vulnerability penalty.
      </Callout>

      <H2 id="confidence-model">Confidence Model</H2>
      <P>
        <b>Safety Score ≠ Confidence.</b> A package may receive a high safety score but low confidence if critical evidence (such as static analysis or registry metadata) is missing or stale.
      </P>
      <FormulaBox title="CONFIDENCE">
        Confidence = round(100 × EvidenceCoverage × WeightedSourceReliability × AnalysisCoverage, 2)
      </FormulaBox>
      <Table>
        <THead><TR><TH>Source</TH><TH>Reliability</TH><TH>Analysis Coverage Tier</TH></TR></THead>
        <TBody>
          <TR><TD>OSV / advisories</TD><TD>1.00</TD><TD>metadata_only = 0.50</TD></TR>
          <TR><TD>Registry</TD><TD>0.98</TD><TD>registry_osv = 0.70</TD></TR>
          <TR><TD>GitHub</TD><TD>0.95</TD><TD>registry_osv_repository = 0.85</TD></TR>
          <TR><TD>Archive</TD><TD>0.95</TD><TD>deep_static = 1.00</TD></TR>
          <TR><TD>deps.dev</TD><TD>0.92</TD><TD></TD></TR>
          <TR><TD>Static analysis</TD><TD>0.90</TD><TD></TD></TR>
          <TR><TD>Identity</TD><TD>0.90</TD><TD></TD></TR>
          <TR><TD>Heuristic</TD><TD>0.80</TD><TD></TD></TR>
        </TBody>
      </Table>

      <H2 id="security-gates">Security Gates & Policy</H2>
      <P>
        Security Gates represent hard limits. Unlike weighted metrics that contribute to a combined score, hitting a security gate overrides normal scoring. A package distributing malware cannot be "saved" by having high adoption or maintenance.
      </P>
      <Table>
        <THead><TR><TH>Gate</TH><TH>Condition</TH><TH>Outcome</TH></TR></THead>
        <TBody>
          <TR><TD><Code>GATE-MALWARE</Code></TD><TD>Confirmed malicious behavior</TD><TD><Badge variant="red">BLOCK</Badge> score ≤ 5</TD></TR>
          <TR><TD><Code>GATE-ACTIVE-CRITICAL</Code></TD><TD>Applicable critical vulnerability actively exploited</TD><TD><Badge variant="red">BLOCK</Badge></TD></TR>
          <TR><TD><Code>GATE-CREDENTIAL-THEFT</Code></TD><TD>High-confidence credential/secret theft with harvesting + exfiltration</TD><TD><Badge variant="red">BLOCK</Badge></TD></TR>
          <TR><TD><Code>GATE-REMOTE-EXEC</Code></TD><TD>Remote executable/payload download + execution at high confidence</TD><TD><Badge variant="red">BLOCK</Badge></TD></TR>
          <TR><TD><Code>GATE-INSTALL-MALWARE</Code></TD><TD>High-confidence malicious installation behavior</TD><TD><Badge variant="red">BLOCK</Badge></TD></TR>
          <TR><TD><Code>GATE-SUSPICIOUS-WARN</Code></TD><TD>Suspicious behavior below hard-gate confidence threshold</TD><TD><Badge variant="amber">WARN</Badge></TD></TR>
        </TBody>
      </Table>

      <H3>Policy Profiles</H3>
      <P>The <b>PolicyEngine</b> applies these decision rules after the ScoreEngine has completed the objective mathematical scoring.</P>
      <div style={{ background: '#0e0e0e', padding: '12px 16px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.08)', marginBottom: '16px', fontSize: '12px', fontFamily: 'JetBrains Mono, monospace', color: '#a0a0a0' }}>
        ScoreResult &nbsp;→&nbsp; PolicyEngine &nbsp;→&nbsp; Policy Profile &nbsp;→&nbsp; ALLOW / WARN / BLOCK
      </div>
      <Table>
        <THead><TR><TH>Profile</TH><TH>Rule</TH></TR></THead>
        <TBody>
          <TR><TD>Permissive</TD><TD>Score &lt; 40 → WARN; otherwise ALLOW. Critical gates still block.</TD></TR>
          <TR><TD>Balanced</TD><TD>Score &lt; 60 or risk HIGH/CRITICAL → WARN; warning gates → WARN; critical gates → BLOCK.</TD></TR>
          <TR><TD>Strict</TD><TD>Score &lt; 75 or risk MODERATE/HIGH/CRITICAL → BLOCK; score &lt; 90 → WARN; otherwise ALLOW.</TD></TR>
          <TR><TD>Enterprise</TD><TD>Organization-defined requirements including minimum score, package lists, license policy, maximum vulnerability severity and allowed ecosystems.</TD></TR>
        </TBody>
      </Table>
      <Callout type="note">
        <b>Policy precedence:</b> Hard security gate → blocked list → approved list → license review → vulnerability severity policy → profile thresholds.
      </Callout>

      <H2 id="evidence-states">Evidence States & Deterministic Behavior</H2>
      <Table>
        <THead><TR><TH>Status</TH><TH>Meaning</TH></TR></THead>
        <TBody>
          <TR><TD><Code>AVAILABLE</Code></TD><TD>Evidence was successfully collected and is usable.</TD></TR>
          <TR><TD><Code>MISSING</Code></TD><TD>Expected evidence could not be obtained.</TD></TR>
          <TR><TD><Code>STALE</Code></TD><TD>Cached evidence exists but is older than the configured freshness threshold.</TD></TR>
          <TR><TD><Code>INVALID</Code></TD><TD>Evidence was present but malformed or unusable.</TD></TR>
          <TR><TD><Code>NOT_APPLICABLE</Code></TD><TD>The metric/evidence does not apply to this package/context.</TD></TR>
        </TBody>
      </Table>
      <Callout type="warning">
        <b>Truthful Evidence:</b> <Code>None</Code> or <Code>MISSING</Code> must not become an artificial safe value. However, a real <Code>False</Code>, <Code>0</Code>, or <Code>0.0</Code> must remain valid evidence when it was actually observed by the analyzers.
      </Callout>

      <H2 id="attribution">Attribution & Explainability</H2>
      <P>Attribution explains <i>why</i> the score is what it is. It does not modify the score itself.</P>
      <Table>
        <THead><TR><TH>Attribution Element</TH><TH>Purpose</TH></TR></THead>
        <TBody>
          <TR><TD>Category contribution</TD><TD>Shows how much each category contributes to the BaseScore.</TD></TR>
          <TR><TD>Metric attribution</TD><TD>Shows raw value, normalized value, metric weight and point contribution.</TD></TR>
          <TR><TD>Top positive signals</TD><TD>Highlights evidence improving the score.</TD></TR>
          <TR><TD>Top negative signals</TD><TD>Highlights evidence reducing the score.</TD></TR>
          <TR><TD>Findings</TD><TD>Canonical security/integrity issues from static analysis, advisories, malware checks or typosquatting.</TD></TR>
          <TR><TD>Gate association</TD><TD>Shows which findings caused non-compensable security actions.</TD></TR>
        </TBody>
      </Table>

      <H2 id="scoreresult">ScoreResult Contract</H2>
      <P>The final immutable result should contain the package identity plus the complete scoring audit trail:</P>
      <UL>
        <LI>Package name, ecosystem and version</LI>
        <LI>Final score and BaseScore</LI>
        <LI>Category scores</LI>
        <LI>Score risk, vulnerability risk and overall risk</LI>
        <LI>Decision and policy context</LI>
        <LI>Confidence</LI>
        <LI>Findings and security gate results</LI>
        <LI>Metric/category attribution</LI>
        <LI>Evidence coverage summary</LI>
        <LI>Configuration version and SHA-256 configuration hash</LI>
      </UL>

      <H2 id="core-invariants">Core Invariants</H2>
      <Table>
        <THead><TR><TH>Invariant</TH><TH>Requirement</TH></TR></THead>
        <TBody>
          <TR><TD>Determinism</TD><TD>Same evidence + same configuration → same numerical result.</TD></TR>
          <TR><TD>Bounds</TD><TD>Scores remain within 0–100 and normalized metrics within 0–1.</TD></TR>
          <TR><TD>Gate precedence</TD><TD>Critical threats cannot be rescued by high adoption, maintenance or other positive factors.</TD></TR>
          <TR><TD>Adoption independence</TD><TD>Popularity cannot improve Security or Integrity directly.</TD></TR>
          <TR><TD>Monotonicity</TD><TD>Increasing harmful evidence must not improve the score.</TD></TR>
          <TR><TD>Truthful evidence</TD><TD>Missing/invalid evidence is not converted into a fabricated safe value.</TD></TR>
          <TR><TD>Confidence separation</TD><TD>Evidence quality affects confidence independently from safety score.</TD></TR>
          <TR><TD>Code safety</TD><TD>Package installation code is analyzed without executing it.</TD></TR>
          <TR><TD>Configuration integrity</TD><TD>Configuration is validated and identified by SHA-256.</TD></TR>
        </TBody>
      </Table>

      <H2 id="example">Score Calculation Example</H2>
      <Callout type="note">
        <b>Note:</b> This is a hypothetical illustrative example of a package moving through the engine. It does not represent actual PackSafe live scoring data.
      </Callout>
      <div style={{ background: '#0e0e0e', padding: '16px', border: '1px solid rgba(255,255,255,0.08)', fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#a0a0a0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div><span style={{ color: '#ff3a00' }}>[1] Package:</span> <span style={{ color: '#f0ede8' }}>example-pkg v2.1.0</span></div>
        <div><span style={{ color: '#ff3a00' }}>[2] Evidence:</span> <span style={{ color: '#f0ede8' }}>0 CVEs, 2 transitive deps, Last release 50 days ago</span></div>
        <div><span style={{ color: '#ff3a00' }}>[3] Raw metrics:</span> <span style={{ color: '#f0ede8' }}>days_since_last_release = 50, transitive_dependency_count = 2</span></div>
        <div><span style={{ color: '#ff3a00' }}>[4] Normalized:</span> <span style={{ color: '#f0ede8' }}>N(days) = 0.95, N(deps) = 0.98</span></div>
        <div><span style={{ color: '#ff3a00' }}>[5] Category scores:</span> <span style={{ color: '#f0ede8' }}>Security=100, Integrity=100, Maintenance=92...</span></div>
        <div><span style={{ color: '#ff3a00' }}>[6] Weighted BaseScore:</span> <span style={{ color: '#f0ede8' }}>96.5</span></div>
        <div><span style={{ color: '#ff3a00' }}>[7] Vulnerability risk:</span> <span style={{ color: '#f0ede8' }}>0.00</span></div>
        <div><span style={{ color: '#ff3a00' }}>[8] Confidence:</span> <span style={{ color: '#f0ede8' }}>98.2%</span></div>
        <div><span style={{ color: '#ff3a00' }}>[9] Security gates:</span> <span style={{ color: '#f0ede8' }}>None triggered</span></div>
        <div><span style={{ color: '#ff3a00' }}>[10] ScoreResult:</span> <span style={{ color: '#f0ede8' }}>Final Score 96 (Safe)</span></div>
        <div><span style={{ color: '#ff3a00' }}>[11] Policy decision:</span> <span style={{ color: '#f0ede8' }}>ALLOW</span></div>
      </div>

      <H2 id="interpretation">Score Interpretation</H2>
      <P>
        The final score is a highly deterministic result based on the <b>available evidence</b> and your exact <b>scoring configuration</b>.
      </P>
      <Callout type="warning">
        The score alone does <b>not</b> communicate evidence certainty! A package with a score of 98 but a confidence of 12% is dangerous because it lacks essential safety signals.
      </Callout>
      <P>
        Before interpreting a result, always review the <b>Score, Risk, Confidence, Findings, Security Gates, Attribution, and Evidence Coverage</b> in the UI.
      </P>
    </Prose>
  )
}
