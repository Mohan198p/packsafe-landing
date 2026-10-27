import { Badge } from '@/components/Markdown'

export default function TagList({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
      {tags.map(tag => (
        <Badge key={tag}>{tag.toUpperCase()}</Badge>
      ))}
    </div>
  )
}
