import Link from "next/link";
import {notFound} from "next/navigation";
import {artists,releases} from "../../data";
import {Shell} from "../../components";

const slugify=(value:string)=>value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
export default async function ArtistProfile({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const artist=artists.find(a=>slugify(a.name)===slug);if(!artist)notFound();
 const tracks=releases.filter(r=>r.artist===artist.name);
 return <Shell active="artists"><main className="page-wrap artist-catalog-profile"><section className="artist-catalog-hero" style={{background:artist.gradientCss}}><span className="artist-catalog-avatar" style={{background:artist.avatarCss}}>{artist.initials}</span><div><p className="page-kicker">MOCIFY ARTIST</p><h1>{artist.name}</h1><p>{artist.genre}</p></div></section><section className="mockup-section"><div className="mockup-heading"><h2>Music</h2><Link href="/artists">← Artists</Link></div>{tracks.length?<div className="release-grid">{tracks.map(r=><article className="release-card" key={r.id}><div className={"release-art "+r.art}/><small>{r.genre}</small><h3>{r.title}</h3><p>{r.artist}</p></article>)}</div>:<div className="search-results"><p>No public releases yet.</p></div>}</section></main></Shell>
}