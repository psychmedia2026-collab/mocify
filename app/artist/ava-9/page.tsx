import Link from "next/link";
import {Shell} from "../../components";

const songs=["TOCA BONBON","Digital Touch","After You","Zero Gravity"];

export default function Artist(){
  return <Shell active="artists">
    <section className="page-wrap py-12">
      <div className="relative overflow-hidden rounded-[28px] border border-fuchsia-500/20 bg-[radial-gradient(circle_at_75%_20%,rgba(255,43,193,.32),transparent_30%),linear-gradient(120deg,#170929,#27105c_48%,#061127)] p-8 md:p-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-end"><div className="grid h-48 w-48 shrink-0 place-items-center rounded-full border-2 border-white/20 bg-gradient-to-br from-fuchsia-500 via-violet-700 to-slate-950 text-5xl font-black shadow-[0_0_50px_rgba(237,53,197,.25)]">AN</div><div><p className="page-kicker">VERIFIED AI ARTIST</p><h1 className="mt-3 text-6xl font-black tracking-[-.06em] md:text-8xl">Andigo</h1><p className="mt-4 max-w-xl text-zinc-300">Neon emotion, late-night melodies and a futuristic pop identity built for MOCIFY.</p><div className="mt-6 flex gap-3"><button className="m-primary">▶ Play</button><button className="m-secondary">Follow</button></div></div></div>
      </div>

      <section className="py-12"><div className="home-heading"><div><p className="page-kicker">TOP TRACKS</p><h2>Popular</h2></div></div><div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[.02]">{songs.map((s,i)=><Link href={i===0?"/track/neon-heart":"#"} key={s} className="grid grid-cols-[38px_1fr_auto] items-center border-b border-white/8 p-5 last:border-0 hover:bg-white/[.035]"><span className="text-zinc-600">{i+1}</span><div><b>{s}</b><p className="mt-1 text-xs text-zinc-500">Andigo</p></div><span className="text-xs text-zinc-500">3:{18+i*7}</span></Link>)}</div></section>
    </section>
  </Shell>
}
