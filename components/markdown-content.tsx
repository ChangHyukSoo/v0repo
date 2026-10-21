import { Code2 } from 'lucide-react'

export function MarkdownContent({ html }: { html: string }) {
  return <div className="post-body prose prose-stone max-w-none dark:prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-p:leading-8 prose-li:leading-8 prose-a:text-primary prose-a:underline-offset-4 prose-blockquote:border-primary/30 prose-blockquote:text-muted-foreground prose-img:rounded-2xl prose-pre:border prose-pre:bg-muted/60 prose-pre:p-5 prose-code:before:content-none prose-code:after:content-none [&_pre]:overflow-x-auto [&_pre_code]:font-mono [&_table]:w-full [&_table]:border-collapse [&_th]:border [&_th]:border-border [&_th]:bg-muted [&_th]:p-3 [&_td]:border [&_td]:border-border [&_td]:p-3" dangerouslySetInnerHTML={{ __html: html }} />
}

export function CodeBadge() {
  return <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/60 px-2.5 py-1 text-xs text-muted-foreground"><Code2 className="size-3.5" /> Markdown</span>
}
