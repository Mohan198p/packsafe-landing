import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router'
import { getPackageByName } from '../../services/packageService'
import { Package } from '../../types'
import Nav from '../Nav'
import Footer from '../Footer'
import PackageOverview from './PackageOverview'
import PackageScore from './PackageScore'
import SecuritySignals from './SecuritySignals'
import DependencyList from './DependencyList'
import PackageStatusBadge from './PackageStatusBadge'

export default function PackageDetails() {
  const { packageName } = useParams<{ packageName: string }>()
  const [pkg, setPkg] = useState<Package | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'overview' | 'security' | 'dependencies' | 'behavior'>('overview')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    let isMounted = true

    async function fetchPackage() {
      if (!packageName) return
      setLoading(true)
      try {
        const found = await getPackageByName(packageName)
        if (isMounted) {
          setPkg(found)
        }
      } catch {
        if (isMounted) {
          setPkg(null)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchPackage()
    return () => {
      isMounted = false
    }
  }, [packageName])

  const copyCommand = (cmd: string) => {
    navigator.clipboard.writeText(cmd)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getBehaviorBadge = (level: string) => {
    switch (level) {
      case 'NONE':
      case 'LOW':
        return {
          bg: 'var(--status-safe-bg)',
          color: 'var(--status-safe)',
          border: 'var(--status-safe-border)',
        }
      case 'MEDIUM':
        return {
          bg: 'var(--status-warn-bg)',
          color: 'var(--status-warn)',
          border: 'var(--status-warn-border)',
        }
      case 'HIGH':
      case 'SUSPICIOUS':
      default:
        return {
          bg: 'var(--status-danger-bg)',
          color: 'var(--status-danger)',
          border: 'var(--status-danger-border)',
        }
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col transition-colors duration-200"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <Nav />

      <main className="flex-1 max-w-[1280px] w-full mx-auto px-6 pt-[84px] pb-16">
        {/* Back navigation */}
        <div className="mb-6">
          <Link
            to="/analyze"
            className="inline-flex items-center gap-2 font-mono text-xs font-semibold hover:text-[var(--accent-orange)] transition-colors"
            style={{ color: 'var(--text-muted)' }}
          >
            <span>←</span>
            <span>Back to analysis</span>
          </Link>
        </div>

        {loading ? (
          <div
            className="p-16 my-8 text-center border"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-color)',
            }}
          >
            <div className="w-8 h-8 border-2 border-[var(--accent-orange)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <div className="font-mono text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
              Analyzing package {packageName}...
            </div>
            <p className="font-mono text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
              Running static AST inspection, dependency risk resolution, and behavioral heuristics.
            </p>
          </div>
        ) : !pkg ? (
          <div
            className="p-16 my-8 text-center border"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-color)',
            }}
          >
            <div className="text-3xl mb-3">⚠️</div>
            <h2 className="text-xl font-mono font-bold" style={{ color: 'var(--text-primary)' }}>
              Package Not Found
            </h2>
            <p className="text-xs font-mono mt-2 max-w-md mx-auto" style={{ color: 'var(--text-muted)' }}>
              We could not find analysis telemetry for &ldquo;{packageName}&rdquo;. Please verify the package name or search from the dashboard.
            </p>
            <div className="mt-6">
              <Link
                to="/analyze"
                className="px-5 py-2.5 text-xs font-mono font-semibold"
                style={{
                  backgroundColor: 'var(--accent-orange)',
                  color: '#ffffff',
                }}
              >
                Return to Dashboard
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-8 fade-up">
            {/* Header Banner */}
            <div
              className="p-6 md:p-8 relative overflow-hidden"
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
              }}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <span
                      className="text-[10px] font-mono tracking-widest uppercase font-semibold px-2 py-0.5"
                      style={{
                        backgroundColor: 'var(--accent-orange-subtle)',
                        color: 'var(--accent-orange)',
                        border: '1px solid var(--accent-orange)',
                      }}
                    >
                      PACKAGE ANALYSIS REPORT
                    </span>
                    <span
                      className="text-[11px] font-mono px-2 py-0.5"
                      style={{
                        backgroundColor: 'var(--bg-card-subtle)',
                        color: 'var(--text-muted)',
                        border: '1px solid var(--border-subtle)',
                      }}
                    >
                      {pkg.registry}
                    </span>
                  </div>

                  <h1
                    className="text-3xl md:text-5xl font-mono font-bold tracking-tight uppercase"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {pkg.name}
                  </h1>

                  <p
                    className="text-sm font-mono mt-2 max-w-2xl"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {pkg.description}
                  </p>
                </div>

                {/* Score & Risk Summary pill */}
                <div
                  className="flex items-center gap-6 p-4 border self-start md:self-auto"
                  style={{
                    backgroundColor: 'var(--bg-card-subtle)',
                    borderColor: 'var(--border-subtle)',
                  }}
                >
                  <div className="text-right">
                    <div className="text-[10px] font-mono uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                      Safety Score
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span
                        className="text-3xl font-mono font-bold"
                        style={{
                          color:
                            pkg.score >= 90
                              ? 'var(--status-safe)'
                              : pkg.score >= 70
                              ? 'var(--status-warn)'
                              : 'var(--status-danger)',
                        }}
                      >
                        {pkg.score}
                      </span>
                      <span className="text-xs font-mono" style={{ color: 'var(--text-subtle)' }}>
                        /100
                      </span>
                    </div>
                  </div>
                  <div className="border-l pl-4" style={{ borderColor: 'var(--border-subtle)' }}>
                    <PackageStatusBadge risk={pkg.risk} size="md" />
                  </div>
                </div>
              </div>

              {/* CLI Command Strip */}
              <div
                className="mt-6 pt-4 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono"
                style={{ borderColor: 'var(--border-subtle)' }}
              >
                <div className="flex items-center gap-2">
                  <span style={{ color: 'var(--text-muted)' }}>Install via PackSafe CLI:</span>
                  <code
                    className="px-2.5 py-1 rounded-xs select-all font-semibold"
                    style={{
                      backgroundColor: 'var(--code-bg)',
                      color: 'var(--accent-orange)',
                      border: '1px solid var(--border-subtle)',
                    }}
                  >
                    $ packsafe install {pkg.name}
                  </code>
                </div>

                <button
                  type="button"
                  onClick={() => copyCommand(`packsafe install ${pkg.name}`)}
                  className="px-3 py-1 font-mono text-xs transition-colors self-start sm:self-auto"
                  style={{
                    backgroundColor: 'var(--bg-card-subtle)',
                    color: copied ? 'var(--status-safe)' : 'var(--text-secondary)',
                    border: '1px solid var(--border-color)',
                  }}
                >
                  {copied ? '✓ Copied' : 'Copy command'}
                </button>
              </div>
            </div>

            {/* Section Navigation Tabs */}
            <div
              className="flex items-center gap-2 border-b overflow-x-auto pb-px"
              style={{ borderColor: 'var(--border-color)' }}
            >
              {[
                { id: 'overview', label: 'Overview & Metadata' },
                { id: 'security', label: 'Safety Score & Signals' },
                { id: 'dependencies', label: `Dependencies (${pkg.dependenciesCount})` },
                { id: 'behavior', label: 'Behavioral Analysis' },
              ].map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className="px-4 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer"
                  style={{
                    color: activeTab === tab.id ? 'var(--accent-orange)' : 'var(--text-muted)',
                    borderBottom: activeTab === tab.id ? '2px solid var(--accent-orange)' : '2px solid transparent',
                    backgroundColor: activeTab === tab.id ? 'var(--bg-hover)' : 'transparent',
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Contents */}
            {activeTab === 'overview' && (
              <div className="space-y-8 fade-up">
                <PackageScore pkg={pkg} />
                <PackageOverview pkg={pkg} />
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-8 fade-up">
                <PackageScore pkg={pkg} />
                <SecuritySignals pkg={pkg} />
              </div>
            )}

            {activeTab === 'dependencies' && (
              <div className="space-y-8 fade-up">
                <DependencyList pkg={pkg} />
              </div>
            )}

            {activeTab === 'behavior' && (
              <div
                className="p-6 md:p-8 space-y-6 fade-up"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                }}
              >
                <div className="border-b pb-4 mb-4" style={{ borderColor: 'var(--border-subtle)' }}>
                  <span className="text-[10px] font-mono tracking-widest uppercase font-semibold" style={{ color: 'var(--accent-orange)' }}>
                    SANDBOX TELEMETRY
                  </span>
                  <h3 className="text-lg font-mono font-bold" style={{ color: 'var(--text-primary)' }}>
                    Runtime & Installation Behavior Analysis
                  </h3>
                  <p className="text-xs font-mono mt-1" style={{ color: 'var(--text-muted)' }}>
                    Monitored system calls during package parsing and isolated sandbox installation.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pkg.behavior.map(b => {
                    const badgeStyles = getBehaviorBadge(b.level)
                    return (
                      <div
                        key={b.type}
                        className="p-5 border flex flex-col justify-between"
                        style={{
                          backgroundColor: 'var(--bg-card-subtle)',
                          borderColor: 'var(--border-subtle)',
                        }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-mono text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                            {b.type}
                          </span>
                          <span
                            className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-xs border"
                            style={{
                              backgroundColor: badgeStyles.bg,
                              color: badgeStyles.color,
                              borderColor: badgeStyles.border,
                            }}
                          >
                            {b.level}
                          </span>
                        </div>
                        <p className="text-xs font-mono mt-2" style={{ color: 'var(--text-secondary)' }}>
                          {b.detail}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Analysis Summary Box (always visible at bottom) */}
            <div
              className="p-6 md:p-8 border"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor:
                  pkg.score >= 90
                    ? 'var(--status-safe-border)'
                    : pkg.score >= 70
                    ? 'var(--status-warn-border)'
                    : 'var(--status-danger-border)',
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-lg">
                  {pkg.score >= 90 ? '🛡️' : pkg.score >= 70 ? '⚡' : '🚨'}
                </span>
                <h4 className="font-mono text-base font-bold uppercase tracking-wide" style={{ color: 'var(--text-primary)' }}>
                  PackSafe Security Verdict
                </h4>
              </div>

              <p className="text-sm font-mono leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {pkg.summary}
              </p>

              <div
                className="mt-4 pt-4 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono"
                style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}
              >
                <span>Report ID: PS-{pkg.id.toUpperCase()}-VERIFY</span>
                <span>Last updated: {pkg.lastUpdated}</span>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
