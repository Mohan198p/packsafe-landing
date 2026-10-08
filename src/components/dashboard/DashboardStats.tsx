import { DashboardStatistics } from '../../types'

interface DashboardStatsProps {
  stats: DashboardStatistics
  loading?: boolean
}

export default function DashboardStats({ stats, loading = false }: DashboardStatsProps) {
  const statItems = [
    {
      id: 'total',
      label: 'PACKAGES',
      sublabel: 'Monitored in ecosystem',
      value: stats.totalPackages,
      color: 'var(--text-primary)',
      accent: 'var(--border-strong)',
      badge: 'Total',
    },
    {
      id: 'safe',
      label: 'SAFE',
      sublabel: 'Acceptable security signals',
      value: stats.safePackages,
      color: 'var(--status-safe)',
      accent: 'var(--status-safe-border)',
      badge: `${Math.round((stats.safePackages / (stats.totalPackages || 1)) * 100)}%`,
    },
    {
      id: 'unsafe',
      label: 'UNSAFE',
      sublabel: 'Require immediate triage',
      value: stats.unsafePackages,
      color: 'var(--status-danger)',
      accent: 'var(--status-danger-border)',
      badge: 'Action Needed',
    },
    {
      id: 'avg',
      label: 'AVG SCORE',
      sublabel: 'Mean safety benchmark',
      value: `${stats.averageScore}/100`,
      color:
        stats.averageScore >= 80
          ? 'var(--status-safe)'
          : stats.averageScore >= 60
          ? 'var(--status-warn)'
          : 'var(--status-danger)',
      accent: 'var(--border-strong)',
      badge: stats.averageScore >= 80 ? 'Optimal' : 'Caution',
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 my-8">
      {statItems.map(item => (
        <div
          key={item.id}
          className="relative p-4 md:p-5 flex flex-col justify-between transition-all duration-200"
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <span
              className="text-[11px] font-mono tracking-widest uppercase font-semibold"
              style={{ color: 'var(--text-muted)' }}
            >
              {item.label}
            </span>
            <span
              className="text-[10px] font-mono px-1.5 py-0.5"
              style={{
                backgroundColor: 'var(--bg-card-subtle)',
                color: item.color,
                border: `1px solid ${item.accent}`,
              }}
            >
              {item.badge}
            </span>
          </div>

          <div className="my-1">
            {loading ? (
              <div
                className="h-8 w-16 animate-pulse rounded-xs"
                style={{ backgroundColor: 'var(--bg-card-subtle)' }}
              />
            ) : (
              <div
                className="text-2xl md:text-3xl font-mono font-bold tracking-tight"
                style={{ color: item.color }}
              >
                {item.value}
              </div>
            )}
          </div>

          <div
            className="text-[11px] mt-1.5 font-mono truncate"
            style={{ color: 'var(--text-subtle)' }}
            title={item.sublabel}
          >
            {item.sublabel}
          </div>
        </div>
      ))}
    </div>
  )
}
