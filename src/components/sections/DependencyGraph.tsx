import { useInView } from '@/hooks/useInView'
import { depNodes } from '@/data'



const depEdges = depNodes.slice(1).map(n => ({ from: 'express', to: n.id }))

// ─── Section 07: Dependency Graph ─────────────────────────────────────────────
export default function DependencyGraph() {
    const { ref, inView } = useInView(0.1)
    const nodeMap = Object.fromEntries(depNodes.map(n => [n.id, n]))
    const sc = (s: number) => s >= 93 ? '#00cc55' : s >= 88 ? '#ffaa00' : '#ff3a00'

    return (
        <section ref={ref} className="py-32 px-6" style={{ background: '#0b0b0b', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="max-w-[1280px] mx-auto">
                <div className="grid md:grid-cols-[1fr_2fr] gap-16 items-start">
                    <div>
                        <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 'clamp(44px, 5vw, 72px)', fontWeight: 900, lineHeight: 0.92, letterSpacing: '-0.02em', color: '#f0ede8' }} className="mb-6">
                            Every node<br />is a risk<br />surface.
                        </h2>
                        <p style={{ color: 'rgba(240,237,232,0.45)', lineHeight: 1.65 }} className="text-sm mb-8">
                            PackSafe maps and evaluates your full dependency tree — not just the package you asked for. A vulnerable transitive dependency is still your problem.
                        </p>
                        <div className="space-y-2">
                            {[{ c: '#00cc55', l: '93–100  Low risk' }, { c: '#ffaa00', l: '85–92   Moderate risk' }, { c: '#ff3a00', l: '0–84    High risk' }].map(l => (
                                <div key={l.l} className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full" style={{ background: l.c }} />
                                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#6b6b6b' }}>{l.l}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div style={{ border: '1px solid rgba(255,255,255,0.08)', background: '#090909', opacity: inView ? 1 : 0, transition: 'opacity 0.7s ease 0.1s' }}>
                        <div className="px-5 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#4a4a4a', letterSpacing: '0.1em' }}>DEPENDENCY MAP — express@5.1.0 — {depNodes.length} nodes</span>
                        </div>
                        <div className="p-2 overflow-x-auto">
                            <svg viewBox="0 0 800 520" width="100%" style={{ minWidth: '360px' }}>
                                {depEdges.map(edge => {
                                    const from = nodeMap[edge.from]; const to = nodeMap[edge.to]
                                    return <line key={edge.to} x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                                })}
                                {depNodes.map(node => {
                                    const isCenter = node.id === 'express'; const color = sc(node.score)
                                    const w = isCenter ? 96 : 80; const h = isCenter ? 42 : 34
                                    return (
                                        <g key={node.id}>
                                            <rect x={node.x - w / 2} y={node.y - h / 2} width={w} height={h} fill={isCenter ? '#111' : '#0c0c0c'} stroke={isCenter ? color : 'rgba(255,255,255,0.1)'} strokeWidth={isCenter ? 1.5 : 0.5} rx="1" />
                                            <text x={node.x} y={node.y - 4} textAnchor="middle" fill={isCenter ? color : '#9a9a9a'} fontSize={isCenter ? 11 : 9} fontFamily="JetBrains Mono, monospace" fontWeight={isCenter ? 500 : 400}>{node.id}</text>
                                            <text x={node.x} y={node.y + 10} textAnchor="middle" fill={color} fontSize={8} fontFamily="JetBrains Mono, monospace">{node.score}/100</text>
                                        </g>
                                    )
                                })}
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}