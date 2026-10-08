import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router'

interface NavProps {
  transparent?: boolean
}

export default function Nav({ transparent = false }: NavProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const isDocs = location.pathname.startsWith('/docs')
  const isAnalyze = location.pathname.startsWith('/analyze')

  useEffect(() => {
    if (!transparent) return
    const h = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [transparent])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])



  const solid = !transparent || scrolled || isDocs || isAnalyze || mobileMenuOpen

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-200"
      style={{
        background: solid
          ? 'rgba(8,8,8,0.96)'
          : 'transparent',
        backdropFilter: solid ? 'blur(10px)' : 'none',
        borderBottom: solid ? '1px solid var(--border-color)' : 'none',
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6 h-[54px] flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          to="/"
          style={{ fontFamily: 'Barlow Condensed, sans-serif', letterSpacing: '-0.01em' }}
          className="text-xl font-bold transition-opacity hover:opacity-90"
        >
          <span style={{ color: 'var(--text-primary)' }}>PACK</span>
          <span style={{ color: '#ff3a00' }}>SAFE</span>
        </Link>

        {/* Desktop Navigation Links */}
        <div
          className="hidden md:flex items-center gap-7"
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '12px',
            color: 'var(--text-secondary)',
          }}
        >
          {[
            { label: 'Product', to: '/' },
            { label: 'Docs', to: '/docs' },
            { label: 'GitHub', to: 'https://github.com/rahulpedapudi/packsafe/' },
          ].map(item => {
            const isExternal = item.to.startsWith('http')
            const commonProps = {
              key: item.label,
              className: "hover:text-[var(--text-primary)] transition-colors",
              style: item.label === 'Docs' && isDocs
                ? { color: '#ff3a00', fontWeight: 600 }
                : undefined
            }
            
            return isExternal ? (
              <a
                {...commonProps}
                href={item.to}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.label}
              </a>
            ) : (
              <Link
                {...commonProps}
                to={item.to}
              >
                {item.label}
              </Link>
            )
          })}
        </div>

        {/* Right Section: Theme Toggle & Analyze Action Button */}
        <div className="flex items-center gap-3">


          {/* Analyze a package button -> Routes to /analyze */}
          <Link
            to="/analyze"
            className="text-xs px-4 py-2 font-medium transition-all hover:bg-[#ff5a20] flex items-center gap-1.5"
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              background: isAnalyze ? '#e03400' : '#ff3a00',
              color: '#ffffff',
              letterSpacing: '0.03em',
              boxShadow: isAnalyze ? '0 0 14px rgba(255, 58, 0, 0.45)' : 'none',
              outline: isAnalyze ? '1px solid rgba(255, 255, 255, 0.25)' : 'none',
            }}
          >
            <span>Analyze a package</span>
            <span>↗</span>
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="md:hidden p-2 text-sm font-mono border transition-colors"
            style={{
              backgroundColor: 'var(--bg-card-subtle)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)',
            }}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className="md:hidden border-t px-6 py-5 space-y-4 fade-up"
          style={{
            backgroundColor: 'rgba(10,10,10,0.98)',
            borderColor: 'var(--border-color)',
          }}
        >
          <div className="flex flex-col space-y-3 font-mono text-sm">
            <Link
              to="/"
              className="py-1 hover:text-[var(--accent-orange)] transition-colors"
              style={{ color: 'var(--text-primary)' }}
            >
              Product
            </Link>
            <Link
              to="/docs"
              className="py-1 hover:text-[var(--accent-orange)] transition-colors"
              style={{
                color: isDocs ? 'var(--accent-orange)' : 'var(--text-primary)',
              }}
            >
              Docs
            </Link>
            <a
              href="https://github.com/rahulpedapudi/packsafe/"
              target="_blank"
              rel="noopener noreferrer"
              className="py-1 hover:text-[var(--accent-orange)] transition-colors"
              style={{ color: 'var(--text-primary)' }}
            >
              GitHub ↗
            </a>
            <Link
              to="/analyze"
              className="py-2 px-3 text-center font-semibold mt-2"
              style={{
                backgroundColor: 'var(--accent-orange)',
                color: '#ffffff',
              }}
            >
              Analyze a package ↗
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
