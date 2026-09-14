import { artists } from "../data";
import Link from "next/link";
import {Shell} from "../components";
import SectionHero from "../section-hero";

export default function ArtistsPage(){
  return <Shell active="artists">
    <div className="page-wrap py-10"><SectionHero theme="artists" kicker="ARTISTS" title="Meet the" accent="Artists" text="Discover the creators behind the sound. Unique identities, fresh catalogs and a new generation of AI music." cta="Explore artists" href="#artist-list"/></div>
    <section id="artist-list" className="page-wrap scroll-mt-24 pb-16">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {artists.map(({name,genre,initials,gradientCss,href,profileReady})=>{
          const className = "artist-card group rounded-2xl border border-white/8 bg-white/[.025] p-4 transition hover:-translate-y-1 hover:border-fuchsia-500/20 hover:bg-white/[.045]";
          const content = <><div className="artist-card-art relative grid aspect-square place-items-center overflow-hidden rounded-xl" style={{background:gradientCss}}><div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_25%,rgba(255,255,255,.25),transparent_18%)]"/><span className="relative grid h-28 w-28 place-items-center rounded-full border border-white/20 bg-black/25 text-3xl font-black backdrop-blur">{initials}</span></div><p className="page-kicker mt-4">{genre}</p><h2 className="mt-2 text-xl font-black">{name}</h2><p className="mt-2 text-xs text-zinc-400">{profileReady ? "View profile →" : "Profile coming soon"}</p></>;
          return profileReady ? <Link href={href} key={name} className={className}>{content}</Link> : <article id={href.split("#")[1]} key={name} className={`${className} artist-card-soon`}>{content}<span className="prototype-badge artist-soon-badge">SOON</span></article>;
        })}
      </div>
    </section>
  </Shell>
}
