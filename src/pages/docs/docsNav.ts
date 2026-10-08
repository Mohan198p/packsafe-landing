export interface NavItem {
  label: string
  path: string
  hash?: string
  items?: NavItem[]
}

export interface NavSection {
  section: string
  items: NavItem[]
}

export const docsSidebar: NavSection[] = [
  {
    section: 'Overview',
    items: [
      {
        label: 'Introduction',
        path: '/docs',
        items: [
          { label: 'What is PackSafe?', path: '/docs', hash: '#what-is-packsafe' },
          { label: 'Key features', path: '/docs', hash: '#key-features' },
          { label: 'Signal categories', path: '/docs', hash: '#signal-categories' },
          { label: 'Design principles', path: '/docs', hash: '#design-principles' },
          { label: 'Next steps', path: '/docs', hash: '#next-steps' },
        ]
      },
      {
        label: 'How it works',
        path: '/docs/how-it-works',
        items: [
          { label: 'The analysis pipeline', path: '/docs/how-it-works', hash: '#analysis-pipeline' },
          { label: 'Scoring model', path: '/docs/how-it-works', hash: '#scoring-model' },
          { label: 'Decision thresholds', path: '/docs/how-it-works', hash: '#decision-thresholds' },
          { label: 'Data sources', path: '/docs/how-it-works', hash: '#data-sources' },
        ]
      },
      {
        label: 'Score Engine',
        path: '/docs/score-engine',
        items: [
          { label: 'Architecture & Scoring Flow', path: '/docs/score-engine', hash: '#score-engine-overview' },
          { label: 'Core Formulas', path: '/docs/score-engine', hash: '#core-formulas' },
          { label: 'Normalization', path: '/docs/score-engine', hash: '#normalization' },
          { label: 'Metric Matrix', path: '/docs/score-engine', hash: '#metric-matrix' },
          { label: 'Vulnerability Risk', path: '/docs/score-engine', hash: '#vulnerability-risk' },
          { label: 'Confidence Model', path: '/docs/score-engine', hash: '#confidence-model' },
          { label: 'Security Gates & Policy', path: '/docs/score-engine', hash: '#security-gates' },
          { label: 'Evidence States', path: '/docs/score-engine', hash: '#evidence-states' },
          { label: 'Attribution & Explainability', path: '/docs/score-engine', hash: '#attribution' },
          { label: 'ScoreResult Contract', path: '/docs/score-engine', hash: '#scoreresult' },
          { label: 'Core Invariants', path: '/docs/score-engine', hash: '#core-invariants' },
          { label: 'Score Calculation Example', path: '/docs/score-engine', hash: '#example' },
          { label: 'Score Interpretation', path: '/docs/score-engine', hash: '#interpretation' },
        ]
      }
    ],
  },
  {
    section: 'Getting Started',
    items: [
      { 
        label: 'Installation', 
        path: '/docs/installation',
        items: [
          { label: 'System requirements', path: '/docs/installation', hash: '#requirements' },
          { label: 'Install via npm', path: '/docs/installation', hash: '#npm' },
          { label: 'Install via Homebrew', path: '/docs/installation', hash: '#homebrew' },
          { label: 'Standalone binary', path: '/docs/installation', hash: '#binary' },
          { label: 'Install for Python', path: '/docs/installation', hash: '#python' },
          { label: 'Authentication', path: '/docs/installation', hash: '#auth' },
          { label: 'Updating', path: '/docs/installation', hash: '#update' },
          { label: 'Uninstalling', path: '/docs/installation', hash: '#uninstall' },
        ]
      },
      { 
        label: 'Quick start', 
        path: '/docs/quickstart',
        items: [
          { label: 'Analyze before installing', path: '/docs/quickstart', hash: '#analyze-before-install' },
          { label: 'Blocked install', path: '/docs/quickstart', hash: '#blocking-scenario' },
          { label: 'Analyze without installing', path: '/docs/quickstart', hash: '#analyze-only' },
          { label: 'Semantic search', path: '/docs/quickstart', hash: '#semantic-search' },
          { label: 'Reading the output', path: '/docs/quickstart', hash: '#reading-output' },
          { label: 'Next steps', path: '/docs/quickstart', hash: '#next-steps' },
        ]
      },
    ],
  },
  {
    section: 'CLI Reference',
    items: [
      {
        label: 'packsafe install',
        path: '/docs/cli/install',
        items: [
          { label: 'Synopsis', path: '/docs/cli/install', hash: '#synopsis' },
          { label: 'Flags', path: '/docs/cli/install', hash: '#flags' },
          { label: 'Examples', path: '/docs/cli/install', hash: '#examples' },
          { label: 'Exit codes', path: '/docs/cli/install', hash: '#exit-codes' },
        ]
      },
      {
        label: 'packsafe analyze',
        path: '/docs/cli/analyze',
        items: [
          { label: 'Synopsis', path: '/docs/cli/analyze', hash: '#synopsis' },
          { label: 'Flags', path: '/docs/cli/analyze', hash: '#flags' },
          { label: 'Examples', path: '/docs/cli/analyze', hash: '#examples' },
          { label: 'JSON output', path: '/docs/cli/analyze', hash: '#json-output' },
        ]
      },
      {
        label: 'packsafe search',
        path: '/docs/cli/search',
        items: [
          { label: 'Synopsis', path: '/docs/cli/search', hash: '#synopsis' },
          { label: 'Flags', path: '/docs/cli/search', hash: '#flags' },
          { label: 'Examples', path: '/docs/cli/search', hash: '#examples' },
        ]
      },
      {
        label: 'packsafe hook',
        path: '/docs/cli/hook',
        items: [
          { label: 'Synopsis', path: '/docs/cli/hook', hash: '#synopsis' },
          { label: 'Installing', path: '/docs/cli/hook', hash: '#install' },
          { label: 'Flags', path: '/docs/cli/hook', hash: '#flags' },
        ]
      },
    ],
  },
  {
    section: 'API Reference',
    items: [
      {
        label: 'Authentication',
        path: '/docs/api/auth',
        items: [
          { label: 'Obtaining a token', path: '/docs/api/auth', hash: '#obtaining-a-token' },
          { label: 'Using the token', path: '/docs/api/auth', hash: '#using-the-token' },
          { label: 'Token types', path: '/docs/api/auth', hash: '#token-types' },
          { label: 'Error responses', path: '/docs/api/auth', hash: '#errors' },
        ]
      },
      {
        label: 'Analyze endpoint',
        path: '/docs/api/analyze',
        items: [
          { label: 'Single package', path: '/docs/api/analyze', hash: '#single' },
          { label: 'Batch analysis', path: '/docs/api/analyze', hash: '#batch' },
        ]
      },
      {
        label: 'Search endpoint',
        path: '/docs/api/search',
        items: [
          { label: 'Query parameters', path: '/docs/api/search', hash: '#query-parameters' },
          { label: 'Response', path: '/docs/api/search', hash: '#response' },
        ]
      },
    ],
  },
  {
    section: 'Configuration',
    items: [
      {
        label: 'Config file',
        path: '/docs/configuration',
        items: [
          { label: 'Location', path: '/docs/configuration', hash: '#config-file' },
          { label: 'Full schema', path: '/docs/configuration', hash: '#full-schema' },
          { label: 'Thresholds', path: '/docs/configuration', hash: '#thresholds' },
          { label: 'Allowlist & Blocklist', path: '/docs/configuration', hash: '#allowlist-blocklist' },
          { label: 'Environment variables', path: '/docs/configuration', hash: '#environment-variables' },
          { label: 'Signal weights', path: '/docs/configuration', hash: '#signal-weights' },
          { label: 'Validating config', path: '/docs/configuration', hash: '#validate' },
        ]
      }
    ],
  },
  {
    section: 'Integrations',
    items: [
      {
        label: 'GitHub Actions & CI/CD',
        path: '/docs/integrations',
        items: [
          { label: 'GitHub Actions', path: '/docs/integrations', hash: '#github-actions' },
          { label: 'pre-commit framework', path: '/docs/integrations', hash: '#pre-commit' },
          { label: 'VS Code extension', path: '/docs/integrations', hash: '#vs-code' },
          { label: 'GitLab CI', path: '/docs/integrations', hash: '#gitlab' },
          { label: 'Docker builds', path: '/docs/integrations', hash: '#docker' },
        ]
      }
    ],
  },
]
