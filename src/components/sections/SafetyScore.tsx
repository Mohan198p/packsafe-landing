import { useInView } from "@/hooks/useInView"
import ScoreBar from "../ScoreBar"
import { signals } from "@/data"

// ─── Section 05: A Score You Can Take Apart ───────────────────────────────────
export default function SafetyScore() {
    const { ref, inView } = useInView()
    return (
        <section ref={ref} className="py-32 px-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="max-w-[1280px] mx-auto">
                <span
                    style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '11px',
                        color: '#ff3a00',
                        letterSpacing: '0.14em',
                    }}
                    className="block mb-4 uppercase"
                >
                    03 · EXPLAINABLE SCORING
                </span>

                <div className="grid lg:grid-cols-[auto_1fr] gap-20 items-center">
                    <div className="shrink-0" style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(16px)', transition: 'opacity 0.5s ease, transform 0.5s ease' }}>
                        <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 'clamp(80px, 12vw, 170px)', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.03em', color: '#00cc55' }}>
                            91
                        </div>
                        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: '#00cc55', letterSpacing: '0.16em' }} className="mt-2">
                            / 100 · LOW RISK · SAFE TO INSTALL
                        </div>
                        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#4a4a4a', marginTop: '6px' }}>
                            Config Digest: 7f3c9a21 · Engine 0.1.2
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h2
                                style={{
                                    fontFamily: 'Barlow Condensed, sans-serif',
                                    fontSize: 'clamp(40px, 5vw, 64px)',
                                    fontWeight: 900,
                                    lineHeight: 0.95,
                                    letterSpacing: '-0.02em',
                                    color: '#f0ede8',
                                }}
                                className="mb-4 uppercase"
                            >
                                A score you can<br />take apart.
                            </h2>
                            <p style={{ color: 'rgba(240,237,232,0.55)', lineHeight: 1.65, maxWidth: '520px' }} className="text-sm">
                                One number is easy to produce and hard to trust. PackSafe's score is assembled from weighted metrics across five categories — security, integrity, supply chain, maintenance, and adoption. Every run reports a SHA-256 digest of the exact configuration that produced it.
                            </p>
                        </div>

                        <div className="space-y-4 pt-2">
                            {signals.map(s => <ScoreBar key={s.label} label={s.label} score={s.score} inView={inView} />)}
                        </div>

                        <div
                            style={{
                                fontFamily: 'JetBrains Mono, monospace',
                                fontSize: '11px',
                                color: '#6b6b6b',
                                letterSpacing: '0.04em',
                                paddingTop: '12px',
                                borderTop: '1px solid rgba(255,255,255,0.06)'
                            }}
                        >
                            Weights sum strictly to 1.00 (validated at engine load time). A score can be reproduced, or challenged, months later.
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
