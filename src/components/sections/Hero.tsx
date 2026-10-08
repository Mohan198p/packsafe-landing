import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import Terminal from '../Terminal.tsx'
import { heroLines } from '@/data.ts'

export default function Hero() {
    const [started, setStarted] = useState(false)
    const [copied, setCopied] = useState(false)
    useEffect(() => { setTimeout(() => setStarted(true), 600) }, [])

    const copyInstall = () => {
        navigator.clipboard.writeText('uv tool install packsafe')
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <section
            className="relative pt-[100px] pb-16 px-6 overflow-hidden"
            style={{ minHeight: '100vh', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
        >
            <div className="max-w-[1280px] mx-auto grid lg:grid-cols-2 gap-12 items-center">
                <div>
                    {/* Eyebrow */}
                    <div className="flex items-center gap-2 mb-4">
                        <span
                            style={{
                                fontFamily: 'JetBrains Mono, monospace',
                                fontSize: '11px',
                                color: '#ff3a00',
                                letterSpacing: '0.14em',
                                textTransform: 'uppercase',
                                background: 'rgba(255,58,0,0.08)',
                                border: '1px solid rgba(255,58,0,0.25)',
                                padding: '3px 8px',
                            }}
                        >
                            Open-source supply chain security
                        </span>
                    </div>

                    {/* Headline */}
                    <h1
                        style={{
                            fontFamily: 'Barlow Condensed, sans-serif',
                            fontSize: 'clamp(48px, 5.5vw, 76px)',
                            fontWeight: 900,
                            lineHeight: 0.92,
                            letterSpacing: '-0.02em',
                            color: '#f0ede8',
                        }}
                        className="mb-6 uppercase"
                    >
                        Know what you<br />
                        are about to<br />
                        <span style={{ color: '#ff3a00' }}>install.</span>
                    </h1>

                    {/* Subheadline */}
                    <p style={{ color: 'rgba(240,237,232,0.6)', maxWidth: '500px', lineHeight: 1.65 }} className="text-base mb-8">
                        PackSafe evaluates a package before it reaches your environment, scores it out of 100 across five risk categories, and shows you exactly which checks fired. If it is unsafe, it refuses to install it.
                    </p>

                    {/* Primary & Secondary CTAs */}
                    <div className="flex items-center gap-4 mb-6 flex-wrap">
                        <Link
                            to="/analyze"
                            className="px-6 py-3 text-sm font-medium hover:bg-[#ff5a20] transition-colors"
                            style={{ fontFamily: 'JetBrains Mono, monospace', background: '#ff3a00', color: '#fff' }}
                        >
                            Analyze a package →
                        </Link>
                        <Link
                            to="/docs"
                            className="px-6 py-3 text-sm font-medium hover:border-white/40 transition-colors"
                            style={{
                                fontFamily: 'JetBrains Mono, monospace',
                                border: '1px solid rgba(255,255,255,0.15)',
                                color: '#f0ede8'
                            }}
                        >
                            Read the docs
                        </Link>
                    </div>

                    {/* Install Line directly under CTAs */}
                    <div className="mb-4">
                        <div
                            onClick={copyInstall}
                            className="inline-flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:border-white/30 transition-colors group"
                            style={{
                                background: '#0e0e0e',
                                border: '1px solid rgba(255,255,255,0.12)',
                            }}
                            title="Click to copy install command"
                        >
                            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', color: '#ff3a00' }}>$</span>
                            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', color: '#f0ede8' }}>
                                uv tool install packsafe
                            </span>
                            <span
                                style={{
                                    fontFamily: 'JetBrains Mono, monospace',
                                    fontSize: '10px',
                                    color: copied ? '#00cc55' : '#6b6b6b',
                                    letterSpacing: '0.06em',
                                    marginLeft: '8px',
                                }}
                            >
                                {copied ? '✓ COPIED' : 'COPY'}
                            </span>
                        </div>
                    </div>

                    {/* Trust strip directly under the install command */}
                    <p
                        style={{
                            fontFamily: 'JetBrains Mono, monospace',
                            fontSize: '11px',
                            color: '#6b6b6b',
                            letterSpacing: '0.04em',
                        }}
                    >
                        Python 3.11+ · No account · No telemetry · Open source (Apache-2.0)
                    </p>
                </div>

                {/* Terminal Preview */}
                <div
                    className="w-full overflow-hidden"
                    style={{ background: '#0a0f0a', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                    <div
                        className="flex items-center justify-between px-4 py-2.5"
                        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: '#0d120d' }}
                    >
                        <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#ff3a00]/60" />
                            <div className="w-2.5 h-2.5 rounded-full bg-[#ffaa00]/40" />
                            <div className="w-2.5 h-2.5 rounded-full bg-[#00cc55]/40" />
                        </div>
                        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#4a4a4a', letterSpacing: '0.1em' }}>
                            PACKSAFE ANALYZE — VERDICT REPORT
                        </span>
                        <div />
                    </div>
                    <div className="p-6 pb-10">
                        <Terminal lines={heroLines} started={started} />
                    </div>
                </div>
            </div>
        </section>
    )
}