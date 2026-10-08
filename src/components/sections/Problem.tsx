import { threats } from "@/data"
import { useInView } from "@/hooks/useInView"

// ─── Section 03: The Problem ──────────────────────────────────────────────────
export default function Problem() {
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
                    01 · THE PROBLEM
                </span>

                <h2
                    style={{
                        fontFamily: 'Barlow Condensed, sans-serif',
                        fontSize: 'clamp(52px, 7vw, 104px)',
                        fontWeight: 900,
                        lineHeight: 0.92,
                        letterSpacing: '-0.02em',
                        color: '#f0ede8',
                    }}
                    className="mb-8 max-w-[960px] uppercase"
                >
                    You cannot read<br />every dependency.
                </h2>

                <div className="grid md:grid-cols-2 gap-8 mb-20">
                    <p style={{ color: 'rgba(240,237,232,0.6)', lineHeight: 1.7 }} className="text-base">
                        Your project depends on hundreds of packages. Each one was published by a stranger, pushed by an automated workflow, and installed without being read. A package name tells you nothing about whether the code inside it will steal your credentials, phone home to an attacker, or quietly exfiltrate your environment variables.
                    </p>
                    <div className="flex items-center">
                        <p
                            style={{
                                fontFamily: 'Barlow Condensed, sans-serif',
                                fontSize: 'clamp(28px, 3.5vw, 42px)',
                                fontWeight: 800,
                                lineHeight: 1.1,
                                color: '#f0ede8',
                                borderLeft: '2px solid #ff3a00',
                                paddingLeft: '24px',
                            }}
                        >
                            Existing tools hand you a list.<br />
                            <span style={{ color: '#ff3a00' }}>PackSafe hands you a decision.</span>
                        </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-0">
                    {threats.map((t, i) => (
                        <div
                            key={t.n}
                            className={`py-10 ${i % 2 === 0 ? 'md:pr-10' : 'md:pl-10'}`}
                            style={{
                                borderTop: '1px solid rgba(255,255,255,0.08)',
                                borderRight: i % 2 === 0 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                                opacity: inView ? 1 : 0,
                                transform: inView ? 'none' : 'translateY(20px)',
                                transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`
                            }}
                        >
                            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#ff3a00', letterSpacing: '0.1em' }} className="block mb-4">
                                {t.n}
                            </span>
                            <h3 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '32px', fontWeight: 800, letterSpacing: '-0.01em' }} className="mb-3 text-[#f0ede8] uppercase">
                                {t.title}
                            </h3>
                            <p style={{ color: 'rgba(240,237,232,0.5)', lineHeight: 1.65 }} className="text-sm max-w-[420px]">
                                {t.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
