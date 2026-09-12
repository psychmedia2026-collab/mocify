import Link from "next/link";
import {Shell,releases,ReleaseCard} from "./components";

const artists=[
  ["Andigo","AN","from-fuchsia-600 to-violet-900"],
  ["Sabrina","SA","from-violet-500 to-pink-800"],
  ["DJ Kairo","DK","from-cyan-500 to-indigo-900"],
  ["Loredana AI","LA","from-orange-500 to-fuchsia-800"],
  ["Rami","RA","from-indigo-500 to-slate-900"],
  ["Zeyna","ZE","from-pink-500 to-violet-900"],
  ["SAYNO","SY","from-purple-500 to-fuchsia-900"],
  ["Balkan Vibes","BV","from-cyan-500 to-purple-900"],
];

const features=[
  ["✦","AI Powered","Unique, original music in seconds."],
  ["♫","All Genres","From Manele to Afrohouse. Trap to Arabic."],
  ["♢","Royalty Ready","A platform built around new music."],
  ["◎","For Everyone","Whether you're a listener, artist or creator."],
];

export default function Home(){
  return <Shell active="home" player={false}>
    <section className="home-hero page-wrap">
      <div className="home-copy">
        <h1>AI MUSIC.<br/><span>INFINITE<br/>POSSIBILITIES.</span></h1>
        <p>MOCIFY is the AI music platform where a new generation of artists, sounds and ideas can be discovered. Listen, upload and experience music like never before.</p>
        <div className="home-actions">
          <Link className="m-primary hero-cta" href="/explore">Start Listening <b>→</b></Link>
          <Link className="watch-link" href="/explore"><span>▶</span> Explore Music</Link>
        </div>
      </div>

      <div className="hero-portrait" aria-label="MOCIFY neon music artwork">
        <div className="hero-glow"/>
        <img className="hero-photo" src="/mocify-hero.webp" alt="Woman wearing futuristic neon headphones"/>
        <img className="hero-bird" src="/mocify-logo.webp" alt=""/>
      </div>
    </section>

    <section className="feature-strip page-wrap">
      {features.map(([icon,title,text])=><div className="feature-item" key={title}><span className="feature-icon">{icon}</span><div><b>{title}</b><p>{text}</p></div></div>)}
    </section>

    <section className="home-section page-wrap">
      <div className="home-heading"><div><p className="page-kicker">DISCOVER</p><h2>Trending Now</h2></div><Link href="/explore">View all →</Link></div>
      <div className="release-grid home-release-grid">{releases.slice(0,5).map((r,i)=><ReleaseCard key={r.title} r={r} index={i}/>)}</div>
    </section>

    <section className="home-section page-wrap">
      <div className="home-heading"><div><p className="page-kicker">POPULAR</p><h2>Popular Artists</h2></div><Link href="/artists">View all →</Link></div>
      <div className="artist-row">{artists.map(([name,initials,gradient])=><Link href={name==="Andigo"?"/artist/ava-9":"/artists"} className="artist-mini" key={name}><span className={`artist-avatar bg-gradient-to-br ${gradient}`}>{initials}</span><b>{name}</b></Link>)}</div>
    </section>

    <section className="home-section page-wrap">
      <div className="creator-banner">
        <div><p className="page-kicker">FOR ARTISTS</p><h2>Bring your sound into the MOCIFY universe.</h2><p>Upload your AI music, build your identity and reach listeners in one place.</p></div>
        <Link className="m-primary" href="/upload">Upload your music →</Link>
      </div>
    </section>
  </Shell>
}
