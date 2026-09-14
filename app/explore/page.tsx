import { artists, genres, releases } from "../data";
import Link from "next/link";
import {ComingSoonButton,Shell,ReleaseCard} from "../components";

export default async function ExplorePage({searchParams}:{searchParams:Promise<{q?:string}>}){
  const params = await searchParams;
  const query = (params.q ?? "").trim();
  const normalized = query.toLocaleLowerCase();
  const trackMatches = normalized ? releases.filter((r)=>`${r.title} ${r.artist} ${r.genre}`.toLocaleLowerCase().includes(normalized)) : [];
  const artistMatches = normalized ? artists.filter((a)=>`${a.name} ${a.genre}`.toLocaleLowerCase().includes(normalized)) : [];
  const genreMatches = normalized ? genres.filter((g)=>g.toLocaleLowerCase().includes(normalized)) : [];
  const totalMatches = trackMatches.length + artistMatches.length + genreMatches.length;

  return <Shell active="explore">
    <div className="page-wrap py-10">
      <section className="relative overflow-hidden rounded-[26px] border border-violet-500/15 bg-[radial-gradient(circle_at_80%_20%,rgba(255,50,205,.35),transparent_30%),linear-gradient(120deg,#0d1230,#29105e_55%,#6e175e)] p-8 md:p-10">
        <div className="relative z-10 max-w-xl"><p className="page-kicker">FEATURED PLAYLIST</p><h1 className="mt-3 text-5xl font-black tracking-[-.055em] md:text-6xl">AI Vibes</h1><p className="mt-4 max-w-lg text-sm leading-6 text-zinc-300">A curated mix of the hottest AI-generated tracks. Fresh sounds. No limits.</p><ComingSoonButton className="m-secondary mt-6" label="Playlist playback is coming soon">▶ Preview playlist</ComingSoonButton></div>
        <div className="absolute -right-20 -top-16 h-72 w-72 rounded-full bg-fuchsia-500/30 blur-3xl"/>
        <div className="absolute bottom-8 right-8 text-xs text-white/70">1 / 5 &nbsp;&nbsp; ‹ &nbsp; ›</div>
      </section>

      {query && <section className="search-results" aria-live="polite">
        <p className="page-kicker">SEARCH MOCIFY</p>
        <h2 className="mt-2 text-3xl font-black">{totalMatches ? `${totalMatches} result${totalMatches === 1 ? "" : "s"} for “${query}”` : `No results for “${query}”`}</h2>
        {totalMatches > 0 && <div className="search-results-grid">
          {trackMatches.map((r)=><Link className="search-result-item" key={`track-${r.id}`} href={("href" in r && r.href) ? r.href : `/explore#${r.id}`}><small>TRACK · {r.genre}</small><b>{r.title}</b><small>{r.artist}</small></Link>)}
          {artistMatches.map((a)=><Link className="search-result-item" key={`artist-${a.name}`} href={a.href}><small>ARTIST · {a.genre}</small><b>{a.name}</b></Link>)}
          {genreMatches.map((g)=><Link className="search-result-item" key={`genre-${g}`} href="/explore#genres"><small>GENRE</small><b>{g}</b></Link>)}
        </div>}
      </section>}

      <section id="trending" className="scroll-mt-6 py-10">
        <div className="home-heading"><div><p className="page-kicker">DISCOVER</p><h2>Trending Now</h2></div><Link href="/artists">Artists →</Link></div>
        <div className="release-grid home-release-grid">{releases.slice(0,5).map((r,i)=><ReleaseCard key={r.title} r={r} index={i}/>)}</div>
      </section>

      <section id="genres" className="scroll-mt-6 pb-12">
        <div className="home-heading"><div><p className="page-kicker">BROWSE</p><h2>Genres</h2></div></div>
        <div className="flex flex-wrap gap-3">{genres.map(g=><Link href={`/explore?q=${encodeURIComponent(g)}`} key={g} className="genre-pill">{g}</Link>)}</div>
      </section>
    </div>
  </Shell>
}
