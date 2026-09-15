import { featuredArtist, featuredTrack, releases } from "../../data";
import Link from "next/link";
import {ComingSoonButton,Shell} from "../../components";

export default function Track(){
  return <Shell active="explore" player={false}>
    <section className="track-page page-wrap grid gap-10 py-16 lg:grid-cols-[1fr_280px]">
      <div>
        <div className="grid gap-8 md:grid-cols-[300px_1fr] md:items-center">
          <div className="art-a relative aspect-square overflow-hidden rounded-[22px] border border-fuchsia-500/20 shadow-[0_0_55px_rgba(235,37,196,.18)]"><div className="absolute bottom-6 left-6"><p className="page-kicker text-white/70">MOCIFY ORIGINAL</p><h1 className="mt-2 text-4xl font-black">{featuredTrack.title.split(" ").map((word, index) => <span key={index}>{index > 0 && <br/>}{word}</span>)}</h1></div></div>
          <div><p className="page-kicker">SINGLE · {featuredTrack.genre.toUpperCase()}</p><h2 className="mt-3 text-5xl font-black tracking-[-.055em] md:text-6xl">{featuredTrack.title}</h2><Link href={featuredArtist.href} className="mt-3 inline-block text-lg font-bold text-zinc-300">{featuredArtist.name}</Link><p className="mt-5 max-w-xl text-sm leading-7 text-zinc-400">A neon late-night MOCIFY release blending melodic pop, club energy and a playful futuristic edge.</p><div className="mt-7 flex flex-wrap items-center gap-3"><ComingSoonButton className="m-primary" label="Audio playback is coming soon">▶ Play preview</ComingSoonButton><ComingSoonButton label="Favorites are coming soon">♡</ComingSoonButton><ComingSoonButton label="Downloads are coming soon">↓</ComingSoonButton><ComingSoonButton label="More track actions are coming soon">•••</ComingSoonButton></div></div>
        </div>
        <div className="mt-12 rounded-2xl border border-white/8 bg-white/[.02] p-5"><div className="flex items-center gap-4 text-xs text-zinc-400"><span>{featuredTrack.elapsed}</span><div className="h-1 flex-1 overflow-hidden rounded-full bg-white/10"><div className="track-progress h-full" style={{width:`${featuredTrack.progress}%`}}/></div><span>{featuredTrack.duration}</span></div><div className="track-playback-controls mt-7 flex items-center justify-center gap-5 text-zinc-300" aria-label="Playback controls coming soon"><button type="button" className="track-control" disabled aria-label="Shuffle — coming soon">↝</button><button type="button" className="track-control" disabled aria-label="Previous track — coming soon">◀</button><button type="button" className="track-main-control" disabled aria-label="Play track — coming soon">▶</button><button type="button" className="track-control" disabled aria-label="Next track — coming soon">▶</button><button type="button" className="track-control" disabled aria-label="Repeat — coming soon">↻</button></div><p className="mt-4 text-center text-[10px] uppercase tracking-[.18em] text-zinc-500">Playback engine coming soon</p></div>
      </div>

      <aside><p className="page-kicker">SIMILAR TRACKS</p><div className="mt-5 space-y-4">{releases.slice(1,5).map(r=>{
        const item=<><div className={`h-14 w-14 shrink-0 rounded-lg ${r.art}`}/><div><b className="text-sm">{r.title}</b><p className="mt-1 text-[10px] text-zinc-400">{r.genre}</p></div></>;
        return "href" in r && r.href ? <Link href={r.href} key={r.title} className="flex items-center gap-3">{item}</Link> : <div key={r.title} className="flex items-center gap-3 opacity-80" title="Track page coming soon">{item}<span className="prototype-badge ml-auto">SOON</span></div>;
      })}</div></aside>
    </section>
  </Shell>
}
