import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
import { searchPackages } from '../../services/packageService'
import { Package } from '../../types'
import PackageStatusBadge from './PackageStatusBadge'

interface PackageSearchProps {
  onSearchChange?: (query: string) => void
  onFilterRegistryChange?: (registry: string) => void
  onFilterRiskChange?: (risk: string) => void
  selectedRegistry?: string
  selectedRisk?: string
}

export default function PackageSearch({
  onSearchChange,
  onFilterRegistryChange,
  onFilterRiskChange,
  selectedRegistry = 'all',
  selectedRisk = 'all',
}: PackageSearchProps) {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [previewResult, setPreviewResult] = useState<Package | null>(null)
  const [searched, setSearched] = useState(false)
  const [matches, setMatches] = useState<Package[]>([])
  const navigate = useNavigate()
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Quick suggestions
  const suggestions = ['requests', 'fastapi', 'react', 'suspicious-collector', 'demo-risk-package']

  const executeSearch = async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setPreviewResult(null)
      setMatches([])
      setSearched(false)
      setLoading(false)
      onSearchChange?.('')
      return
    }

    setLoading(true)
    setSearched(true)
    try {
      const results = await searchPackages(searchTerm)
      setMatches(results)
      setPreviewResult(results.length > 0 ? results[0] : null)
      onSearchChange?.(searchTerm)
    } catch {
      setPreviewResult(null)
      setMatches([])
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setQuery(val)

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    searchTimeoutRef.current = setTimeout(() => {
      executeSearch(val)
    }, 250)
  }

  const handleClear = () => {
    setQuery('')
    setPreviewResult(null)
    setMatches([])
    setSearched(false)
    onSearchChange?.('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }
    executeSearch(query)
  }

  const handleSuggestionClick = (pkgName: string) => {
    setQuery(pkgName)
    executeSearch(pkgName)
  }

  const handleViewAnalysis = (pkgName: string) => {
    navigate(`/analyze/${encodeURIComponent(pkgName)}`)
  }

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div className="w-full my-6">
      {/* Search Input Container */}
      <form onSubmit={handleSubmit} className="relative w-full">
        <div
          className="relative flex items-center transition-all duration-200"
          style={{
            backgroundColor: 'var(--bg-input)',
            border: '1px solid var(--border-strong)',
          }}
        >
          {/* Search Icon */}
          <div className="pl-4 pr-2 flex items-center pointer-events-none select-none">
            <span
              style={{ color: 'var(--accent-orange)' }}
              className="text-base"
              aria-hidden="true"
            >
              🔍
            </span>
          </div>

          {/* Input Field */}
          <input
            id="package-search-input"
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Search a package (e.g. requests, react, lodash)"
            className="w-full py-4 px-2 font-mono text-sm md:text-base focus:outline-none placeholder:text-[var(--text-muted)]"
            style={{
              backgroundColor: 'transparent',
              color: 'var(--text-primary)',
            }}
            aria-label="Search package name"
            autoComplete="off"
            spellCheck="false"
          />

          {/* Right Controls */}
          <div className="flex items-center gap-2 pr-3">
            {/* Clear Button */}
            {query && (
              <button
                type="button"
                onClick={handleClear}
                className="px-2 py-1 text-xs font-mono transition-colors hover:opacity-80"
                style={{ color: 'var(--text-muted)' }}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-xs md:text-sm font-mono font-medium transition-all flex items-center gap-2 disabled:opacity-50"
              style={{
                backgroundColor: 'var(--accent-orange)',
                color: '#ffffff',
              }}
              aria-label="Analyze package"
            >
              {loading ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Scanning...</span>
                </>
              ) : (
                <>
                  <span>Analyze</span>
                  <span>[→]</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Loading Bar during scan */}
        {loading && (
          <div
            className="h-0.5 w-full overflow-hidden"
            style={{ backgroundColor: 'var(--border-subtle)' }}
          >
            <div
              className="h-full scanning-pulse"
              style={{
                backgroundColor: 'var(--accent-orange)',
                width: '60%',
              }}
            />
          </div>
        )}
      </form>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-end gap-3 mt-3.5 pt-1">

        {/* Filters */}
        <div className="flex items-center gap-2.5">
          {/* Registry Filter */}
          <div className="flex items-center gap-1.5 text-xs font-mono">
            <span style={{ color: 'var(--text-subtle)' }}>Registry:</span>
            <select
              value={selectedRegistry}
              onChange={e => onFilterRegistryChange?.(e.target.value)}
              className="py-1 px-2 text-xs font-mono cursor-pointer focus:outline-none"
              style={{
                backgroundColor: 'var(--bg-card)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-color)',
              }}
              aria-label="Filter by registry"
            >
              <option value="all">All Registries</option>
              <option value="npm">npm</option>
              <option value="pypi">PyPI</option>
            </select>
          </div>

          {/* Risk Filter */}
          <div className="flex items-center gap-1.5 text-xs font-mono">
            <span style={{ color: 'var(--text-subtle)' }}>Risk:</span>
            <select
              value={selectedRisk}
              onChange={e => onFilterRiskChange?.(e.target.value)}
              className="py-1 px-2 text-xs font-mono cursor-pointer focus:outline-none"
              style={{
                backgroundColor: 'var(--bg-card)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-color)',
              }}
              aria-label="Filter by risk level"
            >
              <option value="all">All Risk</option>
              <option value="low">Low Risk</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>
        </div>
      </div>

      {/* Search Result Card Section */}
      {searched && (
        <div className="mt-5 fade-up">
          {previewResult ? (
            <div
              className="p-5 relative transition-all duration-200"
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--accent-orange)',
                boxShadow: '0 4px 20px var(--accent-orange-subtle)',
              }}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span
                      className="text-xs font-mono px-2 py-0.5 tracking-wider uppercase font-semibold"
                      style={{
                        backgroundColor: 'var(--accent-orange-subtle)',
                        color: 'var(--accent-orange)',
                        border: '1px solid var(--accent-orange)',
                      }}
                    >
                      Top Match
                    </span>
                    <span
                      className="text-xl font-bold font-mono"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {previewResult.name}
                    </span>
                    <span
                      className="text-xs font-mono"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      v{previewResult.version}
                    </span>
                    <span
                      className="text-[11px] font-mono px-1.5 py-0.5"
                      style={{
                        backgroundColor: 'var(--bg-card-subtle)',
                        color: 'var(--text-secondary)',
                        border: '1px solid var(--border-subtle)',
                      }}
                    >
                      {previewResult.registry}
                    </span>
                  </div>

                  <p
                    className="text-sm mt-2 font-normal"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {previewResult.description}
                  </p>
                </div>

                {/* Score & Action */}
                <div className="flex items-center gap-6 border-t md:border-t-0 md:border-l pt-3 md:pt-0 md:pl-6" style={{ borderColor: 'var(--border-subtle)' }}>
                  <div className="text-left md:text-right">
                    <div className="text-[10px] font-mono uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                      Safety Score
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span
                        className="text-2xl font-bold font-mono"
                        style={{
                          color:
                            previewResult.score >= 90
                              ? 'var(--status-safe)'
                              : previewResult.score >= 70
                              ? 'var(--status-warn)'
                              : 'var(--status-danger)',
                        }}
                      >
                        {previewResult.score}
                      </span>
                      <span className="text-xs font-mono" style={{ color: 'var(--text-subtle)' }}>
                        /100
                      </span>
                    </div>
                    <div className="mt-1">
                      <PackageStatusBadge risk={previewResult.risk} size="sm" />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleViewAnalysis(previewResult.name)}
                    className="px-4 py-2.5 text-xs font-mono font-medium transition-colors hover:opacity-90 whitespace-nowrap"
                    style={{
                      backgroundColor: 'var(--accent-orange)',
                      color: '#ffffff',
                    }}
                  >
                    View full analysis ↗
                  </button>
                </div>
              </div>

              {/* Multiple matches notice */}
              {matches.length > 1 && (
                <div
                  className="mt-4 pt-3 border-t flex items-center justify-between text-xs font-mono"
                  style={{
                    borderColor: 'var(--border-subtle)',
                    color: 'var(--text-muted)',
                  }}
                >
                  <span>
                    Found {matches.length} matching packages. Filtered in the tables below.
                  </span>
                  <div className="flex gap-2">
                    {matches.slice(1, 4).map(m => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => handleViewAnalysis(m.name)}
                        className="underline hover:text-[var(--accent-orange)]"
                      >
                        {m.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div
              className="p-8 text-center"
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
              }}
            >
              <div className="text-2xl mb-2">🔍</div>
              <h3
                className="text-base font-mono font-bold"
                style={{ color: 'var(--text-primary)' }}
              >
                No package found
              </h3>
              <p
                className="text-xs font-mono mt-1"
                style={{ color: 'var(--text-muted)' }}
              >
                We couldn't find a package matching &ldquo;{query}&rdquo;.
              </p>
              <p
                className="text-[11px] font-mono mt-3"
                style={{ color: 'var(--text-subtle)' }}
              >
                Try searching for verified packages like{' '}
                <button
                  type="button"
                  onClick={() => handleSuggestionClick('requests')}
                  className="underline text-[var(--accent-orange)]"
                >
                  requests
                </button>
                ,{' '}
                <button
                  type="button"
                  onClick={() => handleSuggestionClick('fastapi')}
                  className="underline text-[var(--accent-orange)]"
                >
                  fastapi
                </button>
                , or test high-risk demo{' '}
                <button
                  type="button"
                  onClick={() => handleSuggestionClick('suspicious-collector')}
                  className="underline text-[var(--accent-orange)]"
                >
                  suspicious-collector
                </button>
                .
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
