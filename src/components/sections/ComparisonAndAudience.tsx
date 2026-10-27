import { comparisonData, audienceData } from "@/data"
import { useInView } from "@/hooks/useInView"

// ─── Section 12: Comparison & Audience Framing ────────────────────────────────
export default function ComparisonAndAudience() {
    const { ref, inView } = useInView()

    return (
        <section ref={ref} className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6" style={{ background: '#0b0b0b', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="max-w-[1280px] mx-auto">
                {/* 10. How it is different */}
                <div className="mb-14 sm:mb-24">
                    <span
                        style={{
                            fontFamily: 'JetBrains Mono, monospace',
                            fontSize: '11px',
                            color: '#ff3a00',
                            letterSpacing: '0.14em',
                        }}
                        className="block mb-4 uppercase"
                    >
                        09 · COMPARISON FRAMING
                    </span>

                    <h2
                        style={{
                            fontFamily: 'Barlow Condensed, sans-serif',
                            fontSize: 'clamp(48px, 6vw, 88px)',
                            fontWeight: 900,
                            lineHeight: 0.92,
                            letterSpacing: '-0.02em',
                            color: '#f0ede8',
                        }}
                        className="mb-8 sm:mb-12 uppercase"
                    >
                        How it is<br />different.
                    </h2>

                    {/* Mobile: stacked comparison cards */}
                    <div
                        className="md:hidden"
                        style={{
                            border: '1px solid rgba(255,255,255,0.08)',
                            background: '#0e0e0e',
                        }}
                    >
                        {comparisonData.map((row, i) => (
                            <div
                                key={row.aspect}
                                style={{
                                    padding: '16px',
                                    borderTop: i > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                                }}
                            >
                                <div
                                    style={{
                                        fontFamily: 'JetBrains Mono, monospace',
                                        fontSize: '11px',
                                        color: '#ff3a00',
                                        letterSpacing: '0.08em',
                                        marginBottom: '12px',
                                    }}
                                >
                                    {row.aspect}
                                </div>
                                <div className="space-y-3">
                                    <div>
                                        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', color: '#6b6b6b', letterSpacing: '0.1em', marginBottom: '3px' }}>
                                            TRADITIONAL SCANNERS
                                        </div>
                                        <p style={{ fontSize: '12.5px', color: 'rgba(240,237,232,0.45)', lineHeight: 1.5 }}>
                                            {row.traditional}
                                        </p>
                                    </div>
                                    <div style={{ borderLeft: '2px solid rgba(255,58,0,0.5)', paddingLeft: '10px' }}>
                                        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '9px', color: '#ff3a00', letterSpacing: '0.1em', marginBottom: '3px' }}>
                                            PACKSAFE
                                        </div>
                                        <p style={{ fontSize: '12.5px', color: '#f0ede8', lineHeight: 1.5 }}>
                                            <span style={{ color: '#00cc55', marginRight: '6px' }}>✓</span>
                                            {row.packsafe}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Desktop: comparison table */}
                    <div
                        className="hidden md:block overflow-x-auto"
                        style={{
                            border: '1px solid rgba(255,255,255,0.08)',
                            background: '#0e0e0e',
                        }}
                    >
                        <table className="w-full text-left border-collapse" style={{ minWidth: '600px' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', background: '#121212' }}>
                                    <th style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#6b6b6b', padding: '14px 20px', width: '25%' }}>
                                        DIMENSION
                                    </th>
                                    <th style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#888', padding: '14px 20px', width: '37.5%' }}>
                                        TRADITIONAL SCANNERS
                                    </th>
                                    <th style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#ff3a00', padding: '14px 20px', width: '37.5%' }}>
                                        PACKSAFE
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparisonData.map((row, i) => (
                                    <tr
                                        key={row.aspect}
                                        style={{
                                            borderBottom: i < comparisonData.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                                        }}
                                    >
                                        <td style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: '#f0ede8', padding: '16px 20px', fontWeight: 600 }}>
                                            {row.aspect}
                                        </td>
                                        <td style={{ fontSize: '13px', color: 'rgba(240,237,232,0.45)', padding: '16px 20px', lineHeight: 1.5 }}>
                                            {row.traditional}
                                        </td>
                                        <td style={{ fontSize: '13px', color: '#f0ede8', padding: '16px 20px', lineHeight: 1.5, background: 'rgba(255,58,0,0.02)' }}>
                                            <span style={{ color: '#00cc55', marginRight: '6px' }}>✓</span>
                                            {row.packsafe}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* 09. Who it is for */}
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
                        10 · AUDIENCE
                    </span>

                    <h2
                        style={{
                            fontFamily: 'Barlow Condensed, sans-serif',
                            fontSize: 'clamp(40px, 5vw, 68px)',
                            fontWeight: 900,
                            lineHeight: 0.95,
                            letterSpacing: '-0.02em',
                            color: '#f0ede8',
                        }}
                        className="mb-8 sm:mb-10 uppercase"
                    >
                        Who it is for.
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {audienceData.map((a, i) => (
                            <div
                                key={a.role}
                                className="p-5 sm:p-6"
                                style={{
                                    background: '#0e0e0e',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    opacity: inView ? 1 : 0,
                                    transform: inView ? 'none' : 'translateY(12px)',
                                    transition: `opacity 0.4s ease ${i * 0.08}s, transform 0.4s ease ${i * 0.08}s`
                                }}
                            >
                                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#ff3a00', letterSpacing: '0.1em' }} className="block mb-3">
                                    {`0${i + 1}`}
                                </span>
                                <h3 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '22px', fontWeight: 800, color: '#f0ede8' }} className="mb-2 uppercase">
                                    {a.role}
                                </h3>
                                <p style={{ fontSize: '12.5px', color: 'rgba(240,237,232,0.5)', lineHeight: 1.6 }}>
                                    {a.benefit}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
