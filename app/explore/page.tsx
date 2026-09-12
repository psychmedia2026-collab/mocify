import { genres, releases } from "../data";
import Link from "next/link";
import {ComingSoonButton,Shell,ReleaseCard} from "../components";

export default function ExplorePage(){
  return <Shell active="explore">
    <div className="page-wrap grid gap-8 py-10 lg:grid-cols-[210px_1fr]">
      <aside className="hidden lg:block">
        <div className="sticky top-6 rounded-2xl border border-white/8 bg-white/[.025] p-3 text-sm">
          <Link href="/explore" className="mb-1 block rounded-xl bg-violet-500/15 px-4 py-3 text-white">⌂ Discover</Link>
          <a href="#trending" className="mb-1 block rounded-xl px-4 py-3 text-zinc-400">↗ Trending</a>
          <a href="#genres" className="mb-1 block rounded-xl px-4 py-3 text-zinc-400">▣ Genres</a>
          <span className="mb-1 block rounded-xl px-4 py-3 text-zinc-500">◉ New Releases <small>soon</small></span>
          <span className="mb-1 block rounded-xl px-4 py-3 text-zinc-500">☆ Top Charts <small>soon</small></span>
          <Link href="/library" className="mb-1 block rounded-xl px-4 py-3 text-zinc-400">♡ My Library</Link>
          <p className="page-kicker mt-7 px-4">GENRES</p>
          <div className="mt-3 px-4">{genres.map(g=><a href="#genres" className="mb-3 block text-xs text-zinc-400" key={g}>{g}</a>)}</div>
        </div>
      </aside>

      <div>
        <section className="relative overflow-hidden rounded-[26px] border border-violet-500/15 bg-[radial-gradient(circle_at_80%_20%,rgba(255,50,205,.35),transparent_30%),linear-gradient(120deg,#0d1230,#29105e_55%,#6e175e)] p-8 md:p-10">
          <div className="relative z-10 max-w-xl"><p className="page-kicker">FEATURED PLAYLIST</p><h1 className="mt-3 text-5xl font-black tracking-[-.055em] md:text-6xl">AI Vibes</h1><p className="mt-4 max-w-lg text-sm leading-6 text-zinc-300">A curated mix of the hottest AI-generated tracks. Fresh sounds. No limits.</p><ComingSoonButton className="m-secondary mt-6" label="Playlist playback is coming soon">▶ Preview playlist</ComingSoonButton></div>
          <div className="absolute -right-20 -top-16 h-72 w-72 rounded-full bg-fuchsia-500/30 blur-3xl"/>
          <div className="absolute bottom-8 right-8 text-xs text-white/70">1 / 5 &nbsp;&nbsp; ‹ &nbsp; ›</div>
        </section>

        <div className="prototype-search mt-9 lg:hidden" aria-label="Search coming soon">⌕ Search tracks, artists, genres... <b>SOON</b></div>

        <section id="trending" className="scroll-mt-6 py-10">
          <div className="home-heading"><div><p className="page-kicker">DISCOVER</p><h2>Trending Now</h2></div><Link href="/artists">Artists →</Link></div>
          <div className="release-grid home-release-grid">{releases.slice(0,5).map((r,i)=><ReleaseCard key={r.title} r={r} index={i}/>)}</div>
        </section>

        <section id="genres" className="scroll-mt-6 pb-12">
          <div className="home-heading"><div><p className="page-kicker">BROWSE</p><h2>Genres</h2></div></div>
          <div className="flex flex-wrap gap-3">{genres.map(g=><span key={g} className="genre-pill" title="Genre filtering coming soon">{g}<small>soon</small></span>)}</div>
        </section>
      </div>
    </div>
  </Shell>
}
