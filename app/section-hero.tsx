import Link from "next/link";

type Theme = "explore" | "artists" | "radio" | "premium" | "library";

export default function SectionHero({theme,kicker,title,accent,text,cta,href}:{theme:Theme;kicker:string;title:string;accent?:string;text:string;cta:string;href:string}){
  return <section className={`section-cinematic-hero section-cinematic-${theme}`}>
    <div className="section-cinematic-art" aria-hidden="true"><i/><i/><i/></div>
    <div className="section-cinematic-copy">
      <p className="page-kicker">{kicker}</p>
      <h1>{title}{accent&&<> <span>{accent}</span></>}</h1>
      <p>{text}</p>
      <Link className="section-cinematic-cta" href={href}>{cta}</Link>
    </div>
    <div className="section-cinematic-pager" aria-hidden="true">1 / 5 &nbsp;&nbsp; ‹ &nbsp; ›</div>
  </section>;
}
