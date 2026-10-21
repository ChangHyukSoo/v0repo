'use client'

import { useMemo, useState } from 'react'
import {
  Archive,
  ArrowLeft,
  FileText,
  FolderOpen,
  MoreHorizontal,
  Plus,
  Search,
  SlidersHorizontal,
  Sparkles,
  Trash2,
} from 'lucide-react'

const drafts = [
  {
    id: 1,
    title: 'The quiet work behind good ideas',
    excerpt: 'A note on making room for unfinished thoughts, and why the first version should stay a little rough.',
    date: 'Archived today',
    words: '842 words',
    tag: 'Essay',
    accent: 'coral',
  },
  {
    id: 2,
    title: 'Notes from the coast',
    excerpt: 'Salt in the air, a notebook without a plan, and the small details worth carrying home.',
    date: 'Archived Oct 18',
    words: '1,204 words',
    tag: 'Travel',
    accent: 'sage',
  },
  {
    id: 3,
    title: 'A simpler weekly review',
    excerpt: 'Three questions that make reflection feel less like administration and more like a reset.',
    date: 'Archived Oct 12',
    words: '567 words',
    tag: 'Ideas',
    accent: 'lavender',
  },
  {
    id: 4,
    title: 'On collecting fragments',
    excerpt: 'The best ideas rarely arrive complete. They gather at the edges until they are ready to become something.',
    date: 'Archived Sep 29',
    words: '936 words',
    tag: 'Essay',
    accent: 'sand',
  },
]

const accentClasses = {
  coral: 'bg-[#f5d8cf]',
  sage: 'bg-[#dce8d9]',
  lavender: 'bg-[#e4dff0]',
  sand: 'bg-[#eee2ca]',
}

export default function Page() {
  const [query, setQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState('All drafts')
  const [message, setMessage] = useState('')

  const filteredDrafts = useMemo(() => drafts.filter((draft) => {
    const matchesQuery = `${draft.title} ${draft.excerpt}`.toLowerCase().includes(query.toLowerCase())
    const matchesTag = selectedTag === 'All drafts' || draft.tag === selectedTag
    return matchesQuery && matchesTag
  }), [query, selectedTag])

  function showMessage(text: string) {
    setMessage(text)
    window.setTimeout(() => setMessage(''), 2200)
  }

  return (
    <main className="min-h-screen bg-[#f8f7f4] text-[#292825]">
      <div className="mx-auto flex min-h-screen max-w-[1360px]">
        <aside className="hidden w-[230px] shrink-0 border-r border-[#e7e4de] px-6 py-8 lg:block">
          <div className="mb-12 flex items-center gap-2.5 text-[17px] font-semibold tracking-[-0.02em]">
            <div className="flex size-8 items-center justify-center rounded-[10px] bg-[#292825] text-white">
              <Sparkles size={16} strokeWidth={2.3} />
            </div>
            lumen
          </div>
          <nav aria-label="Main navigation" className="space-y-1 text-[13px]">
            <button onClick={() => showMessage('Home is coming soon')} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[#85827b] transition hover:bg-white hover:text-[#292825]"><FileText size={16} /> Notes</button>
            <button className="flex w-full items-center gap-3 rounded-xl bg-white px-3 py-2.5 font-medium shadow-[0_1px_3px_rgba(40,38,32,0.05)]"><Archive size={16} /> Archive <span className="ml-auto text-[11px] text-[#a7a39a]">{drafts.length}</span></button>
            <button onClick={() => showMessage('Folders are coming soon')} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[#85827b] transition hover:bg-white hover:text-[#292825]"><FolderOpen size={16} /> Folders</button>
          </nav>
          <div className="mt-auto pt-72 text-[11px] leading-5 text-[#aaa69e]">A quiet place for<br />unfinished thoughts.</div>
        </aside>

        <section className="flex-1 px-5 py-7 sm:px-10 lg:px-16 lg:py-12">
          <header className="mx-auto max-w-[920px]">
            <div className="mb-12 flex items-center justify-between">
              <button onClick={() => showMessage('You are already in Archive')} className="flex items-center gap-2 text-[12px] text-[#918d85] transition hover:text-[#292825]"><ArrowLeft size={15} /> Workspace</button>
              <button onClick={() => showMessage('New draft started')} className="flex items-center gap-2 rounded-full bg-[#292825] px-4 py-2.5 text-[12px] font-medium text-white transition hover:bg-[#47443f]"><Plus size={15} /> New draft</button>
            </div>
            <div className="mb-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-[#a09b92]">Your library</p>
                <h1 className="text-[36px] font-semibold tracking-[-0.045em] sm:text-[44px]">Archive</h1>
                <p className="mt-3 text-[14px] text-[#918d85]">A home for the thoughts you&apos;re not ready to let go of.</p>
              </div>
              <span className="text-[12px] text-[#aaa69e]">{drafts.length} drafts saved</span>
            </div>
            <div className="mb-7 flex flex-col gap-3 sm:flex-row">
              <label className="relative flex-1">
                <Search aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 text-[#aaa69e]" size={16} />
                <span className="sr-only">Search drafts</span>
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search your drafts" className="h-11 w-full rounded-xl border border-[#e7e4de] bg-white pl-11 pr-4 text-[13px] outline-none transition placeholder:text-[#b4b0a8] focus:border-[#b3aaa0]" />
              </label>
              <button onClick={() => showMessage('Filters are ready')} className="flex h-11 items-center justify-center gap-2 rounded-xl border border-[#e7e4de] bg-white px-4 text-[12px] text-[#77736c] transition hover:border-[#c9c3ba]"><SlidersHorizontal size={15} /> Filter</button>
            </div>
            <div className="mb-5 flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Draft categories">
              {['All drafts', 'Essay', 'Ideas', 'Travel'].map((tag) => <button key={tag} onClick={() => setSelectedTag(tag)} className={`whitespace-nowrap rounded-full px-3.5 py-2 text-[11px] transition ${selectedTag === tag ? 'bg-[#292825] font-medium text-white' : 'bg-[#eeece7] text-[#85817a] hover:bg-[#e5e2dc]'}`}>{tag}</button>)}
            </div>
          </header>

          <div className="mx-auto max-w-[920px] space-y-3">
            {filteredDrafts.length > 0 ? filteredDrafts.map((draft) => <article key={draft.id} className="group flex gap-4 rounded-2xl border border-[#e7e4de] bg-white p-5 transition hover:-translate-y-0.5 hover:border-[#d8d2c8] hover:shadow-[0_8px_24px_rgba(45,42,35,0.05)] sm:gap-5 sm:p-6">
              <div className={`hidden size-10 shrink-0 items-center justify-center rounded-xl sm:flex ${accentClasses[draft.accent as keyof typeof accentClasses]}`}><FileText size={17} className="text-[#716a62]" /></div>
              <div className="min-w-0 flex-1">
                <div className="mb-2 flex flex-wrap items-center gap-2"><h2 className="text-[16px] font-semibold tracking-[-0.02em]">{draft.title}</h2><span className="rounded-full bg-[#f3f1ed] px-2 py-1 text-[10px] text-[#97928a]">{draft.tag}</span></div>
                <p className="max-w-[700px] text-[13px] leading-6 text-[#89857d]">{draft.excerpt}</p>
                <div className="mt-4 flex gap-3 text-[11px] text-[#b0aca4]"><span>{draft.date}</span><span>•</span><span>{draft.words}</span></div>
              </div>
              <button aria-label={`More options for ${draft.title}`} onClick={() => showMessage('Draft options are ready')} className="self-start rounded-lg p-1.5 text-[#aaa69e] opacity-0 transition hover:bg-[#f5f3ef] hover:text-[#5f5b55] group-hover:opacity-100"><MoreHorizontal size={18} /></button>
            </article>) : <div className="rounded-2xl border border-dashed border-[#dcd7cf] px-6 py-16 text-center"><Search className="mx-auto mb-3 text-[#b1aca3]" size={22} /><p className="text-[14px] font-medium">No drafts found</p><p className="mt-1 text-[12px] text-[#9b968e]">Try another search or category.</p></div>}
          </div>
          <footer className="mx-auto mt-10 flex max-w-[920px] items-center justify-between border-t border-[#e7e4de] pt-5 text-[11px] text-[#aaa69e]"><span>Drafts are kept here until you&apos;re ready.</span><button onClick={() => showMessage('Trash is empty')} className="flex items-center gap-1.5 transition hover:text-[#716c64]"><Trash2 size={13} /> Recently deleted</button></footer>
        </section>
      </div>
      {message && <div role="status" className="fixed bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-[#292825] px-4 py-2.5 text-[12px] text-white shadow-lg">{message}</div>}
    </main>
  )
}
