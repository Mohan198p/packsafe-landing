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
          { label: 'Recommended: uv tool', path: '/docs/installation', hash: '#uv-tool' },
          { label: 'Alternative: pipx', path: '/docs/installation', hash: '#pipx' },
          { label: 'One-off: uvx', path: '/docs/installation', hash: '#uvx' },
          { label: 'With pip into existing env', path: '/docs/installation', hash: '#pip' },
          { label: 'Upgrade & uninstall', path: '/docs/installation', hash: '#upgrade-uninstall' },
          { label: 'First run with init', path: '/docs/installation', hash: '#first-run' },
        ]
      },
      { 
        label: 'Quick start', 
        path: '/docs/quickstart',
        items: [
          { label: 'First run with init', path: '/docs/quickstart', hash: '#first-run' },
          { label: 'Analyze before installing', path: '/docs/quickstart', hash: '#analyze-before-install' },
          { label: 'What a blocked install looks like', path: '/docs/quickstart', hash: '#blocking-scenario' },
          { label: 'Inspect raw evidence', path: '/docs/quickstart', hash: '#inspect-evidence' },
          { label: 'Safe install with uv or pip', path: '/docs/quickstart', hash: '#safe-install' },
          { label: 'Score interpretation', path: '/docs/quickstart', hash: '#reading-output' },
          { label: 'Next steps', path: '/docs/quickstart', hash: '#next-steps' },
        ]
      },
    ],
  },
  {
    section: 'CLI Reference',
    items: [
      {
        label: 'Overview & Global Options',
        path: '/docs/cli',
        items: [
          { label: 'What PackSafe is', path: '/docs/cli', hash: '#what-packsafe-is' },
          { label: 'Prerequisites', path: '/docs/cli', hash: '#prerequisites' },
          { label: 'Global options', path: '/docs/cli', hash: '#global-options' },
          { label: 'A note on --version', path: '/docs/cli', hash: '#note-on-version' },
          { label: 'Shell completion', path: '/docs/cli', hash: '#shell-completion' },
          { label: 'Commands at a glance', path: '/docs/cli', hash: '#commands-at-a-glance' },
          { label: 'Evidence sources', path: '/docs/cli', hash: '#evidence-sources' },
          { label: 'Score categories & weights', path: '/docs/cli', hash: '#score-categories' },
          { label: 'Policy gates', path: '/docs/cli', hash: '#policy-gates' },
        ]
      },
      {
        label: 'packsafe init',
        path: '/docs/cli/init',
        items: [
          { label: 'Synopsis', path: '/docs/cli/init', hash: '#synopsis' },
          { label: 'What it creates', path: '/docs/cli/init', hash: '#what-it-creates' },
          { label: 'What it prints', path: '/docs/cli/init', hash: '#what-it-prints' },
          { label: 'Notes', path: '/docs/cli/init', hash: '#notes' },
        ]
      },
      {
        label: 'packsafe analyze',
        path: '/docs/cli/analyze',
        items: [
          { label: 'Synopsis', path: '/docs/cli/analyze', hash: '#synopsis' },
          { label: 'Options', path: '/docs/cli/analyze', hash: '#options' },
          { label: 'Examples', path: '/docs/cli/analyze', hash: '#examples' },
          { label: 'Output structure', path: '/docs/cli/analyze', hash: '#output-structure' },
          { label: 'Score and risk bands', path: '/docs/cli/analyze', hash: '#score-bands' },
          { label: '--all versus default', path: '/docs/cli/analyze', hash: '#all-flag' },
        ]
      },
      {
        label: 'packsafe inspect',
        path: '/docs/cli/inspect',
        items: [
          { label: 'Synopsis', path: '/docs/cli/inspect', hash: '#synopsis' },
          { label: 'Options', path: '/docs/cli/inspect', hash: '#options' },
          { label: 'Examples', path: '/docs/cli/inspect', hash: '#examples' },
          { label: 'Output sections', path: '/docs/cli/inspect', hash: '#output-sections' },
          { label: 'Bounds', path: '/docs/cli/inspect', hash: '#bounds' },
          { label: 'Why the split matters', path: '/docs/cli/inspect', hash: '#split-matters' },
        ]
      },
      {
        label: 'packsafe install',
        path: '/docs/cli/install',
        items: [
          { label: 'Synopsis', path: '/docs/cli/install', hash: '#synopsis' },
          { label: 'Options', path: '/docs/cli/install', hash: '#options' },
          { label: 'Examples', path: '/docs/cli/install', hash: '#examples' },
          { label: 'How the gate behaves', path: '/docs/cli/install', hash: '#gate-behavior' },
          { label: 'The confirmation prompt', path: '/docs/cli/install', hash: '#confirmation-prompt' },
          { label: 'Where an install lands', path: '/docs/cli/install', hash: '#install-target' },
          { label: 'What command actually runs', path: '/docs/cli/install', hash: '#execution-details' },
          { label: '--add flag', path: '/docs/cli/install', hash: '#add-flag' },
          { label: 'Unknown flags forwarded', path: '/docs/cli/install', hash: '#forwarded-flags' },
        ]
      },
      {
        label: 'packsafe audit',
        path: '/docs/cli/audit',
        items: [
          { label: 'Synopsis', path: '/docs/cli/audit', hash: '#synopsis' },
          { label: 'Status & Implementation', path: '/docs/cli/audit', hash: '#status' },
        ]
      },
      {
        label: 'Exit codes',
        path: '/docs/cli/exit-codes',
        items: [
          { label: 'Exit codes contract', path: '/docs/cli/exit-codes', hash: '#exit-codes-table' },
          { label: 'Using exit codes in CI', path: '/docs/cli/exit-codes', hash: '#ci-usage' },
        ]
      },
      {
        label: 'Troubleshooting',
        path: '/docs/cli/troubleshooting',
        items: [
          { label: 'Common errors & solutions', path: '/docs/cli/troubleshooting', hash: '#errors' },
          { label: 'Limitations', path: '/docs/cli/troubleshooting', hash: '#limitations' },
          { label: 'Building from source', path: '/docs/cli/troubleshooting', hash: '#building-from-source' },
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
        label: 'Configuration & Logging',
        path: '/docs/configuration',
        items: [
          { label: 'Config file (~/.packsafe/config.toml)', path: '/docs/configuration', hash: '#config-file' },
          { label: 'Logging configuration', path: '/docs/configuration', hash: '#logging' },
          { label: 'Environment variables', path: '/docs/configuration', hash: '#environment-variables' },
          { label: 'Reproducibility & Config digest', path: '/docs/configuration', hash: '#reproducibility' },
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
