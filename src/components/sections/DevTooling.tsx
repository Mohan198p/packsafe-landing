
import { tools } from "@/data"
import { useInView } from "@/hooks/useInView"


// ─── Section 10: Dev Tooling ──────────────────────────────────────────────────
export default function DevTooling() {
    const { ref, inView } = useInView()
    return (
        <section ref={ref} className="py-32 px-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="max-w-[1280px] mx-auto">
                <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 'clamp(48px, 6vw, 88px)', fontWeight: 900, lineHeight: 0.92, letterSpacing: '-0.02em', color: '#f0ede8' }} className="mb-16">
                    Every surface<br />you work on.
                </h2>
                <div className="grid md:grid-cols-2 gap-0">
                    {tools.map((tool, i) => (
                        <div key={tool.tag} className={`py-10 ${i % 2 === 0 ? 'md:pr-10' : 'md:pl-10'}`} style={{ borderTop: '1px solid rgba(255,255,255,0.08)', borderRight: i % 2 === 0 ? '1px solid rgba(255,255,255,0.08)' : 'none', opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(16px)', transition: `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s` }}>
                            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#ff3a00', letterSpacing: '0.14em' }} className="block mb-4">{tool.tag}</span>
                            <h3 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '28px', fontWeight: 700, letterSpacing: '-0.01em', lineHeight: 1.1, color: '#f0ede8', whiteSpace: 'pre-line' }} className="mb-3">{tool.headline}</h3>
                            <p style={{ color: 'rgba(240,237,232,0.4)', lineHeight: 1.6, fontSize: '13px', maxWidth: '340px' }} className="mb-4">{tool.desc}</p>
                            <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#4a4a4a', background: '#0e0e0e', border: '1px solid rgba(255,255,255,0.06)', padding: '4px 10px', display: 'inline-block' }}>{tool.code}</code>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}