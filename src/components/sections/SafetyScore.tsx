// ─── Section 04: Safety Score ─────────────────────────────────────────────────

import { useInView } from "@/hooks/useInView"
import ScoreBar from "../ScoreBar"
import { signals } from "@/data"


export default function SafetyScore() {
    const { ref, inView } = useInView()
    return (
        <section ref={ref} className="py-32 px-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="max-w-[1280px] mx-auto">
                <div className="grid md:grid-cols-[auto_1fr] gap-20 items-center">
                    <div className="shrink-0" style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(16px)', transition: 'opacity 0.5s ease, transform 0.5s ease' }}>
                        <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 'clamp(80px, 12vw, 180px)', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.03em', color: '#00cc55' }}>94</div>
                        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#00cc55', letterSpacing: '0.16em' }} className="mt-1">/ 100 · LOW RISK</div>
                    </div>
                    <div className="space-y-5">
                        <p style={{ color: 'rgba(240,237,232,0.45)', lineHeight: 1.65, maxWidth: '480px' }} className="text-sm mb-8">
                            PackSafe does not produce a single opaque score. Each signal category is independently evaluated and combined into an explainable overall assessment.
                        </p>
                        {signals.map(s => <ScoreBar key={s.label} label={s.label} score={s.score} inView={inView} />)}
                        <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#3a3a3a', letterSpacing: '0.04em', marginTop: '16px' }}>
                            Based on the signals PackSafe can currently observe, this package presents low risk.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
