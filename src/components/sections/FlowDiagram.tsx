import { flowSteps } from "@/data"
import { useInView } from "@/hooks/useInView"

// ─── Section 04: Three-Step Pitch & Under The Hood ────────────────────────────
export default function FlowDiagram() {
    const { ref, inView } = useInView(0.05)
    return (
        <section ref={ref} className="py-32 px-6" style={{ background: '#0b0b0b', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="max-w-[1280px] mx-auto">
                <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-20 items-start">
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
                            02 · THE THREE-STEP PITCH
                        </span>

                        <h2
                            style={{
                                fontFamily: 'Barlow Condensed, sans-serif',
                                fontSize: 'clamp(48px, 6vw, 84px)',
                                fontWeight: 900,
                                lineHeight: 0.92,
                                letterSpacing: '-0.02em',
                                color: '#f0ede8',
                            }}
                            className="mb-8 uppercase"
                        >
                            Three commands.<br />
                            That is the whole<br />
                            <span style={{ color: '#ff3a00' }}>interface.</span>
                        </h2>

                        <div className="space-y-8 max-w-[500px]">
                            {/* Step 1 */}
                            <div className="border-l-2 border-[#ff3a00] pl-5">
                                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#ff3a00', letterSpacing: '0.1em' }}>
                                    STEP 1 — LOOK BEFORE YOU INSTALL
                                </span>
                                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', color: '#f0ede8', background: '#121212', padding: '6px 12px', margin: '8px 0', border: '1px solid rgba(255,255,255,0.08)' }}>
                                    $ packsafe analyze requests
                                </div>
                                <p style={{ color: 'rgba(240,237,232,0.5)', lineHeight: 1.6, fontSize: '13px' }}>
                                    Collects evidence from every relevant source, then reports a score, the checks that passed, the risks that fired, and a plain-language recommendation. Nothing is installed.
                                </p>
                            </div>

                            {/* Step 2 */}
                            <div className="border-l-2 border-white/20 pl-5">
                                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#f0ede8', letterSpacing: '0.1em' }}>
                                    STEP 2 — QUESTION THE SCORE
                                </span>
                                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', color: '#f0ede8', background: '#121212', padding: '6px 12px', margin: '8px 0', border: '1px solid rgba(255,255,255,0.08)' }}>
                                    $ packsafe inspect django
                                </div>
                                <p style={{ color: 'rgba(240,237,232,0.5)', lineHeight: 1.6, fontSize: '13px' }}>
                                    Shows every piece of evidence behind a verdict: which advisories affect the resolved version, which do not, where the metadata came from, and how much picture was collected. A number is never presented without a reason.
                                </p>
                            </div>

                            {/* Step 3 */}
                            <div className="border-l-2 border-[#00cc55] pl-5">
                                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#00cc55', letterSpacing: '0.1em' }}>
                                    STEP 3 — INSTALL BEHIND A GATE
                                </span>
                                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', color: '#f0ede8', background: '#121212', padding: '6px 12px', margin: '8px 0', border: '1px solid rgba(255,255,255,0.08)' }}>
                                    $ packsafe install --uv requests
                                </div>
                                <p style={{ color: 'rgba(240,237,232,0.5)', lineHeight: 1.6, fontSize: '13px' }}>
                                    Analyzes, applies policy, and installs only if the package clears it. Safe packages install silently. Packages with warnings prompt you. Packages that trip a critical gate are refused, and nothing is written to your environment.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Under the hood flow steps */}
                    <div className="p-8" style={{ background: '#0e0e0e', border: '1px solid rgba(255,255,255,0.08)' }}>
                        <div className="mb-6 pb-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#ff3a00', letterSpacing: '0.1em' }}>
                                UNDER THE HOOD
                            </span>
                            <h3 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '28px', fontWeight: 800, color: '#f0ede8', marginTop: '4px' }}>
                                The Evaluation Pipeline
                            </h3>
                            <p style={{ color: 'rgba(240,237,232,0.45)', fontSize: '12px', marginTop: '4px', lineHeight: 1.5 }}>
                                Deterministic weights, metric definitions, and policy gates live in configuration files rather than code.
                            </p>
                        </div>

                        <div className="space-y-0">
                            {flowSteps.map((step, i) => (
                                <div
                                    key={i}
                                    className="flex items-start gap-4"
                                    style={{
                                        opacity: inView ? 1 : 0,
                                        transform: inView ? 'none' : 'translateX(20px)',
                                        transition: `opacity 0.4s ease ${i * 0.08}s, transform 0.4s ease ${i * 0.08}s`
                                    }}
                                >
                                    <div className="flex flex-col items-center pt-1">
                                        <div className="w-2 h-2 rounded-full shrink-0" style={{ background: step.color }} />
                                        {i < flowSteps.length - 1 && <div className="w-px flex-1 min-h-[38px]" style={{ background: 'rgba(255,255,255,0.08)' }} />}
                                    </div>
                                    <div className="pb-6">
                                        <div
                                            style={{
                                                fontFamily: step.isFinal ? 'Barlow Condensed, sans-serif' : 'JetBrains Mono, monospace',
                                                fontSize: step.isFinal ? '20px' : '14px',
                                                fontWeight: step.isFinal ? 800 : 500,
                                                color: step.color,
                                                letterSpacing: step.isFinal ? '0.04em' : undefined,
                                            }}
                                        >
                                            {step.label}
                                        </div>
                                        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#6b6b6b', letterSpacing: '0.04em', lineHeight: 1.4 }} className="mt-0.5">
                                            {step.sub}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}