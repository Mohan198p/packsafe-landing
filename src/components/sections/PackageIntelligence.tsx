
import { meta } from "@/data"
import { useInView } from "@/hooks/useInView"

// ─── Section 05: Package Intelligence ────────────────────────────────────────
export default function PackageIntelligence() {
    const { ref, inView } = useInView()

    return (
        <section ref={ref} className="py-32 px-6" style={{ background: '#0b0b0b', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="max-w-[1280px] mx-auto">
                <div className="grid md:grid-cols-[1fr_1fr] gap-20 items-start">
                    <div>
                        <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 'clamp(48px, 5.5vw, 80px)', fontWeight: 900, lineHeight: 0.92, letterSpacing: '-0.02em', color: '#f0ede8' }} className="mb-6">
                            Every signal.<br />Fully visible.
                        </h2>
                        <p style={{ color: 'rgba(240,237,232,0.45)', lineHeight: 1.65, maxWidth: '360px' }} className="text-sm">
                            PackSafe surfaces the metadata that determines whether a package is what it claims to be — from registry provenance to recent commit activity.
                        </p>
                    </div>
                    <div style={{ border: '1px solid rgba(255,255,255,0.08)', background: '#0e0e0e', opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)', transition: 'opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s' }}>
                        <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                            <div>
                                <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 800, fontSize: '22px', color: '#f0ede8' }}>express</span>
                                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#4a4a4a', marginLeft: '10px' }}>v5.1.0 · npm</span>
                            </div>
                            <span className="text-xs px-2 py-0.5" style={{ fontFamily: 'JetBrains Mono, monospace', background: 'rgba(0,204,85,0.1)', color: '#00cc55', border: '1px solid rgba(0,204,85,0.2)' }}>LOW RISK</span>
                        </div>
                        <div className="grid grid-cols-2 gap-0">
                            {meta.map((m, i) => (
                                <div key={m.label} className="px-5 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', borderRight: i % 2 === 0 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#4a4a4a', letterSpacing: '0.06em' }}>{m.label.toUpperCase()}</div>
                                    <div style={{ fontSize: '13px', fontWeight: 500, color: m.highlight || '#f0ede8', marginTop: '2px' }}>{m.value}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
