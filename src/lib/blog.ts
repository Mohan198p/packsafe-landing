export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  author: string
  tags: string[]
  draft: boolean
  readingTime: number
  content: string
}

type FrontmatterValue = string | string[] | boolean
type Frontmatter = Record<string, FrontmatterValue>

// Every .md file in content/blog is bundled at build time. No server or API
// needed. When a CMS is added later, this module is the only thing that has to
// change — the pages consume BlogPost objects.
const rawPosts = import.meta.glob('/content/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

function unquote(value: string): string {
  const trimmed = value.trim()
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1)
  }
  return trimmed
}

function parseFrontmatterBlock(block: string): Frontmatter {
  const data: Frontmatter = {}
  const lines = block.split(/\r?\n/)

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (!line.trim() || line.trimStart().startsWith('#')) continue

    const match = /^([A-Za-z0-9_-]+):\s*(.*)$/.exec(line)
    if (!match) continue

    const key = match[1]
    const value = match[2].trim()

    // YAML block scalars: description: > or description: |
    if (value === '>' || value === '|') {
      const parts: string[] = []
      while (i + 1 < lines.length && (/^\s+/.test(lines[i + 1]) || !lines[i + 1].trim())) {
        parts.push(lines[i + 1].replace(/^\s{2}/, ''))
        i++
      }
      data[key] = value === '|'
        ? parts.join('\n').trim()
        : parts.join(' ').replace(/\s+/g, ' ').trim()
      continue
    }

    // YAML list:
    // tags:
    //   - security
    //   - python
    if (!value) {
      const list: string[] = []
      while (i + 1 < lines.length) {
        const item = /^\s*-\s+(.*)$/.exec(lines[i + 1])
        if (!item) break
        list.push(unquote(item[1]))
        i++
      }
      data[key] = list.length > 0 ? list : ''
      continue
    }

    // Inline list: tags: [security, python]
    if (value.startsWith('[') && value.endsWith(']')) {
      data[key] = value
        .slice(1, -1)
        .split(',')
        .map(part => unquote(part))
        .filter(Boolean)
      continue
    }

    if (/^(true|false)$/i.test(value)) {
      data[key] = value.toLowerCase() === 'true'
      continue
    }

    data[key] = unquote(value)
  }

  return data
}

function parseFrontmatter(source: string): { data: Frontmatter; content: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(source)
  if (!match) return { data: {}, content: source.trim() }
  return {
    data: parseFrontmatterBlock(match[1]),
    content: source.slice(match[0].length).trim(),
  }
}

function slugFromPath(path: string): string {
  return path.split('/').pop()!.replace(/\.md$/i, '')
}

function titleFromSlug(slug: string): string {
  return slug
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase())
}

function asString(value: FrontmatterValue | undefined, fallback = ''): string {
  return typeof value === 'string' ? value : fallback
}

function asStringArray(value: FrontmatterValue | undefined): string[] {
  if (Array.isArray(value)) return value
  if (typeof value === 'string' && value.trim()) {
    return value.split(',').map(part => part.trim()).filter(Boolean)
  }
  return []
}

function stripMarkdown(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/[*_~>#-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function excerpt(content: string, maxLength = 160): string {
  const plain = stripMarkdown(content)
  if (plain.length <= maxLength) return plain
  return `${plain.slice(0, maxLength).replace(/\s+\S*$/, '')}…`
}

function readingTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200))
}

function dateValue(date: string): number {
  if (!date) return 0
  const parsed = new Date(date.length === 10 ? `${date}T00:00:00` : date)
  return Number.isNaN(parsed.getTime()) ? 0 : parsed.getTime()
}

function buildPosts(): BlogPost[] {
  return Object.entries(rawPosts)
    .filter(([path]) => {
      const filename = path.split('/').pop()!.toLowerCase()
      return !filename.startsWith('_') && filename !== 'readme.md'
    })
    .map(([path, source]) => {
      const { data, content } = parseFrontmatter(source)
      const slug = slugFromPath(path)

      return {
        slug,
        title: asString(data.title) || titleFromSlug(slug),
        description: asString(data.description) || excerpt(content),
        date: asString(data.date),
        author: asString(data.author) || 'PackSafe Team',
        tags: asStringArray(data.tags),
        draft: data.draft === true,
        readingTime: readingTime(content),
        content,
      }
    })
    .filter(post => !post.draft || import.meta.env.DEV)
    .sort((a, b) => dateValue(b.date) - dateValue(a.date) || a.title.localeCompare(b.title))
}

const posts = buildPosts()

export function getAllPosts(): BlogPost[] {
  return posts
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find(post => post.slug === slug)
}

export function getAdjacentPosts(slug: string): {
  newer?: BlogPost
  older?: BlogPost
} {
  const index = posts.findIndex(post => post.slug === slug)
  if (index === -1) return {}
  return {
    newer: index > 0 ? posts[index - 1] : undefined,
    older: index < posts.length - 1 ? posts[index + 1] : undefined,
  }
}

export function formatDate(date: string): string {
  const value = dateValue(date)
  if (!value) return 'Undated'
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value))
}
