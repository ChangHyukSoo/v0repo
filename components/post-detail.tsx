import Link from 'next/link'
import { ArrowLeft, List } from 'lucide-react'
import type { Post } from '@/lib/posts'
import { getRelatedPosts, getTableOfContents } from '@/lib/posts'
import { formatDate } from '@/lib/format'
import { MarkdownContent } from '@/components/markdown-content'
import { Badge } from '@/components/ui/badge'

export function PostDetail({ post, preview = false }: { post: Post & { html: string }; preview?: boolean }) {
  const related = getRelatedPosts(post, preview)
  const toc = getTableOfContents(post.content)
  const base = preview ? '/preview' : '/posts'
  return <main className="mx-auto grid max-w-5xl gap-12 px-5 py-12 sm:px-8 lg:grid-cols-[1fr_190px] lg:py-20"><article><Link href={base} className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4" /> 전체 포스팅</Link><header className="border-b border-border pb-10"><div className="mb-5 flex flex-wrap gap-2">{post.tags.map((tag) => <Badge key={tag} variant="secondary">{tag}</Badge>)}{preview && <Badge variant={post.draft ? 'outline' : 'secondary'}>{post.draft ? '초안' : '공개'}</Badge>}</div><h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{post.title}</h1><p className="mt-5 text-lg leading-8 text-muted-foreground">{post.description}</p><time dateTime={post.date} className="mt-6 block text-sm text-muted-foreground">{formatDate(post.date)}</time></header><div className="mt-10"><MarkdownContent html={post.html} /></div>{related.length > 0 && <section className="mt-16 border-t border-border pt-10"><p className="mb-5 text-sm font-semibold">연관 포스팅</p><div className="grid gap-3">{related.map((item) => <Link key={item.slug} href={`${base}/${item.slug}`} className="group rounded-xl border border-border p-4 transition hover:border-primary/40 hover:bg-muted/40"><p className="font-medium group-hover:underline">{item.title}</p><p className="mt-1 text-sm text-muted-foreground">{item.description}</p></Link>)}</div></section>}</article>{toc.length > 0 && <aside className="hidden lg:block"><div className="sticky top-8 rounded-xl border border-border bg-card p-4"><p className="mb-3 flex items-center gap-2 text-xs font-semibold"><List className="size-3.5" /> 목차</p><nav className="flex flex-col gap-2">{toc.map((item) => <a key={item.id} href={`#${item.id}`} className={`text-xs text-muted-foreground hover:text-foreground ${item.level === 3 ? 'pl-3' : ''}`}>{item.text}</a>)}</nav></div></aside>}</main>
}
