import { notFound } from 'next/navigation'
import { SiteHeader } from '@/components/site-header'
import { PostDetail } from '@/components/post-detail'
import { getAllPosts, getPostWithHtml } from '@/lib/posts'

export function generateStaticParams() { return getAllPosts().map((post) => ({ slug: post.slug })) }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostWithHtml(slug)
  if (!post) return {}
  return { title: `${post.title} | 여백`, description: post.description, openGraph: { title: post.title, description: post.description, type: 'article', publishedTime: post.date, tags: post.tags } }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostWithHtml(slug)
  if (!post) notFound()
  return <><SiteHeader /><PostDetail post={post} /></>
}
