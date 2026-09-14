import { artists } from "../data";
import Link from "next/link";
import {Shell} from "../components";
import SectionHero from "../section-hero";

export default function ArtistsPage(){
  return <Shell active="artists">
    <div className="page-wrap mockup-page-top"><SectionHero theme="artists" kicker="ARTISTS" title="Meet the" accent="Artists" text="Discover the creators behind the sound. Unique minds. Infinite music." cta="Explore Artists" href="#artist-list"/></div>
    <section id="artist-list" className="page-wrap mockup-section scroll-mt-24">
      <div className="mockup-heading"><h2>Popular Artists</h2><Link href="/artists">View all →</Link></div>
      <div className="mockup-artist-row">
        {artists.slice(0,8).map(({name,genre,initials,avatarCss,href,profileReady},i)=>{
          const face=<><span className="mockup-artist-avatar" style={{background:avatarCss}}><span className="mockup-avatar-face" aria-hidden="true">{initials}</span>{i<6&&<i/>}</span><b>{name}</b><small>{genre}</small></>;
          return profileReady?<Link href={href} className="mockup-artist-pill" key={name}>{face}</Link>:<div className="mockup-artist-pill" key={name}>{face}</div>;
        })}
      </div>
    </section>
  </Shell>
}
