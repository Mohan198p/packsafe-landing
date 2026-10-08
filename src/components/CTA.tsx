import { Link } from 'react-router'

// ─── Final CTA ────────────────────────────────────────────────────────────────

export default function FinalCTA() {
    return (
        <section className="py-40 px-6" style={{ background: '#ff3a00', borderBottom: '1px solid rgba(0,0,0,0.2)' }}>
            <div className="max-w-[1280px] mx-auto">
                <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 'clamp(64px, 10vw, 152px)', fontWeight: 900, lineHeight: 0.88, letterSpacing: '-0.03em', color: '#fff' }} className="mb-10 max-w-[1000px]">
                    Before you install it,<br /><span style={{ opacity: 0.55 }}>PackSafe it.</span>
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, maxWidth: '420px', marginBottom: '40px' }} className="text-base">
                    Understand the package before it becomes part of your project.
                </p>
                <div className="flex items-center gap-4 flex-wrap">
                    <Link to="/analyze" className="px-7 py-3.5 text-sm font-medium hover:bg-black/10 transition-colors" style={{ fontFamily: 'JetBrains Mono, monospace', background: '#fff', color: '#ff3a00', letterSpacing: '0.02em' }}>Analyze a package</Link>
                    <a href="#" className="px-7 py-3.5 text-sm font-medium hover:bg-white/10 transition-colors" style={{ fontFamily: 'JetBrains Mono, monospace', border: '1px solid rgba(255,255,255,0.35)', color: '#fff', letterSpacing: '0.02em' }}>Install PackSafe</a>
                </div>
            </div>
        </section>
    )
}
