import { useInView } from '@/hooks/useInView'
import { depNodes } from '@/data'

const depEdges = depNodes.slice(1).map(n => ({ from: 'requests', to: n.id }))

// ─── Section 08: Dependency Graph ─────────────────────────────────────────────
export default function DependencyGraph() {
    const { ref, inView } = useInView(0.1)
    const nodeMap = Object.fromEntries(depNodes.map(n => [n.id, n]))
    const sc = (s: number) => s >= 92 ? '#00cc55' : s >= 85 ? '#ffaa00' : '#ff3a00'

    return (
        <section ref={ref} className="py-32 px-6" style={{ background: '#0b0b0b', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="max-w-[1280px] mx-auto">
                <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-start">
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
                            06 · TRANSITIVE RISK
                        </span>

                        <h2 style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 'clamp(44px, 5vw, 72px)', fontWeight: 900, lineHeight: 0.92, letterSpacing: '-0.02em', color: '#f0ede8' }} className="mb-6 uppercase">
                            Every node<br />is a risk<br />surface.
                        </h2>
                        <p style={{ color: 'rgba(240,237,232,0.55)', lineHeight: 1.65 }} className="text-sm mb-8">
                            PackSafe maps and evaluates your full dependency tree — not just the package you asked for. A vulnerable transitive dependency is still your problem.
                        </p>
                        <div className="space-y-2.5">
                            {[
                                { c: '#00cc55', l: '90–100  Safe' },
                                { c: '#00cc55', l: '75–89   Low risk' },
                                { c: '#ffaa00', l: '60–74   Moderate risk' },
                                { c: '#ff3a00', l: '0–59    High / Critical' },
                            ].map(l => (
                                <div key={l.l} className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full" style={{ background: l.c }} />
                                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#888' }}>{l.l}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div style={{ border: '1px solid rgba(255,255,255,0.08)', background: '#090909', opacity: inView ? 1 : 0, transition: 'opacity 0.7s ease 0.1s' }}>
                        <div className="px-5 py-3 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#f0ede8', letterSpacing: '0.1em' }}>
                                DEPENDENCY MAP — requests@2.32.3
                            </span>
                            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#6b6b6b' }}>
                                {depNodes.length} NODES EVALUATED
                            </span>
                        </div>
                        <div className="p-2 overflow-x-auto">
                            <svg viewBox="0 0 800 520" width="100%" style={{ minWidth: '360px' }}>
                                {depEdges.map(edge => {
                                    const from = nodeMap[edge.from]; const to = nodeMap[edge.to]
                                    if (!from || !to) return null
                                    return <line key={edge.to} x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                                })}
                                {depNodes.map(node => {
                                    const isCenter = node.id === 'requests'; const color = sc(node.score)
                                    const w = isCenter ? 104 : 88; const h = isCenter ? 44 : 36
                                    return (
                                        <g key={node.id}>
                                            <rect x={node.x - w / 2} y={node.y - h / 2} width={w} height={h} fill={isCenter ? '#141414' : '#0c0c0c'} stroke={isCenter ? color : 'rgba(255,255,255,0.1)'} strokeWidth={isCenter ? 1.5 : 0.5} rx="2" />
                                            <text x={node.x} y={node.y - 4} textAnchor="middle" fill={isCenter ? color : '#f0ede8'} fontSize={isCenter ? 11 : 9.5} fontFamily="JetBrains Mono, monospace" fontWeight={isCenter ? 600 : 400}>{node.id}</text>
                                            <text x={node.x} y={node.y + 11} textAnchor="middle" fill={color} fontSize={8.5} fontFamily="JetBrains Mono, monospace">{node.score}/100</text>
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