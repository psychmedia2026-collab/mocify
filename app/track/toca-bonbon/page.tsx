import { featuredArtist, featuredTrack, releases } from "../../data";
import Link from "next/link";
import {Shell} from "../../components";

export default function Track(){
  return <Shell active="explore" player={false}>
    <section className="page-wrap grid gap-10 py-16 lg:grid-cols-[1fr_280px]">
      <div>
        <div className="grid gap-8 md:grid-cols-[300px_1fr] md:items-center">
          <div className="art-a relative aspect-square overflow-hidden rounded-[22px] border border-fuchsia-500/20 shadow-[0_0_55px_rgba(235,37,196,.18)]"><div className="absolute bottom-6 left-6"><p className="page-kicker text-white/70">MOCIFY ORIGINAL</p><h1 className="mt-2 text-4xl font-black">{featuredTrack.title.split(" ").map((word, index) => <span key={index}>{index > 0 && <br/>}{word}</span>)}</h1></div></div>
          <div><p className="page-kicker">SINGLE · {featuredTrack.genre.toUpperCase()}</p><h2 className="mt-3 text-5xl font-black tracking-[-.055em] md:text-6xl">{featuredTrack.title}</h2><Link href={featuredArtist.href} className="mt-3 inline-block text-lg font-bold text-zinc-300">{featuredArtist.name}</Link><p className="mt-5 max-w-xl text-sm leading-7 text-zinc-400">A neon late-night MOCIFY release blending melodic pop, club energy and a playful futuristic edge.</p><div className="mt-7 flex items-center gap-3"><button type="button" className="m-primary">▶ Play</button><button type="button" aria-label="Like track" className="m-secondary">♡</button><button type="button" aria-label="Download track" className="m-secondary">↓</button><button type="button" aria-label="More track options" className="m-secondary">•••</button></div></div>
        </div>
        <div className="mt-12"><div className="flex items-center gap-4 text-xs text-zinc-500"><span>{featuredTrack.elapsed}</span><div className="h-1 flex-1 overflow-hidden rounded-full bg-white/10"><div className="h-full w-[45%] bg-gradient-to-r from-violet-500 via-fuchsia-500 to-orange-400"/></div><span>{featuredTrack.duration}</span></div><div className="mt-7 flex items-center justify-center gap-9 text-zinc-400"><button type="button" aria-label="Shuffle">↝</button><button type="button" aria-label="Previous track">◀</button><button type="button" aria-label="Pause track" className="grid h-14 w-14 place-items-center rounded-full border border-fuchsia-500/50 text-xl text-white shadow-[0_0_25px_rgba(237,53,197,.2)]">Ⅱ</button><button type="button" aria-label="Next track">▶</button><button type="button" aria-label="Repeat">↻</button></div></div>
      </div>

      <aside><p className="page-kicker">SIMILAR TRACKS</p><div className="mt-5 space-y-4">{releases.slice(1,5).map(r=><Link href={r.href} key={r.title} className="flex items-center gap-3"><div className={`h-14 w-14 shrink-0 rounded-lg ${r.art}`}/><div><b className="text-sm">{r.title}</b><p className="mt-1 text-[10px] text-zinc-500">{r.genre}</p></div></Link>)}</div></aside>
    </section>
  </Shell>
}
