import { Package, SignalStatus } from '../../types'

interface SecuritySignalsProps {
  pkg: Package
}

export default function SecuritySignals({ pkg }: SecuritySignalsProps) {
  const getStatusBadge = (status: SignalStatus, value?: string) => {
    switch (status) {
      case 'pass':
        return (
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-mono font-medium rounded-xs border"
            style={{
              backgroundColor: 'var(--status-safe-bg)',
              color: 'var(--status-safe)',
              borderColor: 'var(--status-safe-border)',
            }}
          >
            <span>✓</span>
            <span>{value || 'PASSED'}</span>
          </span>
        )
      case 'warn':
        return (
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-mono font-medium rounded-xs border"
            style={{
              backgroundColor: 'var(--status-warn-bg)',
              color: 'var(--status-warn)',
              borderColor: 'var(--status-warn-border)',
            }}
          >
            <span>⚡</span>
            <span>{value || 'WARNING'}</span>
          </span>
        )
      case 'fail':
        return (
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-mono font-medium rounded-xs border"
            style={{
              backgroundColor: 'var(--status-danger-bg)',
              color: 'var(--status-danger)',
              borderColor: 'var(--status-danger-border)',
            }}
          >
            <span>⚠</span>
            <span>{value || 'FAILED'}</span>
          </span>
        )
      default:
        return (
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-mono font-medium rounded-xs border"
            style={{
              backgroundColor: 'var(--bg-card-subtle)',
              color: 'var(--text-secondary)',
              borderColor: 'var(--border-subtle)',
            }}
          >
            <span>ℹ</span>
            <span>{value || 'INFO'}</span>
          </span>
        )
    }
  }

  return (
    <div
      className="p-6 md:p-8 transition-all duration-200"
      style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
      }}
    >
      <div className="border-b pb-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2" style={{ borderColor: 'var(--border-subtle)' }}>
        <div>
          <span className="text-[10px] font-mono tracking-widest uppercase font-semibold" style={{ color: 'var(--accent-orange)' }}>
            HEURISTIC CHECKS
          </span>
          <h3 className="text-lg font-mono font-bold" style={{ color: 'var(--text-primary)' }}>
            Security Signals & Integrity Audits
          </h3>
        </div>
        <div className="text-xs font-mono px-2 py-1 rounded-xs" style={{ backgroundColor: 'var(--bg-card-subtle)', color: 'var(--text-muted)' }}>
          Modeled PackSafe Heuristics
        </div>
      </div>

      <div className="space-y-3.5">
        {pkg.signals.map(sig => (
          <div
            key={sig.id}
            className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 transition-colors"
            style={{
              backgroundColor: 'var(--bg-card-subtle)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {sig.name}
                </span>
              </div>
              <p className="text-xs font-mono mt-1" style={{ color: 'var(--text-secondary)' }}>
                {sig.description}
              </p>
            </div>

            <div className="shrink-0">
              {getStatusBadge(sig.status, sig.value)}
            </div>
          </div>
        ))}
      </div>

      <div
        className="mt-6 p-4 border text-xs font-mono"
        style={{
          backgroundColor: 'var(--bg-card-subtle)',
          borderColor: 'var(--border-subtle)',
          color: 'var(--text-muted)',
        }}
      >
        <span className="font-semibold" style={{ color: 'var(--accent-orange)' }}>
          Note for developers:
        </span>{' '}
        PackSafe evaluates static AST parsing, registry identity, Levenshtein distance against known packages, and install script sandbox logs to construct security signals.
      </div>
    </div>
  )
}
