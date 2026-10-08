import { useState, useMemo } from 'react'
import { Package, PackageSortField, SortOrder } from '../../types'
import PackageTableRow from './PackageTableRow'

interface SafePackagesTableProps {
  packages: Package[]
  loading?: boolean
}

export default function SafePackagesTable({ packages, loading = false }: SafePackagesTableProps) {
  const [sortField, setSortField] = useState<PackageSortField>('score')
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 5

  const handleSort = (field: PackageSortField) => {
    if (sortField === field) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortField(field)
      setSortOrder(field === 'name' ? 'asc' : 'desc')
    }
    setCurrentPage(1)
  }

  const sortedPackages = useMemo(() => {
    const list = [...packages]
    const order = sortOrder === 'desc' ? -1 : 1

    return list.sort((a, b) => {
      if (sortField === 'name') return a.name.localeCompare(b.name) * order
      if (sortField === 'score') return (a.score - b.score) * order
      if (sortField === 'dependenciesCount') return (a.dependenciesCount - b.dependenciesCount) * order
      if (sortField === 'lastUpdated') return a.lastUpdated.localeCompare(b.lastUpdated) * order
      return 0
    })
  }, [packages, sortField, sortOrder])

  const totalPages = Math.ceil(sortedPackages.length / pageSize) || 1
  const paginatedPackages = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return sortedPackages.slice(start, start + pageSize)
  }, [sortedPackages, currentPage, pageSize])

  const renderSortIndicator = (field: PackageSortField) => {
    if (sortField !== field) {
      return <span className="opacity-30 ml-1 text-[10px]">↕</span>
    }
    return (
      <span className="ml-1 text-[10px]" style={{ color: 'var(--accent-orange)' }}>
        {sortOrder === 'asc' ? '▲' : '▼'}
      </span>
    )
  }

  return (
    <div
      className="my-8 overflow-hidden transition-all duration-200"
      style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
      }}
    >
      {/* Table Header Section */}
      <div
        className="px-6 py-5 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-3"
        style={{
          borderColor: 'var(--border-subtle)',
          backgroundColor: 'var(--bg-card)',
        }}
      >
        <div>
          <div className="flex items-center gap-2.5">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: 'var(--status-safe)' }}
              aria-hidden="true"
            />
            <h2
              className="text-lg font-mono font-bold tracking-tight"
              style={{ color: 'var(--text-primary)' }}
            >
              Safe Packages
            </h2>
            <span
              className="text-[11px] font-mono px-2 py-0.5"
              style={{
                backgroundColor: 'var(--status-safe-bg)',
                color: 'var(--status-safe)',
                border: '1px solid var(--status-safe-border)',
              }}
            >
              {packages.length} Verified
            </span>
          </div>
          <p
            className="text-xs font-mono mt-1"
            style={{ color: 'var(--text-muted)' }}
          >
            Packages with currently acceptable security signals.
          </p>
        </div>

        <div className="text-xs font-mono" style={{ color: 'var(--text-subtle)' }}>
          Showing {sortedPackages.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}–
          {Math.min(currentPage * pageSize, sortedPackages.length)} of {sortedPackages.length}
        </div>
      </div>

      {/* Table Structure */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse" role="table" aria-label="Safe Packages Table">
          <thead>
            <tr
              style={{
                backgroundColor: 'var(--table-header-bg)',
                borderBottom: '1px solid var(--border-color)',
              }}
            >
              <th
                onClick={() => handleSort('name')}
                className="py-3 px-4 text-left font-mono text-[11px] uppercase tracking-wider cursor-pointer select-none transition-colors hover:text-[var(--text-primary)]"
                style={{ color: 'var(--text-muted)' }}
                aria-sort={sortField === 'name' ? (sortOrder === 'asc' ? 'ascending' : 'descending') : 'none'}
              >
                <div className="flex items-center">
                  <span>Package</span>
                  {renderSortIndicator('name')}
                </div>
              </th>

              <th
                className="py-3 px-4 text-left font-mono text-[11px] uppercase tracking-wider"
                style={{ color: 'var(--text-muted)' }}
              >
                Version
              </th>

              <th
                onClick={() => handleSort('score')}
                className="py-3 px-4 text-left font-mono text-[11px] uppercase tracking-wider cursor-pointer select-none transition-colors hover:text-[var(--text-primary)]"
                style={{ color: 'var(--text-muted)' }}
                aria-sort={sortField === 'score' ? (sortOrder === 'asc' ? 'ascending' : 'descending') : 'none'}
              >
                <div className="flex items-center">
                  <span>Safety Score</span>
                  {renderSortIndicator('score')}
                </div>
              </th>

              <th
                className="py-3 px-4 text-left font-mono text-[11px] uppercase tracking-wider"
                style={{ color: 'var(--text-muted)' }}
              >
                Risk
              </th>

              <th
                onClick={() => handleSort('lastUpdated')}
                className="py-3 px-4 text-left font-mono text-[11px] uppercase tracking-wider cursor-pointer select-none transition-colors hover:text-[var(--text-primary)]"
                style={{ color: 'var(--text-muted)' }}
                aria-sort={sortField === 'lastUpdated' ? (sortOrder === 'asc' ? 'ascending' : 'descending') : 'none'}
              >
                <div className="flex items-center">
                  <span>Last Updated</span>
                  {renderSortIndicator('lastUpdated')}
                </div>
              </th>

              <th
                onClick={() => handleSort('dependenciesCount')}
                className="py-3 px-4 text-left font-mono text-[11px] uppercase tracking-wider cursor-pointer select-none transition-colors hover:text-[var(--text-primary)]"
                style={{ color: 'var(--text-muted)' }}
                aria-sort={sortField === 'dependenciesCount' ? (sortOrder === 'asc' ? 'ascending' : 'descending') : 'none'}
              >
                <div className="flex items-center">
                  <span>Dependencies</span>
                  {renderSortIndicator('dependenciesCount')}
                </div>
              </th>

              <th
                className="py-3 px-4 text-right font-mono text-[11px] uppercase tracking-wider"
                style={{ color: 'var(--text-muted)' }}
              >
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="py-12 text-center">
                  <div className="inline-flex items-center gap-2 font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
                    <span className="w-3.5 h-3.5 border-2 border-[var(--accent-orange)] border-t-transparent rounded-full animate-spin" />
                    Loading safe packages...
                  </div>
                </td>
              </tr>
            ) : paginatedPackages.length > 0 ? (
              paginatedPackages.map(pkg => (
                <PackageTableRow key={pkg.id} pkg={pkg} type="safe" />
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-12 text-center">
                  <div className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
                    No safe packages to display.
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div
          className="px-6 py-3.5 border-t flex items-center justify-between font-mono text-xs"
          style={{
            borderColor: 'var(--border-subtle)',
            backgroundColor: 'var(--bg-card-subtle)',
          }}
        >
          <button
            type="button"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 font-medium transition-colors disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[var(--bg-hover)]"
            style={{
              color: 'var(--text-primary)',
              border: '1px solid var(--border-color)',
            }}
          >
            ← Previous
          </button>

          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className="w-7 h-7 flex items-center justify-center font-medium transition-colors"
                style={{
                  backgroundColor:
                    currentPage === page ? 'var(--accent-orange)' : 'transparent',
                  color: currentPage === page ? '#ffffff' : 'var(--text-secondary)',
                  border:
                    currentPage === page
                      ? '1px solid var(--accent-orange)'
                      : '1px solid var(--border-subtle)',
                }}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 font-medium transition-colors disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[var(--bg-hover)]"
            style={{
              color: 'var(--text-primary)',
              border: '1px solid var(--border-color)',
            }}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  )
}
