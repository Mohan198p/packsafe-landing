import { Package } from '../../types'
import PackageStatusBadge from './PackageStatusBadge'

interface PackageScoreProps {
  pkg: Package
}

export default function PackageScore({ pkg }: PackageScoreProps) {
  const scoreColor =
    pkg.score >= 90
      ? 'var(--status-safe)'
      : pkg.score >= 70
      ? 'var(--status-warn)'
      : 'var(--status-danger)'

  // SVG Circular progress math
  const radius = 64
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (pkg.score / 100) * circumference

  const subScores = [
    { label: 'Package Reputation', score: pkg.reputationScore, desc: 'Community adoption & verified identity' },
    { label: 'Dependency Health', score: pkg.dependencyHealthScore, desc: 'Vulnerability surface of imported graph' },
    { label: 'Maintenance Activity', score: pkg.maintenanceScore, desc: 'Commit frequency, release age & triage' },
    { label: 'Security Signals', score: pkg.securitySignalsScore, desc: 'Runtime heuristics & install script safety' },
  ]

  return (
    <div
      className="p-6 md:p-8 transition-all duration-200"
      style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
      }}
    >
      <div className="flex items-center justify-between mb-6 border-b pb-4" style={{ borderColor: 'var(--border-subtle)' }}>
        <div>
          <span className="text-[10px] font-mono tracking-widest uppercase font-semibold" style={{ color: 'var(--accent-orange)' }}>
            EVALUATION REPORT
          </span>
          <h3 className="text-lg font-mono font-bold" style={{ color: 'var(--text-primary)' }}>
            Safety Score & Signal Breakdown
          </h3>
        </div>
        <PackageStatusBadge risk={pkg.risk} size="md" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Visual Circular Meter */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center p-4">
          <div className="relative w-44 h-44 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
              {/* Background circle */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke="var(--border-strong)"
                strokeWidth="10"
                fill="transparent"
              />
              {/* Animated Progress circle */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke={scoreColor}
                strokeWidth="10"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                style={{
                  transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              />
            </svg>

            {/* Inner Score Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="font-mono text-4xl font-extrabold tracking-tight" style={{ color: scoreColor }}>
                {pkg.score}
              </span>
              <span className="font-mono text-xs tracking-wider" style={{ color: 'var(--text-subtle)' }}>
                / 100
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest mt-1 font-semibold" style={{ color: 'var(--text-muted)' }}>
                SAFETY SCORE
              </span>
            </div>
          </div>

          <div className="mt-4 text-center">
            <div className="font-mono text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>
              Risk Level: <span style={{ color: scoreColor }}>{pkg.risk.toUpperCase()}</span>
            </div>
            <p className="text-[11px] font-mono mt-1 max-w-[200px]" style={{ color: 'var(--text-muted)' }}>
              {pkg.score >= 90
                ? 'Strong confidence. Recommended for enterprise use.'
                : pkg.score >= 70
                ? 'Medium risk. Inspect dependencies before install.'
                : 'High threat detected. Installation not recommended.'}
            </p>
          </div>
        </div>

        {/* Contributing Breakdown Bars */}
        <div className="lg:col-span-8 space-y-5">
          <div className="text-xs font-mono mb-2" style={{ color: 'var(--text-secondary)' }}>
            Primary heuristic factors evaluated by PackSafe intelligence:
          </div>

          {subScores.map(item => {
            const barColor =
              item.score >= 90
                ? 'var(--status-safe)'
                : item.score >= 70
                ? 'var(--status-warn)'
                : 'var(--status-danger)'

            return (
              <div key={item.label} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <div>
                    <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
                      {item.label}
                    </span>
                    <span className="text-[10px] ml-2 hidden sm:inline" style={{ color: 'var(--text-subtle)' }}>
                      • {item.desc}
                    </span>
                  </div>
                  <span className="font-bold font-mono" style={{ color: barColor }}>
                    {item.score}%
                  </span>
                </div>

                <div
                  className="w-full h-2 rounded-xs overflow-hidden"
                  style={{ backgroundColor: 'var(--bg-card-subtle)' }}
                >
                  <div
                    className="h-full rounded-xs transition-all duration-1000 ease-out"
                    style={{
                      width: `${item.score}%`,
                      backgroundColor: barColor,
                    }}
                  />
                </div>
              </div>
            )
          })}

          <div
            className="mt-4 p-3 border text-xs font-mono flex items-start gap-2.5"
            style={{
              backgroundColor: 'var(--bg-card-subtle)',
              borderColor: 'var(--border-subtle)',
              color: 'var(--text-secondary)',
            }}
          >
            <span style={{ color: 'var(--accent-orange)' }}>ℹ</span>
            <span>
              Scores are calculated via static AST inspection, registry attestations, CVE databases, and behavioral sandboxing.
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
