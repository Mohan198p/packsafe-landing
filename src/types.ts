export type TLine = { text: string; delay: number; color?: string; bold?: boolean }
export type DNode = { id: string; x: number; y: number; score: number }

export type PackageRisk = 'low' | 'medium' | 'high' | 'critical'

export interface PackageDependency {
  name: string
  version: string
  risk: PackageRisk
  score: number
  direct?: boolean
}

export type SignalStatus = 'pass' | 'warn' | 'fail' | 'info'

export interface SecuritySignal {
  id: string
  name: string
  status: SignalStatus
  score?: number
  value?: string
  description: string
}

export type BehaviorAccessLevel = 'NONE' | 'LOW' | 'MEDIUM' | 'HIGH' | 'SUSPICIOUS'

export interface BehaviorMetric {
  type: 'Network Access' | 'File System Access' | 'Process Execution' | 'Environment Access'
  level: BehaviorAccessLevel
  detail: string
}

export interface Package {
  id: string
  name: string
  version: string
  description: string
  score: number
  risk: PackageRisk
  reason?: string // For packages requiring attention
  dependenciesCount: number
  registry: 'PyPI' | 'npm' | 'crates.io' | 'Go' | string
  lastUpdated: string
  license: string
  author: string
  repository: string
  homepage?: string
  downloadsWeekly: string
  packageAge: string
  maintainersCount: number
  cveStatus: string
  reputationScore: number
  dependencyHealthScore: number
  maintenanceScore: number
  securitySignalsScore: number
  behavior: BehaviorMetric[]
  directDependencies: PackageDependency[]
  transitiveDependencies?: PackageDependency[]
  signals: SecuritySignal[]
  summary: string
}

export interface DashboardStatistics {
  totalPackages: number
  safePackages: number
  unsafePackages: number
  averageScore: number
}

export type PackageSortField = 'name' | 'score' | 'risk' | 'dependenciesCount' | 'lastUpdated'
export type SortOrder = 'asc' | 'desc'
