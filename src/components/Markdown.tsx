import type { ReactNode } from 'react'

// ─── Base prose wrapper ───────────────────────────────────────────────────────

export function Prose({ children }: { children: ReactNode }) {
  return (
    <div
      className="max-w-[720px]"
      style={{ color: '#f0ede8' }}
    >
      {children}
    </div>
  )
}

// ─── Headings ────────────────────────────────────────────────────────────────

export function H1({ children }: { children: ReactNode }) {
  return (
    <h1
      style={{
        fontFamily: 'Barlow Condensed, sans-serif',
        fontSize: 'clamp(40px, 5vw, 64px)',
        fontWeight: 900,
        lineHeight: 0.95,
        letterSpacing: '-0.02em',
        color: '#f0ede8',
        marginBottom: '20px',
        marginTop: '0',
      }}
    >
      {children}
    </h1>
  )
}

export function H2({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <h2
      id={id}
      style={{
        fontFamily: 'Barlow Condensed, sans-serif',
        fontSize: '32px',
        fontWeight: 800,
        lineHeight: 1,
        letterSpacing: '-0.015em',
        color: '#f0ede8',
        marginTop: '56px',
        marginBottom: '16px',
        paddingTop: '56px',
        borderTop: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {children}
    </h2>
  )
}

export function H3({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <h3
      id={id}
      style={{
        fontFamily: 'Barlow Condensed, sans-serif',
        fontSize: '22px',
        fontWeight: 700,
        lineHeight: 1.1,
        letterSpacing: '-0.01em',
        color: '#f0ede8',
        marginTop: '36px',
        marginBottom: '10px',
      }}
    >
      {children}
    </h3>
  )
}

// ─── Paragraph ───────────────────────────────────────────────────────────────

export function P({ children }: { children: ReactNode }) {
  return (
    <p
      style={{
        fontSize: '14px',
        lineHeight: 1.75,
        color: 'rgba(240,237,232,0.65)',
        marginBottom: '16px',
      }}
    >
      {children}
    </p>
  )
}

// ─── Lead paragraph ───────────────────────────────────────────────────────────

export function Lead({ children }: { children: ReactNode }) {
  return (
    <p
      style={{
        fontSize: '16px',
        lineHeight: 1.65,
        color: 'rgba(240,237,232,0.55)',
        marginBottom: '32px',
        maxWidth: '600px',
      }}
    >
      {children}
    </p>
  )
}

// ─── Inline code ─────────────────────────────────────────────────────────────

export function Code({ children }: { children: ReactNode }) {
  return (
    <code
      style={{
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '12px',
        color: '#ff3a00',
        background: 'rgba(255,58,0,0.08)',
        border: '1px solid rgba(255,58,0,0.15)',
        padding: '1px 6px',
        borderRadius: '2px',
      }}
    >
      {children}
    </code>
  )
}

// ─── Code block ──────────────────────────────────────────────────────────────

interface CodeBlockProps {
  children: string
  lang?: string
  title?: string
}

export function CodeBlock({ children, lang = 'bash', title }: CodeBlockProps) {
  return (
    <div
      style={{
        border: '1px solid rgba(255,255,255,0.08)',
        background: '#0a0f0a',
        marginBottom: '24px',
        marginTop: '8px',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 16px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          background: '#0d120d',
        }}
      >
        <div style={{ display: 'flex', gap: '6px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(255,58,0,0.5)' }} />
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(255,170,0,0.35)' }} />
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(0,204,85,0.35)' }} />
        </div>
        <span
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '10px',
            color: '#3a3a3a',
            letterSpacing: '0.1em',
          }}
        >
          {title || lang.toUpperCase()}
        </span>
        <div style={{ width: '48px' }} />
      </div>

      {/* Code content */}
      <pre
        style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '12.5px',
          lineHeight: 1.75,
          color: '#c8c8c8',
          padding: '20px',
          margin: 0,
          overflowX: 'auto',
          whiteSpace: 'pre',
        }}
      >
        <code>{children.trim()}</code>
      </pre>
    </div>
  )
}

// ─── Callout ─────────────────────────────────────────────────────────────────

type CalloutType = 'note' | 'warning' | 'tip' | 'danger'

const calloutConfig: Record<CalloutType, { label: string; color: string; bg: string; border: string }> = {
  note: { label: 'NOTE', color: '#7eb8f7', bg: 'rgba(126,184,247,0.06)', border: 'rgba(126,184,247,0.2)' },
  tip: { label: 'TIP', color: '#00cc55', bg: 'rgba(0,204,85,0.06)', border: 'rgba(0,204,85,0.2)' },
  warning: { label: 'WARNING', color: '#ffaa00', bg: 'rgba(255,170,0,0.06)', border: 'rgba(255,170,0,0.2)' },
  danger: { label: 'DANGER', color: '#ff3a00', bg: 'rgba(255,58,0,0.06)', border: 'rgba(255,58,0,0.2)' },
}

export function Callout({ type = 'note', children }: { type?: CalloutType; children: ReactNode }) {
  const cfg = calloutConfig[type]
  return (
    <div
      style={{
        width: 'fit-content',
        background: cfg.bg,
        border: `1px solid ${cfg.border}`,
        borderLeft: `2px solid ${cfg.color}`,
        padding: '14px 18px',
        marginBottom: '20px',
        marginTop: '8px',
      }}
    >
      <span
        style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '10px',
          color: cfg.color,
          letterSpacing: '0.12em',
          display: 'block',
          marginBottom: '6px',
        }}
      >
        {cfg.label}
      </span>
      <div style={{ fontSize: '13px', color: 'rgba(240,237,232,0.65)', lineHeight: 1.65 }}>
        {children}
      </div>
    </div>
  )
}

// ─── Lists ───────────────────────────────────────────────────────────────────

export function UL({ children }: { children: ReactNode }) {
  return (
    <ul style={{ marginBottom: '16px', paddingLeft: '0', listStyle: 'none' }}>
      {children}
    </ul>
  )
}

export function OL({ children }: { children: ReactNode }) {
  return (
    <ol style={{ marginBottom: '16px', paddingLeft: '0', listStyle: 'none', counterReset: 'md-ol' }}>
      {children}
    </ol>
  )
}

export function LI({ children, ordered }: { children: ReactNode; ordered?: boolean }) {
  return (
    <li
      style={{
        display: 'flex',
        gap: '10px',
        fontSize: '14px',
        color: 'rgba(240,237,232,0.65)',
        lineHeight: 1.7,
        marginBottom: '6px',
        paddingLeft: '0',
      }}
    >
      <span
        style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '10px',
          color: '#ff3a00',
          marginTop: '5px',
          flexShrink: 0,
        }}
      >
        {ordered ? '→' : '·'}
      </span>
      <span>{children}</span>
    </li>
  )
}

// ─── Divider ─────────────────────────────────────────────────────────────────

export function Hr() {
  return (
    <hr
      style={{
        border: 'none',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        margin: '40px 0',
      }}
    />
  )
}

// ─── Table ───────────────────────────────────────────────────────────────────

export function Table({ children }: { children: ReactNode }) {
  return (
    <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '12px',
        }}
      >
        {children}
      </table>
    </div>
  )
}

export function THead({ children }: { children: ReactNode }) {
  return (
    <thead style={{ borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
      {children}
    </thead>
  )
}

export function TBody({ children }: { children: ReactNode }) {
  return <tbody>{children}</tbody>
}

export function TR({ children }: { children: ReactNode }) {
  return (
    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      {children}
    </tr>
  )
}

export function TH({ children }: { children: ReactNode }) {
  return (
    <th
      style={{
        padding: '10px 14px',
        textAlign: 'left',
        color: 'rgba(240,237,232,0.35)',
        letterSpacing: '0.08em',
        fontSize: '10px',
        fontWeight: 500,
      }}
    >
      {children}
    </th>
  )
}

export function TD({ children }: { children: ReactNode }) {
  return (
    <td
      style={{
        padding: '10px 14px',
        color: 'rgba(240,237,232,0.65)',
        verticalAlign: 'top',
      }}
    >
      {children}
    </td>
  )
}

// ─── Badge ────────────────────────────────────────────────────────────────────

type BadgeVariant = 'default' | 'green' | 'amber' | 'red' | 'blue'

const badgeColors: Record<BadgeVariant, { bg: string; color: string; border: string }> = {
  default: { bg: 'rgba(255,255,255,0.06)', color: 'rgba(240,237,232,0.5)', border: 'rgba(255,255,255,0.1)' },
  green: { bg: 'rgba(0,204,85,0.08)', color: '#00cc55', border: 'rgba(0,204,85,0.2)' },
  amber: { bg: 'rgba(255,170,0,0.08)', color: '#ffaa00', border: 'rgba(255,170,0,0.2)' },
  red: { bg: 'rgba(255,58,0,0.08)', color: '#ff3a00', border: 'rgba(255,58,0,0.2)' },
  blue: { bg: 'rgba(126,184,247,0.08)', color: '#7eb8f7', border: 'rgba(126,184,247,0.2)' },
}

export function Badge({ children, variant = 'default' }: { children: ReactNode; variant?: BadgeVariant }) {
  const cfg = badgeColors[variant]
  return (
    <span
      style={{
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '10px',
        letterSpacing: '0.08em',
        padding: '2px 8px',
        background: cfg.bg,
        color: cfg.color,
        border: `1px solid ${cfg.border}`,
        display: 'inline-block',
        verticalAlign: 'middle',
      }}
    >
      {children}
    </span>
  )
}

// ─── Section label ────────────────────────────────────────────────────────────

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p
      style={{
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '10px',
        color: '#ff3a00',
        letterSpacing: '0.14em',
        marginBottom: '12px',
        marginTop: '0',
      }}
    >
      {children}
    </p>
  )
}

// ─── Flag row (for CLI docs) ──────────────────────────────────────────────────

export function FlagRow({
  flag,
  type,
  defaultVal,
  children,
}: {
  flag: string
  type?: string
  defaultVal?: string
  children: ReactNode
}) {
  return (
    <div
      style={{
        padding: '14px 16px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'grid',
        gridTemplateColumns: '200px 1fr',
        gap: '16px',
        alignItems: 'start',
      }}
    >
      <div>
        <Code>{flag}</Code>
        {type && (
          <span
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '10px',
              color: '#4a4a4a',
              display: 'block',
              marginTop: '4px',
            }}
          >
            {type}
            {defaultVal ? ` · default: ${defaultVal}` : ''}
          </span>
        )}
      </div>
      <p style={{ fontSize: '13px', color: 'rgba(240,237,232,0.55)', lineHeight: 1.65, margin: 0 }}>
        {children}
      </p>
    </div>
  )
}
