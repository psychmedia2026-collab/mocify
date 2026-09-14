import Image from "next/image";
import hero from "../public/mocify-hero.webp";
import { artists, releases } from "./data";
import Link from "next/link";
import {Shell,ReleaseCard} from "./components";

const features=[
  ["✦","AI Powered","Unique, original music in seconds."],
  ["♫","All Genres","From Manele to Afrohouse. Trap to Arabic."],
  ["♢","Royalty Ready","A platform built around new music."],
  ["◎","For Everyone","Whether you're a listener or artist."],
];

export default function Home(){
  return <Shell active="home" player={false}>
    <section className="home-hero page-wrap">
      <div className="home-copy">
        <h1>AI MUSIC.<br/><span>INFINITE<br/>POSSIBILITIES.</span></h1>
        <p>MOCIFY is the AI music platform where a new generation of artists, sounds and ideas can be discovered. Listen, create, release and experience music like never before.</p>
        <div className="home-actions">
          <Link className="m-primary hero-cta" href="/explore">Start Listening <b>→</b></Link>
          <Link className="watch-link" href="/studio"><span>◈</span> MOCIFY STUDIO</Link>
        </div>
      </div>

      <div className="hero-portrait">
        <div className="hero-glow"/>
        <Image className="hero-photo" src={hero} unoptimized preload alt="Woman wearing futuristic neon headphones"/>
      </div>

      <div className="feature-strip hero-feature-strip" aria-label="MOCIFY highlights">
        {features.map(([icon,title,text])=><div className="feature-item" key={title}><span className="feature-icon" aria-hidden="true">{icon}</span><div><b>{title}</b><p>{text}</p></div></div>)}
      </div>
    </section>

    <section className="home-section page-wrap">
      <div className="home-heading"><div><p className="page-kicker">DISCOVER</p><h2>Trending Now</h2></div><Link href="/explore">View all →</Link></div>
      <div className="release-grid home-release-grid">{releases.slice(0,5).map((r,i)=><ReleaseCard key={r.title} r={r} index={i}/>)}</div>
    </section>

    <section className="home-section page-wrap">
      <div className="home-heading"><div><p className="page-kicker">POPULAR</p><h2>Popular Artists</h2></div><Link href="/artists">View all →</Link></div>
      <div className="artist-row">{artists.map(({name,initials,avatarCss,href})=><Link href={href} className="artist-mini" key={name}><span className="artist-avatar" style={{background:avatarCss}}>{initials}</span><b>{name}</b></Link>)}</div>
    </section>

    <section className="home-section page-wrap">
      <div className="creator-banner">
        <div><p className="page-kicker">MOCIFY STUDIO</p><h2>Your workspace for creating, editing and releasing AI music.</h2><p>Build tracks, manage projects, prepare releases, follow analytics and grow your artist profile from one dashboard.</p></div>
        <Link className="m-primary" href="/studio">Enter MOCIFY STUDIO →</Link>
      </div>
    </section>
  </Shell>
}
