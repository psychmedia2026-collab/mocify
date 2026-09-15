"use client";

import {useSearchParams} from "next/navigation";
import { artists, genres, releases } from "../data";
import Link from "next/link";
import {Shell,ReleaseCard} from "../components";
import SectionHero from "../section-hero";
import {useLanguage} from "../i18n/language-provider";

export default function ExplorePage(){
  const params=useSearchParams(); const query=(params.get("q")??"").trim(); const normalized=query.toLocaleLowerCase();
  const {dictionary}=useLanguage(); const t=dictionary.pages.explore; const h=dictionary.heroes.explore;
  const trackMatches=normalized?releases.filter(r=>`${r.title} ${r.artist} ${r.genre}`.toLocaleLowerCase().includes(normalized)):[];
  const artistMatches=normalized?artists.filter(a=>`${a.name} ${a.genre}`.toLocaleLowerCase().includes(normalized)):[];
  const genreMatches=normalized?genres.filter(g=>g.toLocaleLowerCase().includes(normalized)):[]; const totalMatches=trackMatches.length+artistMatches.length+genreMatches.length;
  return <Shell active="explore"><div className="page-wrap py-10">
    <SectionHero theme="explore" {...h} href="#trending"/>
    {query&&<section className="search-results" aria-live="polite"><p className="page-kicker">{t.searchTitle}</p><h2 className="mt-2 text-3xl font-black">{totalMatches?`${totalMatches} ${totalMatches===1?t.result:t.results} ${t.for} “${query}”`:`${t.noResults} “${query}”`}</h2>{totalMatches>0&&<div className="search-results-grid">{trackMatches.map(r=><Link className="search-result-item" key={`track-${r.id}`} href={("href" in r&&r.href)?r.href:`/explore#${r.id}`}><small>{t.track} · {r.genre}</small><b>{r.title}</b><small>{r.artist}</small></Link>)}{artistMatches.map(a=>a.profileReady?<Link className="search-result-item" key={`artist-${a.name}`} href={a.href}><small>{t.artist} · {a.genre}</small><b>{a.name}</b></Link>:<div className="search-result-item search-result-unavailable" key={`artist-${a.name}`} aria-label={`${a.name} ${dictionary.pages.artists.profileSoon}`}><small>{t.artist} · {a.genre}</small><b>{a.name}</b><span>{dictionary.common.comingSoon}</span></div>)}{genreMatches.map(g=><Link className="search-result-item" key={`genre-${g}`} href="/explore#genres"><small>{t.genre}</small><b>{g}</b></Link>)}</div>}</section>}
    <section id="trending" className="scroll-mt-24 py-10"><div className="home-heading"><div><p className="page-kicker">{t.discover}</p><h2>{t.trending}</h2></div><Link href="/artists">{dictionary.nav.artists} →</Link></div><div className="release-grid home-release-grid">{releases.slice(0,5).map((r,i)=><ReleaseCard key={r.title} r={r} index={i}/>)}</div></section>
    <section id="genres" className="scroll-mt-24 pb-12"><div className="home-heading"><div><p className="page-kicker">{t.browse}</p><h2>{t.genres}</h2></div></div><div className="flex flex-wrap gap-3">{genres.map(g=><Link href={`/explore?q=${encodeURIComponent(g)}`} key={g} className="genre-pill">{g}</Link>)}</div></section>
  </div></Shell>;
}
