import Link from 'next/link'
import { BookOpen, Moon } from 'lucide-react'

export function SiteHeader({ preview = false }: { preview?: boolean }) {
  return <header className="border-b border-border/70 bg-background/85 backdrop-blur"><div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5 sm:px-8"><Link href="/" className="flex items-center gap-2.5 font-semibold tracking-tight"><span className="flex size-8 items-center justify-center rounded-xl bg-primary text-primary-foreground"><BookOpen className="size-4" /></span> 여백</Link><nav className="flex items-center gap-1 text-sm text-muted-foreground"><Link href="/posts" className="rounded-lg px-3 py-2 hover:bg-muted hover:text-foreground">포스팅</Link>{process.env.NODE_ENV !== 'production' && (<Link href="/preview" className="rounded-lg px-3 py-2 hover:bg-muted hover:text-foreground">미리보기</Link>)}<span aria-label="다크 모드 지원" className="ml-2 rounded-lg p-2 text-muted-foreground"><Moon className="size-4" /></span>{preview && <span className="rounded-full bg-amber-500/10 px-2.5 py-1 text-xs text-amber-700 dark:text-amber-300">미리보기</span>}</nav></div></header>
}
