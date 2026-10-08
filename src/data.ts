import { DNode, TLine } from "./types"

export const searchResults = [
    { name: 'fastapi', score: 97, desc: 'Modern, fast web framework for building APIs with Python' },
    { name: 'starlette', score: 95, desc: 'Lightweight ASGI framework, the foundation of FastAPI' },
    { name: 'flask', score: 93, desc: 'Lightweight WSGI web application framework' },
    { name: 'aiohttp', score: 88, desc: 'Async HTTP client/server framework for asyncio' },
]

export const behaviorChecks = [
    { status: 'pass', label: 'No suspicious preinstall script' },
    { status: 'pass', label: 'No suspicious postinstall script' },
    { status: 'warn', label: 'External network access detected during install' },
    { status: 'pass', label: 'No known malicious dependency in tree' },
    { status: 'pass', label: 'No critical CVE detected in v5.1.0' },
    { status: 'pass', label: 'Maintainer keys verified against npm registry' },
    { status: 'pass', label: 'Source maps present and consistent' },
]

export const cliLines: TLine[] = [
    { text: '$ packsafe install requests', delay: 400, color: '#f0ede8', bold: true },
    { text: '', delay: 300 },
    { text: 'Analyzing requests@2.32.5...', delay: 800, color: '#6b6b6b' },
    { text: '', delay: 600 },
    { text: 'Safety Score       96/100', delay: 200, color: '#a8a8a8' },
    { text: 'Maintenance         98', delay: 100, color: '#a8a8a8' },
    { text: 'Vulnerabilities    100', delay: 100, color: '#a8a8a8' },
    { text: 'Authenticity         99', delay: 100, color: '#a8a8a8' },
    { text: 'Community Trust      94', delay: 100, color: '#a8a8a8' },
    { text: 'Install Behavior     92', delay: 100, color: '#a8a8a8' },
    { text: '', delay: 300 },
    { text: '✓  Low risk', delay: 200, color: '#00cc55', bold: true },
    { text: '', delay: 400 },
    { text: 'Continue? [Y/n]', delay: 300, color: '#f0ede8' },
]

export const depNodes: DNode[] = [
    { id: 'express', x: 400, y: 240, score: 96 },
    { id: 'body-parser', x: 155, y: 100, score: 94 },
    { id: 'cookie', x: 645, y: 100, score: 91 },
    { id: 'debug', x: 70, y: 260, score: 87 },
    { id: 'finalhandler', x: 730, y: 260, score: 95 },
    { id: 'merge-descriptors', x: 160, y: 400, score: 93 },
    { id: 'serve-static', x: 640, y: 400, score: 92 },
    { id: 'encodeurl', x: 400, y: 60, score: 96 },
    { id: 'path-to-regexp', x: 400, y: 440, score: 90 },
    { id: 'utils-merge', x: 280, y: 370, score: 88 },
]

export const tools = [
    { tag: 'CLI', headline: 'Analyze and install\nfrom the terminal.', desc: 'Drop-in replacement for npm install and pip install. Identical interface, full safety analysis before execution.', code: '$ npm install -g packsafe' },
    { tag: 'WEB', headline: 'Search and explore\npackage intelligence.', desc: 'Browser-based package explorer with full signal breakdown, CVE history, dependency maps, and semantic search.', code: 'packsafe.dev/package/express' },
    { tag: 'API', headline: 'Integrate into\nyour own workflows.', desc: 'REST and webhook API for CI/CD pipelines, PR checks, and internal tooling. Returns structured safety payloads.', code: 'GET /v1/analyze?pkg=express' },
    { tag: 'PRE-COMMIT', headline: 'Block dangerous\npackages before commit.', desc: 'Pre-commit hook that scans any package.json or requirements.txt change and blocks commits that introduce risk.', code: '$ packsafe hook install' },
]

export const flowSteps = [
    { label: 'AI-generated dependency', sub: 'input', color: '#f0ede8' },
    { label: 'Does it exist?', sub: 'existence check', color: '#f0ede8' },
    { label: 'Hallucination / Typosquatting detection', sub: 'similarity analysis', color: '#f0ede8' },
    { label: 'Package provenance', sub: 'origin & maintainer verification', color: '#f0ede8' },
    { label: 'Behavior analysis', sub: 'install scripts · network · deps', color: '#f0ede8' },
    { label: 'Safety Score', sub: 'aggregated signal evaluation', color: '#ffaa00' },
    { label: 'INSTALL / BLOCK', sub: 'decision output', color: '#00cc55', isFinal: true },
]

export const heroLines: TLine[] = [
    { text: '$ packsafe install fastapi-security-utils', delay: 400, color: '#f0ede8', bold: true },
    { text: '', delay: 200 },
    { text: 'Analyzing package...', delay: 600, color: '#6b6b6b' },
    { text: '', delay: 800 },
    { text: '✗  PACKAGE NOT FOUND', delay: 300, color: '#ff3a00', bold: true },
    { text: '', delay: 100 },
    { text: 'Possible AI-hallucinated dependency.', delay: 200, color: '#ffaa00' },
    { text: '', delay: 300 },
    { text: 'Did you mean?', delay: 200, color: '#6b6b6b' },
    { text: '→  fastapi-utils', delay: 150, color: '#f0ede8' },
    { text: '→  fastapi', delay: 100, color: '#f0ede8' },
    { text: '', delay: 300 },
    { text: 'Recommended alternative: fastapi-utils', delay: 200, color: '#00cc55' },
    { text: '', delay: 200 },
    { text: '▪  Installation blocked.', delay: 300, color: '#ff3a00' },
]

export const meta = [
    { label: 'Package', value: 'express' }, { label: 'Version', value: 'v5.1.0' },
    { label: 'Registry', value: 'npm' }, { label: 'Safety Score', value: '96 / 100', highlight: '#00cc55' },
    { label: 'Community Trust', value: '94' }, { label: 'Maintenance Health', value: '98' },
    { label: 'Downloads / week', value: '34,200,000' }, { label: 'Package age', value: '14 years' },
    { label: 'Maintainers', value: '3 active' }, { label: 'Dependencies', value: '31 direct' },
    { label: 'Versions', value: '298 total' }, { label: 'Latest CVEs', value: 'None in v5.x', highlight: '#00cc55' },
    { label: 'GitHub Stars', value: '66,200' }, { label: 'Open Issues', value: '94' },
]

export const threats = [
    { n: '01', title: 'Hallucinated packages', desc: 'AI-generated code can reference packages that do not exist. The model invented a name that looks plausible but resolves to nothing — or worse, to something malicious.' },
    { n: '02', title: 'Typosquatting', desc: 'A package can look almost identical to the one a developer intended to install. One transposed character. One added hyphen. Same README. Different payload.' },
    { n: '03', title: 'Vulnerable dependencies', desc: 'A legitimate package may contain known security vulnerabilities in itself or its dependency tree. CVEs accumulate silently between versions.' },
    { n: '04', title: 'Suspicious behavior', desc: 'Install scripts, network activity, dependency anomalies, or maintainer behavior can indicate elevated risk long before a CVE is filed.' },
]

export const signals = [
    { label: 'Maintenance Health', score: 98 },
    { label: 'Vulnerability Exposure', score: 100 },
    { label: 'Authenticity', score: 99 },
    { label: 'Community Trust', score: 94 },
    { label: 'Install Behavior', score: 92 },
]
