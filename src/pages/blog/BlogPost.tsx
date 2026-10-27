import { Link, useParams } from 'react-router'
import { Badge } from '@/components/Markdown'
import BlogMarkdown from '@/components/blog/BlogMarkdown'
import TagList from '@/components/blog/TagList'
import { usePageMeta } from '@/hooks/usePageMeta'
import { formatDate, getAdjacentPosts, getPostBySlug } from '@/lib/blog'
import type { BlogPost as BlogPostType } from '@/lib/blog'

const monoFont = 'JetBrains Mono, monospace'
const displayFont = 'Barlow Condensed, sans-serif'

function AdjacentPost({ label, post }: { label: string; post: BlogPostType }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group block border border-white/[0.08] hover:border-white/20 transition-colors p-5"
      style={{ background: '#0e0e0e' }}
    >
      <span
        style={{
          display: 'block',
          fontFamily: monoFont,
          fontSize: '9px',
          color: 'rgba(240,237,232,0.32)',
          letterSpacing: '0.12em',
          marginBottom: '8px',
        }}
      >
        {label}
      </span>
      <span
        style={{
          display: 'block',
          fontFamily: displayFont,
          fontSize: '22px',
          fontWeight: 700,
          lineHeight: 1.05,
          letterSpacing: '-0.01em',
          color: '#f0ede8',
        }}
      >
        {post.title}{' '}
        <span
          className="inline-block transition-transform group-hover:translate-x-1"
          style={{ color: '#ff3a00' }}
        >
          →
        </span>
      </span>
    </Link>
  )
}

export default function BlogPost() {
  const { slug } = useParams()
  const post = slug ? getPostBySlug(slug) : undefined
  const { newer, older } = post ? getAdjacentPosts(post.slug) : {}

  usePageMeta(
    post ? `${post.title} · PackSafe Blog` : 'Post not found · PackSafe',
    post?.description ?? 'The post you are looking for does not exist.',
  )

  if (!post) {
    return (
      <div className="max-w-[760px] mx-auto px-4 sm:px-6 pt-24 pb-24">
        <p
          style={{
            fontFamily: monoFont,
            fontSize: '10px',
            color: '#ff3a00',
            letterSpacing: '0.14em',
            margin: '0 0 12px',
          }}
        >
          404 · NOT FOUND
        </p>
        <h1
          style={{
            fontFamily: displayFont,
            fontSize: 'clamp(44px, 5vw, 64px)',
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
            color: '#f0ede8',
            margin: '0 0 16px',
          }}
        >
          Post not found
        </h1>
        <p
          style={{
            fontSize: '14px',
            lineHeight: 1.7,
            color: 'rgba(240,237,232,0.5)',
            margin: '0 0 28px',
          }}
        >
          The post you are looking for does not exist or has been removed.
        </p>
        <Link
          to="/blog"
          style={{
            fontFamily: monoFont,
            fontSize: '11px',
            color: '#ff3a00',
            letterSpacing: '0.06em',
            textDecoration: 'none',
          }}
        >
          ← BACK TO ALL POSTS
        </Link>
      </div>
    )
  }

  return (
    <article>
      <header className="max-w-[760px] mx-auto px-4 sm:px-6 pt-12 sm:pt-14 md:pt-20">
        <Link
          to="/blog"
          style={{
            fontFamily: monoFont,
            fontSize: '10px',
            color: 'rgba(240,237,232,0.4)',
            letterSpacing: '0.08em',
            textDecoration: 'none',
            transition: 'color 0.15s',
          }}
        >
          ← ALL POSTS
        </Link>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '10px',
            marginTop: '40px',
            marginBottom: '22px',
          }}
        >
          <span
            style={{
              fontFamily: monoFont,
              fontSize: '10px',
              color: '#ff3a00',
              letterSpacing: '0.14em',
            }}
          >
            BLOG · {formatDate(post.date).toUpperCase()}
          </span>
          {post.draft && <Badge variant="amber">DRAFT</Badge>}
        </div>

        <h1
          style={{
            fontFamily: displayFont,
            fontSize: 'clamp(38px, 5.5vw, 68px)',
            fontWeight: 900,
            lineHeight: 0.94,
            letterSpacing: '-0.02em',
            color: '#f0ede8',
            margin: '0 0 20px',
          }}
        >
          {post.title}
        </h1>

        <p
          style={{
            fontSize: '16px',
            lineHeight: 1.65,
            color: 'rgba(240,237,232,0.55)',
            margin: '0 0 32px',
            maxWidth: '660px',
          }}
        >
          {post.description}
        </p>

        <div
          className="border-y border-white/[0.08]"
          style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '10px',
            padding: '14px 0',
          }}
        >
          <span style={{ fontFamily: monoFont, fontSize: '10px', color: 'rgba(240,237,232,0.42)', letterSpacing: '0.06em' }}>
            {post.author}
          </span>
          <span style={{ color: 'rgba(240,237,232,0.18)', fontSize: '10px' }}>·</span>
          <span style={{ fontFamily: monoFont, fontSize: '10px', color: 'rgba(240,237,232,0.42)', letterSpacing: '0.06em' }}>
            {formatDate(post.date)}
          </span>
          <span style={{ color: 'rgba(240,237,232,0.18)', fontSize: '10px' }}>·</span>
          <span style={{ fontFamily: monoFont, fontSize: '10px', color: 'rgba(240,237,232,0.42)', letterSpacing: '0.06em' }}>
            {post.readingTime} MIN READ
          </span>
          <div className="ml-auto">
            <TagList tags={post.tags} />
          </div>
        </div>
      </header>

      <div className="max-w-[760px] mx-auto px-4 sm:px-6 pt-8 sm:pt-10 pb-14">
        <BlogMarkdown content={post.content} />
      </div>

      <footer className="max-w-[760px] mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
        <div className="border-t border-white/[0.08] pt-8 flex items-center justify-between gap-6 flex-wrap">
          <Link
            to="/blog"
            style={{
              fontFamily: monoFont,
              fontSize: '11px',
              color: 'rgba(240,237,232,0.5)',
              letterSpacing: '0.06em',
              textDecoration: 'none',
            }}
          >
            ← Back to all posts
          </Link>
          <Link
            to="/analyze"
            style={{
              fontFamily: monoFont,
              fontSize: '11px',
              color: '#ff3a00',
              letterSpacing: '0.06em',
              textDecoration: 'none',
            }}
          >
            Analyze a package ↗
          </Link>
        </div>

        {(newer || older) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
            {newer && <AdjacentPost label="NEWER POST" post={newer} />}
            {older && <AdjacentPost label="OLDER POST" post={older} />}
          </div>
        )}
      </footer>
    </article>
  )
}
