import {
  Prose, H1, H2, H3, P, Lead, Code, CodeBlock, Callout, SectionLabel, FlagRow, Badge, Hr,
  Table, THead, TBody, TR, TH, TD,
} from '@/components/Markdown'
import { useParams, Link } from 'react-router'

// ─── Auth ─────────────────────────────────────────────────────────────────────

function Auth() {
  return (
    <>
      <SectionLabel>API REFERENCE · 01</SectionLabel>
      <H1>Authentication</H1>
      <Lead>
        The PackSafe REST API uses bearer token authentication. All requests must include a valid
        API token in the <Code>Authorization</Code> header.
      </Lead>

      <H2 id="obtaining-a-token">Obtaining a token</H2>
      <P>
        Tokens are generated from your PackSafe account dashboard at{' '}
        <Code>packsafe.dev/settings/tokens</Code>. Each token can be scoped to specific endpoints
        and rate-limited independently.
      </P>

      <H2 id="using-the-token">Using the token</H2>
      <CodeBlock lang="bash">
{`curl https://api.packsafe.dev/v1/analyze \\
  -H "Authorization: Bearer ps_live_xxxxxxxxxxxxxxxxxxxx" \\
  -H "Content-Type: application/json" \\
  -d '{"package": "express", "version": "5.1.0", "registry": "npm"}'`}
      </CodeBlock>

      <H2 id="token-types">Token types</H2>
      <Table>
        <THead>
          <TR><TH>Prefix</TH><TH>Type</TH><TH>Rate limit</TH></TR>
        </THead>
        <TBody>
          {[
            ['ps_live_', 'Production token', '1,000 req/min'],
            ['ps_test_', 'Test token — returns static fixtures', '10,000 req/min'],
            ['ps_anon_', 'Anonymous — public packages only', '60 req/min'],
          ].map(([prefix, type, rate]) => (
            <TR key={prefix}>
              <TD><Code>{prefix}</Code></TD>
              <TD>{type}</TD>
              <TD>{rate}</TD>
            </TR>
          ))}
        </TBody>
      </Table>

      <Callout type="danger">
        Never commit API tokens to version control. Use environment variables (<Code>PACKSAFE_TOKEN</Code>)
        or a secrets manager. Rotate tokens immediately if exposed.
      </Callout>

      <H2 id="errors">Error responses</H2>
      <CodeBlock lang="json">
{`// 401 Unauthorized
{
  "error": "unauthorized",
  "message": "Missing or invalid Authorization header",
  "docs": "https://packsafe.dev/docs/api/auth"
}

// 429 Rate Limited
{
  "error": "rate_limited",
  "message": "1000 requests per minute exceeded",
  "retry_after": 38
}`}
      </CodeBlock>
    </>
  )
}

// ─── Analyze endpoint ─────────────────────────────────────────────────────────

function AnalyzeEndpoint() {
  return (
    <>
      <SectionLabel>API REFERENCE · 02</SectionLabel>
      <H1>Analyze endpoint</H1>
      <Lead>
        Analyze a single package or a batch of packages. Returns a full safety assessment including
        score, signal breakdown, CVEs, and behavioral findings.
      </Lead>

      <H2 id="single">Single package</H2>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '10px 16px',
          background: '#0e0e0e',
          border: '1px solid rgba(255,255,255,0.08)',
          marginBottom: '16px',
        }}
      >
        <Badge variant="green">GET</Badge>
        <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', color: '#f0ede8' }}>
          /v1/analyze
        </code>
      </div>

      <H3>Query parameters</H3>
      <div style={{ border: '1px solid rgba(255,255,255,0.08)', background: '#0e0e0e', marginBottom: '24px' }}>
        <FlagRow flag="pkg" type="string  · required">
          Package name, optionally with version: <Code>express</Code> or <Code>express@5.1.0</Code>.
        </FlagRow>
        <FlagRow flag="registry" type="npm | pypi" defaultVal="npm">
          Registry to query.
        </FlagRow>
        <FlagRow flag="depth" type="number" defaultVal="0">
          Dependency tree depth. <Code>-1</Code> for full recursive analysis.
        </FlagRow>
      </div>

      <CodeBlock lang="bash">
{`curl "https://api.packsafe.dev/v1/analyze?pkg=express@5.1.0" \\
  -H "Authorization: Bearer $PACKSAFE_TOKEN"`}
      </CodeBlock>

      <H3>Response</H3>
      <CodeBlock lang="json">
{`{
  "package": "express",
  "version": "5.1.0",
  "registry": "npm",
  "score": 96,
  "verdict": "INSTALL",
  "signals": {
    "maintenance": 98,
    "vulnerabilities": 100,
    "authenticity": 99,
    "community_trust": 94,
    "install_behavior": 92
  },
  "cves": [],
  "behavior": {
    "preinstall_script": false,
    "postinstall_script": false,
    "network_calls": true,
    "network_hosts": ["registry.npmjs.org"],
    "suspicious": false
  },
  "metadata": {
    "downloads_weekly": 34200000,
    "dependents": 89000,
    "maintainers": 3,
    "age_days": 5110,
    "latest": "5.1.0",
    "versions": 298
  },
  "analyzed_at": "2026-08-31T12:00:00Z",
  "ttl": 3600
}`}
      </CodeBlock>

      <H2 id="batch">Batch analysis</H2>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '10px 16px',
          background: '#0e0e0e',
          border: '1px solid rgba(255,255,255,0.08)',
          marginBottom: '16px',
        }}
      >
        <Badge variant="blue">POST</Badge>
        <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', color: '#f0ede8' }}>
          /v1/analyze/batch
        </code>
      </div>
      <CodeBlock lang="bash">
{`curl -X POST https://api.packsafe.dev/v1/analyze/batch \\
  -H "Authorization: Bearer $PACKSAFE_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "packages": [
      { "name": "express", "version": "5.1.0" },
      { "name": "lodash", "version": "4.17.21" },
      { "name": "axios", "version": "1.7.9" }
    ],
    "registry": "npm"
  }'`}
      </CodeBlock>

      <Callout type="note">
        Batch requests are processed in parallel. Maximum 50 packages per batch request.
        Results are returned in the same order as the input array.
      </Callout>
    </>
  )
}

// ─── Search endpoint ──────────────────────────────────────────────────────────

function SearchEndpoint() {
  return (
    <>
      <SectionLabel>API REFERENCE · 03</SectionLabel>
      <H1>Search endpoint</H1>
      <Lead>
        Semantic package search API. Submit a natural language description; receive ranked packages
        with Safety Scores.
      </Lead>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '10px 16px',
          background: '#0e0e0e',
          border: '1px solid rgba(255,255,255,0.08)',
          marginBottom: '16px',
        }}
      >
        <Badge variant="green">GET</Badge>
        <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', color: '#f0ede8' }}>
          /v1/search
        </code>
      </div>

      <H3 id="query-parameters">Query parameters</H3>
      <div style={{ border: '1px solid rgba(255,255,255,0.08)', background: '#0e0e0e', marginBottom: '24px' }}>
        <FlagRow flag="q" type="string · required">
          Natural language description of the desired package functionality.
        </FlagRow>
        <FlagRow flag="registry" type="npm | pypi" defaultVal="npm">Registry to search.</FlagRow>
        <FlagRow flag="limit" type="number" defaultVal="10">Result count (1–50).</FlagRow>
        <FlagRow flag="min_score" type="number" defaultVal="0">Minimum Safety Score filter.</FlagRow>
      </div>

      <CodeBlock lang="bash">
{`curl "https://api.packsafe.dev/v1/search?q=http+server+for+python&registry=pypi&limit=5" \\
  -H "Authorization: Bearer $PACKSAFE_TOKEN"`}
      </CodeBlock>

      <H3 id="response">Response</H3>
      <CodeBlock lang="json">
{`{
  "query": "http server for python",
  "registry": "pypi",
  "results": [
    { "package": "fastapi", "version": "0.115.0", "score": 97, "verdict": "INSTALL" },
    { "package": "starlette", "version": "0.41.3", "score": 95, "verdict": "INSTALL" },
    { "package": "flask", "version": "3.1.0", "score": 93, "verdict": "INSTALL" },
    { "package": "aiohttp", "version": "3.10.10", "score": 88, "verdict": "INSTALL" },
    { "package": "tornado", "version": "6.4.2", "score": 85, "verdict": "INSTALL" }
  ],
  "total": 5,
  "analyzed_at": "2026-08-31T12:00:00Z"
}`}
      </CodeBlock>
    </>
  )
}

const pages: Record<string, React.FC> = {
  auth: Auth,
  analyze: AnalyzeEndpoint,
  search: SearchEndpoint,
}

export default function API() {
  const { endpoint } = useParams()
  const Page = endpoint ? pages[endpoint] : Auth
  if (!Page) {
    return (
      <Prose>
        <H1>Endpoint not found</H1>
        <P><Link to="/docs/api/auth" style={{ color: '#ff3a00', textDecoration: 'none' }}>Back to API Reference →</Link></P>
      </Prose>
    )
  }
  return <Prose><Page /></Prose>
}
