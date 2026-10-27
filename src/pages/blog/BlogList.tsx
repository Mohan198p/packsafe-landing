import { Link } from 'react-router'
import { Badge, SectionLabel } from '@/components/Markdown'
import TagList from '@/components/blog/TagList'
import { usePageMeta } from '@/hooks/usePageMeta'
import { formatDate, getAllPosts } from '@/lib/blog'
import type { BlogPost } from '@/lib/blog'

const monoFont = 'JetBrains Mono, monospace'
const displayFont = 'Barlow Condensed, sans-serif'

function PostMeta({ post }: { post: BlogPost }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '8px',
        fontFamily: monoFont,
        fontSize: '10px',
        color: 'rgba(240,237,232,0.35)',
        letterSpacing: '0.08em',
      }}
    >
      {post.draft && <Badge variant="amber">DRAFT</Badge>}
      <span>{formatDate(post.date).toUpperCase()}</span>
      <span style={{ color: 'rgba(240,237,232,0.18)' }}>·</span>
      <span>{post.readingTime} MIN READ</span>
    </div>
  )
}

function FeaturedPost({ post }: { post: BlogPost }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group block border border-white/[0.08] hover:border-white/20 transition-colors"
      style={{
        background: 'linear-gradient(135deg, rgba(255,58,0,0.07), transparent 48%), #0e0e0e',
      }}
    >
      <div className="p-5 sm:p-7 md:p-10">
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '22px' }}>
          <Badge variant="red">LATEST</Badge>
          <PostMeta post={post} />
        </div>

        <h2
          style={{
            fontFamily: displayFont,
            fontSize: 'clamp(32px, 4vw, 50px)',
            fontWeight: 900,
            lineHeight: 0.98,
            letterSpacing: '-0.02em',
            color: '#f0ede8',
            maxWidth: '820px',
            margin: '0 0 16px',
          }}
        >
          {post.title}
        </h2>

        <p
          style={{
            fontSize: '14px',
            lineHeight: 1.7,
            color: 'rgba(240,237,232,0.55)',
            maxWidth: '660px',
            margin: '0 0 28px',
          }}
        >
          {post.description}
        </p>

        <div className="flex items-end justify-between gap-6 flex-wrap">
          <TagList tags={post.tags} />
          <span
            style={{
              fontFamily: monoFont,
              fontSize: '11px',
              color: '#ff3a00',
              letterSpacing: '0.06em',
            }}
          >
            READ ARTICLE{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </span>
        </div>
      </div>
    </Link>
  )
}

function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group flex flex-col border border-white/[0.08] hover:border-white/20 transition-colors p-5 sm:p-6"
      style={{ background: '#0e0e0e', minHeight: '250px' }}
    >
      <div style={{ marginBottom: '18px' }}>
        <PostMeta post={post} />
      </div>

      <h3
        style={{
          fontFamily: displayFont,
          fontSize: '27px',
          fontWeight: 800,
          lineHeight: 1.02,
          letterSpacing: '-0.015em',
          color: '#f0ede8',
          margin: '0 0 12px',
        }}
      >
        {post.title}
      </h3>

      <p
        className="line-clamp-3"
        style={{
          fontSize: '13px',
          lineHeight: 1.65,
          color: 'rgba(240,237,232,0.48)',
          margin: '0 0 24px',
        }}
      >
        {post.description}
      </p>

      <div className="mt-auto flex items-center justify-between gap-4">
        <TagList tags={post.tags.slice(0, 3)} />
        <span
          className="transition-transform group-hover:translate-x-1"
          style={{
            fontFamily: monoFont,
            fontSize: '12px',
            color: '#ff3a00',
            flexShrink: 0,
          }}
        >
          →
        </span>
      </div>
    </Link>
  )
}

export default function BlogList() {
  const posts = getAllPosts()
  const [featured, ...rest] = posts

  usePageMeta(
    'Blog · PackSafe',
    'Field notes on package security, supply chain attacks, and building safer Python software.',
  )

  return (
    <div className="max-w-[1120px] mx-auto px-4 sm:px-6 pt-12 sm:pt-16 md:pt-20 pb-16 sm:pb-24">
      <header
        className="border-b border-white/[0.08] pb-10 md:pb-12 mb-10 md:mb-12"
      >
        <SectionLabel>BLOG · FIELD NOTES</SectionLabel>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h1
              style={{
                fontFamily: displayFont,
                fontSize: 'clamp(42px, 6vw, 76px)',
                fontWeight: 900,
                lineHeight: 0.92,
                letterSpacing: '-0.02em',
                color: '#f0ede8',
                margin: '0 0 16px',
              }}
            >
              PackSafe <span style={{ color: '#ff3a00' }}>Blog</span>
            </h1>
            <p
              style={{
                fontSize: '15px',
                lineHeight: 1.7,
                color: 'rgba(240,237,232,0.5)',
                maxWidth: '560px',
                margin: 0,
              }}
            >
              Field notes on package security, supply chain attacks, and building
              safer Python software.
            </p>
          </div>

          {posts.length > 0 && (
            <div
              style={{
                fontFamily: monoFont,
                fontSize: '10px',
                color: 'rgba(240,237,232,0.3)',
                letterSpacing: '0.08em',
                flexShrink: 0,
              }}
            >
              {posts.length} {posts.length === 1 ? 'POST' : 'POSTS'} · UPDATED{' '}
              {formatDate(featured.date).toUpperCase()}
            </div>
          )}
        </div>
      </header>

      {posts.length === 0 ? (
        <div
          className="border border-white/[0.08] p-10"
          style={{ background: '#0e0e0e' }}
        >
          <p
            style={{
              fontFamily: monoFont,
              fontSize: '10px',
              color: '#ff3a00',
              letterSpacing: '0.14em',
              margin: '0 0 10px',
            }}
          >
            NO POSTS YET
          </p>
          <p style={{ fontSize: '14px', color: 'rgba(240,237,232,0.5)', margin: 0 }}>
            Add a Markdown file to <code style={{ color: '#ff3a00' }}>content/blog/</code> to
            publish your first post.
          </p>
        </div>
      ) : (
        <>
          <FeaturedPost post={featured} />

          {rest.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
              {rest.map(post => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
