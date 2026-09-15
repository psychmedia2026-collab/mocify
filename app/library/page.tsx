import { releases } from "../data";
import Link from "next/link";
import {Shell} from "../components";
import SectionHero from "../section-hero";

export default function Library(){return <Shell active="library" player>
  <div className="page-wrap mockup-page-top"><SectionHero theme="library" kicker="LIBRARY" title="Your Music." accent="Your Space." text="Preview the listener library layout. Personal favorites, playlists and saved artists are not connected yet." cta="View Preview" href="#recently-played"/></div>
  <section id="recently-played" className="page-wrap mockup-section scroll-mt-24">
    <div className="mockup-heading"><div><h2>Recently Played</h2><p className="library-prototype-note">Sample catalog content for this prototype</p></div></div>
    <div className="mockup-library-row">{releases.slice(0,6).map((track)=><Link className="mockup-track-mini" key={track.id} href={("href" in track&&track.href)?track.href:`/explore#${track.id}`}><div className={`mockup-track-art ${track.art}`}/><b>{track.title}</b><small>{track.genre}</small></Link>)}</div>
  </section>
</Shell>}
