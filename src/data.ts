import { DNode, TLine } from "./types"

export const searchResults = [
    { name: 'fastapi', score: 97, desc: 'Modern, fast web framework for building APIs with Python' },
    { name: 'starlette', score: 95, desc: 'Lightweight ASGI framework, the foundation of FastAPI' },
    { name: 'flask', score: 93, desc: 'Lightweight WSGI web application framework' },
    { name: 'aiohttp', score: 88, desc: 'Async HTTP client/server framework for asyncio and Python' },
]

export const behaviorChecks = [
    { status: 'pass', label: 'No credential access or remote execution patterns in source' },
    { status: 'pass', label: 'Source archive hash matches published PyPI artifact' },
    { status: 'pass', label: 'No suspicious setup.py or build-time script execution' },
    { status: 'pass', label: 'No unauthorized outbound network sockets during import' },
    { status: 'pass', label: 'Maintainer and organization consistent with package name' },
    { status: 'pass', label: 'No known exploited vulnerabilities (CISA KEV catalog)' },
    { status: 'pass', label: 'Deterministic scoring config SHA-256 verified' },
]

export const heroLines: TLine[] = [
    { text: '$ packsafe analyze requests', delay: 400, color: '#f0ede8', bold: true },
    { text: '', delay: 200 },
    { text: 'requests 2.32.3                    SAFE TO INSTALL', delay: 400, color: '#00cc55', bold: true },
    { text: '', delay: 150 },
    { text: '  Score    91 / 100        Confidence  HIGH', delay: 200, color: '#f0ede8' },
    { text: '  Risk     LOW', delay: 150, color: '#00cc55' },
    { text: '', delay: 200 },
    { text: '  Checks', delay: 150, color: '#a8a8a8' },
    { text: '    ✓  No known vulnerabilities affect this version', delay: 120, color: '#00cc55' },
    { text: '    ✓  No known exploited vulnerabilities (CISA KEV)', delay: 120, color: '#00cc55' },
    { text: '    ✓  Maintainer consistent with package name', delay: 120, color: '#00cc55' },
    { text: '    ✓  Source archive hash matches published artifact', delay: 120, color: '#00cc55' },
    { text: '    ✓  No credential access or remote execution in source', delay: 120, color: '#00cc55' },
    { text: '', delay: 200 },
    { text: '  Policy Gates', delay: 150, color: '#a8a8a8' },
    { text: '    ✓ GATE-MALWARE            not triggered', delay: 100, color: '#00cc55' },
    { text: '    ✓ GATE-ACTIVE-CRITICAL    not triggered', delay: 100, color: '#00cc55' },
    { text: '    ✓ GATE-CREDENTIAL-THEFT   not triggered', delay: 100, color: '#00cc55' },
    { text: '    ✓ GATE-REMOTE-EXEC        not triggered', delay: 100, color: '#00cc55' },
    { text: '', delay: 200 },
    { text: '  Recommendation', delay: 150, color: '#a8a8a8' },
    { text: '    No blocking signals. Safe to install.', delay: 200, color: '#00cc55', bold: true },
    { text: '', delay: 200 },
    { text: '  evidence 28/30 metrics · coverage deep_static · engine 0.1.2', delay: 200, color: '#4a4a4a' },
    { text: '  config 7f3c9a21 · archive a1b2c3d4e5f6', delay: 150, color: '#4a4a4a' },
]

export const cliLines: TLine[] = [
    { text: '$ packsafe install --uv some-suspicious-package', delay: 400, color: '#f0ede8', bold: true },
    { text: '', delay: 200 },
    { text: 'Analyzing some-suspicious-package@0.1.0...', delay: 600, color: '#6b6b6b' },
    { text: '', delay: 400 },
    { text: '╭─ Install Blocked ─────────────────────────────────────────────╮', delay: 200, color: '#ff3a00' },
    { text: '│ • GATE-REMOTE-EXEC triggered: downloads & executes remote script│', delay: 200, color: '#ff3a00' },
    { text: '│   during import (confidence 0.94)                             │', delay: 150, color: '#ff3a00' },
    { text: '│ • GATE-CREDENTIAL-THEFT triggered: reads AWS credentials from │', delay: 200, color: '#ff3a00' },
    { text: '│   the environment (confidence 0.91)                            │', delay: 150, color: '#ff3a00' },
    { text: '│                                                               │', delay: 100, color: '#ff3a00' },
    { text: '│ Investigate with: packsafe inspect some-suspicious-package     │', delay: 150, color: '#a8a8a8' },
    { text: '╰───────────────────────────────────────────────────────────────╯', delay: 200, color: '#ff3a00' },
    { text: '', delay: 300 },
    { text: '✗ Installation blocked. Nothing was installed.', delay: 300, color: '#ff3a00', bold: true },
    { text: 'Exit code 4 (Blocked by policy).', delay: 200, color: '#ffaa00' },
]

export const depNodes: DNode[] = [
    { id: 'requests', x: 400, y: 240, score: 91 },
    { id: 'urllib3', x: 155, y: 100, score: 93 },
    { id: 'certifi', x: 645, y: 100, score: 96 },
    { id: 'charset-norm', x: 70, y: 260, score: 91 },
    { id: 'idna', x: 730, y: 260, score: 94 },
    { id: 'cryptography', x: 160, y: 400, score: 95 },
    { id: 'pyOpenSSL', x: 640, y: 400, score: 92 },
    { id: 'pysocks', x: 400, y: 60, score: 89 },
    { id: 'cffi', x: 400, y: 440, score: 94 },
    { id: 'six', x: 280, y: 370, score: 90 },
]

export const tools = [
    {
        tag: '01 · ANALYZE',
        headline: 'Look before\nyou install.',
        desc: 'Collects evidence from every relevant source, then reports a score, the checks that passed, the risks that fired, and a recommendation. Nothing is installed.',
        code: '$ packsafe analyze requests'
    },
    {
        tag: '02 · INSPECT',
        headline: 'Question\nthe score.',
        desc: 'Shows every piece of evidence behind a verdict: which advisories affect the resolved version, which do not, where metadata came from, and coverage tiers.',
        code: '$ packsafe inspect django'
    },
    {
        tag: '03 · INSTALL',
        headline: 'Install behind\na policy gate.',
        desc: 'Analyzes, applies policy, and installs only if the package clears it. Safe packages install silently. Warnings prompt. Critical gates block outright.',
        code: '$ packsafe install --uv requests'
    },
    {
        tag: '04 · CI PIPELINE',
        headline: 'Exit codes\nare a contract.',
        desc: 'Code 4 means policy blocked the install; 2 means the registry was unreachable. Your CI can distinguish "package is dangerous" from "network is down".',
        code: '$ packsafe install --uv requests --yes --min-score 70'
    },
]

export const flowSteps = [
    { label: '1. Collect', sub: 'PyPI · OSV · CISA KEV · EPSS · GitHub · deps.dev · source archive', color: '#f0ede8' },
    { label: '2. Normalize', sub: 'Every metric mapped to common scale with freshness window', color: '#f0ede8' },
    { label: '3. Score', sub: 'Deterministic weights across five categories · SHA-256 config digest', color: '#f0ede8' },
    { label: '4. Gate', sub: 'Non-compensable policy gates (GATE-MALWARE, GATE-ACTIVE-CRITICAL)', color: '#ffaa00' },
    { label: '5. Record Provenance', sub: 'Source URL, fetch timestamp, archive hash recorded', color: '#f0ede8' },
    { label: 'INSTALL / REFUSE', sub: 'Refuses unsafe packages with exit code 4 · installs safe packages', color: '#00cc55', isFinal: true },
]

export const meta = [
    { label: 'Package', value: 'requests' },
    { label: 'Version', value: '2.32.3' },
    { label: 'Registry', value: 'PyPI' },
    { label: 'Safety Score', value: '91 / 100', highlight: '#00cc55' },
    { label: 'Risk Band', value: 'LOW', highlight: '#00cc55' },
    { label: 'Confidence', value: 'HIGH' },
    { label: 'Evidence Count', value: '28 / 30 metrics' },
    { label: 'Coverage Tier', value: 'deep_static' },
    { label: 'CISA KEV', value: '0 active exploits', highlight: '#00cc55' },
    { label: 'Known CVEs', value: '0 in v2.32.3', highlight: '#00cc55' },
    { label: 'Engine Version', value: '0.1.2' },
    { label: 'License', value: 'Apache-2.0' },
    { label: 'Config SHA-256', value: '7f3c9a21' },
    { label: 'Archive Hash', value: 'a1b2c3d4e5f6' },
]

export const threats = [
    {
        n: '01',
        title: 'Credential theft & exfiltration',
        desc: 'A package name tells you nothing about whether the code inside it will steal your AWS tokens, SSH keys, or environment variables and exfiltrate them over an outbound socket.'
    },
    {
        n: '02',
        title: 'Typosquatting & impersonation',
        desc: 'A package can look almost identical to the one you intended to install. One transposed character. One added hyphen. Same README. Different, malicious payload.'
    },
    {
        n: '03',
        title: 'Known & active exploits',
        desc: 'A vulnerability with no exploitation probability and one confirmed exploited in the wild (CISA KEV) are not the same finding. PackSafe differentiates them.'
    },
    {
        n: '04',
        title: 'Install-time code execution',
        desc: 'Malicious setup scripts or wheel build hooks that download and execute remote scripts before your package manager even finishes installing.'
    },
]

export const signals = [
    { label: 'Security (Weight 0.40)', score: 96 },
    { label: 'Integrity (Weight 0.25)', score: 98 },
    { label: 'Supply Chain (Weight 0.20)', score: 92 },
    { label: 'Maintenance (Weight 0.10)', score: 88 },
    { label: 'Adoption (Weight 0.05)', score: 95 },
]

export const comparisonData = [
    {
        aspect: 'When it runs',
        traditional: 'In CI, on a full lockfile',
        packsafe: 'At the moment you install one package',
    },
    {
        aspect: 'Output',
        traditional: 'A list of advisories',
        packsafe: 'A decision, plus the reasoning behind it',
    },
    {
        aspect: 'Reproducibility',
        traditional: 'Database state at scan time',
        packsafe: 'Config SHA-256 reported with every score',
    },
    {
        aspect: 'Blocking',
        traditional: 'Advisory lists you triage by hand',
        packsafe: 'Hard policy gates that refuse the install',
    },
    {
        aspect: 'Installation',
        traditional: 'Not part of the workflow',
        packsafe: 'The gate is the workflow',
    },
    {
        aspect: 'Credentials',
        traditional: 'Usually required',
        packsafe: 'None required',
    },
]

export const audienceData = [
    {
        role: 'Individual developers',
        benefit: 'A one-line check before pip install something from a search result.',
    },
    {
        role: 'Platform & security teams',
        benefit: 'A deterministic, reproducible score with a CI-enforceable gate.',
    },
    {
        role: 'Open-source maintainers',
        benefit: "A way to check your own package's posture before a release.",
    },
    {
        role: 'Researchers & auditors',
        benefit: 'Full evidence and provenance telemetry via the packsafe-core library.',
    },
]

export const useCasesData = [
    {
        title: 'Before you add a dependency',
        desc: 'Someone on your team pasted an unfamiliar package name into a requirements file. Score it first. Thirty seconds is cheaper than an incident.',
        cmd: 'packsafe analyze requests',
    },
    {
        title: 'Lockfile and dependency review',
        desc: "Run analyze across the packages you did not choose yourself — the transitive ones that arrived as someone else's decision.",
        cmd: 'packsafe inspect django',
    },
    {
        title: 'Pull request checks',
        desc: 'Run the gate in CI. A dependency bump that crosses a score threshold fails the build, with the reason in the log.',
        cmd: 'packsafe install --uv requests --yes --min-score 70',
    },
    {
        title: 'Investigating a spike',
        desc: 'Download counts and maintainer changes are the pattern behind most malicious releases. inspect shows the timeline that produced them.',
        cmd: 'packsafe inspect some-package --all',
    },
]

export const faqData = [
    {
        q: 'Does PackSafe send my data anywhere?',
        a: 'No. The CLI runs entirely on your machine and queries public APIs directly. There is no account, no telemetry, and no upload of your code or dependency list.'
    },
    {
        q: 'Does it install packages globally?',
        a: 'Never. It installs into the environment belonging to the directory you ran the command in — your activated virtualenv or ./.venv — and stops with an explanation if neither exists.'
    },
    {
        q: 'Why not just use pip-audit or a scanner?',
        a: 'Those answer "does this version have known CVEs". PackSafe also weighs maintainer behaviour, provenance, integrity, exploitation probability, source-level behaviour and adoption — and it gates the install rather than handing you a list to triage yourself. inspect still gives you the full advisory breakdown if that is what you want.'
    },
    {
        q: 'What is the score made of?',
        a: 'Five weighted categories — security (0.40), integrity (0.25), supply chain (0.20), maintenance (0.10) and adoption (0.05) — each built from individually normalized metrics. Critical policy gates can override the arithmetic entirely.'
    },
    {
        q: 'Why did my score change between runs?',
        a: 'Scores are deterministic for a given version of PackSafe against a given config digest. What changes is the evidence: new advisories, newly published exploits, updated metadata. Each report carries a timestamp and config digest so you can tell which it was.'
    },
    {
        q: 'Which ecosystems are supported?',
        a: 'PyPI today. The --ecosystem flag exists and the plumbing is in place, but npm analysis is not implemented yet.'
    },
    {
        q: 'How much does it slow down an install?',
        a: 'The cost is the evidence collection — several network round trips and, for small packages, a source download. Results are cached, so repeat checks of the same version are fast.'
    },
    {
        q: 'Does it need credentials?',
        a: 'No. A GITHUB_TOKEN is optional and only raises the GitHub API rate limit from 60 requests per hour.'
    },
]
