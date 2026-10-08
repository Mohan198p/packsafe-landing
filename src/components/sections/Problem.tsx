import { threats } from "@/data"
import { useInView } from "@/hooks/useInView"



// ─── Section 02: The Problem ──────────────────────────────────────────────────
export default function Problem() {
    const { ref, inView } = useInView()
    return (
        <section ref={ref} className="py-32 px-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="max-w-[1280px] mx-auto">
                <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 'clamp(52px, 7vw, 108px)', fontWeight: 900, lineHeight: 0.92, letterSpacing: '-0.02em', color: '#f0ede8' }} className="mb-24 max-w-[900px]">
                    The package name<br />is only the<br />beginning.
                </h2>
                <div className="grid md:grid-cols-2 gap-0">
                    {threats.map((t, i) => (
                        <div key={t.n} className={`py-10 ${i % 2 === 0 ? 'md:pr-10' : 'md:pl-10'}`} style={{ borderTop: '1px solid rgba(255,255,255,0.08)', borderRight: i % 2 === 0 ? '1px solid rgba(255,255,255,0.08)' : 'none', opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)', transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s` }}>
                            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#ff3a00', letterSpacing: '0.1em' }} className="block mb-4">{t.n}</span>
                            <h3 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '28px', fontWeight: 700, letterSpacing: '-0.01em' }} className="mb-3 text-[#f0ede8]">{t.title}</h3>
                            <p style={{ color: 'rgba(240,237,232,0.45)', lineHeight: 1.65 }} className="text-sm max-w-[380px]">{t.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
