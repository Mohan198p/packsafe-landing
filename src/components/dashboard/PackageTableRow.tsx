import { useNavigate } from 'react-router'
import { Package } from '../../types'
import PackageStatusBadge from './PackageStatusBadge'

interface PackageTableRowProps {
  pkg: Package
  type: 'safe' | 'unsafe'
}

export default function PackageTableRow({ pkg, type }: PackageTableRowProps) {
  const navigate = useNavigate()

  const handleRowClick = () => {
    navigate(`/analyze/${encodeURIComponent(pkg.name)}`)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleRowClick()
    }
  }

  const scoreColor =
    pkg.score >= 90
      ? 'var(--status-safe)'
      : pkg.score >= 70
      ? 'var(--status-warn)'
      : 'var(--status-danger)'

  return (
    <tr
      onClick={handleRowClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="row"
      className="group cursor-pointer transition-colors duration-150 focus:outline-none focus:bg-[var(--bg-hover)]"
      style={{
        borderBottom: '1px solid var(--border-subtle)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.backgroundColor = 'var(--table-row-hover)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.backgroundColor = 'transparent'
      }}
    >
      {/* Package Name & Desc */}
      <td className="py-3.5 px-4 text-left">
        <div className="flex items-center gap-2.5">
          <span
            className="font-mono font-semibold text-sm group-hover:text-[var(--accent-orange)] transition-colors"
            style={{ color: 'var(--text-primary)' }}
          >
            {pkg.name}
          </span>
          <span
            className="text-[10px] font-mono px-1.5 py-0.5 rounded-xs uppercase tracking-wider"
            style={{
              background: 'var(--bg-card-subtle)',
              color: 'var(--text-muted)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            {pkg.registry}
          </span>
        </div>
        <p
          className="text-xs truncate max-w-[280px] md:max-w-[340px] mt-0.5"
          style={{ color: 'var(--text-muted)' }}
          title={pkg.description}
        >
          {pkg.description}
        </p>
      </td>

      {/* Version */}
      <td className="py-3.5 px-4 text-left font-mono text-xs whitespace-nowrap" style={{ color: 'var(--text-secondary)' }}>
        v{pkg.version}
      </td>

      {/* Safety Score */}
      <td className="py-3.5 px-4 text-left whitespace-nowrap">
        <div className="flex items-center gap-2">
          <span
            className="font-mono text-sm font-semibold"
            style={{ color: scoreColor }}
          >
            {pkg.score}
          </span>
          <span className="text-[10px] font-mono" style={{ color: 'var(--text-subtle)' }}>
            /100
          </span>
        </div>
      </td>

      {/* Risk Badge */}
      <td className="py-3.5 px-4 text-left whitespace-nowrap">
        <PackageStatusBadge risk={pkg.risk} />
      </td>

      {/* Contextual Column: Reason for unsafe, Last Updated for safe */}
      {type === 'unsafe' ? (
        <td className="py-3.5 px-4 text-left text-xs max-w-[240px]">
          <span
            className="line-clamp-1 font-mono text-[11px]"
            style={{ color: 'var(--status-danger)' }}
            title={pkg.reason}
          >
            {pkg.reason || 'Flagged security indicators'}
          </span>
        </td>
      ) : (
        <td className="py-3.5 px-4 text-left text-xs font-mono whitespace-nowrap" style={{ color: 'var(--text-muted)' }}>
          {pkg.lastUpdated}
        </td>
      )}

      {/* Dependencies Count */}
      <td className="py-3.5 px-4 text-left font-mono text-xs whitespace-nowrap" style={{ color: 'var(--text-secondary)' }}>
        {pkg.dependenciesCount}
      </td>

      {/* Action */}
      <td className="py-3.5 px-4 text-right whitespace-nowrap">
        <button
          type="button"
          onClick={e => {
            e.stopPropagation()
            handleRowClick()
          }}
          className="inline-flex items-center gap-1 font-mono text-xs font-medium px-2.5 py-1 transition-all group-hover:translate-x-0.5"
          style={{
            background: 'var(--bg-card-subtle)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-color)',
          }}
          aria-label={`Inspect ${pkg.name}`}
        >
          Inspect <span style={{ color: 'var(--accent-orange)' }}>→</span>
        </button>
      </td>
    </tr>
  )
}
