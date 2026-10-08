import { NavLink, Outlet, Link, useLocation } from 'react-router'
import Nav from '@/components/Nav'
import { docsSidebar } from './docsNav'

import { useState, useEffect } from 'react'
import type { NavItem } from './docsNav'

function SidebarNavLink({ item, depth = 0 }: { item: NavItem; depth?: number }) {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(() => {
    // default open if the current path matches
    return location.pathname === item.path || (item.path === '/docs' && location.pathname === '/docs/')
  })

  useEffect(() => {
    const active = location.pathname === item.path || (item.path === '/docs' && location.pathname === '/docs/')
    if (active) setIsOpen(true)
  }, [location.pathname, item.path])
  
  const isActivePath = item.path === '/docs'
    ? location.pathname === '/docs' || location.pathname === '/docs/'
    : location.pathname === item.path

  const isItemActive = item.hash
    ? isActivePath && location.hash === item.hash
    : isActivePath && (!location.hash || location.hash === '')

  const hasChildren = item.items && item.items.length > 0

  return (
    <li style={{ marginBottom: '2px' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Link
          to={item.hash ? `${item.path}${item.hash}` : item.path}
          onClick={(e) => {
            if (location.pathname === item.path) {
              if (item.hash) {
                const el = document.querySelector(item.hash)
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }
            }
            if (hasChildren) setIsOpen(!isOpen)
          }}
          style={{
            flex: 1,
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: depth > 0 ? '11px' : '12px',
            display: 'block',
            padding: `5px 10px 5px ${10 + depth * 12}px`,
            color: isItemActive ? '#f0ede8' : 'rgba(240,237,232,0.38)',
            background: isItemActive && !hasChildren ? 'rgba(255,255,255,0.05)' : 'transparent',
            borderLeft: isItemActive && !hasChildren ? '1px solid #ff3a00' : '1px solid transparent',
            textDecoration: 'none',
            transition: 'color 0.15s, background 0.15s',
            letterSpacing: '0.01em',
          }}
        >
          {item.label}
        </Link>
        {hasChildren && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(240,237,232,0.38)',
              padding: '4px 8px',
              cursor: 'pointer',
              fontSize: '8px',
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s'
            }}
          >
            ▼
          </button>
        )}
      </div>
      {hasChildren && (
        <div style={{
          display: 'grid',
          gridTemplateRows: isOpen ? '1fr' : '0fr',
          transition: 'grid-template-rows 0.2s ease-in-out',
        }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, overflow: 'hidden' }}>
            {item.items!.map((subItem, idx) => (
              <SidebarNavLink key={`${subItem.path}${subItem.hash || ''}-${idx}`} item={subItem} depth={depth + 1} />
            ))}
          </ul>
        </div>
      )}
    </li>
  )
}

function Sidebar() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(() => {
    const state: Record<string, boolean> = {}
    docsSidebar.forEach(g => { state[g.section] = true })
    return state
  })

  return (
    <aside
      className="hidden lg:block shrink-0"
      style={{
        width: '240px',
        position: 'sticky',
        top: '52px',
        height: 'calc(100vh - 52px)',
        overflowY: 'auto',
        borderRight: '1px solid rgba(255,255,255,0.08)',
        paddingTop: '32px',
        paddingBottom: '48px',
      }}
    >
      {docsSidebar.map(group => {
        const isOpen = openSections[group.section]
        return (
          <div key={group.section} style={{ marginBottom: '24px', paddingLeft: '24px', paddingRight: '16px' }}>
            <button
              onClick={() => setOpenSections(p => ({ ...p, [group.section]: !p[group.section] }))}
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '9px',
                color: '#ff3a00',
                letterSpacing: '0.16em',
                marginBottom: isOpen ? '10px' : '0px',
                textTransform: 'uppercase',
                background: 'none',
                border: 'none',
                padding: '4px 0',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                textAlign: 'left',
              }}
            >
              <span>{group.section}</span>
              <span style={{ fontSize: '10px', transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                ▼
              </span>
            </button>
            <div
              style={{
                display: 'grid',
                gridTemplateRows: isOpen ? '1fr' : '0fr',
                transition: 'grid-template-rows 0.2s ease-in-out',
              }}
            >
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, overflow: 'hidden' }}>
                {group.items.map(item => (
                  <SidebarNavLink key={item.path + (item.hash || '')} item={item} />
                ))}
              </ul>
            </div>
          </div>
        )
      })}
    </aside>
  )
}

function MobileNav() {
  return (
    <div
      className="lg:hidden"
      style={{
        overflowX: 'auto',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        padding: '12px 20px',
        display: 'flex',
        gap: '4px',
      }}
    >
      {docsSidebar.flatMap(g => g.items).map(item => (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.path === '/docs'}
          style={({ isActive }) => ({
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '11px',
            padding: '4px 10px',
            color: isActive ? '#f0ede8' : 'rgba(240,237,232,0.4)',
            background: isActive ? 'rgba(255,255,255,0.07)' : 'transparent',
            border: isActive ? '1px solid rgba(255,255,255,0.12)' : '1px solid transparent',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            transition: 'color 0.15s',
          })}
        >
          {item.label}
        </NavLink>
      ))}
    </div>
  )
}

export default function DocsLayout() {
  return (
    <div style={{ background: '#080808', minHeight: '100vh' }}>
      <Nav />

      <div style={{ paddingTop: '52px', display: 'flex', minHeight: '100vh' }}>
        <Sidebar />

        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
          {/* <MobileNav /> */}
          <main style={{ flex: 1, padding: '48px 48px 96px', maxWidth: '860px' }}>
            <Outlet />
          </main>
        </div>
      </div>

      {/* Footer strip */}
      <div
        style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          padding: '20px 48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Link
          to="/"
          style={{
            fontFamily: 'Barlow Condensed, sans-serif',
            fontWeight: 800,
            fontSize: '16px',
            color: '#f0ede8',
            textDecoration: 'none',
            letterSpacing: '-0.01em',
          }}
        >
          PACK<span style={{ color: '#ff3a00' }}>SAFE</span>
        </Link>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#2a2a2a' }}>
          © 2026 PackSafe
        </span>
      </div>
    </div>
  )
}
