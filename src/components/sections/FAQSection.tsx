import { useState } from 'react'
import { faqData } from "@/data"
import { useInView } from "@/hooks/useInView"

// ─── Section 13: Frequently Asked Questions ──────────────────────────────────
export default function FAQSection() {
    const { ref } = useInView()
    const [openIdx, setOpenIdx] = useState<number | null>(0)

    const toggle = (i: number) => {
        setOpenIdx(openIdx === i ? null : i)
    }

    return (
        <section ref={ref} className="py-32 px-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="max-w-[1280px] mx-auto">
                <span
                    style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '11px',
                        color: '#ff3a00',
                        letterSpacing: '0.14em',
                    }}
                    className="block mb-4 uppercase"
                >
                    12 · FREQUENTLY ASKED QUESTIONS
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
                    className="mb-14 uppercase"
                >
                    Questions &<br />answers.
                </h2>

                <div className="max-w-[840px] divide-y divide-white/[0.06] border-y border-white/[0.08]">
                    {faqData.map((item, i) => {
                        const isOpen = openIdx === i
                        return (
                            <div key={item.q} className="py-6">
                                <button
                                    onClick={() => toggle(i)}
                                    className="w-full text-left flex items-center justify-between gap-6 cursor-pointer group focus:outline-none"
                                >
                                    <span
                                        style={{
                                            fontFamily: 'Barlow Condensed, sans-serif',
                                            fontSize: '24px',
                                            fontWeight: 700,
                                            letterSpacing: '-0.01em',
                                            color: isOpen ? '#ff3a00' : '#f0ede8',
                                            transition: 'color 0.15s ease',
                                        }}
                                    >
                                        {item.q}
                                    </span>
                                    <span
                                        style={{
                                            fontFamily: 'JetBrains Mono, monospace',
                                            fontSize: '16px',
                                            color: isOpen ? '#ff3a00' : '#6b6b6b',
                                            transform: isOpen ? 'rotate(45deg)' : 'none',
                                            transition: 'transform 0.2s ease, color 0.15s ease',
                                        }}
                                        className="shrink-0"
                                    >
                                        +
                                    </span>
                                </button>
                                {isOpen && (
                                    <div className="mt-4 pr-12">
                                        <p style={{ color: 'rgba(240,237,232,0.6)', lineHeight: 1.7, fontSize: '14px' }}>
                                            {item.a}
                                        </p>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
