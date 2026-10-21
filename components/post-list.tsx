'use client'

import Link from 'next/link'
import { Search, ArrowUpRight } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { Post } from '@/lib/posts'
import { formatDate } from '@/lib/format'
import { Badge } from '@/components/ui/badge'

export function PostList({ posts, preview = false }: { posts: Post[]; preview?: boolean }) {
  const [query, setQuery] = useState('')
  const [tag, setTag] = useState('전체')
  const tags = ['전체', ...Array.from(new Set(posts.flatMap((post) => post.tags)))]
  const filtered = useMemo(() => posts.filter((post) => {
    const matchesText = `${post.title} ${post.description}`.toLowerCase().includes(query.toLowerCase())
    return matchesText && (tag === '전체' || post.tags.includes(tag))
  }), [posts, query, tag])

  return <div className="flex flex-col gap-8">
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 sm:flex-row">
      <label className="relative flex-1"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><span className="sr-only">포스팅 검색</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="제목과 설명으로 검색" className="h-11 w-full rounded-xl border border-input bg-background pl-10 pr-4 text-sm outline-none transition focus:ring-2 focus:ring-ring" /></label>
      <div className="flex gap-2 overflow-x-auto pb-1" aria-label="태그 필터">{tags.map((item) => <button key={item} onClick={() => setTag(item)} className={`whitespace-nowrap rounded-full px-3 py-2 text-xs transition ${tag === item ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-accent'}`}>{item}</button>)}</div>
    </div>
    {filtered.length ? <div className="grid gap-4">{filtered.map((post) => <article key={post.slug} className="group rounded-2xl border border-border bg-card p-5 transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg sm:p-6"><div className="flex items-start justify-between gap-4"><div><div className="mb-3 flex flex-wrap items-center gap-2">{post.tags.map((item) => <Badge key={item} variant="secondary">{item}</Badge>)}{preview && post.draft && <Badge variant="outline">초안</Badge>}</div><h2 className="text-xl font-semibold tracking-tight"><Link href={`${preview ? '/preview' : '/posts'}/${post.slug}`} className="hover:underline">{post.title}</Link></h2><p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">{post.description}</p></div><ArrowUpRight className="mt-1 hidden size-5 text-muted-foreground transition group-hover:text-foreground sm:block" /></div><time dateTime={post.date} className="mt-5 block text-xs text-muted-foreground">{formatDate(post.date)}</time></article>)}</div> : <div className="rounded-2xl border border-dashed border-border px-6 py-16 text-center"><Search className="mx-auto mb-3 size-5 text-muted-foreground" /><p className="font-medium">검색 결과가 없습니다.</p><p className="mt-1 text-sm text-muted-foreground">다른 검색어 또는 태그를 선택해 보세요.</p></div>}
  </div>
}
