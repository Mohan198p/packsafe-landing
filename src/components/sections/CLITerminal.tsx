import { useInView } from "@/hooks/useInView"
import Terminal from "../Terminal"
import { cliLines } from "@/data"

// ─── Section 10: Sample Output & Install Gate ─────────────────────────────────
export function CLITerminal() {
    const { ref, inView } = useInView()
    return (
        <section ref={ref} className="py-32 px-6" style={{ background: '#0b0b0b', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="max-w-[1280px] mx-auto">
                <div className="grid lg:grid-cols-[1fr_1fr] gap-20 items-center">
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
                            08 · INSTALL BEHIND A GATE
                        </span>

                        <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 'clamp(48px, 5.5vw, 80px)', fontWeight: 900, lineHeight: 0.92, letterSpacing: '-0.02em', color: '#f0ede8' }} className="mb-6 uppercase">
                            The whole report<br />fits on<br /><span style={{ color: '#ff3a00' }}>one screen.</span>
                        </h2>

                        <p style={{ color: 'rgba(240,237,232,0.55)', lineHeight: 1.65, maxWidth: '420px' }} className="text-sm mb-6">
                            Analyzes, applies policy, and installs only if the package clears it. Safe packages install silently. Packages with warnings prompt you. Packages that trip a critical gate are refused, and nothing is written to your environment.
                        </p>

                        <div className="p-4 space-y-2" style={{ background: '#0e0e0e', border: '1px solid rgba(255,255,255,0.08)', maxWidth: '420px' }}>
                            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#ff3a00' }}>
                                EXIT CODE CONTRACT
                            </div>
                            <p style={{ color: 'rgba(240,237,232,0.5)', fontSize: '12px', lineHeight: 1.5 }}>
                                <span style={{ color: '#ff3a00', fontWeight: 600 }}>Exit code 4</span> means blocked by policy. A CI pipeline can distinguish "this package is unsafe" from "the network is down" (<span style={{ color: '#ffaa00' }}>code 2</span>).
                            </p>
                        </div>
                    </div>

                    <div style={{ border: '1px solid rgba(255,255,255,0.08)', background: '#0a0f0a' }}>
                        <div className="flex items-center justify-between px-4 py-2.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: '#0d120d' }}>
                            <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#ff3a00]/60" />
                                <div className="w-2.5 h-2.5 rounded-full bg-[#ffaa00]/40" />
                                <div className="w-2.5 h-2.5 rounded-full bg-[#00cc55]/40" />
                            </div>
                            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#ff3a00', letterSpacing: '0.1em' }}>
                                PACKSAFE INSTALL — GATE REFUSAL
                            </span>
                            <div />
                        </div>
                        <div className="p-6 pb-10"><Terminal lines={cliLines} started={inView} /></div>
                    </div>
                </div>
            </div>
        </section>
    )
}