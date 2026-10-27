import { useState } from 'react'
import { Link } from 'react-router'

// ─── Final CTA & Closing Statement ───────────────────────────────────────────
export default function FinalCTA() {
    const [copiedTool, setCopiedTool] = useState(false)
    const [copiedUvx, setCopiedUvx] = useState(false)

    const copyTool = () => {
        navigator.clipboard.writeText('uv tool install packsafe')
        setCopiedTool(true)
        setTimeout(() => setCopiedTool(false), 2000)
    }

    const copyUvx = () => {
        navigator.clipboard.writeText('uvx packsafe analyze requests')
        setCopiedUvx(true)
        setTimeout(() => setCopiedUvx(false), 2000)
    }

    return (
        <section className="py-20 sm:py-28 lg:py-36 px-4 sm:px-6" style={{ background: '#ff3a00', borderBottom: '1px solid rgba(0,0,0,0.2)' }}>
            <div className="max-w-[1280px] mx-auto">
                <span
                    style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '11px',
                        color: 'rgba(255,255,255,0.75)',
                        letterSpacing: '0.14em',
                    }}
                    className="block mb-4 uppercase"
                >
                    GET STARTED
                </span>

                <h2
                    style={{
                        fontFamily: 'Barlow Condensed, sans-serif',
                        fontSize: 'clamp(44px, 8.5vw, 130px)',
                        fontWeight: 900,
                        lineHeight: 0.9,
                        letterSpacing: '-0.03em',
                        color: '#fff',
                    }}
                    className="mb-6 sm:mb-8 max-w-[1100px] uppercase"
                >
                    The dependency you did not<br className="hidden sm:block" />{' '}
                    choose is still your<br className="hidden sm:block" />{' '}
                    <span style={{ color: '#000' }}>dependency.</span>
                </h2>

                <p
                    style={{
                        color: 'rgba(255,255,255,0.85)',
                        lineHeight: 1.6,
                        maxWidth: '560px',
                        marginBottom: '40px',
                    }}
                    className="text-base"
                >
                    PackSafe does not make you read every package. It makes sure that the ones you install get read by something, and that you find out before it matters.
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-8 sm:mb-10">
                    {/* Primary CTA */}
                    <div
                        onClick={copyTool}
                        className="w-full sm:w-auto px-4 sm:px-6 py-3.5 cursor-pointer bg-white text-[#ff3a00] hover:bg-white/90 transition-colors flex items-center justify-between sm:justify-start gap-3 shadow-lg"
                        style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 'clamp(11px, 3.2vw, 13px)', fontWeight: 600 }}
                        title="Click to copy uv tool install packsafe"
                    >
                        <span>$ uv tool install packsafe</span>
                        <span className="shrink-0" style={{ fontSize: '11px', opacity: 0.7 }}>
                            {copiedTool ? '✓ COPIED' : 'COPY'}
                        </span>
                    </div>

                    {/* Secondary CTA */}
                    <div
                        onClick={copyUvx}
                        className="w-full sm:w-auto px-4 sm:px-6 py-3.5 cursor-pointer text-white border border-white/40 hover:bg-white/10 transition-colors flex items-center justify-between sm:justify-start gap-3"
                        style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 'clamp(11px, 3.2vw, 13px)' }}
                        title="Click to copy uvx command (no install required)"
                    >
                        <span>$ uvx packsafe analyze requests</span>
                        <span className="shrink-0" style={{ fontSize: '11px', opacity: 0.7 }}>
                            {copiedUvx ? '✓ COPIED' : 'COPY'}
                        </span>
                    </div>

                    {/* Tertiary CTA */}
                    <Link
                        to="/docs"
                        className="self-start sm:self-auto px-2 sm:px-6 py-2 sm:py-3.5 text-white/90 hover:text-white underline underline-offset-4 text-sm font-medium"
                        style={{ fontFamily: 'JetBrains Mono, monospace' }}
                    >
                        Read the docs →
                    </Link>
                </div>

                <div className="flex items-center gap-x-4 sm:gap-x-6 gap-y-2 text-xs text-white/70 font-mono flex-wrap">
                    <span>• Python 3.11+</span>
                    <span>• No account required</span>
                    <span>• No telemetry</span>
                    <span>• Open source (Apache-2.0)</span>
                </div>
            </div>
        </section>
    )
}
