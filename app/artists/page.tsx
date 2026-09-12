import Link from "next/link";
import {Shell} from "../components";

const artists=[
  ["Andigo","AI POP","AN","from-fuchsia-500 via-purple-700 to-slate-950","/artist/ava-9"],
  ["Sabrina","DARK POP","SA","from-violet-500 via-pink-700 to-slate-950","/artists"],
  ["DJ Kairo","ELECTRONIC","DK","from-cyan-400 via-indigo-700 to-slate-950","/artists"],
  ["Loredana AI","MANALE","LA","from-orange-400 via-pink-700 to-violet-950","/artists"],
  ["Rami","R&B","RA","from-blue-500 via-violet-800 to-slate-950","/artists"],
  ["Zeyna","AFROHOUSE","ZE","from-pink-500 via-fuchsia-700 to-violet-950","/artists"],
  ["SAYNO","TRAP","SY","from-purple-500 via-indigo-800 to-black","/artists"],
  ["Balkan Vibes","BALKAN","BV","from-cyan-500 via-fuchsia-700 to-slate-950","/artists"],
];

export default function ArtistsPage(){
  return <Shell active="artists">
    <section className="page-wrap py-16">
      <p className="page-kicker">ARTISTS</p>
      <div className="mt-3 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div><h1 className="page-title max-w-4xl">The voices of a <span className="gradient-text">new music era.</span></h1><p className="page-lead mt-6">Discover artificial artists with their own sound, visual identity and growing catalog.</p></div>
        <div className="rounded-full border border-white/10 bg-white/[.03] px-5 py-3 text-sm text-zinc-500">⌕ Search artists</div>
      </div>
    </section>

    <section className="page-wrap pb-16">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {artists.map(([name,genre,initials,gradient,href])=><Link href={href} key={name} className="group rounded-2xl border border-white/8 bg-white/[.025] p-4 transition hover:-translate-y-1 hover:border-fuchsia-500/20 hover:bg-white/[.045]">
          <div className={`relative grid aspect-square place-items-center overflow-hidden rounded-xl bg-gradient-to-br ${gradient}`}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_25%,rgba(255,255,255,.25),transparent_18%)]"/>
            <span className="relative grid h-28 w-28 place-items-center rounded-full border border-white/20 bg-black/25 text-3xl font-black backdrop-blur">{initials}</span>
          </div>
          <p className="page-kicker mt-4">{genre}</p><h2 className="mt-2 text-xl font-black">{name}</h2><p className="mt-2 text-xs text-zinc-500">View profile →</p>
        </Link>)}
      </div>
    </section>
  </Shell>
}
