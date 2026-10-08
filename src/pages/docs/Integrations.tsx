import {
  Prose, H1, H2, H3, P, Lead, Code, CodeBlock, Callout, UL, LI, SectionLabel, Badge, Hr,
} from '@/components/Markdown'

export default function Integrations() {
  return (
    <Prose>
      <SectionLabel>INTEGRATIONS</SectionLabel>
      <H1>CI/CD & Pipelines</H1>
      <Lead>
        Integrate PackSafe into your automated workflows. Because exit codes are a strict contract,
        your pipeline can reliably distinguish between an unsafe dependency and an environmental or network failure.
      </Lead>

      <H2 id="github-actions">GitHub Actions</H2>
      <H3>Basic workflow with uv</H3>
      <P>
        Install PackSafe using <Code>uv</Code> and gate dependency additions before merge. A package that violates policy exits with code <Code>4</Code>, stopping the pipeline:
      </P>
      <CodeBlock lang="yaml" title=".github/workflows/packsafe.yml">
{`name: Dependency Security Gate

on:
  pull_request:
    paths:
      - 'pyproject.toml'
      - 'uv.lock'
      - 'requirements*.txt'

jobs:
  gate:
    name: Evaluate Dependencies
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Install uv
        uses: astral-sh/setup-uv@v4
        with:
          enable-cache: true

      - name: Set up Python
        run: uv python install 3.12

      - name: Install PackSafe
        run: uv tool install packsafe

      - name: Verify dependency installation
        run: |
          # Gate with a strict minimum score and non-interactive acceptance of warnings
          packsafe install --uv requests --min-score 70 --yes`}
      </CodeBlock>

      <Callout type="tip">
        Because PackSafe exits with code <Code>4</Code> on a policy block and <Code>2</Code> on a network error,
        CI jobs can differentiate between an intentional security refusal and transient network issues.
      </Callout>

      <H2 id="gitlab">GitLab CI</H2>
      <CodeBlock lang="yaml" title=".gitlab-ci.yml">
{`packsafe_security_gate:
  stage: test
  image: python:3.12-slim
  before_script:
    - pip install uv
    - uv tool install packsafe
    - export PATH="$HOME/.local/bin:$PATH"
    - uv venv .venv
  script:
    - packsafe install --uv requests --min-score 70 --yes
  rules:
    - changes:
        - pyproject.toml
        - requirements.txt`}
      </CodeBlock>

      <H2 id="docker">Docker builds</H2>
      <P>
        Run PackSafe analysis as a guarded build stage before running package installation inside container environments:
      </P>
      <CodeBlock lang="dockerfile" title="Dockerfile">
{`FROM python:3.12-slim AS builder

# Install uv and packsafe
RUN pip install --no-cache-dir uv && \\
    uv tool install packsafe

ENV PATH="/root/.local/bin:$PATH"
WORKDIR /app

# Create virtualenv and gate install
RUN uv venv .venv
RUN packsafe install --uv requests --min-score 70 --yes

FROM python:3.12-slim AS runtime
WORKDIR /app
COPY --from=builder /app/.venv /app/.venv
ENV PATH="/app/.venv/bin:$PATH"
CMD ["python", "-m", "app"]`}
      </CodeBlock>

      <H2 id="pre-commit">pre-commit framework</H2>
      <P>
        Run PackSafe analyze as a local hook to verify dependencies before committing:
      </P>
      <CodeBlock lang="yaml" title=".pre-commit-config.yaml">
{`repos:
  - repo: local
    hooks:
      - id: packsafe-check
        name: PackSafe dependency check
        entry: packsafe analyze
        language: system
        pass_filenames: false
        always_run: true`}
      </CodeBlock>

      <Hr />

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px' }}>
        <Badge variant="green">GitHub Actions</Badge>
        <Badge>GitLab CI</Badge>
        <Badge>Docker</Badge>
        <Badge variant="blue">pre-commit</Badge>
        <Badge>Exit Code 4</Badge>
      </div>
    </Prose>
  )
}
