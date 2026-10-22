import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeSlug from 'rehype-slug'
import rehypeStringify from 'rehype-stringify'
import { withBasePath } from '@/lib/site'

export type PostFrontmatter = {
  title: string
  description: string
  date: string
  slug: string
  tags: string[]
  draft?: boolean
  relatedPosts?: string[]
}

export type Post = PostFrontmatter & { content: string; html?: string }

const postsDirectory = path.join(process.cwd(), 'content/posts')

function readPostFile(filename: string): Post {
  const source = fs.readFileSync(path.join(postsDirectory, filename), 'utf8')
  const { data, content } = matter(source)
  return {
    title: String(data.title ?? ''),
    description: String(data.description ?? ''),
    date: String(data.date ?? ''),
    slug: String(data.slug ?? filename.replace(/\.md$/, '')),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    draft: Boolean(data.draft),
    relatedPosts: Array.isArray(data.relatedPosts) ? data.relatedPosts.map(String) : [],
    content,
  }
}

export function getAllPosts(includeDrafts = false): Post[] {
  if (!fs.existsSync(postsDirectory)) return []
  return fs.readdirSync(postsDirectory).filter((file) => file.endsWith('.md')).map(readPostFile)
    .filter((post) => includeDrafts || !post.draft)
    .sort((a, b) => b.date.localeCompare(a.date))
}

export function getPostBySlug(slug: string, includeDrafts = false) {
  return getAllPosts(includeDrafts).find((post) => post.slug === slug)
}

function prefixLocalUrls() {
  type Node = { type: string; properties?: Record<string, unknown>; children?: Node[] }
  return (tree: Node) => {
    function visit(node: Node) {
      for (const key of ['src', 'href']) {
        const value = node.properties?.[key]
        if (typeof value === 'string' && value.startsWith('/') && !value.startsWith('//')) {
          node.properties![key] = withBasePath(value)
        }
      }
      node.children?.forEach(visit)
    }
    visit(tree)
  }
}

export async function renderMarkdown(markdown: string) {
  const result = await unified().use(remarkParse).use(remarkRehype).use(rehypeSlug).use(prefixLocalUrls).use(rehypeStringify).process(markdown)
  return String(result)
}

export async function getPostWithHtml(slug: string, includeDrafts = false) {
  const post = getPostBySlug(slug, includeDrafts)
  if (!post) return undefined
  return { ...post, html: await renderMarkdown(post.content) }
}

export function getRelatedPosts(post: Post, includeDrafts = false) {
  const all = getAllPosts(includeDrafts).filter((candidate) => candidate.slug !== post.slug)
  const bySlug = new Map(all.map((candidate) => [candidate.slug, candidate]))
  const preferred = (post.relatedPosts ?? []).map((slug) => bySlug.get(slug)).filter(Boolean) as Post[]
  const remaining = all.filter((candidate) => !preferred.some((item) => item.slug === candidate.slug))
    .map((candidate) => ({ candidate, score: candidate.tags.filter((tag) => post.tags.includes(tag)).length }))
    .sort((a, b) => b.score - a.score || b.candidate.date.localeCompare(a.candidate.date))
    .map(({ candidate }) => candidate)
  return [...preferred, ...remaining].slice(0, 3)
}

export function getTableOfContents(markdown: string) {
  return markdown.split('\n').flatMap((line) => {
    const match = /^(#{2,3})\s+(.+)$/.exec(line.trim())
    if (!match) return []
    const text = match[2].replace(/[*_`]/g, '').trim()
    const id = text.toLowerCase().replace(/[^\p{L}\p{N}\s-]/gu, '').replace(/\s+/g, '-')
    return [{ text, id, level: match[1].length }]
  })
}
