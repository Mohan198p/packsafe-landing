import { meta } from "@/data"
import { useInView } from "@/hooks/useInView"

// ─── Section 06: Package Intelligence & Provenance ────────────────────────────
export default function PackageIntelligence() {
    const { ref, inView } = useInView()

    return (
        <section ref={ref} className="py-32 px-6" style={{ background: '#0b0b0b', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="max-w-[1280px] mx-auto">
                <div className="grid lg:grid-cols-[1fr_1fr] gap-20 items-start">
                    <div>
                        <span
                            style={{
                                fontFamily: 'JetBrains Mono, monospace',
                                fontSize: '11px',
                                color: '#ff3a00',
                                letterSpacing: '0.14em',
                            }}
                            className="block mb-4 uppercase"
                        >
                            04 · INDEPENDENT SOURCES
                        </span>

                        <h2
                            style={{
                                fontFamily: 'Barlow Condensed, sans-serif',
                                fontSize: 'clamp(48px, 5.5vw, 80px)',
                                fontWeight: 900,
                                lineHeight: 0.92,
                                letterSpacing: '-0.02em',
                                color: '#f0ede8',
                            }}
                            className="mb-6 uppercase"
                        >
                            Every signal.<br />
                            Fully visible.
                        </h2>

                        <p style={{ color: 'rgba(240,237,232,0.55)', lineHeight: 1.65, maxWidth: '420px' }} className="text-sm mb-6">
                            Nothing rests on a single feed. PackSafe cross-references PyPI, OSV.dev, the CISA Known Exploited Vulnerabilities catalog, FIRST EPSS, GitHub, deps.dev and OpenSSF Scorecard — then reads the source archive itself.
                        </p>

                        <p style={{ color: 'rgba(240,237,232,0.45)', lineHeight: 1.65, maxWidth: '420px' }} className="text-xs">
                            A vulnerability with no exploitation probability and a vulnerability that is confirmed exploited in the wild are not the same finding, and PackSafe does not treat them as one.
                        </p>
                    </div>

                    <div style={{ border: '1px solid rgba(255,255,255,0.08)', background: '#0e0e0e', opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)', transition: 'opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s' }}>
                        <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                            <div>
                                <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 800, fontSize: '24px', color: '#f0ede8' }}>requests</span>
                                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: '#6b6b6b', marginLeft: '10px' }}>2.32.3 · PyPI</span>
                            </div>
                            <span className="text-xs px-2.5 py-1" style={{ fontFamily: 'JetBrains Mono, monospace', background: 'rgba(0,204,85,0.1)', color: '#00cc55', border: '1px solid rgba(0,204,85,0.2)' }}>
                                SAFE TO INSTALL
                            </span>
                        </div>
                        <div className="grid grid-cols-2 gap-0">
                            {meta.map((m, i) => (
                                <div key={m.label} className="px-5 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', borderRight: i % 2 === 0 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#6b6b6b', letterSpacing: '0.06em' }}>{m.label.toUpperCase()}</div>
                                    <div style={{ fontSize: '13px', fontWeight: 500, color: m.highlight || '#f0ede8', marginTop: '2px', fontFamily: 'JetBrains Mono, monospace' }}>{m.value}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
