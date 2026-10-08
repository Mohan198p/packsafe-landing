import { behaviorChecks } from "@/data"
import { useInView } from "@/hooks/useInView"

// ─── Section 07: Policy Gates & Behavior Analysis ─────────────────────────────
export default function BehaviorAnalysis() {
    const { ref, inView } = useInView()
    const icon = (s: string) => s === 'pass' ? { i: '✓', c: '#00cc55' } : s === 'warn' ? { i: '⚠', c: '#ffaa00' } : { i: '✗', c: '#ff3a00' }

    return (
        <section ref={ref} className="py-32 px-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="max-w-[1280px] mx-auto">
                <div className="grid lg:grid-cols-[1fr_1fr] gap-20 items-start">
                    <div style={{ border: '1px solid rgba(255,255,255,0.08)', background: '#0a0f0a', opacity: inView ? 1 : 0, transition: 'opacity 0.5s ease' }}>
                        <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: '#0d120d' }}>
                            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#f0ede8', letterSpacing: '0.1em' }}>
                                STATIC ANALYSIS & POLICY GATES — requests@2.32.3
                            </span>
                            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#00cc55' }}>
                                ALL GATES PASSED
                            </span>
                        </div>
                        <div className="px-5 py-5 space-y-3.5">
                            {behaviorChecks.map((c, i) => {
                                const { i: ico, c: col } = icon(c.status)
                                return (
                                    <div key={i} className="flex items-start gap-3" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', opacity: inView ? 1 : 0, transition: `opacity 0.3s ease ${0.1 + i * 0.07}s` }}>
                                        <span style={{ color: col, width: '14px', flexShrink: 0, marginTop: '1px' }}>{ico}</span>
                                        <span style={{ color: c.status === 'warn' ? '#ffaa00' : 'rgba(240,237,232,0.75)', lineHeight: 1.5 }}>{c.label}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

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
                            05 · POLICY GATES
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
                            Policy gates,<br />
                            not just a<br />
                            <span style={{ color: '#ffaa00' }}>threshold.</span>
                        </h2>

                        <p style={{ color: 'rgba(240,237,232,0.55)', lineHeight: 1.65, maxWidth: '440px' }} className="text-sm mb-6">
                            Some findings are not a matter of degree. Behaviour consistent with credential theft, remote code execution, or a package that installs malware triggers a hard gate: the score is floored and the install is refused, no matter how well the package scores elsewhere.
                        </p>

                        <div className="p-4" style={{ background: '#0e0e0e', border: '1px solid rgba(255,255,255,0.08)', maxWidth: '440px' }}>
                            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#ff3a00', marginBottom: '4px' }}>
                                IT NEVER INSTALLS GLOBALLY
                            </div>
                            <p style={{ color: 'rgba(240,237,232,0.45)', fontSize: '12px', lineHeight: 1.5 }}>
                                PackSafe refuses to install into a system Python. It resolves your activated virtualenv or <code className="text-[#f0ede8]">./.venv</code> and stops with an explanation if neither exists.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}