import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/posts'
import { siteUrl } from '@/lib/site'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteUrl
  return [{ url: baseUrl, lastModified: new Date() }, { url: `${baseUrl}/posts`, lastModified: new Date() }, ...getAllPosts().map((post) => ({ url: `${baseUrl}/posts/${post.slug}`, lastModified: new Date(post.date) }))]
}
