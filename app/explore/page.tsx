import { artists, genres, releases } from "../data";
import Link from "next/link";
import {Shell,ReleaseCard} from "../components";
import SectionHero from "../section-hero";

export default async function ExplorePage({searchParams}:{searchParams:Promise<{q?:string|string[]}>}){
  const params=await searchParams;
  const query=(Array.isArray(params.q)?params.q[0]??"":params.q??"").trim();
  const normalized=query.toLocaleLowerCase();
  const trackMatches=normalized?releases.filter(r=>`${r.title} ${r.artist} ${r.genre}`.toLocaleLowerCase().includes(normalized)):[];
  const artistMatches=normalized?artists.filter(a=>`${a.name} ${a.genre}`.toLocaleLowerCase().includes(normalized)):[];
  const genreMatches=normalized?genres.filter(g=>g.toLocaleLowerCase().includes(normalized)):[]; const totalMatches=trackMatches.length+artistMatches.length+genreMatches.length;
  return <Shell active="explore"><div className="page-wrap py-10">
    <SectionHero theme="explore" kicker="FEATURED PLAYLIST" title="AI" accent="Vibes" text="A curated mix of the hottest AI-generated tracks. Fresh sounds. New discoveries. No limits." cta="Discover music" href="#trending"/>
    {query&&<section className="search-results" aria-live="polite"><p className="page-kicker">SEARCH MOCIFY</p><h2 className="mt-2 text-3xl font-black">{totalMatches?`${totalMatches} result${totalMatches===1?"":"s"} for “${query}”`:`No results for “${query}”`}</h2>{totalMatches>0&&<div className="search-results-grid">{trackMatches.map(r=><Link className="search-result-item" key={`track-${r.id}`} href={("href" in r&&r.href)?r.href:`/explore#${r.id}`}><small>TRACK · {r.genre}</small><b>{r.title}</b><small>{r.artist}</small></Link>)}{artistMatches.map(a=><Link className="search-result-item" key={`artist-${a.name}`} href={a.href}><small>ARTIST · {a.genre}</small><b>{a.name}</b></Link>)}{genreMatches.map(g=><Link className="search-result-item" key={`genre-${g}`} href="/explore#genres"><small>GENRE</small><b>{g}</b></Link>)}</div>}</section>}
    <section id="trending" className="scroll-mt-24 py-10"><div className="home-heading"><div><p className="page-kicker">DISCOVER</p><h2>Trending Now</h2></div><Link href="/artists">Artists →</Link></div><div className="release-grid home-release-grid">{releases.slice(0,5).map((r,i)=><ReleaseCard key={r.title} r={r} index={i}/>)}</div></section>
    <section id="genres" className="scroll-mt-24 pb-12"><div className="home-heading"><div><p className="page-kicker">BROWSE</p><h2>Genres</h2></div></div><div className="flex flex-wrap gap-3">{genres.map(g=><Link href={`/explore?q=${encodeURIComponent(g)}`} key={g} className="genre-pill">{g}</Link>)}</div></section>
  </div></Shell>;
}
