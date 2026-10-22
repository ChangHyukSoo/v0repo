import { notFound } from 'next/navigation'
import { SiteHeader } from '@/components/site-header'
import { PostDetail } from '@/components/post-detail'
import { getAllPosts, getPostWithHtml } from '@/lib/posts'

export const dynamic = 'force-static'

export function generateStaticParams() { return (process.env.NODE_ENV === 'production' ? [{ slug: '__disabled__' }] : getAllPosts(true)).map((post) => ({ slug: post.slug })) }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  if (process.env.NODE_ENV === 'production') return {}
  const { slug } = await params
  const post = await getPostWithHtml(slug, true)
  return post ? { title: `미리보기 · ${post.title} | 여백`, description: post.description } : {}
}

export default async function PreviewPostPage({ params }: { params: Promise<{ slug: string }> }) {
  if (process.env.NODE_ENV === 'production') notFound()
  const { slug } = await params
  const post = await getPostWithHtml(slug, true)
  if (!post) notFound()
  return <><SiteHeader preview /><PostDetail post={post} preview /></>
}
