import { useNavigate } from 'react-router'
import { Package } from '../../types'
import PackageStatusBadge from './PackageStatusBadge'

interface DependencyListProps {
  pkg: Package
}

export default function DependencyList({ pkg }: DependencyListProps) {
  const navigate = useNavigate()

  const handleNavigateDep = (depName: string) => {
    navigate(`/analyze/${encodeURIComponent(depName)}`)
  }

  const directDeps = pkg.directDependencies || []
  const transitiveDeps = pkg.transitiveDependencies || []

  return (
    <div
      className="p-6 md:p-8 transition-all duration-200"
      style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
      }}
    >
      <div className="border-b pb-4 mb-6 flex items-center justify-between" style={{ borderColor: 'var(--border-subtle)' }}>
        <div>
          <span className="text-[10px] font-mono tracking-widest uppercase font-semibold" style={{ color: 'var(--accent-orange)' }}>
            SUPPLY CHAIN GRAPH
          </span>
          <h3 className="text-lg font-mono font-bold" style={{ color: 'var(--text-primary)' }}>
            Dependencies Analysis
          </h3>
        </div>
        <span
          className="text-xs font-mono px-2 py-1"
          style={{
            backgroundColor: 'var(--bg-card-subtle)',
            color: 'var(--text-secondary)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          {directDeps.length} Direct • {transitiveDeps.length} Transitive
        </span>
      </div>

      {/* Direct Dependencies */}
      <div className="mb-6">
        <h4 className="text-xs font-mono uppercase tracking-wider mb-3 font-semibold" style={{ color: 'var(--text-muted)' }}>
          Direct Dependencies ({directDeps.length})
        </h4>

        {directDeps.length > 0 ? (
          <div className="divide-y border" style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-card-subtle)' }}>
            {directDeps.map(dep => (
              <div
                key={dep.name}
                onClick={() => handleNavigateDep(dep.name)}
                className="p-3.5 flex items-center justify-between cursor-pointer transition-colors duration-150 hover:bg-[var(--bg-hover)] group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm font-mono font-semibold group-hover:text-[var(--accent-orange)] transition-colors" style={{ color: 'var(--text-primary)' }}>
                    {dep.name}
                  </span>
                  <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
                    v{dep.version}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="hidden sm:flex items-center gap-1.5 font-mono text-xs" style={{ color: 'var(--text-secondary)' }}>
                    <span>Score:</span>
                    <span className="font-semibold" style={{ color: dep.score >= 90 ? 'var(--status-safe)' : 'var(--status-warn)' }}>
                      {dep.score}
                    </span>
                  </div>
                  <PackageStatusBadge risk={dep.risk} size="sm" />
                  <span className="text-xs font-mono text-[var(--accent-orange)] group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="p-6 text-center border font-mono text-xs"
            style={{
              backgroundColor: 'var(--bg-card-subtle)',
              borderColor: 'var(--border-subtle)',
              color: 'var(--text-muted)',
            }}
          >
            ✓ Zero external direct dependencies declared. Minimal attack surface.
          </div>
        )}
      </div>

      {/* Transitive Dependencies */}
      {transitiveDeps.length > 0 && (
        <div>
          <h4 className="text-xs font-mono uppercase tracking-wider mb-3 font-semibold" style={{ color: 'var(--text-muted)' }}>
            Transitive Dependencies ({transitiveDeps.length})
          </h4>
          <div className="divide-y border" style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-card-subtle)' }}>
            {transitiveDeps.map(dep => (
              <div
                key={dep.name}
                onClick={() => handleNavigateDep(dep.name)}
                className="p-3 flex items-center justify-between cursor-pointer transition-colors hover:bg-[var(--bg-hover)] group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono group-hover:text-[var(--accent-orange)] transition-colors" style={{ color: 'var(--text-secondary)' }}>
                    {dep.name}
                  </span>
                  <span className="text-[11px] font-mono" style={{ color: 'var(--text-subtle)' }}>
                    v{dep.version}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <PackageStatusBadge risk={dep.risk} size="sm" />
                  <span className="text-xs font-mono text-[var(--accent-orange)]">→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
