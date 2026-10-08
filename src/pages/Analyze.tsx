import { useState, useEffect } from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import PackageSearch from '../components/dashboard/PackageSearch'
import DashboardStats from '../components/dashboard/DashboardStats'
import SafePackagesTable from '../components/dashboard/SafePackagesTable'
import UnsafePackagesTable from '../components/dashboard/UnsafePackagesTable'
import {
  getDashboardStats,
  getSafePackages,
  getUnsafePackages,
} from '../services/packageService'
import { Package, DashboardStatistics } from '../types'

export default function Analyze() {
  const [stats, setStats] = useState<DashboardStatistics>({
    totalPackages: 0,
    safePackages: 0,
    unsafePackages: 0,
    averageScore: 0,
  })
  const [safePackages, setSafePackages] = useState<Package[]>([])
  const [unsafePackages, setUnsafePackages] = useState<Package[]>([])
  const [loading, setLoading] = useState(true)

  // Filters
  const [searchQuery, setSearchQuery] = useState('')
  const [registryFilter, setRegistryFilter] = useState('all')
  const [riskFilter, setRiskFilter] = useState('all')

  useEffect(() => {
    let isMounted = true

    async function loadDashboardData() {
      setLoading(true)
      try {
        const [dashboardStats, safeList, unsafeList] = await Promise.all([
          getDashboardStats(),
          getSafePackages({
            search: searchQuery,
            registry: registryFilter,
          }),
          getUnsafePackages({
            search: searchQuery,
            registry: registryFilter,
            risk: riskFilter,
          }),
        ])

        if (isMounted) {
          setStats(dashboardStats)
          setSafePackages(safeList)
          setUnsafePackages(unsafeList)
        }
      } catch (err) {
        console.error('Failed to load dashboard data:', err)
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadDashboardData()
    return () => {
      isMounted = false
    }
  }, [searchQuery, registryFilter, riskFilter])

  return (
    <div
      className="min-h-screen flex flex-col transition-colors duration-200"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <Nav />

      <main className="flex-1 max-w-[1280px] w-full mx-auto px-6 pt-[80px] pb-16">
        {/* Dashboard Intro / Header */}
        <section className="py-8 md:py-12 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
          <div className="flex items-center gap-2 mb-3">
            <span
              className="text-[11px] font-mono tracking-widest uppercase font-semibold px-2 py-0.5"
              style={{
                backgroundColor: 'var(--accent-orange-subtle)',
                color: 'var(--accent-orange)',
                border: '1px solid var(--accent-orange)',
              }}
            >
              PACKAGE ANALYSIS
            </span>
            <span
              className="text-xs font-mono"
              style={{ color: 'var(--text-muted)' }}
            >
              • Real-time Security Intelligence
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'Barlow Condensed, sans-serif',
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
            }}
            className="text-4xl md:text-6xl font-extrabold uppercase leading-none max-w-3xl"
          >
            Analyze open-source packages <br />
            <span style={{ color: 'var(--accent-orange)' }}>before you install them.</span>
          </h1>

          <p
            className="mt-4 text-sm md:text-base font-normal max-w-2xl leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            Search packages, inspect dependencies, evaluate behavioral signals, and prevent
            malicious supply-chain threats or AI hallucinations from entering your environment.
          </p>
        </section>

        {/* Package Search Interaction */}
        <PackageSearch
          onSearchChange={setSearchQuery}
          onFilterRegistryChange={setRegistryFilter}
          onFilterRiskChange={setRiskFilter}
          selectedRegistry={registryFilter}
          selectedRisk={riskFilter}
        />

        {/* High-Level Dashboard Statistics */}
        <DashboardStats stats={stats} loading={loading} />

        {/* Safe Packages Table */}
        <SafePackagesTable packages={safePackages} loading={loading} />

        {/* Unsafe Packages Table */}
        <UnsafePackagesTable packages={unsafePackages} loading={loading} />
      </main>

      <Footer />
    </div>
  )
}
