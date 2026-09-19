"use client";
import Link from "next/link";
import {useParams} from "next/navigation";
import {Shell} from "../../../components";
import {countryGenreMap,countryPlaylists,genrePlaylists,regionalGenres,releases} from "../../../data";
import {useListenerPlayer} from "../../../listener-player";
import {useEffect,useState} from "react";
import {SAVED_PLAYLIST_KEY,readIds,toggleId} from "../../../listener-account";
const top40Ids=["toca-bonbon","bella-ciao","fara-mine","money-money","kill-the-beat","digital-touch","after-you","zero-gravity","afterlight"];
const getTracks=(ids:readonly string[])=>ids.map(id=>releases.find(r=>r.id===id)).filter((r):r is (typeof releases)[number]=>Boolean(r));
const titleFor=(code:string,name:string)=>code==="INT"?"MOCIFY Top 40":code==="GB"?"UK Top 40":code==="US"?"US Top 40":name+" Top 40";
export default function PlaylistDetail(){
 const params=useParams<{country:string;slug:string}>(),[saved,setSaved]=useState(false),code=(params.country||"int").toUpperCase(),slug=params.slug||"top40",player=useListenerPlayer();
 const playlistPath="/playlists/"+code.toLowerCase()+"/"+slug;useEffect(()=>setSaved(readIds(SAVED_PLAYLIST_KEY).includes(playlistPath)),[playlistPath]);
 const country=countryPlaylists.find(p=>p.code===code)??countryPlaylists[0],allGenres=[...genrePlaylists,...Object.values(regionalGenres).flat()];
 const genre=allGenres.find(g=>g.slug===slug),allowed=(countryGenreMap[code]??countryGenreMap.INT).includes(slug);
 const playlist=slug==="top40"?{title:titleFor(code,country.country),subtitle:country.subtitle,releaseIds:code==="INT"?top40Ids:country.releaseIds}:allowed&&genre?genre:null;
 if(!playlist)return <Shell active="playlists"><section className="playlist-detail page-wrap"><Link href="/playlists">← Playlists</Link><h1>Playlist not available</h1><p>This genre is not part of the selected country's playlist catalog.</p></section></Shell>;
 const tracks=getTracks(playlist.releaseIds),playable=tracks.filter(t=>"audioSrc"in t&&Boolean(t.audioSrc));
 const playAll=(shuffle=false)=>{let queue=playable;if(shuffle)queue=[...queue].sort(()=>Math.random()-.5);if(queue[0])player.selectTrack(queue[0],queue,true)};
 const playOne=(id:string)=>{const track=playable.find(t=>t.id===id);if(track)player.selectTrack(track,playable,true)};
 return <Shell active="playlists"><section className="playlist-detail page-wrap">
  <Link className="playlist-back" href="/playlists">← All playlists</Link>
  <header className="playlist-detail-hero"><div className="playlist-detail-art"><span>{country.flag}</span><b>{slug==="top40"?"40":"♫"}</b></div><div><small>{slug==="top40"?"COUNTRY CHART":"MOCIFY PLAYLIST"} · {country.country}</small><h1>{playlist.title}</h1><p>{playlist.subtitle}</p><span>{tracks.length} tracks</span><div className="playlist-detail-actions"><button className="m-primary" disabled={!playable.length} onClick={()=>playAll(false)}>▶ Play all</button><button className="m-secondary" disabled={playable.length<2} onClick={()=>playAll(true)}>⤨ Shuffle</button><button className="m-secondary" onClick={()=>setSaved(toggleId(SAVED_PLAYLIST_KEY,playlistPath))}>{saved?"♥ Saved":"♡ Save"}</button></div></div></header>
  <div className="playlist-detail-list"><div className="playlist-detail-row head"><span>#</span><span>Track</span><span>Artist</span><span>Duration</span><span></span></div>{tracks.length?tracks.map((track,i)=><button className="playlist-detail-row" key={track.id} onClick={()=>playOne(track.id)}><span>{i+1}</span><span className="detail-track"><i className={track.art}/><b>{track.title}</b></span><span>{track.artist}</span><span>{"duration"in track?track.duration:"—"}</span><span>▶</span></button>):<div className="playlist-detail-empty"><h3>No releases yet</h3><p>This playlist is ready and will automatically fill when matching releases are added to the catalog.</p></div>}</div>
 </section></Shell>
}