
import { behaviorChecks } from "@/data"
import { useInView } from "@/hooks/useInView"



// ─── Section 06: Behavior Analysis ───────────────────────────────────────────
export default function BehaviorAnalysis() {
    const { ref, inView } = useInView()
    const icon = (s: string) => s === 'pass' ? { i: '✓', c: '#00cc55' } : s === 'warn' ? { i: '⚠', c: '#ffaa00' } : { i: '✗', c: '#ff3a00' }
    return (
        <section ref={ref} className="py-32 px-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="max-w-[1280px] mx-auto">
                <div className="grid md:grid-cols-[1fr_1fr] gap-20 items-start">
                    <div style={{ border: '1px solid rgba(255,255,255,0.08)', background: '#0a0f0a', opacity: inView ? 1 : 0, transition: 'opacity 0.5s ease' }}>
                        <div className="px-5 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#f0ede8', letterSpacing: '0.1em' }}>INSTALL BEHAVIOR — express@5.1.0</span>
                        </div>
                        <div className="px-5 py-5 space-y-3">
                            {behaviorChecks.map((c, i) => {
                                const { i: ico, c: col } = icon(c.status)
                                return (
                                    <div key={i} className="flex items-center gap-3" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', opacity: inView ? 1 : 0, transition: `opacity 0.3s ease ${0.1 + i * 0.07}s` }}>
                                        <span style={{ color: col, width: '14px', flexShrink: 0 }}>{ico}</span>
                                        <span style={{ color: c.status === 'warn' ? '#ffaa00' : 'rgba(240,237,232,0.7)' }}>{c.label}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div>
                        <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 'clamp(48px, 5.5vw, 80px)', fontWeight: 900, lineHeight: 0.92, letterSpacing: '-0.02em', color: '#f0ede8' }} className="mb-6">
                            What happens<br />when you run<br /><span style={{ color: '#ffaa00' }}>install.</span>
                        </h2>
                        <p style={{ color: 'rgba(240,237,232,0.45)', lineHeight: 1.65, maxWidth: '360px' }} className="text-sm">
                            PackSafe inspects install lifecycle scripts, outbound network calls, dependency chain anomalies, and maintainer behavior patterns before the package touches your system.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}