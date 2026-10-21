import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/posts'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://example.com'
  return [{ url: baseUrl, lastModified: new Date() }, { url: `${baseUrl}/posts`, lastModified: new Date() }, ...getAllPosts().map((post) => ({ url: `${baseUrl}/posts/${post.slug}`, lastModified: new Date(post.date) }))]
}
