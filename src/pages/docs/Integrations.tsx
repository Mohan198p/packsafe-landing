import {
  Prose, H1, H2, H3, P, Lead, Code, CodeBlock, Callout, UL, LI, SectionLabel, Badge, Hr,
} from '@/components/Markdown'

export default function Integrations() {
  return (
    <Prose>
      <SectionLabel>INTEGRATIONS</SectionLabel>
      <H1>GitHub Actions & CI/CD</H1>
      <Lead>
        Integrate PackSafe into your CI pipeline to block pull requests that introduce
        high-risk dependencies before they reach production.
      </Lead>

      <H2 id="github-actions">GitHub Actions</H2>
      <H3>Basic workflow</H3>
      <P>
        Add PackSafe analysis as a required check on your default branch. The job fails with exit
        code 1 if any dependency in the manifest scores below the block threshold.
      </P>
      <CodeBlock lang="yaml" title=".github/workflows/packsafe.yml">
{`name: PackSafe Security Analysis

on:
  pull_request:
    paths:
      - 'package.json'
      - 'package-lock.json'
      - 'requirements.txt'
      - 'pyproject.toml'

jobs:
  analyze:
    name: Analyze dependencies
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Install PackSafe
        run: npm install -g packsafe@0.9.2

      - name: Analyze manifest
        env:
          PACKSAFE_TOKEN: \${{ secrets.PACKSAFE_TOKEN }}
        run: |
          packsafe analyze \\
            --manifest package.json \\
            --format json \\
            --fail-on block \\
            | tee packsafe-report.json

      - name: Upload report
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: packsafe-report
          path: packsafe-report.json`}
      </CodeBlock>

      <Callout type="tip">
        Add <Code>PACKSAFE_TOKEN</Code> to your repository secrets under{' '}
        <Code>Settings → Secrets and variables → Actions</Code>. The token only needs{' '}
        <Code>analyze:read</Code> scope for CI usage.
      </Callout>

      <H3>PR comment integration</H3>
      <P>
        Use the <Code>packsafe-action</Code> GitHub Action to post a formatted summary directly
        as a pull request comment.
      </P>
      <CodeBlock lang="yaml">
{`- name: PackSafe analysis with PR comment
  uses: packsafe/packsafe-action@v1
  with:
    token: \${{ secrets.PACKSAFE_TOKEN }}
    manifest: package.json
    fail-on: block
    comment: true
    github-token: \${{ secrets.GITHUB_TOKEN }}`}
      </CodeBlock>

      <H2 id="pre-commit">pre-commit framework</H2>
      <P>
        For teams using the <Code>pre-commit</Code> framework, add PackSafe as a hook in your
        <Code>.pre-commit-config.yaml</Code>. This ensures every contributor's commits are scanned
        consistently without requiring individual PackSafe installations.
      </P>
      <CodeBlock lang="yaml" title=".pre-commit-config.yaml">
{`repos:
  - repo: https://github.com/packsafe/pre-commit-hooks
    rev: v0.9.2
    hooks:
      - id: packsafe-check
        name: PackSafe dependency analysis
        language: system
        files: '(package\.json|requirements\.txt|pyproject\.toml)$'
        args:
          - --fail-on=block
          - --format=text`}
      </CodeBlock>
      <CodeBlock lang="bash">
{`# Install the hook
pre-commit install

# Run manually
pre-commit run packsafe-check --all-files`}
      </CodeBlock>

      <H2 id="vs-code">VS Code extension</H2>
      <P>
        The PackSafe VS Code extension provides inline Safety Scores for packages referenced in
        <Code>package.json</Code> and <Code>requirements.txt</Code>. Hover any package name to see
        the full signal breakdown without leaving the editor.
      </P>
      <CodeBlock lang="bash">
{`# Install from the marketplace
code --install-extension packsafe.packsafe-vscode

# Or search "PackSafe" in the Extensions panel`}
      </CodeBlock>
      <UL>
        <LI>Inline score decorations next to each dependency</LI>
        <LI>Hover card with full signal breakdown</LI>
        <LI>Squiggles on WARN and BLOCK level packages</LI>
        <LI>Quick fix: replace with the highest-scoring alternative</LI>
      </UL>

      <H2 id="gitlab">GitLab CI</H2>
      <CodeBlock lang="yaml" title=".gitlab-ci.yml">
{`packsafe:
  stage: test
  image: node:20-alpine
  before_script:
    - npm install -g packsafe@0.9.2
  script:
    - packsafe analyze --manifest package.json --fail-on block
  variables:
    PACKSAFE_TOKEN: \$PACKSAFE_TOKEN
  rules:
    - changes:
        - package.json
        - requirements.txt`}
      </CodeBlock>

      <H2 id="docker">Docker / container builds</H2>
      <P>
        Add PackSafe analysis as a build stage before your dependency installation layer.
        Failed analysis prevents the image from being built.
      </P>
      <CodeBlock lang="dockerfile" title="Dockerfile">
{`FROM node:20-alpine AS analyze
RUN npm install -g packsafe@0.9.2
COPY package.json .
ARG PACKSAFE_TOKEN
ENV PACKSAFE_TOKEN=\${PACKSAFE_TOKEN}
RUN packsafe analyze --manifest package.json --fail-on block

FROM node:20-alpine AS build
COPY --from=analyze package.json .
RUN npm install
COPY . .
RUN npm run build`}
      </CodeBlock>
      <CodeBlock lang="bash">
{`docker build \\
  --build-arg PACKSAFE_TOKEN=$PACKSAFE_TOKEN \\
  -t myapp .`}
      </CodeBlock>

      <Callout type="note">
        Pass the token as a build argument rather than baking it into the image. Build arguments
        are not stored in final image layers.
      </Callout>

      <Hr />

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px' }}>
        <Badge variant="green">GitHub Actions</Badge>
        <Badge>pre-commit</Badge>
        <Badge>GitLab CI</Badge>
        <Badge>Docker</Badge>
        <Badge variant="blue">VS Code</Badge>
      </div>
    </Prose>
  )
}
