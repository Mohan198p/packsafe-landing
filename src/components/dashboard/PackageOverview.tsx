import { Package } from '../../types'

interface PackageOverviewProps {
  pkg: Package
}

export default function PackageOverview({ pkg }: PackageOverviewProps) {
  const metadataItems = [
    { label: 'Package Name', value: pkg.name, isMono: true, highlight: true },
    { label: 'Version', value: `v${pkg.version}`, isMono: true },
    { label: 'Registry', value: pkg.registry, isMono: true },
    { label: 'License', value: pkg.license, isMono: true },
    { label: 'Maintainer / Author', value: pkg.author },
    { label: 'Active Maintainers', value: `${pkg.maintainersCount} verified`, isMono: true },
    { label: 'Weekly Downloads', value: pkg.downloadsWeekly, isMono: true },
    { label: 'Package Age', value: pkg.packageAge, isMono: true },
    { label: 'Last Updated', value: pkg.lastUpdated, isMono: true },
    { label: 'Vulnerability Record', value: pkg.cveStatus, isMono: false },
    {
      label: 'Repository',
      value: pkg.repository,
      isLink: pkg.repository.startsWith('http'),
      isMono: true,
    },
    {
      label: 'Documentation / Homepage',
      value: pkg.homepage || pkg.repository,
      isLink: Boolean(pkg.homepage?.startsWith('http') || pkg.repository.startsWith('http')),
      isMono: true,
    },
  ]

  return (
    <div
      className="p-6 md:p-8 transition-all duration-200"
      style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
      }}
    >
      <div className="border-b pb-4 mb-6" style={{ borderColor: 'var(--border-subtle)' }}>
        <span className="text-[10px] font-mono tracking-widest uppercase font-semibold" style={{ color: 'var(--accent-orange)' }}>
          PACKAGE METADATA
        </span>
        <h3 className="text-lg font-mono font-bold" style={{ color: 'var(--text-primary)' }}>
          Overview & Provenance
        </h3>
        <p className="text-xs font-mono mt-1" style={{ color: 'var(--text-muted)' }}>
          {pkg.description}
        </p>
      </div>

      {/* Two-column on desktop, stacked on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        {metadataItems.map(item => (
          <div
            key={item.label}
            className="flex flex-col sm:flex-row sm:items-baseline justify-between py-2 border-b gap-1"
            style={{ borderColor: 'var(--border-subtle)' }}
          >
            <span
              className="text-xs font-mono font-medium tracking-wide"
              style={{ color: 'var(--text-muted)' }}
            >
              {item.label}
            </span>

            {item.isLink ? (
              <a
                href={item.value}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono underline hover:text-[var(--accent-orange)] transition-colors truncate max-w-[240px]"
                style={{ color: 'var(--accent-orange)' }}
              >
                {item.value} ↗
              </a>
            ) : (
              <span
                className={`text-xs font-medium text-right sm:text-left truncate max-w-[280px] ${
                  item.isMono ? 'font-mono' : ''
                }`}
                style={{
                  color: item.highlight ? 'var(--accent-orange)' : 'var(--text-primary)',
                }}
                title={item.value}
              >
                {item.value}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
