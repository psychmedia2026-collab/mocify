"use client";

import { featuredArtist, featuredTrack, releases } from "../../data";
import Link from "next/link";
import {Shell} from "../../components";
import {useListenerPlayer} from "../../listener-player";
import {useLanguage} from "../../i18n/language-provider";

export default function Track(){
  const {dictionary}=useLanguage(); const t=dictionary.pages.track;
  const {currentTrack,isPlaying,selectTrack,togglePlay}=useListenerPlayer();
  const isCurrent=currentTrack.id===featuredTrack.id;
  const play=()=>{if(isCurrent) togglePlay(); else selectTrack(featuredTrack,undefined,true)};
  return <Shell active="explore" player>
    <section className="track-page page-wrap grid gap-10 py-16 lg:grid-cols-[1fr_280px]">
      <div><div className="grid gap-8 md:grid-cols-[300px_1fr] md:items-center">
        <div className="art-a relative aspect-square overflow-hidden rounded-[22px] border border-fuchsia-500/20 shadow-[0_0_55px_rgba(235,37,196,.18)]"><div className="absolute bottom-6 left-6"><p className="page-kicker text-white/70">MOCIFY ORIGINAL</p><h1 className="mt-2 text-4xl font-black">{featuredTrack.title.split(" ").map((word,index)=><span key={index}>{index>0&&<br/>}{word}</span>)}</h1></div></div>
        <div><p className="page-kicker">SINGLE · {featuredTrack.genre.toUpperCase()}</p><h2 className="mt-3 text-5xl font-black tracking-[-.055em] md:text-6xl">{featuredTrack.title}</h2><Link href={featuredArtist.href} className="mt-3 inline-block text-lg font-bold text-zinc-300">{featuredArtist.name}</Link><p className="mt-5 max-w-xl text-sm leading-7 text-zinc-400">{t.description}</p><div className="mt-7 flex flex-wrap items-center gap-3"><button type="button" className="m-primary" onClick={play}>{isCurrent&&isPlaying?"Ⅱ "+t.pause:"▶ "+t.play}</button><button type="button" className="m-secondary prototype-control" disabled>♡ {t.favorite}</button><button type="button" className="m-secondary prototype-control" disabled>↓ {t.download}</button><button type="button" className="m-secondary prototype-control" disabled>••• {t.more}</button></div></div>
      </div></div>
      <aside><p className="page-kicker">{t.similar}</p><div className="mt-5 space-y-4">{releases.slice(1,5).map(r=>{const item=<><div className={`h-14 w-14 shrink-0 rounded-lg ${r.art}`}/><div><b className="text-sm">{r.title}</b><p className="mt-1 text-[10px] text-zinc-400">{r.genre}</p></div></>; return "href" in r&&r.href?<Link href={r.href} key={r.title} className="flex items-center gap-3">{item}</Link>:<div key={r.title} className="flex items-center gap-3 opacity-80" title={dictionary.common.comingSoon}>{item}<span className="prototype-badge ml-auto">{dictionary.common.comingSoon}</span></div>})}</div></aside>
    </section>
  </Shell>
}
