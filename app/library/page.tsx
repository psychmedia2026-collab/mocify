import { likedTracks } from "../data";
import Link from "next/link";
import {Shell} from "../components";

export default function Library(){
  return <Shell player>
    <section className="page-wrap py-16"><p className="page-kicker">YOUR MUSIC</p><h1 className="page-title">My Library</h1><div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_.6fr]">
      <div><div className="home-heading"><div><p className="page-kicker">SAVED</p><h2>Liked tracks</h2></div></div><div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[.02]">{likedTracks.map(x=><Link href={x.href} key={x.id} className="grid grid-cols-[36px_1fr_auto] items-center gap-3 border-b border-white/8 p-5 last:border-0 hover:bg-white/[.035]"><span className="text-zinc-500">▶</span><div><b>{x.title}</b><p className="mt-1 text-xs text-zinc-500">{x.artist}</p></div><span className="text-fuchsia-400">♥</span></Link>)}</div></div>
      <aside><p className="page-kicker">PROFILE</p><div className="mt-4 rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_80%_0%,rgba(237,53,197,.14),transparent_35%),rgba(255,255,255,.025)] p-6"><div className="grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-violet-600 via-fuchsia-600 to-orange-500 text-2xl font-black">ME</div><h2 className="mt-5 text-xl font-black">MOCIFY Listener</h2><p className="mt-2 text-xs text-zinc-500">{likedTracks.length} liked tracks · 2 followed artists</p><Link href="/settings" className="m-secondary mt-5">Settings</Link></div></aside>
    </div></section>
  </Shell>
}
