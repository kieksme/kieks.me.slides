export interface PresentationMeta {
  title?: string
  description?: string
  tags?: string
}

export interface Presentation {
  slug: string
  title: string
  description: string
  tags: string[]
  content: string
}

const rawFiles = import.meta.glob('../../content/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

function parseFrontmatter(markdown: string): { meta: PresentationMeta; content: string } {
  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/)
  if (!match) return { meta: {}, content: markdown }

  const meta: Record<string, string> = {}
  for (const line of match[1].split(/\r?\n/)) {
    const sep = line.indexOf(':')
    if (sep <= 0) continue
    const key = line.slice(0, sep).trim()
    const value = line.slice(sep + 1).trim()
    if (key) meta[key] = value
  }

  return { meta: meta as PresentationMeta, content: markdown.slice(match[0].length) }
}

function parseTags(tags?: string): string[] {
  if (!tags) return []
  return tags
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean)
}

function extractTitle(markdown: string): string {
  const m = markdown.match(/^#\s+(.+)$/m)
  return m ? m[1].trim() : ''
}

export const presentations: Presentation[] = Object.entries(rawFiles)
  .map(([path, raw]) => {
    const slug = path.split('/').pop()?.replace(/\.md$/i, '') ?? ''
    const { meta, content } = parseFrontmatter(raw)
    const title = meta.title || extractTitle(content) || slug

    return {
      slug,
      title,
      description: meta.description || '',
      tags: parseTags(meta.tags),
      content,
    }
  })
  .sort((a, b) => a.title.localeCompare(b.title))

