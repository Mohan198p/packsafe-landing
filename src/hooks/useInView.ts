import { useState, useRef, useEffect } from "react"


export function useInView(threshold = 0.12) {
    const ref = useRef<HTMLDivElement>(null)
    const [inView, setInView] = useState(false)
    useEffect(() => {
        const el = ref.current
        if (!el) return
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) setInView(true) },
            { threshold }
        )
        obs.observe(el)
        return () => obs.disconnect()
    }, [])
    return { ref, inView }
}