import { useEffect } from 'react'

export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    const previousTitle = document.title
    document.title = title

    const meta = description
      ? document.querySelector('meta[name="description"]')
      : null
    const previousDescription = meta?.getAttribute('content') ?? null

    if (meta && description) {
      meta.setAttribute('content', description)
    }

    return () => {
      document.title = previousTitle

      if (meta) {
        if (previousDescription === null) meta.removeAttribute('content')
        else meta.setAttribute('content', previousDescription)
      }
    }
  }, [title, description])
}
