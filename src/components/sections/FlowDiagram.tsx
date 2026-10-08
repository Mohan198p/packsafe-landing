
import { flowSteps } from "@/data"
import { useInView } from "@/hooks/useInView"


// ─── Section 03: Flow Diagram ─────────────────────────────────────────────────
export default function FlowDiagram() {
    const { ref, inView } = useInView(0.05)
    return (
        <section ref={ref} className="py-32 px-6" style={{ background: '#0b0b0b', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="max-w-[1280px] mx-auto">
                <div className="grid md:grid-cols-[1fr_1fr] gap-20 items-start">
                    <div>
                        <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 'clamp(48px, 6vw, 88px)', fontWeight: 900, lineHeight: 0.92, letterSpacing: '-0.02em', color: '#f0ede8' }} className="mb-8">
                            Verify before<br />you install.
                        </h2>
                        <p style={{ color: 'rgba(240,237,232,0.45)', lineHeight: 1.65, maxWidth: '380px' }} className="text-sm">
                            PackSafe sits at the exact moment between an AI recommendation and package installation. Every signal is independently evaluated before a decision is made.
                        </p>
                    </div>
                    <div className="space-y-0">
                        {flowSteps.map((step, i) => (
                            <div key={i} className="flex items-start gap-4" style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateX(20px)', transition: `opacity 0.4s ease ${i * 0.08}s, transform 0.4s ease ${i * 0.08}s` }}>
                                <div className="flex flex-col items-center pt-1">
                                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: step.color }} />
                                    {i < flowSteps.length - 1 && <div className="w-px flex-1 min-h-[36px]" style={{ background: 'rgba(255,255,255,0.08)' }} />}
                                </div>
                                <div className="pb-6">
                                    <div style={{ fontFamily: step.isFinal ? 'Barlow Condensed, sans-serif' : undefined, fontSize: step.isFinal ? '22px' : '15px', fontWeight: step.isFinal ? 800 : 500, color: step.color, letterSpacing: step.isFinal ? '0.04em' : undefined }}>{step.label}</div>
                                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#4a4a4a', letterSpacing: '0.06em' }} className="mt-0.5">{step.sub}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}