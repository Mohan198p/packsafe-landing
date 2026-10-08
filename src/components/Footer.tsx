// ─── Footer ───────────────────────────────────────────────────────────────────

export default function Footer() {
    return (
        <footer className="px-6 py-10" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="max-w-[1280px] mx-auto flex items-center justify-between flex-wrap gap-6">
                <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 800, fontSize: '18px', color: '#f0ede8', letterSpacing: '-0.01em' }}>
                    PACK<span style={{ color: '#ff3a00' }}>SAFE</span>
                </span>
                <div className="flex items-center gap-7 flex-wrap" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#4a4a4a' }}>
                    {['Product', 'Docs', 'API', 'GitHub', 'Privacy', 'Status'].map(item => (
                        <a key={item} href="#" className="hover:text-[#f0ede8] transition-colors">{item}</a>
                    ))}
                </div>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#2a2a2a' }}>© 2026 PackSafe</span>
            </div>
        </footer>
    )
}