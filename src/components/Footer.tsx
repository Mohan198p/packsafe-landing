import { Link } from 'react-router'

// ─── Footer ───────────────────────────────────────────────────────────────────
export default function Footer() {
    return (
        <footer className="px-6 py-12" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: '#080808' }}>
            <div className="max-w-[1280px] mx-auto space-y-8">
                <div className="flex items-start justify-between flex-wrap gap-8">
                    <div>
                        <Link to="/" style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 900, fontSize: '24px', color: '#f0ede8', letterSpacing: '-0.01em' }}>
                            PACK<span style={{ color: '#ff3a00' }}>SAFE</span>
                        </Link>
                        <p style={{ color: 'rgba(240,237,232,0.45)', fontSize: '13px', lineHeight: 1.6, maxWidth: '480px', marginTop: '10px' }}>
                            PackSafe is an intelligent security gatekeeper for the open-source supply chain. It evaluates packages before installation and provides developers with a security score, risk analysis, and safer alternatives.
                        </p>
                    </div>

                    <div className="flex items-center gap-7 flex-wrap" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px' }}>
                        <Link to="/docs" className="text-stone-400 hover:text-[#f0ede8] transition-colors">Documentation</Link>
                        <Link to="/docs/cli" className="text-stone-400 hover:text-[#f0ede8] transition-colors">CLI Reference</Link>
                        <a href="https://github.com/rahulpedapudi/packsafe" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-[#f0ede8] transition-colors">GitHub</a>
                        <a href="https://github.com/rahulpedapudi/packsafe/issues" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-[#f0ede8] transition-colors">Issues</a>
                        <a href="https://github.com/rahulpedapudi/packsafe/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-[#f0ede8] transition-colors">License (Apache-2.0)</a>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-white/[0.04] flex-wrap gap-4 text-xs font-mono text-stone-600">
                    <span>© 2026 PackSafe · Open-source supply chain security for Python</span>
                    <span>Python 3.11+ · Self-contained · Zero telemetry</span>
                </div>
            </div>
        </footer>
    )
}