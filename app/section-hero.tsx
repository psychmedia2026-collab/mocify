"use client";

import Link from "next/link";
import { useLanguage } from "./i18n/language-provider";

type Theme = "explore" | "artists" | "radio" | "premium" | "library" | "playlists";

type Props = {theme:Theme;kicker:string;title:string;accent?:string;text:string;cta:string;href:string};

export default function SectionHero({theme,kicker,title,accent,text,cta,href}:Props){
  const { dictionary } = useLanguage();
  const fallback={kicker,title,accent,text,cta};
  const hero = theme==="playlists"?fallback:dictionary.heroes[theme];

  return <section className={`section-cinematic-hero section-cinematic-${theme}`}>
    {theme==="playlists"?<div className="playlist-hero-art" aria-hidden="true"><div className="playlist-hero-glow"/><div className="playlist-hero-stack"><div className="playlist-hero-card playlist-hero-card-back"><span>03</span><i/><b>Night Drive</b><small>MOCIFY MIX</small></div><div className="playlist-hero-card playlist-hero-card-mid"><span>02</span><i/><b>Fresh AI</b><small>NEW RELEASES</small></div><div className="playlist-hero-card playlist-hero-card-front"><div className="playlist-hero-card-head"><em>01</em><strong>TOP 40</strong></div><div className="playlist-hero-song"><i/><span><b>Trending Now</b><small>Global chart</small></span><em>▶</em></div><div className="playlist-hero-bars"><i/><i/><i/><i/><i/><i/><i/><i/></div></div></div><div className="playlist-hero-orbit"><span>♫</span></div></div>:<div className="section-cinematic-art" aria-hidden="true"><i/><i/><i/></div>}
    <div className="section-cinematic-copy">
      <p className="page-kicker">{hero.kicker}</p>
      <h1>{hero.title}{hero.accent&&<> <span>{hero.accent}</span></>}</h1>
      <p>{hero.text}</p>
      <Link className="section-cinematic-cta" href={href}>{hero.cta}</Link>
    </div>
    <div className="section-cinematic-pager" aria-hidden="true">1 / 5 &nbsp;&nbsp; ‹ &nbsp; ›</div>
  </section>;
}
