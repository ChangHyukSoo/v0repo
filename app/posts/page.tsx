import { SiteHeader } from '@/components/site-header'
import { PostList } from '@/components/post-list'
import { getAllPosts } from '@/lib/posts'

export const metadata = { title: '모든 포스팅 | 여백', description: '여백에 기록한 모든 포스팅입니다.' }

export default function PostsPage() {
  return <><SiteHeader /><main className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-20"><div className="mb-10"><p className="text-sm text-muted-foreground">기록 모음</p><h1 className="mt-2 text-4xl font-semibold tracking-tight">모든 포스팅</h1><p className="mt-3 text-muted-foreground">배움과 생각을 시간순으로 정리했습니다.</p></div><PostList posts={getAllPosts()} /></main></>
}
