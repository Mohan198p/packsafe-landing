
import { useNavigate } from 'react-router'
import { searchResults } from "@/data"
import { useInView } from "@/hooks/useInView"

// ─── Section 08: AI Search ────────────────────────────────────────────────────
export default function AISearch() {
    const { ref, inView } = useInView()
    const navigate = useNavigate()
    return (
        <section ref={ref} className="py-32 px-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="max-w-[1280px] mx-auto">
                <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 'clamp(48px, 6vw, 92px)', fontWeight: 900, lineHeight: 0.92, letterSpacing: '-0.02em', color: '#f0ede8' }} className="mb-16 max-w-[820px]">
                    Don't know the package name?<br />Describe what you need.
                </h2>
                <div className="max-w-[680px]">
                    <div className="flex items-center gap-3 px-4 py-3 mb-6" style={{ border: '1px solid rgba(255,255,255,0.15)', background: '#0e0e0e' }}>
                        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#ff3a00', letterSpacing: '0.08em' }}>SEMANTIC SEARCH</span>
                        <span style={{ color: 'rgba(255,255,255,0.15)' }}>|</span>
                        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', color: 'rgba(240,237,232,0.6)' }}>"python package for building an http server"</span>
                    </div>
                    <div className="space-y-0">
                        {searchResults.map((r, i) => {
                            const color = r.score >= 93 ? '#00cc55' : r.score >= 88 ? '#ffaa00' : '#ff3a00'
                            return (
                                <div
                                    key={r.name}
                                    onClick={() => navigate(`/analyze/${r.name}`)}
                                    className="flex items-center gap-4 px-4 py-4 hover:bg-white/[0.04] cursor-pointer transition-colors"
                                    style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(12px)', transition: `opacity 0.4s ease ${i * 0.07}s, transform 0.4s ease ${i * 0.07}s` }}
                                >
                                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#3a3a3a', width: '18px' }}>{String(i + 1).padStart(2, '0')}</span>
                                    <div className="flex-1 min-w-0">
                                        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '14px', color: '#f0ede8', fontWeight: 500 }}>{r.name}</span>
                                        <p style={{ fontSize: '12px', color: 'rgba(240,237,232,0.35)', marginTop: '2px' }}>{r.desc}</p>
                                    </div>
                                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', color, flexShrink: 0, fontWeight: 500 }}>{r.score}/100</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}