"use client";
import {Shell} from "../components";
import {genrePlaylists,releases} from "../data";

const top40Ids=["toca-bonbon","bella-ciao","fara-mine","money-money","kill-the-beat","digital-touch","after-you","zero-gravity","afterlight"];
const playlistColumns=[
 {slug:"top40",title:"MOCIFY Top 40",kicker:"TOP CHART",releaseIds:top40Ids},
 ...genrePlaylists.map(p=>({...p,kicker:"GENRE"})),
];
function getTracks(ids:readonly string[]){return ids.map(id=>releases.find(r=>r.id===id)).filter((r):r is (typeof releases)[number]=>Boolean(r));}
export default function PlaylistsPage(){
 return <Shell active="playlists">
  <section className="playlist-page page-wrap">
   <header className="playlist-page-intro"><p className="page-kicker">MOCIFY PLAYLISTS</p><h1>Charts & <span>genres.</span></h1><p>Browse the MOCIFY Top 40 and genre playlists. Every list keeps the music compact: cover, song title and artist.</p></header>
   <div className="playlist-board" aria-label="MOCIFY playlists">
    {playlistColumns.map(column=><section className="playlist-column" id={column.slug} key={column.slug}>
      <header><div><small>{column.kicker}</small><h2>{column.title}</h2></div><button type="button" aria-label={"Play "+column.title}>▶</button></header>
      <div className="playlist-song-list">{getTracks(column.releaseIds).map((track,index)=><article className="playlist-song" key={track.id}>
       <span className="playlist-rank">{index+1}</span><div className={"playlist-song-cover "+track.art} aria-hidden="true"/><div className="playlist-song-copy"><b>{track.title}</b><span>{track.artist}</span></div>
      </article>)}</div>
    </section>)}
   </div>
  </section>
 </Shell>
}