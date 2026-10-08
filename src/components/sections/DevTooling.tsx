import { useCasesData } from "@/data"
import { useInView } from "@/hooks/useInView"

// ─── Section 11: Use Cases ("Where it belongs") ──────────────────────────────
export default function DevTooling() {
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
                    09 · USE CASES
                </span>

                <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 'clamp(48px, 6vw, 88px)', fontWeight: 900, lineHeight: 0.92, letterSpacing: '-0.02em', color: '#f0ede8' }} className="mb-16 uppercase">
                    Where it<br />belongs.
                </h2>
                <div className="grid md:grid-cols-2 gap-0">
                    {useCasesData.map((u, i) => (
                        <div
                            key={u.title}
                            className={`py-10 ${i % 2 === 0 ? 'md:pr-10' : 'md:pl-10'}`}
                            style={{
                                borderTop: '1px solid rgba(255,255,255,0.08)',
                                borderRight: i % 2 === 0 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                                opacity: inView ? 1 : 0,
                                transform: inView ? 'none' : 'translateY(16px)',
                                transition: `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`
                            }}
                        >
                            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#ff3a00', letterSpacing: '0.14em' }} className="block mb-4">
                                {`0${i + 1}`}
                            </span>
                            <h3 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '30px', fontWeight: 700, letterSpacing: '-0.01em', lineHeight: 1.1, color: '#f0ede8' }} className="mb-3 uppercase">
                                {u.title}
                            </h3>
                            <p style={{ color: 'rgba(240,237,232,0.5)', lineHeight: 1.6, fontSize: '13.5px', maxWidth: '380px' }} className="mb-5">
                                {u.desc}
                            </p>
                            <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: '#f0ede8', background: '#0e0e0e', border: '1px solid rgba(255,255,255,0.08)', padding: '5px 12px', display: 'inline-block' }}>
                                $ {u.cmd}
                            </code>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}