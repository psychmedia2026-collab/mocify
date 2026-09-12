import { artistTracks, featuredArtist } from "../../data";
import Link from "next/link";
import {ComingSoonButton,Shell} from "../../components";

export default function Artist(){
  return <Shell active="artists">
    <section className="page-wrap py-12">
      <div className="relative overflow-hidden rounded-[28px] border border-fuchsia-500/20 bg-[radial-gradient(circle_at_75%_20%,rgba(255,43,193,.32),transparent_30%),linear-gradient(120deg,#170929,#27105c_48%,#061127)] p-8 md:p-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-end"><div className="grid h-48 w-48 shrink-0 place-items-center rounded-full border-2 border-white/20 text-5xl font-black shadow-[0_0_50px_rgba(237,53,197,.25)]" style={{background:featuredArtist.avatarCss}}>{featuredArtist.initials}</div><div><p className="page-kicker">VERIFIED AI ARTIST</p><h1 className="mt-3 text-6xl font-black tracking-[-.06em] md:text-8xl">{featuredArtist.name}</h1><p className="mt-4 max-w-xl text-zinc-300">Neon emotion, late-night melodies and a futuristic pop identity built for MOCIFY.</p><div className="mt-6 flex flex-wrap gap-3"><ComingSoonButton className="m-primary" label="Artist playback is coming soon">▶ Play artist</ComingSoonButton><ComingSoonButton label="Following artists is coming soon">Follow</ComingSoonButton></div></div></div>
      </div>

      <section className="py-12"><div className="home-heading"><div><p className="page-kicker">TOP TRACKS</p><h2>Popular</h2></div></div><div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[.02]">{artistTracks.map((song,i)=>{
        const content = <><span className="text-zinc-500">{i+1}</span><div><b>{song.title}</b><p className="mt-1 text-xs text-zinc-400">{featuredArtist.name}</p></div><span className="text-xs text-zinc-400">{song.duration}</span></>;
        const className = "grid grid-cols-[38px_1fr_auto] items-center border-b border-white/8 p-5 last:border-0 hover:bg-white/[.035]";
        return song.id === "toca-bonbon" ? <Link id={song.id} href={song.href} key={song.title} className={className}>{content}</Link> : <div id={song.id} key={song.title} className={className}>{content}<span className="sr-only">Track page coming soon</span></div>;
      })}</div></section>
    </section>
  </Shell>
}
