"use client";
import Link from "next/link";
import {useLanguage} from "../i18n/language-provider";
type Artist={name:string;genre:string;gradientCss:string;avatarCss:string;initials:string};
type Track={id:string;title:string;artist:string;genre:string;art:string};
const copy={
en:{kicker:"MOCIFY ARTIST",music:"Music",artists:"Artists",empty:"No public releases yet."},
nl:{kicker:"MOCIFY ARTIEST",music:"Muziek",artists:"Artiesten",empty:"Nog geen openbare releases."},
ro:{kicker:"ARTIST MOCIFY",music:"Muzică",artists:"Artiști",empty:"Încă nu există lansări publice."},
de:{kicker:"MOCIFY KÜNSTLER",music:"Musik",artists:"Künstler",empty:"Noch keine öffentlichen Veröffentlichungen."},
fr:{kicker:"ARTISTE MOCIFY",music:"Musique",artists:"Artistes",empty:"Aucune sortie publique pour le moment."},
es:{kicker:"ARTISTA MOCIFY",music:"Música",artists:"Artistas",empty:"Aún no hay lanzamientos públicos."},
it:{kicker:"ARTISTA MOCIFY",music:"Musica",artists:"Artisti",empty:"Nessuna pubblicazione pubblica al momento."},
pt:{kicker:"ARTISTA MOCIFY",music:"Música",artists:"Artistas",empty:"Ainda não há lançamentos públicos."},
pl:{kicker:"ARTYSTA MOCIFY",music:"Muzyka",artists:"Artyści",empty:"Brak publicznych wydań."},
tr:{kicker:"MOCIFY SANATÇISI",music:"Müzik",artists:"Sanatçılar",empty:"Henüz herkese açık yayın yok."},
id:{kicker:"ARTIS MOCIFY",music:"Musik",artists:"Artis",empty:"Belum ada rilisan publik."},
ja:{kicker:"MOCIFY アーティスト",music:"音楽",artists:"アーティスト",empty:"公開リリースはまだありません。"},
ko:{kicker:"MOCIFY 아티스트",music:"음악",artists:"아티스트",empty:"아직 공개 릴리스가 없습니다."},
hi:{kicker:"MOCIFY कलाकार",music:"संगीत",artists:"कलाकार",empty:"अभी कोई सार्वजनिक रिलीज़ नहीं है।"}
} as const;
export default function ArtistCatalogProfile({artist,tracks}:{artist:Artist;tracks:Track[]}){const{locale}=useLanguage();const t=(copy as any)[locale]??copy.en;return <main className="page-wrap artist-catalog-profile"><section className="artist-catalog-hero" style={{background:artist.gradientCss}}><span className="artist-catalog-avatar" style={{background:artist.avatarCss}}>{artist.initials}</span><div><p className="page-kicker">{t.kicker}</p><h1>{artist.name}</h1><p>{artist.genre}</p></div></section><section className="mockup-section"><div className="mockup-heading"><h2>{t.music}</h2><Link href="/artists">← {t.artists}</Link></div>{tracks.length?<div className="release-grid">{tracks.map(r=><article className="release-card" key={r.id}><div className={"release-art "+r.art}/><small>{r.genre}</small><h3>{r.title}</h3><p>{r.artist}</p></article>)}</div>:<div className="search-results"><p>{t.empty}</p></div>}</section></main>}