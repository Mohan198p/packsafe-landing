// ─── Score Bar ────────────────────────────────────────────────────────────────

export default function ScoreBar({ label, score, inView }: { label: string; score: number; inView: boolean }) {
    const color = score >= 95 ? '#00cc55' : score >= 85 ? '#ffaa00' : '#ff3a00'
    const [name, weight] = label.split(' (')
    return (
        <div className="flex items-center gap-2 sm:gap-4">
            <span style={{ fontFamily: 'JetBrains Mono, monospace', color: '#6b6b6b' }} className="text-[10px] sm:text-xs w-28 sm:w-44 shrink-0" title={label}>
                {name}
                {weight && <span className="hidden sm:inline"> ({weight}</span>}
            </span>
            <div className="flex-1 min-w-0 h-px bg-white/10 relative overflow-hidden">
                <div
                    className="absolute left-0 top-0 h-full transition-all duration-1000 ease-out"
                    style={{
                        width: inView ? `${score}%` : '0%',
                        background: color,
                        transitionDelay: '200ms'
                    }}
                />
            </div>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', color }} className="text-sm w-8 text-right shrink-0">
                {score}
            </span>
        </div>
    )
}