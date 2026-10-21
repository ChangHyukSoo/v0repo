import { notFound } from 'next/navigation'
import { SiteHeader } from '@/components/site-header'
import { PostList } from '@/components/post-list'
import { getAllPosts } from '@/lib/posts'

export const dynamic = 'force-dynamic'

export default function PreviewPage() {
  if (process.env.NODE_ENV === 'production') notFound()
  return <><SiteHeader preview /><main className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-20"><div className="mb-10"><div className="mb-4 inline-flex rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-700 dark:text-amber-300">개발 환경 전용</div><h1 className="text-4xl font-semibold tracking-tight">포스팅 미리보기</h1><p className="mt-3 text-muted-foreground">초안을 포함한 모든 Markdown 파일을 확인합니다.</p></div><PostList posts={getAllPosts(true)} preview /></main></>
}
