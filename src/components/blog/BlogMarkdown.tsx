import { Children, createContext, isValidElement, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import Markdown from 'react-markdown'
import type { Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import { Link } from 'react-router'
import {
  H2,
  H3,
  P,
  UL,
  OL,
  LI,
  Hr,
  Table,
  THead,
  TBody,
  TR,
  TH,
  TD,
} from '@/components/Markdown'

// ─── Inline code ─────────────────────────────────────────────────────────────

function InlineCode({ className, children }: { className?: string; children?: ReactNode }) {
  return (
    <code
      className={className}
      style={{
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '12px',
        color: '#ff3a00',
        background: 'rgba(255,58,0,0.08)',
        border: '1px solid rgba(255,58,0,0.15)',
        padding: '1px 6px',
        borderRadius: '2px',
        overflowWrap: 'anywhere',
      }}
    >
      {children}
    </code>
  )
}

// ─── Fenced code block ───────────────────────────────────────────────────────

function BlogCodeBlock({ code, lang }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      // Clipboard access can be unavailable on insecure origins.
    }
  }

  return (
    <div
      style={{
        border: '1px solid rgba(255,255,255,0.08)',
        background: '#0a0f0a',
        marginBottom: '24px',
        marginTop: '8px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 12px 8px 16px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          background: '#0d120d',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(255,58,0,0.5)' }} />
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(255,170,0,0.35)' }} />
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(0,204,85,0.35)' }} />
        </div>

        <span
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '10px',
            color: '#3a3a3a',
            letterSpacing: '0.1em',
            flex: 1,
            textAlign: 'center',
          }}
        >
          {lang ? lang.toUpperCase() : 'CODE'}
        </span>

        <button
          type="button"
          onClick={copy}
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '9px',
            color: copied ? '#00cc55' : 'rgba(240,237,232,0.35)',
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.08)',
            padding: '2px 7px',
            cursor: 'pointer',
            letterSpacing: '0.08em',
            transition: 'color 0.15s, border-color 0.15s',
            flexShrink: 0,
            minWidth: '54px',
            textAlign: 'center',
          }}
        >
          {copied ? 'COPIED' : 'COPY'}
        </button>
      </div>

      <pre
        style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '12.5px',
          lineHeight: 1.75,
          color: '#c8c8c8',
          padding: '20px',
          margin: 0,
          overflowX: 'auto',
          whiteSpace: 'pre',
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  )
}

// ─── Lists ───────────────────────────────────────────────────────────────────

const OrderedListContext = createContext(false)

function BlogListItem({ children }: { children?: ReactNode }) {
  const ordered = useContext(OrderedListContext)
  return <LI ordered={ordered}>{children}</LI>
}

// ─── Link / image / quote ────────────────────────────────────────────────────

function MarkdownLink({ href, children }: { href?: string; children?: ReactNode }) {
  if (!href) return <span>{children}</span>

  const style = {
    color: '#ff3a00',
    textDecoration: 'underline',
    textDecorationColor: 'rgba(255,58,0,0.35)',
    textUnderlineOffset: '3px',
  }

  if (href.startsWith('/') || href.startsWith('#')) {
    return <Link to={href} style={style}>{children}</Link>
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={style}>
      {children}
    </a>
  )
}

function MarkdownImage({ src, alt, title }: { src?: string; alt?: string; title?: string }) {
  if (!src) return null

  return (
    <figure style={{ margin: '28px 0' }}>
      <img
        src={src}
        alt={alt || ''}
        title={title}
        loading="lazy"
        decoding="async"
        style={{
          width: '100%',
          display: 'block',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      />
      {(title || alt) && (
        <figcaption
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '10px',
            color: 'rgba(240,237,232,0.35)',
            marginTop: '8px',
            letterSpacing: '0.04em',
            lineHeight: 1.5,
          }}
        >
          {title || alt}
        </figcaption>
      )}
    </figure>
  )
}

function MarkdownQuote({ children }: { children?: ReactNode }) {
  return (
    <blockquote
      style={{
        borderLeft: '2px solid #ff3a00',
        background: 'rgba(255,58,0,0.04)',
        padding: '16px 20px',
        margin: '24px 0',
        color: 'rgba(240,237,232,0.62)',
        fontSize: '14px',
        lineHeight: 1.75,
      }}
    >
      {children}
    </blockquote>
  )
}

// ─── Component mapping ───────────────────────────────────────────────────────

const components: Components = {
  h1: ({ id, children }) => <H2 id={id}>{children}</H2>,
  h2: ({ id, children }) => <H2 id={id}>{children}</H2>,
  h3: ({ id, children }) => <H3 id={id}>{children}</H3>,
  h4: ({ id, children }) => (
    <h4
      id={id}
      style={{
        fontFamily: 'Barlow Condensed, sans-serif',
        fontSize: '18px',
        fontWeight: 700,
        letterSpacing: '-0.005em',
        color: '#f0ede8',
        marginTop: '28px',
        marginBottom: '8px',
      }}
    >
      {children}
    </h4>
  ),
  p: ({ children }) => <P>{children}</P>,
  a: ({ href, children }) => <MarkdownLink href={href}>{children}</MarkdownLink>,
  img: ({ src, alt, title }) => <MarkdownImage src={src} alt={alt} title={title} />,
  blockquote: ({ children }) => <MarkdownQuote>{children}</MarkdownQuote>,
  ul: ({ children }) => (
    <OrderedListContext.Provider value={false}>
      <UL>{children}</UL>
    </OrderedListContext.Provider>
  ),
  ol: ({ children }) => (
    <OrderedListContext.Provider value={true}>
      <OL>{children}</OL>
    </OrderedListContext.Provider>
  ),
  li: ({ children }) => <BlogListItem>{children}</BlogListItem>,
  hr: () => <Hr />,
  code: ({ className, children }) => <InlineCode className={className}>{children}</InlineCode>,
  pre: ({ children }) => {
    const child = Children.toArray(children).find(isValidElement)

    if (child && isValidElement(child)) {
      const props = child.props as { className?: string; children?: ReactNode }
      const language = /language-([\w-]+)/.exec(props.className || '')?.[1]
      const code = String(props.children ?? '').replace(/\n$/, '')
      return <BlogCodeBlock code={code} lang={language} />
    }

    return <pre>{children}</pre>
  },
  table: ({ children }) => <Table>{children}</Table>,
  thead: ({ children }) => <THead>{children}</THead>,
  tbody: ({ children }) => <TBody>{children}</TBody>,
  tr: ({ children }) => <TR>{children}</TR>,
  th: ({ children }) => <TH>{children}</TH>,
  td: ({ children }) => <TD>{children}</TD>,
  input: ({ type, checked }) =>
    type === 'checkbox' ? (
      <input
        type="checkbox"
        checked={checked}
        readOnly
        style={{ accentColor: '#ff3a00', marginRight: '8px' }}
      />
    ) : null,
}

export default function BlogMarkdown({ content }: { content: string }) {
  return (
    <div className="blog-prose" style={{ color: '#f0ede8' }}>
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug]}
        components={components}
      >
        {content}
      </Markdown>
    </div>
  )
}
