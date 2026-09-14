import { likedTracks } from "../data";
import Link from "next/link";
import {Shell} from "../components";
import SectionHero from "../section-hero";

export default function Library(){return <Shell active="library" player>
  <div className="page-wrap py-10"><SectionHero theme="library" kicker="YOUR LIBRARY" title="Your Music." accent="Your Space." text="All your favorite tracks, artists and discoveries together in one personal MOCIFY space." cta="Open library" href="#my-library"/></div>
  <section id="my-library" className="page-wrap scroll-mt-24 pb-16"><div className="grid gap-6 lg:grid-cols-[1.4fr_.6fr]"><div><div className="home-heading"><div><p className="page-kicker">SAVED</p><h2>Liked tracks</h2></div></div><div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[.02]">{likedTracks.map(x=><Link href={x.href} key={x.id} className="grid grid-cols-[36px_1fr_auto] items-center gap-3 border-b border-white/8 p-5 last:border-0 hover:bg-white/[.035]"><span className="text-zinc-400">▶</span><div><b>{x.title}</b><p className="mt-1 text-xs text-zinc-400">{x.artist}</p></div><span className="text-fuchsia-400">♥</span></Link>)}</div></div><aside><p className="page-kicker">PROFILE</p><div className="mt-4 rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_80%_0%,rgba(237,53,197,.14),transparent_35%),rgba(255,255,255,.025)] p-6"><div className="library-avatar grid h-20 w-20 place-items-center rounded-full text-2xl font-black">ME</div><h2 className="mt-5 text-xl font-black">MOCIFY Listener</h2><p className="mt-2 text-xs text-zinc-400">{likedTracks.length} liked tracks · 2 followed artists</p><Link href="/settings" className="m-secondary mt-5">Settings</Link></div></aside></div></section>
</Shell>}
