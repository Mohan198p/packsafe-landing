import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import Terminal from '../Terminal.tsx';
import { heroLines } from '@/data.ts';

export default function Hero() {
    const [started, setStarted] = useState(false)
    useEffect(() => { setTimeout(() => setStarted(true), 600) }, [])

    return (
        <section
            className="relative pt-[100px] pb-0 px-6 overflow-hidden"
            style={{ minHeight: '100vh', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
        >
            <div className="max-w-[1280px] mx-auto grid lg:grid-cols-2 gap-12 items-center">
                <div>
                    <h1
                        style={{
                            fontFamily: 'Barlow Condensed, sans-serif',
                            fontSize: 'clamp(48px, 5vw, 72px)',
                            fontWeight: 900,
                            lineHeight: 0.92,
                            letterSpacing: '-0.02em',
                            color: '#f0ede8',
                        }}
                        className="mb-8"
                    >
                        Your AI can write<br />
                        the code.<br />
                        <span style={{ color: '#ff3a00' }}>PackSafe</span> checks<br />
                        what it imports.
                    </h1>

                    <p style={{ color: 'rgba(240,237,232,0.55)', maxWidth: '480px', lineHeight: 1.6 }} className="text-base mb-8">
                        AI-generated dependencies can be hallucinated, misleading, vulnerable, or malicious.
                        PackSafe analyzes packages before installation so developers can verify what they are
                        about to add.
                    </p>

                    <div className="flex items-center gap-4">
                        <Link
                            to="/analyze"
                            className="px-6 py-3 text-sm font-medium hover:bg-[#ff5a20] transition-colors"
                            style={{ fontFamily: 'JetBrains Mono, monospace', background: '#ff3a00', color: '#fff' }}
                        >
                            Analyze a package
                        </Link>
                        <a
                            href="#"
                            className="px-6 py-3 text-sm font-medium hover:border-white/40 transition-colors"
                            style={{
                                fontFamily: 'JetBrains Mono, monospace',
                                border: '1px solid rgba(255,255,255,0.15)',
                                color: '#f0ede8'
                            }}
                        >
                            Install PackSafe
                        </a>
                    </div>
                </div>

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
                        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', color: '#3a3a3a', letterSpacing: '0.1em' }}>
                            PACKSAFE — zsh
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