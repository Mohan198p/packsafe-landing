
import { useInView } from "@/hooks/useInView"
import Terminal from "../Terminal"
import { cliLines } from "@/data"


// ─── Section 09: CLI Terminal ─────────────────────────────────────────────────
export function CLITerminal() {
    const { ref, inView } = useInView()
    return (
        <section ref={ref} className="py-32 px-6" style={{ background: '#0b0b0b', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="max-w-[1280px] mx-auto">
                <div className="grid md:grid-cols-[1fr_1fr] gap-20 items-center">
                    <div>
                        <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 'clamp(48px, 5.5vw, 80px)', fontWeight: 900, lineHeight: 0.92, letterSpacing: '-0.02em', color: '#f0ede8' }} className="mb-6">
                            Analysis runs<br /><span style={{ color: '#ff3a00' }}>before</span><br />installation.
                        </h2>
                        <p style={{ color: 'rgba(240,237,232,0.45)', lineHeight: 1.65, maxWidth: '360px' }} className="text-sm">
                            The CLI wraps the install workflow. PackSafe fetches metadata, evaluates all signals, and presents a verdict — before a single byte of package code reaches your system.
                        </p>
                    </div>
                    <div style={{ border: '1px solid rgba(255,255,255,0.08)', background: '#0a0f0a' }}>
                        <div className="flex items-center justify-between px-4 py-2.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: '#0d120d' }}>
                            <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#ff3a00]/60" />
                                <div className="w-2.5 h-2.5 rounded-full bg-[#ffaa00]/40" />
                                <div className="w-2.5 h-2.5 rounded-full bg-[#00cc55]/40" />
                            </div>
                            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#3a3a3a', letterSpacing: '0.1em' }}>PACKSAFE CLI</span>
                            <div />
                        </div>
                        <div className="p-6 pb-10"><Terminal lines={cliLines} started={inView} /></div>
                    </div>
                </div>
            </div>
        </section>
    )
}