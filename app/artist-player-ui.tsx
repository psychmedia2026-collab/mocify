"use client";

import Link from "next/link";
import {useEffect,useMemo,useRef,useState} from "react";
import {getActiveArtist} from "./artist-access";
import {releases} from "./data";
import{hydratedPublishedReleases}from"./listener-account";

type ArtistTrack={id:string;title:string;artist:string;genre:string;art:string;href?:string;audioSrc:string};
type RepeatMode="off"|"queue"|"track";
const BAR_COUNT=180;

function Icon({name}:{name:"heart"|"more"|"shuffle"|"prev"|"next"|"repeat"|"volume"|"cast"|"queue"|"play"|"pause"}){
 const common={width:20,height:20,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:1.9,strokeLinecap:"round" as const,strokeLinejoin:"round" as const,"aria-hidden":true};
 if(name==="heart")return <svg {...common}><path d="M20.8 4.6a5.4 5.4 0 0 0-7.6 0L12 5.8l-1.2-1.2a5.4 5.4 0 1 0-7.6 7.6L12 21l8.8-8.8a5.4 5.4 0 0 0 0-7.6Z"/></svg>;
 if(name==="more")return <svg {...common}><circle cx="5" cy="12" r="1.25" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.25" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1.25" fill="currentColor" stroke="none"/></svg>;
 if(name==="shuffle")return <svg {...common}><path d="M3 7h3.5c2.2 0 3.3 1.2 4.3 2.8l2.4 4.1c1 1.6 2.1 3.1 4.3 3.1H21"/><path d="m18 14 3 3-3 3"/><path d="M3 17h3.5c1.7 0 2.8-.7 3.7-1.9"/><path d="M14.2 8.9c.9-1.2 1.9-1.9 3.3-1.9H21"/><path d="m18 4 3 3-3 3"/></svg>;
 if(name==="prev")return <svg {...common}><path d="M6 5v14"/><path d="m19 6-9 6 9 6V6Z" fill="currentColor" stroke="none"/></svg>;
 if(name==="next")return <svg {...common}><path d="M18 5v14"/><path d="m5 6 9 6-9 6V6Z" fill="currentColor" stroke="none"/></svg>;
 if(name==="repeat")return <svg {...common}><path d="M17 2.8 20.2 6 17 9.2"/><path d="M3.8 10V8.5A2.5 2.5 0 0 1 6.3 6h13.3"/><path d="m7 21.2-3.2-3.2L7 14.8"/><path d="M20.2 14v1.5a2.5 2.5 0 0 1-2.5 2.5H4.4"/></svg>;
 if(name==="volume")return <svg {...common}><path d="M4 9v6h4l5 4V5L8 9H4Z"/><path d="M16 9.2a4 4 0 0 1 0 5.6"/></svg>;
 if(name==="cast")return <svg {...common}><path d="M4 18a2 2 0 0 1 2 2"/><path d="M4 14a6 6 0 0 1 6 6"/><path d="M4 10a10 10 0 0 1 10 10"/><path d="M8 5h9a3 3 0 0 1 3 3v8"/></svg>;
 if(name==="queue")return <svg {...common}><path d="M10 7h10M10 12h10M10 17h10"/><circle cx="5" cy="7" r="1" fill="currentColor" stroke="none"/><circle cx="5" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="5" cy="17" r="1" fill="currentColor" stroke="none"/></svg>;
 if(name==="pause")return <svg {...common} width="22" height="22"><path d="M9 6v12M15 6v12" strokeWidth="2.6"/></svg>;
 return <svg {...common} width="22" height="22"><path d="m9 6 9 6-9 6V6Z" fill="currentColor" stroke="none"/></svg>;
}

function fmt(seconds:number){if(!Number.isFinite(seconds)||seconds<0)return"0:00";const m=Math.floor(seconds/60),s=Math.floor(seconds%60).toString().padStart(2,"0");return `${m}:${s}`}

function staticArtistTracks(artistName:string):ArtistTrack[]{
 return releases.flatMap(track=>{
  if(track.artist!==artistName||!("audioSrc" in track)||typeof track.audioSrc!=="string")return[];
  return [{id:track.id,title:track.title,artist:track.artist,genre:track.genre,art:track.art,href:"href" in track?track.href:undefined,audioSrc:track.audioSrc}];
 });
}

export default function ArtistPlayer(){
 const [artistName,setArtistName]=useState("Andigo");
 const [queue,setQueue]=useState<ArtistTrack[]>([]);
 const [index,setIndex]=useState(0);
 const [playing,setPlaying]=useState(false);
 const [currentTime,setCurrentTime]=useState(0);
 const [duration,setDuration]=useState(0);
 const [volume,setVolumeState]=useState(1);
 const [shuffle,setShuffle]=useState(false);
 const [repeat,setRepeat]=useState<RepeatMode>("off");
 const [queueOpen,setQueueOpen]=useState(false);
 const [moreOpen,setMoreOpen]=useState(false);
 const [minimized,setMinimized]=useState(false);
 const [favoriteIds,setFavoriteIds]=useState<string[]>([]);
 const [spectrum,setSpectrum]=useState<number[]>(()=>Array.from({length:BAR_COUNT},()=>0));
 const audioRef=useRef<HTMLAudioElement|null>(null);
 const audioContextRef=useRef<AudioContext|null>(null);
 const analyserRef=useRef<AnalyserNode|null>(null);
 const spectrumRef=useRef<Uint8Array<ArrayBuffer>|null>(null);
 const gainRef=useRef<GainNode|null>(null);
 const lastVolume=useRef(1);
 const queueRef=useRef<ArtistTrack[]>([]);
 const indexRef=useRef(0);
 const repeatRef=useRef<RepeatMode>("off");
 const shuffleRef=useRef(false);

 const track=queue[index]??({id:"artist-empty",title:"No music yet",artist:artistName,genre:"",art:"",audioSrc:""} as ArtistTrack);
 const hasTrack=Boolean(track.audioSrc);
 const progress=duration>0?Math.min(100,currentTime/duration*100):0;
 const favorite=Boolean(hasTrack&&favoriteIds.includes(track.id));

 const loadArtist=()=>{const active=getActiveArtist();const name=active?.name??"Andigo";setArtistName(name);void hydratedPublishedReleases().then(p=>{const own=[...p,...releases].filter(r=>r.artist.toLowerCase()===name.toLowerCase()&&Boolean(r.audioSrc)).map(r=>({...r,audioSrc:r.audioSrc!}));setQueue(own);queueRef.current=own;setIndex(0);indexRef.current=0;setCurrentTime(0);setDuration(0);setPlaying(false);if(audioRef.current){audioRef.current.pause();audioRef.current.src=own[0]?.audioSrc??"";if(own[0])audioRef.current.load()}})};

 useEffect(()=>{loadArtist();const sync=()=>loadArtist();addEventListener("mocify-active-artist-change",sync);addEventListener("mocify-library-change",sync);return()=>{removeEventListener("mocify-active-artist-change",sync);removeEventListener("mocify-library-change",sync)}},[]);
 useEffect(()=>{queueRef.current=queue},[queue]);useEffect(()=>{indexRef.current=index},[index]);useEffect(()=>{repeatRef.current=repeat},[repeat]);useEffect(()=>{shuffleRef.current=shuffle},[shuffle]);
 useEffect(()=>{try{const raw=localStorage.getItem("mocify-artist-favorite-track-ids");const parsed=raw?JSON.parse(raw):[];if(Array.isArray(parsed))setFavoriteIds(parsed.filter((x):x is string=>typeof x==="string"))}catch{}},[]);
 useEffect(()=>{try{setMinimized(localStorage.getItem("mocify-artist-player-minimized")==="1")}catch{}},[]);
 const setMinimizedPersist=(value:boolean)=>{setMinimized(value);try{localStorage.setItem("mocify-artist-player-minimized",value?"1":"0")}catch{}};

 useEffect(()=>{
  const audio=new Audio();audio.preload="metadata";audio.volume=1;audioRef.current=audio;
  const loaded=()=>setDuration(Number.isFinite(audio.duration)?audio.duration:0);
  const time=()=>setCurrentTime(audio.currentTime);
  const play=()=>setPlaying(true),pause=()=>setPlaying(false);
  const ended=()=>{
   if(repeatRef.current==="track"){audio.currentTime=0;void audio.play();return}
   const q=queueRef.current;if(!q.length)return;
   const i=indexRef.current;
   if(repeatRef.current==="off"&&!shuffleRef.current&&i===q.length-1){setPlaying(false);return}
   const choices=q.map((_,n)=>n).filter(n=>n!==i);
   const next=shuffleRef.current&&choices.length?choices[Math.floor(Math.random()*choices.length)]:(i+1)%q.length;
   indexRef.current=next;setIndex(next);setCurrentTime(0);setDuration(0);audio.src=q[next].audioSrc;void audio.play();
  };
  audio.addEventListener("loadedmetadata",loaded);audio.addEventListener("timeupdate",time);audio.addEventListener("play",play);audio.addEventListener("pause",pause);audio.addEventListener("ended",ended);
  return()=>{audio.pause();void audioContextRef.current?.close();audio.removeEventListener("loadedmetadata",loaded);audio.removeEventListener("timeupdate",time);audio.removeEventListener("play",play);audio.removeEventListener("pause",pause);audio.removeEventListener("ended",ended)};
 },[]);

 const ensureAnalysis=()=>{const audio=audioRef.current;if(!audio)return;try{if(!audioContextRef.current){const ctx=new AudioContext(),an=ctx.createAnalyser(),gain=ctx.createGain();an.fftSize=512;an.smoothingTimeConstant=.72;gain.gain.value=volume;const source=ctx.createMediaElementSource(audio);source.connect(an);an.connect(gain);gain.connect(ctx.destination);audio.volume=1;audioContextRef.current=ctx;analyserRef.current=an;gainRef.current=gain;spectrumRef.current=new Uint8Array(an.frequencyBinCount)}if(audioContextRef.current.state==="suspended")void audioContextRef.current.resume()}catch{}};

 useEffect(()=>{let frame=0;const tick=()=>{if(playing&&analyserRef.current&&spectrumRef.current){const data=spectrumRef.current;analyserRef.current.getByteFrequencyData(data);const useful=Math.max(1,Math.floor(data.length*.72));setSpectrum(Array.from({length:BAR_COUNT},(_,bar)=>{const start=Math.floor(bar/BAR_COUNT*useful),end=Math.max(start+1,Math.floor((bar+1)/BAR_COUNT*useful));let total=0;for(let i=start;i<end;i++)total+=data[i];return Math.min(1,total/(end-start)/185)}))}frame=requestAnimationFrame(tick)};frame=requestAnimationFrame(tick);return()=>cancelAnimationFrame(frame)},[playing]);

 const select=(next:number,autoplay=playing)=>{const t=queue[next],audio=audioRef.current;if(!t||!audio)return;audio.pause();indexRef.current=next;setIndex(next);setCurrentTime(0);setDuration(0);audio.src=t.audioSrc;audio.load();if(autoplay){ensureAnalysis();void audio.play()}};
 const togglePlay=()=>{if(!hasTrack||!audioRef.current)return;const audio=audioRef.current;if(audio.src!==new URL(track.audioSrc,window.location.origin).toString()){audio.src=track.audioSrc;audio.load()}if(audio.paused){ensureAnalysis();void audio.play()}else audio.pause()};
 const prev=()=>{if(queue.length<2)return;select((index-1+queue.length)%queue.length)};
 const next=()=>{if(queue.length<2)return;const choices=queue.map((_,i)=>i).filter(i=>i!==index);select(shuffle&&choices.length?choices[Math.floor(Math.random()*choices.length)]:(index+1)%queue.length)};
 const seekFrom=(event:React.PointerEvent<HTMLDivElement>)=>{if(!audioRef.current||!duration)return;const rect=event.currentTarget.getBoundingClientRect(),ratio=Math.max(0,Math.min(1,(event.clientX-rect.left)/rect.width));audioRef.current.currentTime=ratio*duration;setCurrentTime(ratio*duration)};
 const setVolume=(value:number)=>{const next=Math.min(1,Math.max(0,value));if(next>0)lastVolume.current=next;setVolumeState(next);if(gainRef.current&&audioContextRef.current)gainRef.current.gain.setTargetAtTime(next,audioContextRef.current.currentTime,.015);else if(audioRef.current)audioRef.current.volume=next};
 const toggleMute=()=>setVolume(volume>0?0:(lastVolume.current||.8));
 const cycleRepeat=()=>setRepeat(r=>r==="off"?"queue":r==="queue"?"track":"off");
 const toggleFavorite=()=>{if(!hasTrack)return;const ids=favorite?favoriteIds.filter(id=>id!==track.id):[...favoriteIds,track.id];setFavoriteIds(ids);try{localStorage.setItem("mocify-artist-favorite-track-ids",JSON.stringify(ids))}catch{}};
 const copyLink=async()=>{if(!hasTrack)return;const href=track.href??`/explore#${track.id}`;try{await navigator.clipboard.writeText(new URL(href,window.location.origin).toString())}catch{}setMoreOpen(false)};
 const requestDevice=()=>{const audio=audioRef.current as (HTMLAudioElement&{webkitShowPlaybackTargetPicker?:()=>void;remote?:{prompt?:()=>Promise<void>}})|null;if(!audio)return;if(typeof audio.webkitShowPlaybackTargetPicker==="function"){audio.webkitShowPlaybackTargetPicker();return}if(typeof audio.remote?.prompt==="function")void audio.remote.prompt()};

 const envelope=(i:number)=>Math.min(1,.18+.34*Math.abs(Math.sin(i*.29+.7))+.22*Math.abs(Math.sin(i*.071+1.3))+.12*Math.abs(Math.sin(i*.83)));

 return <section className={minimized?"artist-m-player minimized":"artist-m-player"} aria-label={`${artistName} music player`}>
  <div className="artist-m-player-inner">
  <button type="button" className="artist-m-minimize" onClick={()=>setMinimizedPersist(!minimized)} aria-label={minimized?"Expand player":"Minimize player"} title={minimized?"Expand player":"Minimize player"}>{minimized?"↗":"—"}</button>
   <div className="artist-m-player-top">
    <div className="artist-m-track-area">
     <Link className="artist-m-track" href={track.href??"/studio/music"}><span className={`artist-m-cover ${track.art}`} aria-hidden="true"/><span><b>{track.title}</b><small>{track.artist}</small></span></Link>
     <button type="button" className={favorite?"artist-m-save active":"artist-m-save"} onClick={toggleFavorite} aria-pressed={favorite} aria-label={favorite?"Remove favorite":"Add favorite"} disabled={!hasTrack}><Icon name="heart"/></button>
     <div className="artist-m-more-wrap"><button type="button" className="artist-m-more" onClick={()=>setMoreOpen(v=>!v)} aria-expanded={moreOpen} aria-label="More options" disabled={!hasTrack}><Icon name="more"/></button>{moreOpen&&<div className="artist-m-more-menu"><button type="button" onClick={toggleFavorite}>{favorite?"Remove favorite":"Favorite track"}</button><Link href={track.href??"/studio/music"} onClick={()=>setMoreOpen(false)}>Open track</Link><button type="button" onClick={copyLink}>Copy track link</button></div>}</div>
    </div>
    <div className="artist-m-center"><div className="artist-m-controls">
     <button type="button" className={shuffle?"active":""} onClick={()=>setShuffle(v=>!v)} aria-pressed={shuffle} aria-label="Shuffle"><Icon name="shuffle"/></button>
     <button type="button" onClick={prev} disabled={queue.length<2} aria-label="Previous track"><Icon name="prev"/></button>
     <button type="button" className="artist-m-play" onClick={togglePlay} aria-label={playing?"Pause":"Play"} disabled={!hasTrack}><Icon name={playing?"pause":"play"}/></button>
     <button type="button" onClick={next} disabled={queue.length<2} aria-label="Next track"><Icon name="next"/></button>
     <button type="button" className={repeat!=="off"?"active":""} onClick={cycleRepeat} aria-pressed={repeat!=="off"} aria-label={repeat==="track"?"Repeat track":repeat==="queue"?"Repeat queue":"Repeat off"}><Icon name="repeat"/></button>
    </div></div>
    <div className="artist-m-tools">
     <div className="artist-m-volume"><button type="button" onClick={toggleMute} disabled={!hasTrack} aria-label={volume===0?"Unmute":"Mute"}><Icon name="volume"/></button><input type="range" min="0" max="1" step=".01" value={volume} onChange={e=>setVolume(Number(e.currentTarget.value))} aria-label="Volume" disabled={!hasTrack}/></div>
     <button type="button" className="artist-m-cast" onClick={requestDevice} aria-label="Connect playback device" disabled={!hasTrack}><Icon name="cast"/></button>
     <div className="artist-m-queue-wrap"><button type="button" className="artist-m-queue" onClick={()=>setQueueOpen(v=>!v)} aria-expanded={queueOpen} aria-label="Queue" disabled={!hasTrack}><Icon name="queue"/></button>{queueOpen&&<div className="artist-m-queue-menu"><b>{artistName}</b>{queue.map((t,i)=><button type="button" className={i===index?"current":""} key={t.id} onClick={()=>{select(i,true);setQueueOpen(false)}}><span>{t.title}</span><small>{t.artist}</small></button>)}</div>}</div>
     <div className="artist-m-brand"><img src="/mocify-bird.png?v=2" alt="" aria-hidden="true"/><span><b>MOCIFY</b><small>ARTIST PLAYBACK</small></span></div>
     <div className="artist-m-mini-controls"><button type="button" onClick={prev} disabled={queue.length<2} aria-label="Previous track"><Icon name="prev"/></button><button type="button" className="artist-m-mini-play" onClick={togglePlay} aria-label={playing?"Pause":"Play"} disabled={!hasTrack}><Icon name={playing?"pause":"play"}/></button><button type="button" onClick={next} disabled={queue.length<2} aria-label="Next track"><Icon name="next"/></button></div>
    </div>
   </div>
   <div className="artist-m-timeline"><span>{fmt(currentTime)}</span><div className="artist-m-wave" onPointerDown={seekFrom} role="slider" tabIndex={0} aria-valuemin={0} aria-valuemax={Math.round(duration||0)} aria-valuenow={Math.round(currentTime)} aria-label="Seek through track"><div className="artist-m-bars" aria-hidden="true">{spectrum.map((level,i)=>{const pct=i/(BAR_COUNT-1)*100,played=pct<=progress,height=Math.round(12+Math.min(1,envelope(i)+(playing?level*.22:0))*88);return <i key={i} className={played?"played":""} style={{"--h":`${height}%`} as React.CSSProperties}/>})}</div><span className="artist-m-playhead" style={{left:`${progress}%`}}/></div><span>{fmt(duration)}</span></div>
  </div>
 </section>
}
