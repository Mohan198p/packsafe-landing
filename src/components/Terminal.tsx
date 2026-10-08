
import { useState, useEffect } from "react";
import type { TLine } from "../types.ts";

export default function Terminal({ lines, started }: { lines: TLine[]; started: boolean }) {
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (!started) return
        setCount(0)
        let cancelled = false
        let i = 0

        async function run() {
            for (const line of lines) {
                if (cancelled) return
                await new Promise(r => setTimeout(r, line.delay))
                if (cancelled) return
                i++
                setCount(i)
            }
        }
        run()
        return () => { cancelled = true }
    }, [started])

    return (
        <div style={{ fontFamily: 'JetBrains Mono, monospace' }} className="text-sm leading-6">
            {lines.slice(0, count).map((line, i) => (
                <div
                    key={i}
                    style={{ color: line.color || '#a8a8a8' }}
                    className={line.bold ? 'font-medium' : ''}
                >
                    {line.text || ' '}
                </div>
            ))}
            {count < lines.length && count > 0 && (
                <span
                    className="inline-block w-[7px] h-[14px] cursor-blink"
                    style={{ background: '#00cc55' }}
                />
            )}
        </div>
    )
}