"use client";

import Link from "next/link";
import { useLanguage } from "./i18n/language-provider";

type Theme = "explore" | "artists" | "radio" | "premium" | "library" | "playlists";

type Props = {theme:Theme;kicker:string;title:string;accent?:string;text:string;cta:string;href:string};

export default function SectionHero({theme,href}:Props){
  const { dictionary } = useLanguage();
  const fallback={kicker,title,accent,text,cta};
  const hero = theme==="playlists"?fallback:dictionary.heroes[theme];

  return <section className={`section-cinematic-hero section-cinematic-${theme}`}>
    <div className="section-cinematic-art" aria-hidden="true"><i/><i/><i/></div>
    <div className="section-cinematic-copy">
      <p className="page-kicker">{hero.kicker}</p>
      <h1>{hero.title}{hero.accent&&<> <span>{hero.accent}</span></>}</h1>
      <p>{hero.text}</p>
      <Link className="section-cinematic-cta" href={href}>{hero.cta}</Link>
    </div>
    <div className="section-cinematic-pager" aria-hidden="true">1 / 5 &nbsp;&nbsp; ‹ &nbsp; ›</div>
  </section>;
}
