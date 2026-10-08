import { PackageRisk } from '../../types'

interface PackageStatusBadgeProps {
  risk: PackageRisk
  size?: 'sm' | 'md' | 'lg'
}

export default function PackageStatusBadge({ risk, size = 'sm' }: PackageStatusBadgeProps) {
  const config = {
    low: {
      label: 'LOW',
      icon: '✓',
      subtext: 'Safe',
      styles: {
        color: 'var(--status-safe)',
        backgroundColor: 'var(--status-safe-bg)',
        borderColor: 'var(--status-safe-border)',
      },
    },
    medium: {
      label: 'MEDIUM',
      icon: '⚡',
      subtext: 'Warning',
      styles: {
        color: 'var(--status-warn)',
        backgroundColor: 'var(--status-warn-bg)',
        borderColor: 'var(--status-warn-border)',
      },
    },
    high: {
      label: 'HIGH',
      icon: '⚠',
      subtext: 'Danger',
      styles: {
        color: 'var(--status-danger)',
        backgroundColor: 'var(--status-danger-bg)',
        borderColor: 'var(--status-danger-border)',
      },
    },
    critical: {
      label: 'CRITICAL',
      icon: '🚨',
      subtext: 'Critical',
      styles: {
        color: 'var(--status-critical)',
        backgroundColor: 'var(--status-critical-bg)',
        borderColor: 'var(--status-critical-border)',
      },
    },
  }[risk] || {
    label: risk.toUpperCase(),
    icon: '•',
    subtext: '',
    styles: {
      color: 'var(--text-muted)',
      backgroundColor: 'var(--bg-hover)',
      borderColor: 'var(--border-color)',
    },
  }

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 gap-1.5',
    md: 'text-xs px-2.5 py-1 gap-2',
    lg: 'text-sm px-3.5 py-1.5 gap-2.5',
  }[size]

  return (
    <span
      className={`inline-flex items-center font-mono font-medium rounded-xs border tracking-wider select-none ${sizeClasses}`}
      style={config.styles}
      title={`Risk Level: ${config.label} (${config.subtext})`}
      aria-label={`Risk level ${config.label}`}
    >
      <span className="text-[0.9em]" aria-hidden="true">{config.icon}</span>
      <span>{config.label}</span>
    </span>
  )
}
